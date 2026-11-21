/* Intégration des captures de sources (ENQUETE-162) : faits B1, jamais promus. */
import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { doute, individu, tache } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-captures-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "enrichir-individus.ts", "ajouter-antoine-meunier.ts", "appliquer-captures.ts", "classer-recherches.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("registre : 6 captures avec SHA-256 intègre", () => {
  const registre = JSON.parse(readFileSync(join(racine, "data", "preuves-sources.json"), "utf8"));
  expect(registre.preuves.length).toBe(6);
  const hashes = new Set<string>();
  for (const p of registre.preuves) {
    expect(p.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(hashes.has(p.sha256)).toBe(false);
    hashes.add(p.sha256);
    const buf = readFileSync(join(racine, p.fichier));
    expect(createHash("sha256").update(buf).digest("hex")).toBe(p.sha256);
  }
});

test("E162 existe, classée intervention humaine, avec le rapport complet", async () => {
  const t = (await db.select().from(tache).where(eq(tache.id, "tas-tache-E162")))[0];
  expect(t).toBeDefined();
  expect(t.statut).toBe("intervention_humaine");
  expect(t.description).toContain("ENQUETE-162.md");
  expect(t.description).toContain("même fonds");
});

test("décès B1 d'Élie et Emmanuel, avec mention acte non consulté", async () => {
  const elie = (await db.select().from(individu).where(eq(individu.id, "tas-elie")))[0];
  const emmanuel = (await db.select().from(individu).where(eq(individu.id, "tas-emmanuel")))[0];
  expect(elie.deces).toBe("1997-02-28");
  expect(emmanuel.deces).toBe("2000"); // aucune journée inventée
  for (const i of [elie, emmanuel]) {
    expect(i.notes).toContain("Grade B1");
    expect(i.notes).toContain("acte de décès non consulté");
    expect(i.raccorde).toBe(false);
  }
});

test("pistes Denain : C3 non raccordées, aucun lien de parenté", async () => {
  const pistes = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-piste-"));
  expect(pistes.length).toBe(2);
  expect(pistes.every((i) => i.grade === "C3" && i.raccorde === false)).toBe(true);
  // Aucun lien de filiation vers ces pistes.
  const { filiation } = await import("../src/db/schema");
  const liens = await db.select().from(filiation);
  expect(liens.some((l) => pistes.some((p) => p.id === l.enfantId || p.id === l.parentId))).toBe(false);
  // Aucun doute absurde créé (1932 ne peut pas être Firmin 1866).
  const doutes = await db.select().from(doute);
  expect(doutes.some((d) => pistes.some((p) => p.id === d.individu1Id || p.id === d.individu2Id))).toBe(false);
});

test("H0 : aucun C3 promu par les captures", async () => {
  const c3 = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-pz-"));
  expect(c3.length).toBe(653);
  expect(c3.every((i) => i.raccorde === false)).toBe(true);
});
