/*
 * Retire les sources d'inventaire dont la cote est une plage de cotation
 * (ex. 3E 4170-5292 tronquée en 3E 4170) : ce ne sont pas des registres prouvés.
 * Idempotent.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { source } from "../src/db/schema";

const RACINE = new URL("..", import.meta.url).pathname;
const RAPPORTS = join(RACINE, "scripts", "donnees", "rapports");
ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

/** Cotes à retirer : suivies d'un tiret numérique dans au moins un rapport. */
const plages = new Set<string>();
for (const f of readdirSync(RAPPORTS).filter((x) => /^ENQUETE-\d+\.md$/.test(x))) {
  const t = readFileSync(join(RAPPORTS, f), "utf8");
  for (const m of t.matchAll(/\b(\d{1,2}\s?[EEM]\s?\d{3,5})\s*-\s*\d{3,5}/g)) {
    plages.add(m[1].replace(/\s+/g, " ").trim());
  }
}
console.log(`Plages détectées dans les rapports : ${[...plages].join(", ")}`);

let supprimees = 0;
for (const s of await db.select().from(source)) {
  if (!s.cote || !plages.has(s.cote)) continue;
  await db.delete(source).where(eq(source.id, s.id));
  console.log(`Retiré : ${s.id} (${s.cote}) — plage de cotation, pas un registre`);
  supprimees++;
}
console.log(`${supprimees} source(s) de plage retirée(s).`);
