/* E165 : pistes C3 de la capture MyHeritage -2 + source d'inventaire presse. */
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { individu, source, tache } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const PISTES = [
  { id: "tas-piste-eugene_arthur_tassier", prenoms: "Eugène Arthur", nom: "Tassier", naissance: "~1867", notes: "Frère déclaré de « Léon Firmin Tassier ~1867 » (ENQUETE-165, bande 04, MyHeritage C3 / Geni). Prénoms inversés et année approximative : ne pas identifier à la fratrie de notre Firmin (A1). H0 conservée." },
  { id: "tas-piste-ukient_dassonville", prenoms: "Ukient", nom: "Dassonville", naissance: null, notes: "Conjoint déclaré de « Léon Tassier » décédé 1945 puis 1946 (ENQUETE-165, bande 02, MyHeritage C3). Graphie suspecte, deux versions dans la capture. Homonyme non identifié, H0 conservée." },
  { id: "tas-piste-renee_diot", prenoms: "Renée", nom: "Diot", naissance: "~1903", notes: "Conjointe déclarée de « Léon Alfred Tassier ~1903 » (ENQUETE-165, bande 02, tables successorales 1890-1970, MyHeritage C3). Homonyme non identifiée, H0 conservée." },
];
let cree = 0;
for (const p of PISTES) {
  const [deja] = await db.select().from(individu).where(eq(individu.id, p.id));
  if (deja) continue;
  await db.insert(individu).values({
    id: p.id, nom: p.nom, prenoms: p.prenoms, sexe: p.id.includes("dassonville") ? "M" : "F",
    naissance: p.naissance,
    naissanceMin: p.naissance?.startsWith("~") ? `${p.naissance.slice(1).trim()}-01-01` : null,
    naissanceMax: p.naissance?.startsWith("~") ? `${p.naissance.slice(1).trim()}-12-31` : null,
    grade: "C3", raccorde: false, notes: p.notes,
  });
  cree++;
}

// Source d'inventaire presse : publication d'index, PAS l'article lu.
const SID = "tas-src-journal-fourmies-1889-02-14";
const [srcDeja] = await db.select().from(source).where(eq(source.id, SID));
if (!srcDeja) {
  await db.insert(source).values({
    id: SID, titre: "Journal de Fourmies — mention de mariage Tassier × Meunier (14/02/1889)",
    cote: "", serviceArchives: null,
    notes: "Date de PUBLICATION 14/02/1889 relevée dans une capture MyHeritage (ENQUETE-165, grade C3), à ne pas confondre avec la date de célébration 11/02/1889 de l'acte A1 1 Mi EC 012 R 003. Article non consulté, aucune cote. Ne prouve pas l'union.",
  });
  cree++;
}

const [tDeja] = await db.select().from(tache).where(eq(tache.id, "tas-tache-E165"));
if (!tDeja) {
  const rapport = readFileSync(new URL("donnees/rapports/ENQUETE-165.md", import.meta.url), "utf8");
  await db.insert(tache).values({
    id: "tas-tache-E165", titre: "E165 — Relecture MyHeritage -2 (14 944 px) : mention presse Fourmies",
    type: "autre", statut: "en_cours", description: `Rapport source : ENQUETE-165.md\nGrade global : C3\n\n${rapport}`,
  });
  cree++;
}
console.log(`${cree} élément(s) créé(s) (pistes C3 + source presse + tâche E165). Aucun raccordement, H0 conservée.`);
