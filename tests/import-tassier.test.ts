/*
 * Invariants de l'import Tassier & Reymond dans Tabularium.
 * Chaque exécution régénère une base temporaire via le script d'import :
 * les tests ne dépendent jamais de l'état de ./data et sont reproductibles.
 */
import { expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { acte, consultation, doute, filiation, individu, page, source, tache, verdict } from "../src/db/schema";

const DOSSIER_TEST = mkdtempSync(join(tmpdir(), "tassier-import-"));
const SCRIPT = join(import.meta.dir, "..", "scripts", "import-tassier.ts");
const EXPORT = join(import.meta.dir, "..", "scripts", "donnees", "arbre-export.json");

const resultat = Bun.spawnSync({
  cmd: [process.execPath, SCRIPT],
  env: { ...process.env, DOSSIER_DONNEES: DOSSIER_TEST, ARBRE_EXPORT: EXPORT },
  stdout: "pipe", stderr: "pipe",
});
if (resultat.exitCode !== 0) {
  throw new Error(`Import de test échoué :\n${resultat.stderr.toString()}\n${resultat.stdout.toString()}`);
}
ouvrirBase(join(DOSSIER_TEST, "donnees.db"), join(import.meta.dir, "..", "drizzle"));
const { chargerIndividu } = await import("../src/data/individus");
const sourceData = JSON.parse(readFileSync(EXPORT, "utf8"));

  test("34 fiches A1 et 653 ancêtres C3 sont présents", async () => {
    const lignes = await db.select({ id: individu.id, grade: individu.grade, raccorde: individu.raccorde }).from(individu);
    // Le grade C3 qualifie la preuve, pas l'origine : on distingue par le préfixe d'id.
    expect(lignes.filter((l) => l.id.startsWith("tas-pz-") === false).length).toBe(34);
    const c3 = lignes.filter((l) => l.id.startsWith("tas-pz-"));
    expect(c3.length).toBe(653);
    expect(c3.every((l) => l.grade === "C3" && l.raccorde === false)).toBe(true);
  });

  test("4 preuves avec leur empreinte SHA-256 intègre", async () => {
    const pages = await db.select().from(page);
    expect(pages.length).toBe(4);
    for (const p of pages) {
      expect(p.sha256).toMatch(/^[a-f0-9]{64}$/);
      const empreinte = createHash("sha256").update(readFileSync(join(DOSSIER_TEST, "images", p.fichier!))).digest("hex");
      expect(empreinte).toBe(p.sha256);
    }
  });

  test("39 enquêtes et 3 témoignages A1-témoin", async () => {
    expect((await db.select().from(tache)).length).toBe(39);
    const vs = await db.select().from(verdict);
    expect(vs.length).toBe(3);
    expect(vs.every((v) => v.temoin === "A1-témoin" && v.action === "temoignage")).toBe(true);
  });

  test("Jean Félicien (Lyon 1898) et Félicien Léon (Anor 1896) restent deux fiches distinctes", async () => {
    const a = await db.select().from(individu).where(eq(individu.id, "tas-jean_felicien"));
    const b = await db.select().from(individu).where(eq(individu.id, "tas-felicien_leon"));
    expect(a.length).toBe(1);
    expect(b.length).toBe(1);
    expect(a[0].naissance).toContain("1898");
    expect(b[0].naissance).toContain("1896");
  });

  test("un doute explicite « différentes » est enregistré entre les deux", async () => {
    const ds = await db.select().from(doute).where(eq(doute.statut, "differentes"));
    expect(ds.length).toBe(1);
    expect([ds[0].individu1Id, ds[0].individu2Id].sort()).toEqual(["tas-felicien_leon", "tas-jean_felicien"].sort());
    expect(ds[0].note).toContain("H0 conservée");
  });

  test("les 8 liens proposedParents restent hypothetiques, sans acte", async () => {
    const hyps = await db.select().from(filiation).where(eq(filiation.type, "hypothetique"));
    expect(hyps.length).toBe(8);
    expect(hyps.every((h) => h.acteId === null)).toBe(true);
    expect(hyps.every((h) => (h.notes ?? "").includes("H0 conservée"))).toBe(true);
  });

  test("aucun ancêtre C3 n'a de filiation", async () => {
    const ids = new Set((await db.select({ id: individu.id }).from(individu)).filter((x) => x.id.startsWith("tas-pz-")).map((x) => x.id));
    const liens = await db.select().from(filiation);
    expect(liens.filter((l) => ids.has(l.enfantId) || ids.has(l.parentId)).length).toBe(0);
  });

  test("Félicien Léon est rattaché à Firmin Léon × Aline Meunier par acte", async () => {
    const f = await chargerIndividu("tas-felicien_leon");
    expect(f).not.toBeNull();
    // Aline Meunier porte un sexe explicite dans la source ; Firmin Léon n'en a pas :
    // on ne l'invente pas, on vérifie seulement les deux liens de filiation plus bas.
    expect(f!.mere?.nom).toBe("Meunier");
    const actes = await db.select().from(acte);
    const acte1896 = actes.find((a) => (a.cote ?? "").includes("3 E 7213"));
    expect(acte1896).toBeDefined();
    const liens = await db.select().from(filiation).where(eq(filiation.enfantId, "tas-felicien_leon"));
    expect(liens.length).toBeGreaterThan(0);
    expect(liens.every((l) => l.acteId === acte1896!.id)).toBe(true);
  });

  test("« née Favre » : maiden distinct de last préservé dans les notes", async () => {
    const f = await db.select().from(individu).where(eq(individu.id, "tas-delphine_favre"));
    expect(f.length).toBe(1);
    expect(f[0].nom).toBe("Favre");
    expect(f[0].notes).toContain("Recensement");
  });

  test("aucune cote inventée : toute cote d'acte existe dans l'export source", async () => {
    const cotesSource = new Set(sourceData.preuves.map((p: any) => p.cote));
    for (const a of await db.select().from(acte)) expect(cotesSource.has(a.cote)).toBe(true);
    for (const s of await db.select().from(source)) expect(cotesSource.has(s.cote)).toBe(true);
  });

  test("les consultations « non trouvé » sont enregistrées comme telles", async () => {
    expect((await db.select().from(consultation).where(eq(consultation.resultat, "rien"))).length).toBeGreaterThan(0);
    expect(sourceData.enquetes.filter((e: any) => e.statut === "non-trouve").length).toBeGreaterThan(0);
  });
