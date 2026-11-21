/* Bloc final A+B+C : union datée, tâches liées, liens d'enfants non dupliqués. */
import { expect, test } from "bun:test";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { eq, and } from "drizzle-orm";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { couple, filiation, individu, tache } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-final-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "ajouter-antoine-meunier.ts", "classer-recherches.ts", "finaliser-liens.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("A) seule l'union établie par acte A1 est datée", async () => {
  const firmin = (await db.select().from(couple).where(eq(couple.id, "tas-couple-firmin-leon-aline-meunier")))[0];
  expect(firmin.dateMin).toBe("1889-02-11");
  expect(firmin.notes).toContain("1 Mi EC 012 R 003");
  // Le 06/01/1923 (mention marginale non attribuée) n'est jamais enregistré.
  const jean = (await db.select().from(couple).where(eq(couple.id, "tas-couple-jean-felicien-helene-lamarque")))[0];
  expect(jean.dateMin).toBeNull();
  const autres = (await db.select().from(couple)).filter((c) => c.dateMin && c.id !== firmin.id);
  expect(autres.length).toBe(0);
});

test("B) les enquêtes à cible explicite sont liées", async () => {
  const liees = (await db.select().from(tache)).filter((t) => t.individuId !== null);
  expect(liees.length).toBeGreaterThanOrEqual(40);
  expect((await db.select().from(tache).where(eq(tache.id, "tas-tache-E110")))[0].individuId).toBe("tas-jean");
  expect((await db.select().from(tache).where(eq(tache.id, "tas-tache-E119")))[0].individuId).toBe("tas-antoine_meunier");
  // Une enquête sans cible explicite reste non liée (pas de devinette).
  expect((await db.select().from(tache).where(eq(tache.id, "tas-tache-E150")))[0].individuId).toBeNull();
});

test("C) les 3 enfants de Jean × Joséphine ont exactement 2 parents, sans doublon", async () => {
  for (const id of ["tas-agnes", "tas-cecile", "tas-laurent"]) {
    const liens = await db.select().from(filiation).where(eq(filiation.enfantId, id));
    expect(liens.length).toBe(2);
    expect(liens.map((l) => l.parentId).sort()).toEqual(["tas-jean", "tas-josephine"].sort());
  }
  expect((await db.select().from(filiation)).length).toBe(32);
});

test("H0 : aucun C3 promu, 1 seul en cours, 2 trouvé", async () => {
  const c3 = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-pz-"));
  expect(c3.length).toBe(653);
  expect(c3.every((i) => i.raccorde === false)).toBe(true);
  const statuts = await db.select().from(tache);
  expect(statuts.filter((t) => t.statut === "en_cours").length).toBe(3);
  expect(statuts.filter((t) => t.statut === "trouve").length).toBe(2);
});
