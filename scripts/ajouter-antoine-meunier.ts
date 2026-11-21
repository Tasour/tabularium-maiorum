/*
 * Antoine Joseph Meunier, « père de l'épouse » nommé dans l'acte de mariage
 * d'Anor du 11/02/1889 (1 Mi EC 012 R 003, image 301).
 *
 * Décision : fiche C3 non raccordée au noyau établi, filiation de type
 * « hypothetique » sans acte promu. Aucune fusion, aucun grade A1 attribué
 * sans verdict explicite du détenteur. Pas de doute d'identité : il n'existe
 * pas de second candidat « Antoine Meunier » dans les données.
 */
import { and, eq, isNull } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { filiation, individu, releve } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const ID = "tas-antoine_meunier";
const ALINE = "tas-aline_meunier";

await db.insert(individu).values({
  id: ID, nom: "Meunier", prenoms: "Antoine Joseph", sexe: "M",
  profession: "journalier", grade: "C3", raccorde: false,
  notes: [
    "Piste issue de l'acte de mariage d'Anor du 11/02/1889 (acte n° 3, cote 1 Mi EC 012 R 003, image 301) : « Antoine Joseph Meunier », 54 ans, journalier, domicilié à Anor, présent et consentant, y est nommé père de l'épouse Aline Angèle Meunier.",
    "Fiche créée comme piste (grade C3, non raccordée) : la filiation n'est pas promue automatiquement au noyau A1. Aucun doute d'identité : aucun second « Antoine Meunier » n'est recensé dans les données.",
    "Source : preuve anor-1889-mariage-301, SHA-256 vérifié, consultation 18/11/2026.",
  ].join("\n\n"),
}).onConflictDoNothing();

const existe = await db.select({ id: filiation.id }).from(filiation)
  .where(and(eq(filiation.enfantId, ALINE), eq(filiation.parentId, ID)));
if (!existe.length) {
  await db.insert(filiation).values({
    id: `tas-hyp-aline_meunier-antoine_meunier`, enfantId: ALINE, parentId: ID,
    type: "hypothetique", acteId: null,
    notes: "Père de l'épouse nommé dans l'acte de mariage 1889 (A1) — H0 conservée : non promu sans verdict A1-témoin explicite.",
  });
  console.log("Filiation hypothétique créée : Aline Meunier ← Antoine Joseph Meunier (non promue).");
} else {
  console.log("Filiation déjà présente, inchangée.");
}
// Rattache le relevé « père de l'épouse » de l'acte de 1889 à cette fiche,
// pour que la création soit cohérente même sur une base régénérée de zéro.
const orphelins = await db.select().from(releve).where(isNull(releve.individuId));
for (const r of orphelins) {
  if ((r.nomEcrit ?? "").toLowerCase().includes("antoine joseph meunier")) {
    await db.update(releve).set({ individuId: ID }).where(eq(releve.id, r.id));
    console.log(`Relevé ${r.id} rattaché à ${ID}.`);
  }
}
console.log(`Fiche ${ID} : C3, raccorde=false, aucun doute d'identité créé.`);
