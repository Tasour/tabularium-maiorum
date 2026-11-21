/* E167 : un doute a_verifier sur le conflit Jean-Baptiste → Pierre Joseph / Théodule. */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { and, eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { doute, tache } from "../src/db/schema";
import { detecterFratriesSuspectes } from "../src/lib/coherence-pz";

const RACINE = new URL("..", import.meta.url).pathname;
ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const P = JSON.parse(readFileSync(new URL("donnees/arbre-export.json", import.meta.url), "utf8")).pz.persons;
const NOTE = "ENQUETE-167 : PZ 181 Pierre Joseph (1835-1892) et PZ 228 Théodule (1840-1886) sont TOUS DEUX déclarés fils de PZ 117 Jean-Baptiste (1791-1849). Notre chaîne Sosa retient Pierre Joseph, mais aucun acte ne tranche et E86 montre la circularité de la source (la chaîne vient du même arbre). Doute a_verifier : ne pas résoudre par déduction (H0 conservée).";
let cree = 0;

const [deja] = await db.select().from(doute)
  .where(and(eq(doute.individu1Id, "tas-pz-181"), eq(doute.individu2Id, "tas-pz-228")));
if (!deja) {
  await db.insert(doute).values({
    id: "tas-doute-sosa64-181-228", individu1Id: "tas-pz-181", individu2Id: "tas-pz-228",
    statut: "a_verifier", note: NOTE,
  });
  cree++;
}

// Rapport de cohérence (lecture seule) : fratries suspectes, aucune correction.
const suspectes = detecterFratriesSuspectes(P);
const lignes = [
  "# Contrôle de cohérence du graphe PZ (21/11/2026)", "",
  `${suspectes.length} géniteur(s) à fratrie suspecte sur ${P.length} ancêtres.`,
  "Aucun lien n'est modifié : grade C3, H0 conservée.", "",
  "| Géniteur PZ | Nom | Enfants déclarés | Raison |", "|---|---|---|---|",
  ...suspectes.map((s) => `| ${s.generateur} | ${s.nomGenerateur} | ${s.enfants.length} | ${s.raison.slice(0, 180)} |`), "",
  "Le champ `p` semble parfois mélanger filiation et alliance : ne jamais l'utiliser comme preuve structurante.", "",
];
writeFileSync(join(RACINE, "docs", "coherence-graphe-pz.md"), lignes.join("\n"), "utf8");

const [tDeja] = await db.select().from(tache).where(eq(tache.id, "tas-tache-E167"));
if (!tDeja) {
  const rapport = readFileSync(new URL("donnees/rapports/ENQUETE-167.md", import.meta.url), "utf8");
  await db.insert(tache).values({
    id: "tas-tache-E167", titre: "E167 — Divergences internes du graphe PZ (deux fils de Jean-Baptiste)",
    type: "autre", statut: "en_cours", description: `Rapport source : ENQUETE-167.md\nGrade global : C3\n\n${rapport}`,
  });
  cree++;
}
console.log(`${cree} élément(s) créé(s), ${suspectes.length} fratrie(s) signalée(s). Aucun lien modifié, H0 conservée.`);
