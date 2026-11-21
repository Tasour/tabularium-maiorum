/*
 * Supprime les relevés entièrement vides (aucun nom, prénoms, rôle, notes ni
 * annotation) créés accidentellement par l'UI. Ne touche jamais à un relevé
 * portant la moindre donnée. Idempotent.
 */
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { annotation, releve } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const tous = await db.select().from(releve);
const annotees = new Set((await db.select().from(annotation)).map((a) => a.releveId).filter(Boolean));
let supprimes = 0;

for (const r of tous) {
  const vide =
    !r.nomEcrit && !r.prenomsEcrits && !r.nom && !r.prenoms && !r.role &&
    !r.naissance && !r.deces && !r.profession && !r.notes && !annotees.has(r.id);
  if (!vide) continue;
  await db.delete(releve).where(eq(releve.id, r.id));
  console.log(`Supprimé : relevé vide ${r.id} (acte ${r.acteId})`);
  supprimes++;
}
console.log(`${supprimes} relevé(s) vide(s) supprimé(s) sur ${tous.length}.`);
