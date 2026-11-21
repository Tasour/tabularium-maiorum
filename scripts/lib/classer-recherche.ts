/*
 * Classifieur déterministe d'un rapport d'enquête (lecture seule).
 * Règle :
 *  1) Garde « exploré suffisamment » : >= 2 sources gradées et un test discriminant
 *     explicite (section « Ce qui ferait changer la conclusion »). Sinon en_cours.
 *  2) Abandonné seulement si la section action dit explicitement qu'il n'y a plus d'action.
 *  3) Intervention humaine dès qu'une action reste — ET par défaut si ambigu.
 */

export type CategorieRecherche = "en_cours" | "intervention_humaine" | "abandonne";
export type Classification = { categorie: CategorieRecherche; motif: string };

/** Extrait le contenu d'une section markdown (titre `##`, jusqu'au titre suivant). */
export function section(texte: string, motifTitre: RegExp): string {
  const lignes = texte.split("\n");
  const debut = lignes.findIndex((l) => /^#{2,3}\s/.test(l) && motifTitre.test(l));
  if (debut < 0) return "";
  const fin = lignes.findIndex((l, i) => i > debut && /^##\s/.test(l));
  return lignes.slice(debut + 1, fin < 0 ? undefined : fin).join("\n");
}

/** Nombre de lignes de source (tableau), hors en-tête et séparateur. */
export function compterSources(texte: string): number {
  const src = section(texte, /sources/i);
  const lignes = src.split("\n");
  const table = lignes.filter((l) => {
    const t = l.trim();
    return t.startsWith("|") && !/^\|[\s:|-]+\|$/.test(t) && !/^\|\s*(ID|#|Source|Référence)/i.test(t);
  }).length;
  // Listes numérotées (E02, E09) et ledgers (E10) : une ligne = une source.
  const liste = lignes.filter((l) => /^\s*\d+[.)]\s+/.test(l) || /^\|\s*[A-Z]-\d+/.test(l)).length;
  // Prose : seulement les lignes qui citent une URL ou une cote — pas les grades seuls
  // (sinon les synthèses E150/E40 seraient comptées comme sources).
  const prose = lignes.filter((l) => /https?:\/\//.test(l) || /\b\d\s?[EEM]\s?\d{3,5}/.test(l)).length;
  return Math.max(table, liste, prose);
}

const ABANDON = /aucune action|aucune piste|plus de piste|classer sans suite|abandonner|épuis[ée]s?|rien de plus à faire/i;

/** Classification d'un rapport complet. Aucune invention : le motif cite le rapport. */
export function classerRapport(texte: string): Classification {
  const sources = compterSources(texte);
  const aTest = /Ce qui ferait changer la conclusion/i.test(texte) || /test discriminant/i.test(texte);
  if (sources < 2 || !aTest) {
    return { categorie: "en_cours", motif: `Garde « exploré suffisamment » non satisfaite : ${sources} source(s), test discriminant ${aTest ? "présent" : "absent"}.` };
  }
  const action = section(texte, /prochaine action/i).trim();
  if (ABANDON.test(action)) {
    return { categorie: "abandonne", motif: `Aucune action concrète restante selon la section « Prochaine action » du rapport : ${action.slice(0, 160)}` };
  }
  const premiere = action.split("\n").map((l) => l.trim()).find((l) => l && !/^[-*]$/.test(l)) ?? "";
  const extrait = premiere.replace(/^\d+[.)]\s*/, "").slice(0, 180) || "action non détaillée dans le rapport";
  return { categorie: "intervention_humaine", motif: `Action non automatisable restante : ${extrait}` };
}
