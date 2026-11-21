/*
 * Corrige les liens « acte de naissance » erronés : un acte ne peut être lié
 * qu'à la personne qu'il nomme explicitement.
 *
 * L'acte de 1925 (3 E 10052, vue 94) nomme Arlette Hélène Tassier, née le
 * 04/09/1925, et SA TRANSCRIPTION DIT EXPLICITEMENT qu'il ne nomme pas Élisée.
 * Le rattacher à Élisée (1927) ou à Arlette Roussette (sans date) est faux.
 * Aucune donnée n'est inventée : on retire un lien, on n'en ajoute pas.
 * Idempotent.
 */
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { individu } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const ACTE_1925 = "tas-acte-maubeuge-1925-naissance-arlette-helene";
const RETIRER = [
  { id: "tas-elisee", motif: "Acte de 1925 : la transcription dit explicitement qu'il ne nomme pas Élisée (né en 1927)." },
  { id: "tas-arlette", motif: "Acte de 1925 : Arlette Roussette n'a ni date ni identité confirmée comme Arlette Hélène Tassier (H0)." },
];

let corriges = 0;
for (const c of RETIRER) {
  const [i] = await db.select().from(individu).where(eq(individu.id, c.id));
  if (!i || i.acteNaissanceId !== ACTE_1925) continue;
  await db.update(individu).set({
    acteNaissanceId: null,
    notes: [i.notes, `Correction 21/11/2026 : lien « acte de naissance » retiré — ${c.motif}`].filter(Boolean).join("\n"),
  }).where(eq(individu.id, i.id));
  console.log(`Corrigé ${i.id} : ${c.motif}`);
  corriges++;
}
console.log(`${corriges} lien(s) erroné(s) retiré(s) sur ${RETIRER.length}.`);
