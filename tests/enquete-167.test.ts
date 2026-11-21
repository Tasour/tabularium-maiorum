/* E167 : conflit de filiation Sosa rendu visible, aucune correction automatique. */
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { and, eq } from "drizzle-orm";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { doute, filiation, tache } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-e167-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "ajouter-antoine-meunier.ts", "importer-graphe-pz.ts", "enregistrer-enquete-167.ts", "classer-recherches.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("doute a_verifier sur les deux fils de Jean-Baptiste", async () => {
  const d = (await db.select().from(doute).where(and(eq(doute.individu1Id, "tas-pz-181"), eq(doute.individu2Id, "tas-pz-228"))))[0];
  expect(d).toBeDefined();
  expect(d.statut).toBe("a_verifier");
  expect(d.note).toContain("circularité");
  expect(d.note).toContain("H0 conservée");
});

test("chaîne Sosa inchangée : 117→181 reste hypothétique dans pz_lien", async () => {
  const liens = await db.select().from((await import("../src/db/schema")).pzLien);
  expect(liens.some((l) => l.type === "parent" && l.sourceId === "tas-pz-181" && l.cibleId === "tas-pz-117")).toBe(true);
  expect(liens.some((l) => l.type === "parent" && l.sourceId === "tas-pz-228" && l.cibleId === "tas-pz-117")).toBe(true);
  // Aucun filiation A1 modifiée par l'enquête.
  expect((await db.select().from(filiation)).length).toBe(32);
});

test("rapport de cohérence : 40 fratries suspectes, aucune correction", () => {
  const t = readFileSync(join(racine, "docs/coherence-graphe-pz.md"), "utf8");
  expect(t).toContain("40 géniteur(s) à fratrie suspecte");
  expect(t).toContain("Aucun lien n'est modifié");
  expect(t).toContain("mélanger filiation et alliance");
});

test("rapport E167 : circularité E86 et limite du champ p", () => {
  const t = readFileSync(join(racine, "scripts/donnees/rapports/ENQUETE-167.md"), "utf8");
  expect(t).toContain("PZ 181");
  expect(t).toContain("PZ 228");
  expect(t).toContain("circularité");
  expect(t).toContain("H0 conservée");
});

test("E167 enregistrée et classée", async () => {
  const t = (await db.select().from(tache)).find((x) => x.id === "tas-tache-E167");
  expect(t).toBeDefined();
  expect(t?.statut).toBe("intervention_humaine");
});
