/* Complétion des fiches depuis les relevés d'actes : faits sourcés, jamais inventés. */
import { expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { individu, lieu } from "../src/db/schema";

const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-individus-"));
const racine = join(import.meta.dir, "..");
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "enrichir-individus.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("sexe normalisé et complété depuis les actes", async () => {
  const sexes = (await db.select({ sexe: individu.sexe }).from(individu)).map((i) => i.sexe);
  expect(sexes).not.toContain("f");
  expect(sexes.filter((s) => s === "F").length).toBeGreaterThanOrEqual(10);
  expect(sexes.filter((s) => s === "M").length).toBeGreaterThanOrEqual(4);
  for (const [id, attendu] of [["tas-firmin_leon", "M"], ["tas-arlette_helene", "F"], ["tas-jean_felicien", "M"]] as const) {
    expect((await db.select().from(individu).where(eq(individu.id, id)))[0].sexe).toBe(attendu);
  }
});

test("dates exactes des actes sans écraser une date déjà précise", async () => {
  const firmin = (await db.select().from(individu).where(eq(individu.id, "tas-firmin_leon")))[0];
  expect(firmin.naissance).toBe("1866-09-25");
  expect(firmin.naissanceMin).toBe("1866-09-25");
  const aline = (await db.select().from(individu).where(eq(individu.id, "tas-aline_meunier")))[0];
  expect(aline.naissance).toBe("1869-02-19");
  const philomene = (await db.select().from(individu).where(eq(individu.id, "tas-philomene_decamps")))[0];
  expect(philomene.deces).toBe("1879-04-06");
});

test("lieux et professions issus des actes", async () => {
  const firmin = (await db.select().from(individu).where(eq(individu.id, "tas-firmin_leon")))[0];
  expect(firmin.naissanceLieuId).toBe("tas-lieu-anor-nord");
  expect(firmin.profession).toBe("verrier");
  const aline = (await db.select().from(individu).where(eq(individu.id, "tas-aline_meunier")))[0];
  expect(aline.profession).toBe("ménagère");
  expect(aline.naissanceLieuId).toContain("mons");
  const philomene = (await db.select().from(individu).where(eq(individu.id, "tas-philomene_decamps")))[0];
  expect(philomene.decesLieuId).toBe("tas-lieu-anor-nord");
});

test("anonymes et PZ sans date portent une mention explicite", async () => {
  const anonymes = (await db.select().from(individu)).filter((i) => i.nom === "?");
  expect(anonymes.length).toBe(32);
  expect(anonymes.every((i) => i.qualificatif === "À identifier")).toBe(true);
  const sansDate = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-pz-") && !i.naissance);
  expect(sansDate.length).toBe(111);
  expect(sansDate.every((i) => (i.notes ?? "").includes("Aucune date connue dans la source"))).toBe(true);
});

test("lieux sans coordonnées : une seule note, pas de coordonnée inventée", async () => {
  const sansCoords = (await db.select().from(lieu)).filter((l) => l.latitude == null && l.longitude == null);
  expect(sansCoords.length).toBeGreaterThan(0);
  expect(sansCoords.every((l) => (l.notes ?? "").includes("Coordonnées non vérifiées"))).toBe(true);
  expect(sansCoords.every((l) => (l.notes ?? "").split("Coordonnées non vérifiées").length === 2)).toBe(true);
});

test("H0 : aucun C3 promu", async () => {
  const c3 = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-pz-"));
  expect(c3.length).toBe(653);
  expect(c3.every((i) => i.raccorde === false)).toBe(true);
});
