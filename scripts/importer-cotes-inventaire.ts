/*
 * Importe les cotes citées dans les 161 rapports comme SOURCES D'INVENTAIRE.
 * Règle : une cote relevée dans un rapport n'est PAS un acte consulté.
 * Les plages de registres (3E 4170-5292) sont exclues — jamais extrapolées.
 * Idempotent.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { source } from "../src/db/schema";
import { cotesDuRapport, estPlage, regrouperCotes, serviceDepuisContexte } from "./lib/cotes-rapports";

const RACINE = new URL("..", import.meta.url).pathname;
const RAPPORTS = join(RACINE, "scripts", "donnees", "rapports");
ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const trouvees = [];
for (const fichier of readdirSync(RAPPORTS).filter((f) => /^ENQUETE-\d+\.md$/.test(f))) {
  const id = fichier.match(/ENQUETE-(\d+)/)![1];
  const texte = readFileSync(join(RAPPORTS, fichier), "utf8");
  trouvees.push(...cotesDuRapport(texte, `E${id}`));
}

const groupes = regrouperCotes(trouvees);
const deja = new Set((await db.select({ cote: source.cote }).from(source)).map((s) => s.cote).filter(Boolean) as string[]);
let crees = 0, ignores = 0;

for (const g of groupes) {
  if (deja.has(g.cote)) continue;
  if (estPlage(g.cote)) { ignores++; continue; }
  const service = serviceDepuisContexte(g.contexte);
  const id = `tas-src-inv-${g.cote.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  await db.insert(source).values({
    id,
    titre: `Registre / cote ${g.cote} (inventaire)`,
    cote: g.cote,
    serviceArchives: service || null,
    notes: [
      "Cote relevée dans les rapports d'enquête, pas un acte consulté.",
      `Rapports sources : ${g.rapports.join(", ")}`,
      `Contexte relevé : ${g.contexte}`,
    ].join("\n"),
  }).onConflictDoNothing();
  deja.add(g.cote);
  crees++;
}

console.log(`${crees} cote(s) d'inventaire importée(s), ${ignores} plage(s) exclue(s), ${deja.size} cote(s) au total.`);
