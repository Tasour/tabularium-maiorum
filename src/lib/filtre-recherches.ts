/*
 * Logique de filtrage de la page « Recherches », extraite pour être testable
 * sans navigateur. « En cours et à faire » ne contient QUE les statuts actifs ;
 * « Intervention humaine » est un filtre distinct (attente d'action humaine).
 */

export type RechercheFiltre = {
  titre: string;
  description: string | null;
  individuNom: string | null;
  individuPrenoms: string | null;
  statut: string;
};

export const FILTRE_OUVERTES = "ouvertes";
export const STATUTS_OUVERTES = ["a_faire", "en_cours"] as const;

export function filtrerRecherches<T extends RechercheFiltre>(
  recherches: T[],
  filtre: string,
  texte: string,
  normaliser: (s: string) => string,
): T[] {
  const correspond = (s: string) => !texte || normaliser(s).includes(normaliser(texte));
  return recherches.filter((r) => {
    const statutOk =
      filtre === "toutes" ||
      (filtre === FILTRE_OUVERTES ? (STATUTS_OUVERTES as readonly string[]).includes(r.statut) : r.statut === filtre);
    return statutOk && correspond(`${r.titre} ${r.description ?? ""} ${r.individuNom ?? ""} ${r.individuPrenoms ?? ""}`);
  });
}

/** Libellés avec compteurs, calculés une fois pour le SegmentedControl. */
export function libellesFiltres<T extends RechercheFiltre>(recherches: T[]): { value: string; label: string }[] {
  const n = (s: string) => recherches.filter((r) => r.statut === s).length;
  return [
    { value: FILTRE_OUVERTES, label: `En cours et à faire (${n("a_faire") + n("en_cours")})` },
    { value: "intervention_humaine", label: `Intervention humaine (${n("intervention_humaine")})` },
    { value: "trouve", label: `Trouvé (${n("trouve")})` },
    { value: "abandonne", label: `Abandonné (${n("abandonne")})` },
    { value: "toutes", label: "Toutes" },
  ];
}
