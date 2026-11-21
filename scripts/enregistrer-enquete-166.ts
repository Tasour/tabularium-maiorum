/* E166 : date complète d'Emmanuel + repères de numéros d'actes (B1, jamais A1). */
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { individu, tache } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const REPERES = [
  { id: "tas-elie", texte: "Repère B1 (ENQUETE-166) : décès 28/02/1997 Maubeuge, acte n°00153. Numéro d'acte, pas une cote ; acte non consulté." },
  { id: "tas-arlette_helene", texte: "Repère B1 (ENQUETE-166) : décès 24/01/2022 Cousolre, acte n°5. Numéro d'acte, pas une cote ; acte non consulté." },
  { id: "tas-felicien_leon", texte: "Repère B1 (ENQUETE-166) : décès 21/04/1980 Maubeuge, acte n°233. Numéro d'acte, pas une cote ; acte non consulté." },
  { id: "tas-elisee", texte: "Repère B1 (ENQUETE-166) : décès 12/05/2020 Gières, acte n°19 (déjà connu). Numéro d'acte, pas une cote." },
  { id: "tas-piste-alain_leonard_denain", texte: "Repère B1 (ENQUETE-166) : décès 20/03/2001 Denain, acte n°112. Numéro d'acte, pas une cote. Homonyme non raccordé, H0 conservée." },
  { id: "tas-piste-josephine_alina_denain", texte: "Repère B1 (ENQUETE-166) : décès 15/05/1980 Denain, acte n°188. Numéro d'acte, pas une cote. Homonyme non raccordée, H0 conservée." },
];
let cree = 0;

// Emmanuel : jour lu dans la capture (04/02/2000), remplace l'année seule.
const [emm] = await db.select().from(individu).where(eq(individu.id, "tas-emmanuel"));
if (emm && emm.deces === "2000") {
  await db.update(individu).set({
    deces: "2000-02-04", decesMin: "2000-02-04", decesMax: "2000-02-04",
    notes: [emm.notes, "Date de décès précisée au 04/02/2000 d'après ENQUETE-166 (B1, capture Acte-Décès.fr, acte n°102). Acte non consulté, numéro d'acte non cote."].filter(Boolean).join("\n"),
  }).where(eq(individu.id, emm.id));
  console.log("Emmanuel : 2000 → 2000-02-04 (B1, acte n°102)");
  cree++;
}

for (const r of REPERES) {
  const [i] = await db.select().from(individu).where(eq(individu.id, r.id));
  if (!i || (i.notes ?? "").includes(r.texte)) continue;
  await db.update(individu).set({ notes: [i.notes, r.texte].filter(Boolean).join("\n") }).where(eq(individu.id, i.id));
  cree++;
}

const [tDeja] = await db.select().from(tache).where(eq(tache.id, "tas-tache-E166"));
if (!tDeja) {
  const rapport = readFileSync(new URL("donnees/rapports/ENQUETE-166.md", import.meta.url), "utf8");
  await db.insert(tache).values({
    id: "tas-tache-E166", titre: "E166 — Repères d'actes du Nord (capture Acte-Décès.fr, 17 643 px)",
    type: "deces", statut: "en_cours", description: `Rapport source : ENQUETE-166.md\nGrade global : B1\n\n${rapport}`,
  });
  cree++;
}
console.log(`${cree} élément(s) traité(s). Aucune promotion A1, H0 conservée.`);
