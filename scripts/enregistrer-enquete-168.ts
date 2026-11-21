/* E168 : cotes d'inventaire Trélon (A1, images non lues) + tâche de plan de lecture. */
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { source, tache } from "../src/db/schema";

const RACINE = new URL("..", import.meta.url).pathname;
ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const COTES = [
  { cote: "5 Mi 011 R 022", titre: "Trélon — BMS (lacunes) 1694-1792 (1 211 medias)", ark: "https://archivesdepartementales.lenord.fr/ark:/33518/2vrh76qlk459", annees: "1748, 1753, 1791" },
  { cote: "5 Mi 011 R 021", titre: "Trélon — BMS (lacunes) 1635-1726 (250 medias)", ark: "https://archivesdepartementales.lenord.fr/ark:/33518/frn1sc6qvl3b", annees: "1700-1726" },
  { cote: "5 Mi 011 R 023", titre: "Trélon — NMD 1793-1828 (1 110 medias)", ark: "https://archivesdepartementales.lenord.fr/ark:/33518/sfg3cdv8k916", annees: "1796 (pas 1791)" },
];
let cree = 0;

for (const c of COTES) {
  const [deja] = await db.select().from(source).where(eq(source.cote, c.cote));
  if (deja) continue;
  await db.insert(source).values({
    id: `tas-src-trelon-${c.cote.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    titre: c.titre, cote: c.cote, url: c.ark, serviceArchives: "Archives départementales du Nord",
    notes: `Notice d'inventaire A1 (ENQUETE-168 / E81) : disponibilité et couverture ${c.annees}. Aucune image lue, aucune ligne TASSIER relevée. Registre, pas acte ; ne prouve ni filiation ni identité.`,
  });
  cree++;
}

const [tDeja] = await db.select().from(tache).where(eq(tache.id, "tas-tache-E168"));
if (!tDeja) {
  const rapport = readFileSync(new URL("donnees/rapports/ENQUETE-168.md", import.meta.url), "utf8");
  await db.insert(tache).values({
    id: "tas-tache-E168", titre: "E168 — Plan de lecture Trélon 1700-1800 (cotes A1, images non lues)",
    type: "autre", statut: "en_cours", description: `Rapport source : ENQUETE-168.md\nGrade global : A1 (notices uniquement)\n\n${rapport}`,
  });
  cree++;
}
console.log(`${cree} élément(s) créé(s). 3 registres Trélon en inventaire, aucune image lue, H0 conservée.`);
