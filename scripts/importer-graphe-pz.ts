/*
 * Importe le graphe Geneanet (653 PZ) dans la table pz_lien et corrige les
 * faux doublons : deux PZ aux parents différents sont des personnes distinctes
 * (H0 conservée, enregistré comme doute « différentes » avec le motif lu).
 *
 * Règles : aucun lien promu en A1, aucune cote inventée, aucune lecture hasardeuse
 * du champ `u` (numéro séquentiel, pas un identifiant de famille). Idempotent.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { doute, individu, pzLien } from "../src/db/schema";
import { liensPZ, raisonDistinction, chainePZ } from "../src/lib/graphe-pz";

const RACINE = new URL("..", import.meta.url).pathname;
const exportData = JSON.parse(readFileSync(new URL("donnees/arbre-export.json", import.meta.url), "utf8"));
const P = exportData.pz.persons;
ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const { parents, conjoints } = liensPZ(P);
let liens = 0, doutes = 0;
const dejaLiens = new Set((await db.select().from(pzLien)).map((l) => l.id));

for (const l of parents) {
  const lid = `pz-parent-${l.enfant}-${l.parent}`;
  if (dejaLiens.has(lid)) continue;
  await db.insert(pzLien).values({ id: lid, type: "parent", sourceId: `tas-pz-${l.enfant}`, cibleId: `tas-pz-${l.parent}` });
  dejaLiens.add(lid);
  liens++;
}
for (const c of conjoints) {
  const lid = `pz-conjoint-${c.a}-${c.b}`;
  if (dejaLiens.has(lid)) continue;
  await db.insert(pzLien).values({ id: lid, type: "conjoint", sourceId: `tas-pz-${c.a}`, cibleId: `tas-pz-${c.b}` });
  dejaLiens.add(lid);
  liens++;
}

// Faux doublons de docs/relecture-doublons.md : parents différents => personnes distinctes.
const rapport = readFileSync(join(RACINE, "docs", "relecture-doublons.md"), "utf8");
const paires = new Map<string, [number, number]>();
for (const ligne of rapport.split("\n")) {
  const m = [...ligne.matchAll(/tas-pz-(\d+)/g)].map((x) => Number(x[1]));
  if (m.length < 2) continue;
  const [a, b] = m;
  if (a === b) continue;
  paires.set([Math.min(a, b), Math.max(a, b)].join("|"), [Math.min(a, b), Math.max(a, b)]);
}
for (const [a, b] of paires.values()) {
  const motif = raisonDistinction(a, b, P);
  if (!motif) continue; // mêmes parents ou inconnus : on ne tranche pas
  const x1 = `tas-pz-${a}`, x2 = `tas-pz-${b}`;
  const note = `Faux doublon corrigé par le graphe Geneanet (grade C3) : ${motif} Aucune fusion.`;
  const idDoute = `tas-doute-pz-${a}-${b}`;
  const [existant] = await db.select().from(doute).where(eq(doute.id, idDoute));
  if (existant) {
    if (existant.note !== note) {
      await db.update(doute).set({ note }).where(eq(doute.id, idDoute));
      doutes++;
    }
    continue;
  }
  await db.insert(doute).values({ id: idDoute, individu1Id: x1, individu2Id: x2, statut: "differentes", note });
  doutes++;
}

// Correspondances A1 ↔ PZ : la chaîne PZ 192→181→117→93 corrobore nos Sosa 16→32→64→128.
const chaine = chainePZ(192, P, 6);
const attendu = [181, 117, 93];
const validee = attendu.every((x, i) => chaine[i] === x);

console.log(`${liens} liens PZ traités (${parents.length} parents, ${conjoints.length} conjoints)`);
console.log(`${doutes} faux doublons corrigés par les parents Geneanet`);
console.log(`Chaîne PZ 192→181→117→93 corrobore Sosa 16→32→64→128 : ${validee ? "OUI" : "NON"}`);
console.log("Aucun lien promu au grade A1, aucun C3 raccordé.");
