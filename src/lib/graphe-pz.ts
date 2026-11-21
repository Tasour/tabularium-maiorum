/*
 * Graphe Geneanet des 653 ancêtres (PZ) : les champs `p` (parents) et `sp`
 * (conjoints) sont des index dans la liste PZ. Le champ `u` est un numéro
 * séquentiel (653 unions de taille 1) : il n'est PAS un identifiant de famille.
 *
 * Ce graphe est de grade C3 : il corrobore ou distingue, jamais il ne prouve.
 * Aucun lien n'est promu dans le noyau A1 sans verdict humain.
 */

export type PersonnePZ = {
  n: string;
  d?: string;
  b?: number;
  s?: string;
  p?: number[];
  sp?: number[];
  u?: number;
};

export type LienPZ = { enfant: number; parent: number };
export type ConjointPZ = { a: number; b: number };

/** Construit les liens ; ignore les index hors bornes (jamais de cible inventée). */
export function liensPZ(personnes: PersonnePZ[]): { parents: LienPZ[]; conjoints: ConjointPZ[] } {
  const parents: LienPZ[] = [];
  const conjoints: ConjointPZ[] = [];
  const valide = (i: number) => Number.isInteger(i) && i >= 0 && i < personnes.length;
  personnes.forEach((p, i) => {
    for (const x of p.p ?? []) if (valide(x)) parents.push({ enfant: i, parent: x });
    for (const x of p.sp ?? []) if (valide(x) && x > i) conjoints.push({ a: i, b: x });
  });
  return { parents, conjoints };
}

/** Vrais frères homonymes ou personnes distinctes : parents différents. */
export function raisonDistinction(a: number, b: number, personnes: PersonnePZ[]): string | null {
  // Ordre déterministe : toujours PZ(a) avant PZ(b), quel que soit l'appel.
  const [x1, x2] = a < b ? [a, b] : [b, a];
  const pa = [...new Set(personnes[x1]?.p ?? [])].sort((x, y) => x - y);
  const pb = [...new Set(personnes[x2]?.p ?? [])].sort((x, y) => x - y);
  if (!pa.length || !pb.length) return null;
  if (pa.join(",") === pb.join(",")) return null; // mêmes parents : frères jumeaux possibles
  const nom = (i: number) => personnes[i]?.n ?? `#${i}`;
  const who = (i: number, parentsIds: number[]) =>
    `PZ ${i} (${personnes[i]?.n ?? "?"}) a pour géniteur${parentsIds.length > 1 ? "s" : ""} ${parentsIds.map((g) => `${g} (${nom(g)})`).join(" & ")}`;
  return `${who(x1, pa)} ; ${who(x2, pb)} — géniteurs différents : personnes distinctes, H0 conservée.`;
}

/** Chaîne de parents premiers jusqu'à épuisement ou profondeur maximale. */
export function chainePZ(index: number, personnes: PersonnePZ[], max = 12): number[] {
  const chaine: number[] = [];
  let courant = index;
  const vus = new Set<number>([index]);
  for (let i = 0; i < max; i++) {
    const parent = personnes[courant]?.p?.[0];
    if (parent == null || parent < 0 || parent >= personnes.length || vus.has(parent)) break;
    chaine.push(parent);
    vus.add(parent);
    courant = parent;
  }
  return chaine;
}
