/*
 * Enregistre les groupes familiaux lisibles dans la capture MyHeritage (E163)
 * comme pistes C3 non raccordées. Les champs masqués (jour, mois, lieu, profession)
 * ne sont jamais devinés : seule l'année lisible est conservée.
 * Idempotent.
 */
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { individu, tache } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const PISTES = [
  {
    id: "tas-piste-paula_madeleine_tassier", prenoms: "Paula Madeleine", nom: "Tassier",
    naissance: null, notes: "Fille déclarée de « Léon Félicien Tassier 1896-1980 » × Hélène née Lamarque (ENQUETE-163, bande 01, MyHeritage C3). Capture locale conservée. Non raccordée : aucun acte consulté, H0 conservée.",
  },
  {
    id: "tas-piste-pauletta_marie_canivez", prenoms: "Pauletta Marie", nom: "Canivez", maiden: "Tassier",
    naissance: null, notes: "Fille déclarée (née Tassier) de « Léon Félicien Tassier 1896-1980 » (ENQUETE-163, bande 01, MyHeritage C3). Non raccordée sans acte, H0 conservée.",
  },
  {
    id: "tas-piste-emilienne_aline_scory", prenoms: "Emilienne Aline", nom: "Scory", maiden: "Tassier",
    naissance: "~1867", notes: "Sœur déclarée de « Léon Firmin Tassier ~1867 » (ENQUETE-163, bande 05, MyHeritage C3). Prénom inversé et année approximative : ne pas identifier à notre Firmin Léon (A1). H0 conservée.",
  },
  {
    id: "tas-piste-leona_tassier_1901", prenoms: "Léona", nom: "Tassier",
    naissance: "~1901", notes: "Sœur déclarée de « Léon Tassier 1901-1974 » × Anna Vray (ENQUETE-163, bande 04, MyHeritage C3). Homonyme non raccordé, H0 conservée.",
  },
  {
    id: "tas-piste-euphemie_josephine_langeliez", prenoms: "Euphémie Joséphine", nom: "Langeliez", maiden: "Tassier",
    naissance: "~1870", notes: "Conjointe déclarée de « Léon Ghislain Tassier 1874-1931 » (ENQUETE-163, bande 01, MyHeritage C3). Homonyme non raccordée, H0 conservée.",
  },
];

let crees = 0;
for (const p of PISTES) {
  const [deja] = await db.select().from(individu).where(eq(individu.id, p.id));
  if (deja) continue;
  await db.insert(individu).values({
    id: p.id, nom: p.nom, prenoms: p.prenoms, sexe: "F",
    naissance: p.naissance,
    naissanceMin: p.naissance?.startsWith("~") ? `${p.naissance.slice(1).trim()}-01-01` : null,
    naissanceMax: p.naissance?.startsWith("~") ? `${p.naissance.slice(1).trim()}-12-31` : null,
    grade: "C3", raccorde: false, notes: p.notes,
  });
  crees++;
}

// Tâche E163 pour classification et traçabilité.
const [tacheDeja] = await db.select().from(tache).where(eq(tache.id, "tas-tache-E163"));
if (!tacheDeja) {
  const rapport = (await import("node:fs")).readFileSync(new URL("donnees/rapports/ENQUETE-163.md", import.meta.url), "utf8");
  await db.insert(tache).values({
    id: "tas-tache-E163", titre: "E163 — Relecture intégrale de la capture MyHeritage (28 800 px)",
    type: "autre", statut: "en_cours", description: `Rapport source : ENQUETE-163.md\nGrade global : C3\n\n${rapport}`,
  });
  crees++;
}
console.log(`${crees} élément(s) créé(s) (pistes C3 + tâche E163). Aucun raccordement, H0 conservée.`);
