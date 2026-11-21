/* E168 : cotes Trélon A1 en inventaire, aucune image lue. */
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { source, tache } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-e168-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enregistrer-enquete-168.ts", "classer-recherches.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("3 registres Trélon enregistrés avec ARK et mention images non lues", async () => {
  const src = await db.select().from(source);
  for (const cote of ["5 Mi 011 R 022", "5 Mi 011 R 021", "5 Mi 011 R 023"]) {
    const s = src.find((x) => x.cote === cote);
    expect(s).toBeDefined();
    expect(s?.url).toContain("archivesdepartementales.lenord.fr");
    expect(s?.notes).toContain("Aucune image lue");
    expect(s?.notes).toContain("pas acte");
  }
});

test("cadrage temporel : 1791 dans BMS, pas dans NMD", () => {
  const t = readFileSync(join(racine, "scripts/donnees/rapports/ENQUETE-168.md"), "utf8");
  expect(t).toContain("avant l'état civil de 1793");
  expect(t).toContain("5 Mi 011 R 022");
  expect(t).toContain("aucune image lue");
  expect(t).toContain("H0 conservée");
});

test("plan de lecture dans demandes-actes.md", () => {
  const t = readFileSync(join(racine, "docs/demandes-actes.md"), "utf8");
  expect(t).toContain("1748, 1753, 1791");
  expect(t).toContain("1796");
  expect(t).toContain("date + paroisse + parents + numéro d'acte");
});

test("E168 classée intervention humaine", async () => {
  const t = (await db.select().from(tache)).find((x) => x.id === "tas-tache-E168");
  expect(t).toBeDefined();
  expect(t?.statut).toBe("intervention_humaine");
});
