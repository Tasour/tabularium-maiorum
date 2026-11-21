/*
 * Bloc final A+B+C (21/11/2026) :
 *  A) date d'union lue dans un acte A1 (1889 uniquement) ;
 *  B) rattachement des tâches dont la cible est explicite et sans ambiguïté ;
 *  C) liens de filiation HYPOTHÉTIQUES des trois enfants déclarés de Jean Reymond
 *     par avis de décès (B1) — jamais promus en A1.
 *
 * Règles : aucune date déduite, aucune filiation légale presumée, H0 conservée.
 * Idempotent.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { and, eq, isNull } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { couple, filiation, tache } from "../src/db/schema";

const RACINE = new URL("..", import.meta.url).pathname;
ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);
let modif = 0;

// A) Dates d'union établies par acte A1 lu.
const DATES_UNION = [
  {
    couple: "tas-couple-firmin-leon-aline-meunier",
    date: "1889-02-11",
    source: "Acte de mariage d'Anor, 11/02/1889, 1 Mi EC 012 R 003, image 301 (ENQUETE-37, A1 lu)",
  },
  // Le 06/01/1923 n'est PAS enregistré : mention marginale dont l'attribution
  // à Léon Félicien reste à vérifier (ENQUETE-157). Aucune déduction.
];
for (const u of DATES_UNION) {
  const [c] = await db.select().from(couple).where(eq(couple.id, u.couple));
  if (!c || c.dateMin) continue;
  await db.update(couple).set({
    dateMin: u.date, dateMax: u.date,
    notes: [c.notes, `Date lue : ${u.source}`].filter(Boolean).join("\n"),
  }).where(eq(couple.id, u.couple));
  console.log(`A) union datée : ${u.couple} → ${u.date}`);
  modif++;
}

// B) Tâches dont la cible est explicite (id du rapport → individu de la base).
const CIBLES: Record<string, string> = {
  E03: "tas-arlette", E05: "tas-helene_lamarque", E06: "tas-delphine_favre",
  E07: "tas-pere_josephine", E24: "tas-jean", E43: "tas-jean", E53: "tas-jean",
  E55: "tas-robert", E61: "tas-marie_favre", E65: "tas-jean", E68: "tas-elisee",
  E69: "tas-elisee", E74: "tas-philomene_decamps", E76: "tas-jean_baptiste_tassier",
  E77: "tas-lambert_joseph", E78: "tas-lambert_joseph", E84: "tas-lambert_joseph",
  E95: "tas-delphine_favre", E108: "tas-arlette_helene", E110: "tas-jean",
  E119: "tas-antoine_meunier", E151: "tas-firmin_leon", E155: "tas-elisee",
};
for (const [e, personne] of Object.entries(CIBLES)) {
  const id = `tas-tache-${e}`;
  const [t] = await db.select().from(tache).where(eq(tache.id, id));
  if (!t || t.individuId) continue;
  await db.update(tache).set({ individuId: personne }).where(eq(tache.id, id));
  modif++;
}
console.log(`B) ${Object.keys(CIBLES).length} cible(s) explicite(s) traitée(s)`);

// C) Enfants déclarés de Jean × Joséphine par avis de décès (B1), en hypothétique.
const ENFANTS = [
  { id: "tas-agnes", titre: "Agnès Tassier (1967)" },
  { id: "tas-cecile", titre: "Cécile Reymond (1969-2026)" },
  { id: "tas-laurent", titre: "Laurent Reymond (1965)" },
];
for (const enfant of ENFANTS) {
  for (const parent of ["tas-jean", "tas-josephine"]) {
    // Les liens existent déjà depuis l'import initial (type « biologique »).
    // La contrainte d'unicité porte sur la PAIRE, pas sur l'id : ne jamais dupliquer.
    const deja = await db.select().from(filiation)
      .where(and(eq(filiation.enfantId, enfant.id), eq(filiation.parentId, parent)));
    if (deja.length) {
      console.log(`C) lien déjà présent : ${enfant.id} ← ${parent} (${deja[0].type}) — inchangé, aucun verdict pour modifier le type`);
      continue;
    }
    const lid = `tas-hyp-${enfant.id.slice(4)}-${parent.slice(4)}`;
    await db.insert(filiation).values({
      id: lid, enfantId: enfant.id, parentId: parent, type: "hypothetique", acteId: null,
      notes: `Filiation déclarée dans les avis de décès (ENQUETE-110, grade B1) : ${enfant.titre}. H0 conservée — non promue sans acte de naissance lu.`,
    });
    modif++;
  }
}
console.log(`C) ${ENFANTS.length * 2} paire(s) vérifiée(s)`);

console.log(`${modif} opération(s) appliquée(s). Aucune promotion A1, aucune date déduite.`);
