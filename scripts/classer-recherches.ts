/*
 * Classe les recherches « en cours » explorées suffisamment :
 *   - intervention_humaine (par défaut, y compris cas ambigus)
 *   - abandonne (uniquement si le rapport dit explicitement qu'il n'y a plus d'action)
 * Statut trouve inchangé. Idempotent (marqueur de classification dans les notes).
 * Produit docs/classification-recherches.md (journal auditable).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { tache } from "../src/db/schema";
import { classerRapport } from "./lib/classer-recherche";

const RACINE = new URL("..", import.meta.url).pathname;
const RAPPORTS = join(RACINE, "scripts", "donnees", "rapports");
const DATE = "2026-11-21";
const MARQUEUR = `CLASSIFICATION ${DATE}`;

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const taches = await db.select().from(tache);
const comptes: Record<string, number> = { en_cours: 0, intervention_humaine: 0, abandonne: 0, trouve: 0, introuvable: 0 };
const journal: { id: string; titre: string; categorie: string; motif: string }[] = [];

for (const t of taches) {
  const n = Number(t.id.match(/E(\d+)/)?.[1] ?? 0);
  const fichier = join(RAPPORTS, `ENQUETE-${String(n).padStart(2, "0")}.md`);
  let texte: string;
  try { texte = readFileSync(fichier, "utf8"); }
  catch { comptes.introuvable++; continue; }

  if (t.statut === "trouve") { comptes.trouve++; continue; }
  const resultat = classerRapport(texte);
  comptes[resultat.categorie]++;

  if (t.statut === resultat.categorie && (t.description ?? "").includes(MARQUEUR)) continue;

  const motif = `${MARQUEUR} — ${resultat.categorie} : ${resultat.motif}`;
  const description = [t.description?.split(`\n${MARQUEUR}`)[0].trimEnd(), motif].filter(Boolean).join("\n\n");
  await db.update(tache).set({ statut: resultat.categorie, description }).where(eq(tache.id, t.id));
  journal.push({ id: t.id, titre: t.titre, categorie: resultat.categorie, motif: resultat.motif });
}

const lignes = [
  "# Classification des recherches",
  "",
  `**Date :** ${DATE} · **Règle :** exploré suffisamment (≥ 2 sources gradées + test discriminant) puis intervention humaine par défaut, abandonné seulement si le rapport dit qu'il n'y a plus d'action.`,
  "",
  "## Comptages",
  "",
  `- Intervention humaine : **${comptes.intervention_humaine}**`,
  `- Abandonné : **${comptes.abandonne}**`,
  `- En cours (garde non satisfaite) : **${comptes.en_cours}**`,
  `- Trouvé (inchangé) : **${comptes.trouve}**`,
  `- Rapport introuvable : **${comptes.introuvable}**`,
  "",
  "## Abandonnés (motif)",
  "",
  ...journal.filter((j) => j.categorie === "abandonne").map((j) => `- **${j.id}** ${j.titre} — ${j.motif}`),
  "",
  "## Restés en cours (garde non satisfaite)",
  "",
  ...journal.filter((j) => j.categorie === "en_cours").map((j) => `- **${j.id}** ${j.titre} — ${j.motif}`),
  "",
  "## Décisions « intervention humaine » (extrait)",
  "",
  ...journal.filter((j) => j.categorie === "intervention_humaine").slice(0, 25).map((j) => `- **${j.id}** ${j.titre} — ${j.motif}`),
  "",
  `_${journal.length} transition(s) appliquée(s) lors de cette exécution ; les autres étaient déjà classées._`,
  "",
];
mkdirSync(join(RACINE, "docs"), { recursive: true });
writeFileSync(join(RACINE, "docs", "classification-recherches.md"), lignes.join("\n"), "utf8");

console.log(`Classification terminée : ${journal.length} transition(s).`);
for (const [k, v] of Object.entries(comptes)) console.log(`  ${k.padEnd(20)} ${v}`);
