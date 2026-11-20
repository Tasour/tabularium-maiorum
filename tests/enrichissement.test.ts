/*
 * Invariants de l'enrichissement Tassier & Reymond (rapports, relevés, rigueur).
 * Chaque exécution régénère une base temporaire : import puis enrichissement.
 */
import { expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { acte, consultation, filiation, individu, releve, tache, verdict } from "../src/db/schema";

const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-enrich-"));
const racine = join(import.meta.dir, "..");
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
const exec = (script: string) => {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} échoué :\n${r.stderr.toString()}`);
};
exec("import-tassier.ts");
exec("enrichir-tassier.ts");
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("159 rapports importés comme tâches, dont 120 absents de l'ancien index", async () => {
  const taches = await db.select().from(tache);
  expect(taches.length).toBe(159);
  expect(taches.some((t) => t.id === "tas-tache-E31")).toBe(true);
  expect(taches.some((t) => t.id === "tas-tache-E150")).toBe(true);
  const rapport = taches.find((t) => t.id === "tas-tache-E31")!;
  expect(rapport.description).toContain("ENQUETE-31.md");
  expect(rapport.description).toContain("## Sources");
});

test("les dates d'actes sont celles de l'acte, pas la date de consultation", async () => {
  const actes = await db.select().from(acte);
  const parId = new Map(actes.map((a) => [a.id, a.date]));
  expect(parId.get("tas-acte-anor-1889-mariage-301")).toBe("1889-02-11");
  expect(parId.get("tas-acte-anor-1896-naissance-130")).toBe("1896-09-29");
  expect(parId.get("tas-acte-maubeuge-1925-naissance-arlette-helene")).toBe("1925-09-04");
  // Vue 131 : contexte, non une preuve autonome -> pas de date inventée.
  expect(parId.get("tas-acte-anor-1896-naissance-131")).toBeNull();
});

test("13 relevés avec graphies telles qu'écrites, 10 rattachés à une fiche", async () => {
  const releves = await db.select().from(releve);
  expect(releves.length).toBe(13);
  expect(releves.filter((r) => r.individuId !== null).length).toBe(10);
  expect(releves.some((r) => r.nomEcrit === "Firmin Léon [T]assier")).toBe(true);
  expect(releves.some((r) => r.nomEcrit === "Roselle Euphémie [Petit ?]")).toBe(true);
  expect(releves.filter((r) => r.nomEcrit === "Roselle Euphémie [Petit ?]")[0].individuId).toBeNull();
  expect(releves.some((r) => r.role === "père de l'épouse")).toBe(true);
});

test("les sources gradées des rapports deviennent des consultations", async () => {
  expect((await db.select().from(consultation)).length).toBeGreaterThan(500);
  const e31 = (await db.select().from(tache).where(eq(tache.id, "tas-tache-E31")))[0];
  const cons = await db.select().from(consultation);
  expect(cons.some((c) => c.tacheId === e31.id && c.notes?.includes("3 E 7213"))).toBe(true);
});

test("les tâches sont liées aux fiches (Journal des recherches)", async () => {
  const liees = (await db.select().from(tache)).filter((t) => t.individuId !== null);
  expect(liees.length).toBeGreaterThanOrEqual(19);
  const e157 = (await db.select().from(tache).where(eq(tache.id, "tas-tache-E157")))[0];
  expect(e157.individuId).toBe("tas-felicien_leon");
  const e31 = (await db.select().from(tache).where(eq(tache.id, "tas-tache-E31")))[0];
  expect(e31.individuId).toBe("tas-felicien_leon");
});

test("H0 conservée : hypotheses écartées en verdicts, jamais en faits", async () => {
  const vs = await db.select().from(verdict);
  expect(vs.filter((v) => v.action === "hypothese_ecartée").length).toBeGreaterThanOrEqual(12);
  expect(vs.filter((v) => v.action === "temoignage").length).toBe(3);
  const e99 = (await db.select().from(tache).where(eq(tache.id, "tas-tache-E99")))[0];
  // Rapport « tradition non documentée » : non trouvé n'est pas promu.
  expect(e99.statut).toBe("en_cours");
  expect(vs.some((v) => v.id === "tas-verdict-E60")).toBe(true);
  // E99 porte sur le père non identifié de Jean Reymond : aucun lien inventé.
  expect((await db.select().from(tache).where(eq(tache.id, "tas-tache-E99")))[0].individuId).toBeNull();
});

test("aucun ancêtre C3 n'est raccordé par l'enrichissement", async () => {
  const c3 = new Set((await db.select({ id: individu.id }).from(individu)).filter((i) => i.id.startsWith("tas-pz-")).map((i) => i.id));
  const liens = await db.select().from(filiation);
  expect(liens.filter((l) => c3.has(l.enfantId) || c3.has(l.parentId)).length).toBe(0);
});
