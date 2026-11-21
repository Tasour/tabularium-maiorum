/* Directions 2-3-4 : cotes d'inventaire, preuve image, confiance calculée. */
import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { acte, individu, source } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-234-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of [
  "import-tassier.ts", "enrichir-tassier.ts", "importer-cotes-rapports.ts",
  "importer-cotes-inventaire.ts", "corriger-cotes-plages.ts", "corriger-actes-lies.ts",
]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("direction 2 : cotes d'inventaire importées, plages exclues", async () => {
  const src = await db.select().from(source);
  // 21 = sources de l'import initial + 17 cotes d'inventaire - 2 plages.
  expect(src.length).toBeGreaterThanOrEqual(21);
  expect(src.some((s) => s.cote === "3 E 8133")).toBe(true); // Cerfontaine
  expect(src.some((s) => s.cote === "3E 4265")).toBe(true);
  expect(src.some((s) => s.cote === "3E 4170")).toBe(false); // plage de cotation
  expect(src.some((s) => (s.notes ?? "").includes("pas un acte consulté"))).toBe(true);
});

test("direction 2 : jamais de cote fabriquée pour les cases vides", async () => {
  const src = await db.select().from(source);
  expect(src.every((s) => !!s.cote || !(s.id ?? "").startsWith("tas-src-inv-"))).toBe(true);
});

test("direction 3 : preuve image archivée avec SHA-256 et attribution corrigée", () => {
  const p = join(racine, "data", "preuves-images.json");
  expect(existsSync(p)).toBe(true);
  const d = JSON.parse(readFileSync(p, "utf8"));
  expect(d.preuves.length).toBe(1);
  const e = d.preuves[0];
  expect(e.sha256).toBe(createHash("sha256").update(readFileSync(join(racine, e.fichier))).digest("hex"));
  expect(e.titre).toContain("folios 3163/3164");
  expect(e.note).toContain("mal attribuée");
  expect(e.note).toContain("jamais présentée comme preuve de l'acte");
});

test("direction 3 : E31 porte le rectificatif d'attribution", () => {
  const t = readFileSync(join(racine, "scripts", "donnees/rapports/ENQUETE-31.md"), "utf8");
  expect(t).toContain("RECTIFICATIF 21/11/2026");
  expect(t).toContain("mal attribué");
  expect(t).toContain("3163/3164");
});

test("direction 4 : l'acte de 1925 n'est plus lié à Élisée ni à Arlette Roussette", async () => {
  const acte1925 = (await db.select().from(acte)).find((a) => a.id === "tas-acte-maubeuge-1925-naissance-arlette-helene");
  expect(acte1925).toBeDefined();
  for (const id of ["tas-elisee", "tas-arlette"]) {
    const i = (await db.select().from(individu)).find((x) => x.id === id);
    expect(i?.acteNaissanceId).toBeNull();
    expect(i?.notes).toContain("lien « acte de naissance » retiré");
  }
  const bonne = (await db.select().from(individu)).find((x) => x.id === "tas-arlette_helene");
  expect(bonne?.acteNaissanceId).toBe(acte1925!.id);
});

test("H0 : aucune promotion", async () => {
  const c3 = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-pz-"));
  expect(c3.length).toBe(653);
  expect(c3.every((i) => i.raccorde === false)).toBe(true);
});
