/* E165 : mention presse Fourmies et pistes C3 de la capture MyHeritage -2. */
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { filiation, individu, source, tache } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-e165-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "enregistrer-enquete-165.ts", "classer-recherches.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("rapport E165 : 6 bandes et distinction publication vs célébration", () => {
  const t = readFileSync(join(racine, "scripts/donnees/rapports/ENQUETE-165.md"), "utf8");
  expect(t).toContain("6 bandes de 2 500 px");
  expect(t).toContain("14 944 px");
  expect(t).toContain("14/02/1889");
  expect(t).toContain("11/02/1889");
  expect(t).toContain("date de publication");
  expect(t).toContain("H0 conservée");
});

test("source presse : publication d'index, pas un acte", async () => {
  const s = (await db.select().from(source)).find((x) => x.id === "tas-src-journal-fourmies-1889-02-14");
  expect(s).toBeDefined();
  expect(s?.cote).toBe("");
  expect(s?.notes).toContain("Article non consulté");
  expect(s?.notes).toContain("11/02/1889");
  expect(s?.notes).toContain("14/02");
});

test("3 pistes C3 non raccordées", async () => {
  const ids = ["tas-piste-eugene_arthur_tassier", "tas-piste-ukient_dassonville", "tas-piste-renee_diot"];
  for (const id of ids) {
    const i = (await db.select().from(individu)).find((x) => x.id === id);
    expect(i).toBeDefined();
    expect(i?.grade).toBe("C3");
    expect(i?.raccorde).toBe(false);
  }
  const liens = await db.select().from(filiation);
  expect(liens.filter((l) => ids.includes(l.enfantId) || ids.includes(l.parentId)).length).toBe(0);
});

test("E165 intervention humaine (rapport à sources gradées)", async () => {
  const t = (await db.select().from(tache)).find((x) => x.id === "tas-tache-E165");
  expect(t).toBeDefined();
  expect(t?.statut).toBe("intervention_humaine");
});
