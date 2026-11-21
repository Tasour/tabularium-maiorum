/*
 * Corrige les dates des 653 ancêtres PZ déjà importés avec l'ancien parseur.
 * Le champ Geneanet `d` est une plage naissance–décès, pas une naissance floue.
 * Idempotent : compare avant d'écrire, conserve la chaîne brute dans les notes.
 */
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { individu } from "../src/db/schema";
import { parserDatesPZ } from "./lib/date-pz";

const exportData = JSON.parse(readFileSync(new URL("./donnees/arbre-export.json", import.meta.url), "utf8"));
ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

let corriges = 0;
for (const [i, p] of exportData.pz.persons.entries()) {
  const id = `tas-pz-${i}`;
  const dates = parserDatesPZ(p.d);
  const [ligne] = await db.select().from(individu).where(eq(individu.id, id));
  if (!ligne) continue;
  if (ligne.naissanceMin === dates.naissanceMin && ligne.naissanceMax === dates.naissanceMax &&
      ligne.decesMin === dates.decesMin && ligne.decesMax === dates.decesMax) continue;
  const notes = [ligne.notes, p.d ? `Dates brutes Geneanet (telles qu'écrites) : ${p.d}` : ""]
    .filter(Boolean).join("\n");
  await db.update(individu).set({
    naissance: dates.naissance, naissanceMin: dates.naissanceMin, naissanceMax: dates.naissanceMax,
    deces: dates.deces, decesMin: dates.decesMin, decesMax: dates.decesMax,
    notes,
  }).where(eq(individu.id, id));
  corriges++;
}
console.log(`${corriges} fiche(s) PZ corrigée(s) sur ${exportData.pz.persons.length}.`);
