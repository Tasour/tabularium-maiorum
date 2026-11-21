/* E169 : mémoire de l'alerte 1925 et contrôle des écritures structurantes. */
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

import { ouvrirBase } from "../serveur/base";
import { db } from "../src/db/client";
import { filiation, individu, tache, verdict } from "../src/db/schema";

const racine = join(import.meta.dir, "..");
const DOSSIER = mkdtempSync(join(tmpdir(), "tassier-e169-"));
const env = { ...process.env, DOSSIER_DONNEES: DOSSIER };
for (const script of ["import-tassier.ts", "enrichir-tassier.ts", "ajouter-antoine-meunier.ts", "enregistrer-enquete-165.ts", "enregistrer-enquete-169.ts"]) {
  const r = Bun.spawnSync({ cmd: [process.execPath, join(racine, "scripts", script)], env, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${script} : ${r.stderr.toString()}`);
}
ouvrirBase(join(DOSSIER, "donnees.db"), join(racine, "drizzle"));

test("annotation 1925 archivée avec SHA-256 et résolution utilisateur", () => {
  const buf = readFileSync(join(racine, "data/annotations/acte-1925.json"));
  expect(createHash("sha256").update(buf).digest("hex")).toBe("4097ed37cb557fc4022fb614f79504061a85e4d704541a58061fa0ba913432ab");
  const d = JSON.parse(buf.toString("utf8"));
  expect(d["resolution_lecture_2026-11-19"].statut).toContain("UTILISATEUR");
  expect(d["resolution_lecture_2026-11-19"].lecon).toBeDefined();
});

test("noms restaurés : Tassier / Lamarque, pas Gabourier", async () => {
  const ps = await db.select().from(individu);
  const jf = ps.find((p) => p.id === "tas-jean_felicien")!;
  const hl = ps.find((p) => p.id === "tas-helene_lamarque")!;
  expect(jf.nom).toBe("Tassier");
  expect(hl.nom).toBe("Lamarque");
  expect(ps.some((p) => (p.nom ?? "").toLowerCase().includes("gabour"))).toBe(false);
});

test("9 liens hypothétiques non promus, 18 verdicts datés", async () => {
  const hyps = (await db.select().from(filiation)).filter((f) => f.type === "hypothetique");
  expect(hyps.length).toBe(9);
  expect(hyps.every((f) => f.acteId === null)).toBe(true);
  const vs = await db.select().from(verdict);
  expect(vs.length).toBe(18);
  expect(vs.every((v) => /^\d{4}-\d{2}-\d{2}$/.test(v.date) && v.temoin)).toBe(true);
});

test("rapport E169 : chronologie et règle mécanique", () => {
  const t = readFileSync(join(racine, "scripts/donnees/rapports/ENQUETE-169.md"), "utf8");
  expect(t).toContain("Gabourier");
  expect(t).toContain("0c32d18");
  expect(t).toContain("grossissement");
  expect(t).toContain("A1-témoin");
  expect(t).toContain("H0 conservée");
});

test("E169 enregistrée", async () => {
  const t = (await db.select().from(tache)).find((x) => x.id === "tas-tache-E169");
  expect(t).toBeDefined();
  expect(t?.statut).toBe("en_cours");
});
