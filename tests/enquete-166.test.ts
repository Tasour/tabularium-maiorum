/* E166 : repères d'actes B1 et date complète d'Emmanuel. */
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { individu, tache } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-e166-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "enrichir-individus.ts", "appliquer-captures.ts", "enregistrer-enquete-166.ts", "classer-recherches.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("Emmanuel : date complète 04/02/2000 lue, pas de jour deviné", async () => {
  const e = (await db.select().from(individu)).find((x) => x.id === "tas-emmanuel");
  expect(e?.deces).toBe("2000-02-04");
  expect(e?.decesMin).toBe("2000-02-04");
  expect(e?.notes).toContain("acte n°102");
  expect(e?.notes).toContain("Acte non consulté");
});

test("6 repères de numéros d'actes sans promotion", async () => {
  const attendu: Record<string, string> = {
    "tas-elie": "n°00153", "tas-arlette_helene": "n°5", "tas-felicien_leon": "n°233",
    "tas-elisee": "n°19", "tas-piste-alain_leonard_denain": "n°112", "tas-piste-josephine_alina_denain": "n°188",
  };
  for (const [id, num] of Object.entries(attendu)) {
    const i = (await db.select().from(individu)).find((x) => x.id === id);
    expect(i?.notes).toContain(num);
    expect((i?.notes ?? "").toLowerCase()).toContain("pas une cote");
    if (id.includes("piste")) expect(i?.raccorde).toBe(false);
  }
});

test("rapport : 7 bandes, distinction numéro d'acte vs cote, même fonds", () => {
  const t = readFileSync(join(racine, "scripts/donnees/rapports/ENQUETE-166.md"), "utf8");
  expect(t).toContain("7 bandes de 2 500 px");
  expect(t).toContain("17 643 px");
  expect(t).toContain("numéro d'acte n'est **pas** une cote");
  expect(t).toContain("aucun gain de grade");
  expect(t).toContain("H0 conservée");
});

test("E166 classée intervention humaine (rapport à sources gradées)", async () => {
  const t = (await db.select().from(tache)).find((x) => x.id === "tas-tache-E166");
  expect(t).toBeDefined();
  expect(t?.statut).toBe("intervention_humaine");
});
