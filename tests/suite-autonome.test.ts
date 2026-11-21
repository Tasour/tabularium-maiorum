/* Bloc autonome final : relevés propres, lieux non vérifiés, demandes d'actes, suivi Vincent. */
import { expect, test } from "bun:test";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { annotation, individu, releve, tache } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-suite-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "enrichir-individus.ts", "ajouter-antoine-meunier.ts", "nettoyer-releves-vides.ts", "appliquer-captures.ts", "classer-recherches.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("aucun relevé vide ne subsiste", async () => {
  const annotees = new Set((await db.select().from(annotation)).map((a) => a.releveId).filter(Boolean));
  const vides = (await db.select().from(releve)).filter((r) =>
    !r.nomEcrit && !r.prenomsEcrits && !r.nom && !r.prenoms && !r.role && !r.naissance && !r.deces && !r.profession && !r.notes && !annotees.has(r.id));
  expect(vides.length).toBe(0);
  const restants = (await db.select().from(releve)).filter((r) => !r.individuId);
  expect(restants.length).toBe(2); // Roselle [Petit ?] et Joseph Bessac (témoins non rattachables)
  expect(restants.some((r) => (r.nomEcrit ?? "").includes("Roselle Euphémie"))).toBe(true);
  expect(restants.some((r) => (r.nomEcrit ?? "").includes("Joseph Bessac"))).toBe(true);
});

test("lieux sans coordonnées explicitement annotés (aucune coordonnée devinée)", async () => {
  const { lieu } = await import("../src/db/schema");
  const sans = (await db.select().from(lieu)).filter((l) => l.latitude == null && l.longitude == null);
  // Le fixture ne rejoue pas le géocodage (API externe non déterministe) : tous
  // les lieux y sont sans coordonnées, mais aucun n'a de coordonnée inventée.
  expect(sans.length).toBeGreaterThanOrEqual(6);
  expect(sans.every((l) => (l.notes ?? "").includes("non vérifiées") || (l.notes ?? "").includes("Coordonnées non vérifiées"))).toBe(true);
});

test("dossier de demandes d'actes : 14 démarches, cotes confirmées par les rapports", () => {
  const p = join(racine, "docs", "demandes-actes.md");
  expect(existsSync(p)).toBe(true);
  const t = readFileSync(p, "utf8");
  expect(t).toContain("14 démarches");
  expect(t).toContain("3E 4265");
  expect(t).toContain("3 E 10054");
  expect(t).toContain("aucune cote inventée");
  expect(t).toContain("Archives départementales de la Savoie");
});

test("suivi Vincent : 9 verdicts ordonnés et décès B1 documentés", () => {
  const t = readFileSync(join(racine, "docs", "reconstruction-vincent.md"), "utf8");
  expect(t).toContain("9 verdicts à prendre");
  for (const sosa of [16, 17, 32, 33, 34, 64, 65, 128, 129]) expect(t).toContain(`| ${sosa} |`);
  expect(t).toContain("28/02/1997");
  expect(t).toContain("acte non consulté");
});

test("H0 : 653 C3 non promus, doute Jean/Félicien conservé", async () => {
  const c3 = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-pz-"));
  expect(c3.length).toBe(653);
  expect(c3.every((i) => i.raccorde === false)).toBe(true);
  const e162 = (await db.select().from(tache)).find((t) => t.id === "tas-tache-E162");
  expect(e162?.statut).toBe("intervention_humaine");
});
