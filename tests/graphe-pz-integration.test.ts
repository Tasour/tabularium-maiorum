/* Graphe Geneanet structuré : 586 liens C3, faux doublons corrigés, 0 promotion. */
import { expect, test } from "bun:test";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { doute, filiation, individu, pzLien } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-graphe-pz-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "importer-graphe-pz.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("586 liens C3 : 416 parent, 170 conjoint", async () => {
  const liens = await db.select().from(pzLien);
  expect(liens.length).toBe(586);
  expect(liens.filter((l) => l.type === "parent").length).toBe(416);
  expect(liens.filter((l) => l.type === "conjoint").length).toBe(170);
  expect(liens.every((l) => l.sourceId.startsWith("tas-pz-") && l.cibleId.startsWith("tas-pz-"))).toBe(true);
});

test("15 faux doublons corrigés par des géniteurs différents", async () => {
  const ds = (await db.select().from(doute)).filter((d) => d.id.startsWith("tas-doute-pz-"));
  expect(ds.length).toBe(15);
  expect(ds.every((d) => d.statut === "differentes" && (d.note ?? "").includes("géniteurs différents"))).toBe(true);
  // Le motif nomme l'enfant PUIS le géniteur (pas l'inverse).
  const anne = ds.find((d) => d.id === "tas-doute-pz-554-570");
  expect(anne?.note).toContain("PZ 554 (Anne TASSIER) a pour géniteur 551 (Jean dit Petit Jean TASSIER)");
});

test("chaîne PZ 192→181→117→93 corrobore les Sosa 16→32→64→128 sans promotion", async () => {
  const ids = ["tas-pz-192", "tas-pz-181", "tas-pz-117", "tas-pz-93"];
  for (const id of ids) {
    const i = (await db.select().from(individu)).find((x) => x.id === id);
    expect(i?.grade).toBe("C3");
    expect(i?.raccorde).toBe(false);
  }
  const liens = await db.select().from(pzLien);
  for (const [a, b] of [[192, 181], [181, 117], [117, 93]]) {
    expect(liens.some((l) => l.type === "parent" && l.sourceId === `tas-pz-${a}` && l.cibleId === `tas-pz-${b}`)).toBe(true);
  }
});

test("aucun lien PZ n'est promu dans le noyau A1", async () => {
  const fs = await db.select().from(filiation);
  expect(fs.filter((f) => f.enfantId.startsWith("tas-pz-") || f.parentId.startsWith("tas-pz-")).length).toBe(0);
  const c3 = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-pz-"));
  expect(c3.length).toBe(653);
  expect(c3.every((i) => i.raccorde === false)).toBe(true);
});
