/* Classification des 162 enquêtes : tous les statuts et l'idempotence. */
import { expect, test } from "bun:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { tache } from "../src/db/schema";

const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-classif-"));
const racine = join(import.meta.dir, "..");
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "classer-recherches.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("163 tâches classées : 160 intervention humaine, 1 en cours, 2 trouvé", async () => {
  const taches = await db.select().from(tache);
  expect(taches.length).toBe(163);
  const compte = (s: string) => taches.filter((t) => t.statut === s).length;
  expect(compte("intervention_humaine")).toBe(160);
  expect(compte("en_cours")).toBe(1);
  expect(compte("trouve")).toBe(2);
  expect(compte("abandonne")).toBe(0);
});

test("marqueur de classification daté dans la description, pas de champ fantôme", async () => {
  const e01 = (await db.select().from(tache).where((await import("drizzle-orm")).eq(tache.id, "tas-tache-E01")))[0];
  expect(e01.description).toContain("CLASSIFICATION 2026-11-21");
  expect(e01.description).toContain("intervention_humaine");
});

test("pas de terminer pour intervention humaine (attente, pas clôture)", async () => {
  const taches = await db.select().from(tache);
  const enAttente = taches.filter((t) => t.statut === "intervention_humaine");
  expect(enAttente.every((t) => t.termineLe === null)).toBe(true);
});

test("H0 conservé : les enquêtes E160/E161 restent en intervention humaine", async () => {
  for (const id of ["tas-tache-E160", "tas-tache-E161"]) {
    expect((await db.select().from(tache)).find((t) => t.id === id)?.statut).toBe("intervention_humaine");
  }
});
