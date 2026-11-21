/*
 * Complétion conservative des fiches à partir des rapports d'enquête.
 * Règle : ne remplir qu'un champ VIDE, uniquement si une source explicite
 * (rapport + grade) est citée. Aucune valeur déduite, aucune promotion H0.
 */
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { individu, lieu } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

type Completion = {
  id: string;
  champ: "deces" | "naissance";
  valeur: string;
  lieu?: { id: string; nom: string; departement: string };
  source: string;
};

// Chaque ligne est issue d'une lecture de rapport, pas d'une inférence.
const COMPLETIONS: Completion[] = [
  {
    id: "tas-arlette_helene",
    champ: "deces",
    valeur: "2022-01-24",
    lieu: { id: "tas-lieu-cousolre-59", nom: "Cousolre (59)", departement: "59" },
    source: "ENQUETE-109.md — avis Libra Memoria recoupé avec l'acte A1 de 1925 ; grade B1 pour le décès. La même enquête écarte l'attribution de ce décès à Arlette Roussette (H0 conservée).",
  },
];

let modifies = 0;
for (const c of COMPLETIONS) {
  const [f] = await db.select().from(individu).where(eq(individu.id, c.id));
  if (!f) { console.log(`KO  ${c.id} : fiche absente`); continue; }
  const cle = c.champ === "deces" ? "deces" : "naissance";
  if ((f as any)[cle]) { console.log(`--  ${c.id}.${cle} déjà renseigné, inchangé`); continue; }

  let lieuId: string | null = null;
  if (c.lieu) {
    await db.insert(lieu).values({ id: c.lieu.id, nom: c.lieu.nom, departement: c.lieu.departement }).onConflictDoNothing();
    lieuId = c.lieu.id;
  }
  const patch: Record<string, unknown> = {
    [cle]: c.valeur,
    [`${cle}Min`]: c.valeur,
    [`${cle}Max`]: c.valeur,
    [`${cle}LieuId`]: lieuId,
    notes: [f.notes, `Complétion ${c.source}`].filter(Boolean).join("\n\n"),
  };
  await db.update(individu).set(patch).where(eq(individu.id, c.id));
  console.log(`OK  ${c.id}.${cle} = ${c.valeur}${c.lieu ? ` (${c.lieu.nom})` : ""}`);
  modifies++;
}
console.log(`\n${modifies} fiche(s) complétée(s). Aucune valeur déduite, aucun lien modifié.`);
