/* Vue d'ascendance Sosa : invariants calculés sur la vraie base importée. */
import { expect, test } from "bun:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import * as schema from "../src/db/schema";
import { ascendanceSosa } from "../src/lib/sosa";

const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-sosa-"));
const racine = join(import.meta.dir, "..");
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "enrichir-individus.ts", "ajouter-antoine-meunier.ts", "classer-recherches.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

const personnes = await db.select({
  id: schema.individu.id, nom: schema.individu.nom, prenoms: schema.individu.prenoms,
  sexe: schema.individu.sexe, naissance: schema.individu.naissance, deces: schema.individu.deces,
}).from(schema.individu);
const filiations = await db.select({
  enfantId: schema.filiation.enfantId, parentId: schema.filiation.parentId, type: schema.filiation.type,
}).from(schema.filiation);

test("ascendance de Vincent : 18 Sosa, 8 générations, 9 établis / 9 hypothétiques", () => {
  const r = ascendanceSosa("tas-vincent", personnes, filiations, 8)!;
  expect(r).not.toBeNull();
  expect(r.racine.id).toBe("tas-vincent");
  expect(r.noeuds.length).toBe(18);
  expect(r.profondeur).toBe(8);
  expect(r.trouves).toBe(9);
  expect(r.hypothetiques).toBe(9);
});

test("Sosa 1 = Vincent, 2 = David, 3 = Agnès", () => {
  const r = ascendanceSosa("tas-vincent", personnes, filiations, 8)!;
  expect(r.noeuds.find((n) => n.sosa === 2)?.personne.id).toBe("tas-david");
  expect(r.noeuds.find((n) => n.sosa === 3)?.personne.id).toBe("tas-agnes");
});

test("les liens du haut de l'arbre (gen 5+) sont hypothétiques, pas promus", () => {
  const r = ascendanceSosa("tas-vincent", personnes, filiations, 8)!;
  const profonds = r.noeuds.filter((n) => n.generation >= 5);
  expect(profonds.length).toBe(9);
  expect(profonds.every((n) => n.lien === "hypothetique")).toBe(true);
});

test("aucun ancêtre C3 n'apparaît dans l'ascendance Sosa établie", () => {
  const r = ascendanceSosa("tas-vincent", personnes, filiations, 8)!;
  expect(r.noeuds.every((n) => !n.personne.id.startsWith("tas-pz-"))).toBe(true);
});

test("doute H0 Jean/Félicien conservé dans la base", async () => {
  const doutes = await db.select().from(schema.doute);
  expect(doutes.some((d) => d.statut === "differentes" &&
    [d.individu1Id, d.individu2Id].includes("tas-jean_felicien") &&
    [d.individu1Id, d.individu2Id].includes("tas-felicien_leon"))).toBe(true);
});
