/*
 * Contrôle de cohérence du graphe PZ : signale les géniteurs à fratrie suspecte.
 * Aucune correction automatique : le grade C3 ne permet pas de trancher (H0).
 */

export type PersonnePZ = { n: string; p?: number[]; d?: string };

export type FratrieSuspecte = {
  generateur: number;
  nomGenerateur: string;
  enfants: number[];
  raison: string;
};

/** Noms d'alliés repérés dans les fratries PZ (conjoints d'enfants, pas des fils). */
const NOMS_ALLIES = /FAUVET|BLOYART|PAQUET|M[AÉ]RIS|COSTE|L[EÈ]GR[OO]S|D[EÉ]LHAYE/i;

export function detecterFratriesSuspectes(personnes: PersonnePZ[], maxEnfants = 4): FratrieSuspecte[] {
  const enfantsPar = new Map<number, number[]>();
  personnes.forEach((p, i) => {
    for (const g of p.p ?? []) {
      if (!Number.isInteger(g) || g < 0 || g >= personnes.length) continue;
      if (!enfantsPar.has(g)) enfantsPar.set(g, []);
      enfantsPar.get(g)!.push(i);
    }
  });

  const resultats: FratrieSuspecte[] = [];
  for (const [generateur, enfants] of enfantsPar) {
    const allies = enfants.filter((i) => NOMS_ALLIES.test(personnes[i]?.n ?? ""));
    if (enfants.length <= maxEnfants && allies.length === 0) continue;
    const raisons: string[] = [];
    if (enfants.length > maxEnfants) raisons.push(`${enfants.length} enfants déclarés (>${maxEnfants})`);
    if (allies.length) raisons.push(`noms d'alliés parmi les enfants : ${allies.map((i) => personnes[i].n).join(", ")}`);
    resultats.push({
      generateur, nomGenerateur: personnes[generateur]?.n ?? `#${generateur}`,
      enfants: enfants.slice(), raison: raisons.join(" ; "),
    });
  }
  return resultats.sort((a, b) => b.enfants.length - a.enfants.length);
}

/** Deux personnes déclarant le même géniteur : candidats concurrents, pas un doublon. */
export function conflitsFiliation(personnes: PersonnePZ[], generateur: number): number[] {
  if (!Number.isInteger(generateur) || generateur < 0 || generateur >= personnes.length) return [];
  return personnes
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => (p.p ?? []).includes(generateur))
    .map(({ i }) => i);
}
