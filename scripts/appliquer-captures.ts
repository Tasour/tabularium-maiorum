/*
 * Applique les constats de ENQUETE-162 (21/11/2026) :
 *  - décès B1 d'Élie et Emmanuel (champs vides), avec mention explicite ;
 *  - 2 individus C3 non raccordés (Tassier de Denain), sans lien ni doute inventé ;
 *  - la tâche E162 pour classification ; aucune promotion A1, aucun lien déduit d'un décès.
 * Idempotent.
 */
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { individu, tache } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const NOTE = "Grade B1 (GénéaFrance + morts.fr, fichier INSEE) — acte de décès non consulté. La naissance et la commune concordent avec l'A1, sans établir la filiation.";
let modif = 0;

for (const [id, date] of [["tas-elie", "1997-02-28"], ["tas-emmanuel", "2000-01-01"]] as const) {
  const [i] = await db.select().from(individu).where(eq(individu.id, id));
  if (!i || i.deces) continue;
  // Emmanuel : seule l'année 2000 est lue dans la capture, jamais de jour inventé.
  const valeur = id === "tas-elie" ? "1997-02-28" : "2000";
  const patch: Record<string, unknown> = id === "tas-elie"
    ? { deces: valeur, decesMin: date, decesMax: date }
    : { deces: valeur, decesMin: "2000-01-01", decesMax: "2000-12-31" };
  await db.update(individu).set({ ...patch, notes: [i.notes, NOTE].filter(Boolean).join("\n") }).where(eq(individu.id, id));
  console.log(`OK ${id} : décès ${valeur} (B1, acte non consulté)`);
  modif++;
}

const PISTES = [
  { id: "tas-piste-alain_leonard_denain", prenoms: "Alain Léonard", naissance: "1932", deces: "2001", lieu: "Denain (59)" },
  { id: "tas-piste-josephine_alina_denain", prenoms: "Joséphine Alina Marie", naissance: "1906", deces: "1980", lieu: "Denain (59)" },
];
for (const p of PISTES) {
  const [deja] = await db.select({ id: individu.id }).from(individu).where(eq(individu.id, p.id));
  if (deja) continue;
  await db.insert(individu).values({
    id: p.id, nom: "Tassier", prenoms: p.prenoms, sexe: p.prenoms.startsWith("Joséphine") ? "F" : "M",
    naissance: p.naissance, naissanceMin: `${p.naissance}-01-01`, naissanceMax: `${p.naissance}-12-31`,
    deces: p.deces, decesMin: `${p.deces}-01-01`, decesMax: `${p.deces}-12-31`,
    grade: "C3", raccorde: false,
    notes: `Piste issue de ENQUETE-162.md (GénéaFrance/morts.fr, grade B1 pour le décès). ${p.prenoms} Tassier, né(e) ${p.naissance}, décédé(e) ${p.deces} à ${p.lieu}. Aucun lien de parenté avec notre lignée n'est établi (H0).`,
  }).onConflictDoNothing();
  modif++;
}
// Aucun doute n'est créé : les pistes Denain (1932-2001 / 1906-1980) ne peuvent
// pas être Firmin (1866-1948) ni Pierre Joseph (1835-1892) — les dates s'y opposent.
// Les enregistrer en « peut-être la même personne »serait une absurdité et
// polluerait la table doute. Elles restent des C3 non raccordés, simplement décrits
// dans ENQUETE-162.md avec mention « homonymie conservée H0 ».
const rapport = "donnees/rapports/ENQUETE-162.md";
const [tacheDeja] = await db.select({ id: tache.id }).from(tache).where(eq(tache.id, "tas-tache-E162"));
if (!tacheDeja) {
  await db.insert(tache).values({
    id: "tas-tache-E162", titre: "E162 — Décès INSEE croisés (GénéaFrance, morts.fr, Acte-Décès.fr)",
    type: "deces", statut: "en_cours",
    description: `Rapport source : ENQUETE-162.md\nGrade global : B1\n\n${(await import("node:fs")).readFileSync(new URL(rapport, import.meta.url), "utf8")}`,
  });
  modif++;
}

console.log(`${modif} opération(s) appliquée(s). Aucune promotion A1, aucun lien de parenté créé, aucun doute absurde ajouté.`);
