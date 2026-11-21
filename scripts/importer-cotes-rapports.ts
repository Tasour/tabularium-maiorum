/*
 * Cotes d'actes nommatives relevées dans les rapports d'enquête (inventaire A1).
 * Importées comme SOURCES (registres), jamais comme actes prouvés : l'acte n'a
 * pas été consulté. Aucune cote de plage administrative n'est importée.
 * Idempotent.
 */
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { individu, source } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const COTES = [
  {
    cote: "3 E 10054",
    titre: "Registre des naissances de Maubeuge 1927 — acte d'Élisée Tassier",
    rapport: "ENQUETE-154.md",
    personne: "tas-elisee",
    notes: "Cote relevée dans l'inventaire officiel (ligne « MAUBEUGE 3 E 10054 N 1927 / 1927 > 2028 », grade A1). Acte non consulté : mise en ligne prévue après 2028. La cote ne prouve pas le contenu de l'acte.",
  },
  {
    cote: "3E 4265",
    titre: "Registre des naissances de Chambéry 1936 — acte de Jean Alceste Alfred Reymond",
    rapport: "ENQUETE-24.md, ENQUETE-91.md",
    personne: "tas-jean",
    notes: "Cote confirmée par l'instrument de recherche des Archives de la Savoie (grade A1), acte non numérisé et non consulté. Enquête 91 : non trouvé, H0 conservée. La cote ne prouve pas les noms des parents.",
  },
];

let crees = 0, notesAjoutees = 0;
for (const c of COTES) {
  const id = `tas-src-cote-${c.cote.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  await db.insert(source).values({
    id, titre: c.titre, cote: c.cote, serviceArchives: c.cote === "3E 4265" ? "Archives départementales de la Savoie" : "Archives départementales du Nord",
    notes: `${c.notes} Rapport : ${c.rapport}.`,
  }).onConflictDoNothing();
  crees++;

  const [i] = await db.select().from(individu).where(eq(individu.id, c.personne));
  if (!i) continue;
  const ligne = `Registre cité : ${c.cote} — ${c.rapport} (cote relevée, acte non consulté).`;
  if ((i.notes ?? "").includes(ligne)) continue;
  await db.update(individu).set({ notes: [i.notes, ligne].filter(Boolean).join("\n") }).where(eq(individu.id, i.id));
  notesAjoutees++;
}
console.log(`${crees} source(s) de cote traitée(s), ${notesAjoutees} fiche(s) annotée(s). Aucun acte promu.`);
