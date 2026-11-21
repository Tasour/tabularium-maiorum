/* Tranche P1 A/B/C/D : sources matchID, complétion, URLs d'archives, fiche Antoine Meunier. */
import { expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { filiation, individu, source, tache } from "../src/db/schema";

const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-p1-"));
const racine = join(import.meta.dir, "..");
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "completer-fiches.ts", "importer-urls-sources.ts", "ajouter-antoine-meunier.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("A : E160/E161 citent l'API matchID comme source B1 sans trancher", async () => {
  for (const id of ["tas-tache-E160", "tas-tache-E161"]) {
    const t = (await db.select().from(tache).where(eq(tache.id, id)))[0];
    expect(t.description.toLowerCase()).toContain("matchid");
    expect(t.description).toContain("B1");
    expect(t.description).toContain("1970");
    expect(t.statut).toBe("en_cours");
  }
});

test("B : décès d'Arlette Hélène complété depuis E109 (B1), sans déduction", async () => {
  const a = (await db.select().from(individu).where(eq(individu.id, "tas-arlette_helene")))[0];
  expect(a.deces).toBe("2022-01-24");
  expect(a.decesLieuId).toBe("tas-lieu-cousolre-59");
  expect(a.notes).toContain("ENQUETE-109.md");
  const arlette = (await db.select().from(individu).where(eq(individu.id, "tas-arlette")))[0];
  expect(arlette.deces).toBeNull();
});

test("C : 15 sources d'archives importées, aucun profil personnel", async () => {
  const urls = (await db.select().from(source)).map((s) => s.url ?? "").filter(Boolean);
  expect(urls.length).toBeGreaterThanOrEqual(19);
  expect(urls.some((u) => u.includes("linkedin.com"))).toBe(false);
  expect(urls.some((u) => u.includes("copainsdavant"))).toBe(false);
  expect(urls.some((u) => u.includes("archivesdepartementales.lenord.fr"))).toBe(true);
});

test("D : Antoine Joseph Meunier en C3 non promu, filiation hypothétique", async () => {
  const a = (await db.select().from(individu).where(eq(individu.id, "tas-antoine_meunier")))[0];
  expect(a).toBeDefined();
  expect(a.grade).toBe("C3");
  expect(a.raccorde).toBe(false);
  expect(a.notes).toContain("1 Mi EC 012 R 003");
  const lien = (await db.select().from(filiation)).find((f) => f.enfantId === "tas-aline_meunier" && f.parentId === "tas-antoine_meunier");
  expect(lien?.type).toBe("hypothetique");
  expect(lien?.acteId).toBeNull();
});

test("H0 : aucun C3 promu après toutes les complétions", async () => {
  const c3 = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-pz-"));
  expect(c3.length).toBe(653);
  expect(c3.every((i) => i.raccorde === false)).toBe(true);
});
