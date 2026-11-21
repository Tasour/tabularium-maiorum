/*
 * Contrôle de rigueur (leçon de l'alerte 1925) :
 * aucune écriture structurante sans acte A1 lu ou verdict A1-témoin daté.
 * Lecture seule : vérifie l'état actuel du fork et échoue si une règle est violée.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { filiation, individu, verdict } from "../src/db/schema";

const RACINE = new URL("..", import.meta.url).pathname;
ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);
const problemes: string[] = [];

// 1) Annotation 1925 intacte (preuve de la divergence tranchée par l'utilisateur).
const annotation = readFileSync(`${RACINE}/data/annotations/acte-1925.json`);
const sha = createHash("sha256").update(annotation).digest("hex");
if (sha !== "4097ed37cb557fc4022fb614f79504061a85e4d704541a58061fa0ba913432ab")
  problemes.push(`Annotation 1925 modifiée : SHA-256 ${sha}`);
const resolution = JSON.parse(annotation.toString("utf8"))["resolution_lecture_2026-11-19"];
if (!resolution?.statut?.includes("UTILISATEUR")) problemes.push("Résolution utilisateur absente de l'annotation 1925");

// 2) Noms restaurés après l'alerte.
for (const [id, prenoms, nom] of [["tas-jean_felicien", "Jean Félicien", "Tassier"], ["tas-helene_lamarque", "Hélène Marie Alphonsine", "Lamarque"]] as const) {
  const p = (await db.select().from(individu).where(eq(individu.id, id)))[0];
  if (!p || p.prenoms !== prenoms || p.nom !== nom) problemes.push(`Nom non restauré : ${id} = ${p?.prenoms} ${p?.nom}`);
}

// 3) Aucun lien hypothétique promu en biologique avec un acte inventé.
const hypothetiques = (await db.select().from(filiation)).filter((f) => f.type === "hypothetique");
for (const f of hypothetiques) {
  if (f.acteId) problemes.push(`Lien hypothétique ${f.id} promu avec acte ${f.acteId}`);
}

// 4) Verdicts : date + grade obligatoires.
const verdicts = await db.select().from(verdict);
for (const v of verdicts) {
  if (!v.date || !/^\d{4}-\d{2}-\d{2}$/.test(v.date)) problemes.push(`Verdict ${v.id} sans date valide`);
  if (!v.temoin) problemes.push(`Verdict ${v.id} sans grade`);
}

console.log(`Annotation 1925 : ${sha.slice(0, 12)} · ${resolution.statut}`);
console.log(`${hypothetiques.length} liens hypothétiques non promus · ${verdicts.length} verdicts datés`);
if (problemes.length) {
  for (const p of problemes) console.error(`KO ${p}`);
  process.exit(1);
}
console.log("OK — aucune écriture structurante non justifiée. H0 conservée.");
