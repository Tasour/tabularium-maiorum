/*
 * Numérotation Sosa-Stradonitz : la racine porte 1, son père 2, sa mère 3,
 * les grandparents 4-7, etc. Le numéro du père = 2*n, celui de la mère = 2*n+1.
 * Quand le sexe n'est pas connu, on utilise l'ordre des filiations tel qu'importé
 * (la source SEED range toujours la mère avant le père) — jamais une déduction
 * depuis le nom.
 *
 * Outil de lecture : le statut du lien est affiché, jamais un grade de preuve
 * inventé. Aucune filiation C3 n'est promue.
 */

export type PersonneSosa = {
  id: string;
  nom: string | null;
  prenoms: string | null;
  sexe: string | null;
  naissance: string | null;
  deces: string | null;
};

export type FiliationSosa = { enfantId: string; parentId: string; type: string };

export type NoeudSosa = {
  sosa: number;
  generation: number;
  personne: PersonneSosa;
  /** Statut du lien qui relie ce nœud à son enfant Sosa. */
  lien: "etabli" | "hypothetique";
  pereSosa: number | null;
  mereSosa: number | null;
};

export type AscendanceSosa = {
  racine: PersonneSosa;
  noeuds: NoeudSosa[];
  trouves: number;
  hypothetiques: number;
  manquants: number;
  profondeur: number;
};

/** Construit l'ascendance Sosa d'une racine à partir des listes de la base. */
export function ascendanceSosa(
  racineId: string,
  personnes: PersonneSosa[],
  filiations: FiliationSosa[],
  maxGeneration = 8,
): AscendanceSosa | null {
  const parId = new Map(personnes.map((p) => [p.id, p]));
  const racine = parId.get(racineId);
  if (!racine) return null;

  const parentsDe = new Map<string, FiliationSosa[]>();
  for (const f of filiations) {
    if (!parentsDe.has(f.enfantId)) parentsDe.set(f.enfantId, []);
    parentsDe.get(f.enfantId)!.push(f);
  }

  const noeuds: NoeudSosa[] = [];
  const tous: { pereSosa: number | null; mereSosa: number | null }[] = [];
  const file: { id: string; sosa: number; generation: number; lien: NoeudSosa["lien"] }[] = [
    { id: racineId, sosa: 1, generation: 1, lien: "etabli" },
  ];

  while (file.length) {
    const courant = file.shift()!;
    const personne = parId.get(courant.id);
    if (!personne) continue;
    const liens = parentsDe.get(courant.id) ?? [];
    const sexeDe = (f: FiliationSosa) => parId.get(f.parentId)?.sexe ?? null;
    let pere: FiliationSosa | null = liens.find((f) => sexeDe(f) === "M") ?? null;
    let mere: FiliationSosa | null = liens.find((f) => sexeDe(f) === "F") ?? null;
    // Sans aucun sexe connu, l'ordre d'import de SEED place la mère avant le père.
    if (!pere && !mere && liens.length >= 2) { mere = liens[0]; pere = liens[1]; }
    // Un parent unique sans sexe est placé en position de père par convention.
    if (!pere && !mere && liens.length === 1) pere = liens[0];
    // Un parent au sexe inconnu prend la place restante (ex. David à côté d'Agnès).
    if (pere && !mere) mere = liens.find((f) => f !== pere) ?? null;
    if (mere && !pere) pere = liens.find((f) => f !== mere) ?? null;
    const pereSosa = pere ? courant.sosa * 2 : null;
    const mereSosa = mere ? courant.sosa * 2 + 1 : null;
    tous.push({ pereSosa, mereSosa });

    if (courant.sosa !== 1) {
      noeuds.push({
        sosa: courant.sosa, generation: courant.generation, personne,
        lien: courant.lien, pereSosa, mereSosa,
      });
    }
    if (courant.generation >= maxGeneration) continue;
    for (const [lien, sosa] of [[pere, pereSosa], [mere, mereSosa]] as const) {
      if (!lien || sosa === null) continue;
      file.push({
        id: lien.parentId, sosa, generation: courant.generation + 1,
        lien: lien.type === "hypothetique" ? "hypothetique" : "etabli",
      });
    }
  }

  noeuds.sort((a, b) => a.sosa - b.sosa);
  return {
    racine,
    noeuds,
    trouves: noeuds.filter((n) => n.lien === "etabli").length,
    hypothetiques: noeuds.filter((n) => n.lien === "hypothetique").length,
    manquants: tous.reduce((n, x) => n + (x.pereSosa === null ? 1 : 0) + (x.mereSosa === null ? 1 : 0), 0),
    profondeur: noeuds.reduce((m, x) => Math.max(m, x.generation), 1),
  };
}
