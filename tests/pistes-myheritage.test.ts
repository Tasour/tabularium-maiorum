/* E163 : pistes C3 issues de la relecture intégrale de la capture MyHeritage. */
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { filiation, individu, tache } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-myh-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "enregistrer-pistes-myheritage.ts", "classer-recherches.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("5 pistes C3 non raccordées, sans date devinée", async () => {
  const pistes = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-piste-") && !i.id.includes("denain"));
  expect(pistes.length).toBe(5);
  expect(pistes.every((i) => i.grade === "C3" && i.raccorde === false)).toBe(true);
  expect(pistes.every((i) => (i.notes ?? "").includes("H0 conservée"))).toBe(true);
  const paula = pistes.find((i) => i.id === "tas-piste-paula_madeleine_tassier")!;
  expect(paula.naissance).toBeNull(); // champ masqué, jamais deviné
  expect(paula.naissanceMin).toBeNull();
  const aline = pistes.find((i) => i.id === "tas-piste-emilienne_aline_scory")!;
  expect(aline.naissance).toBe("~1867"); // seule l'année est marquée approximative
});

test("aucune filiation n'est créée pour ces pistes", async () => {
  const ids = new Set((await db.select().from(individu)).filter((i) => i.id.includes("piste-")).map((i) => i.id));
  const liens = await db.select().from(filiation);
  expect(liens.filter((l) => ids.has(l.enfantId) || ids.has(l.parentId)).length).toBe(0);
});

test("E163 existe, classée intervention humaine, avec le rapport complet", async () => {
  const t = (await db.select().from(tache)).find((x) => x.id === "tas-tache-E163");
  expect(t).toBeDefined();
  expect(t?.statut).toBe("intervention_humaine");
  expect(t?.description).toContain("ENQUETE-163.md");
  expect(t?.description).toContain("28 800 px");
});

test("rapport : 12 bandes et aucun champ masqué inventé", () => {
  const t = readFileSync(join(racine, "scripts/donnees/rapports/ENQUETE-163.md"), "utf8");
  expect(t).toContain("12 bandes de 2 400 px");
  expect(t).toContain("28 800 px");
  expect(t).toContain("masqués");
  expect(t).toContain("H0 conservée");
  expect(t).toContain("Paula Madeleine");
  expect(t).toContain("Emilienne Aline Scory");
});

test("H0 : 653 ancêtres PZ non promus", async () => {
  const c3 = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-pz-"));
  expect(c3.length).toBe(653);
  expect(c3.every((i) => i.raccorde === false)).toBe(true);
});
