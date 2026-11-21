/*
 * Parseur du champ `d` des ancêtres Geneanet (PZ).
 * Ce champ est une plage « naissance–décès », PAS une naissance floue :
 *   "1830-1895"      -> né 1830, mort 1895
 *   "ca 1550-1578/"  -> né vers 1550, mort 1578
 *   "1896-"          -> né 1896, décès inconnu
 *   "1923"           -> né 1923
 *   "" / "?"         -> rien (jamais de valeur inventée)
 * La chaîne brute est conservée telle quelle dans les notes de la fiche.
 */

export type DatesPZ = {
  naissance: string | null;
  naissanceMin: string | null;
  naissanceMax: string | null;
  deces: string | null;
  decesMin: string | null;
  decesMax: string | null;
};

const VIDE: DatesPZ = { naissance: null, naissanceMin: null, naissanceMax: null, deces: null, decesMin: null, decesMax: null };

const bornes = (annee: number) => ({ min: `${annee}-01-01`, max: `${annee}-12-31` });

/** Parse une année avec ses marqueurs d'incertitude (`ca`, `~`, `?`, `/`). */
export function parserDatesPZ(brut: string | null | undefined): DatesPZ {
  if (!brut || !brut.trim()) return VIDE;
  const s = brut.trim();
  const approximatif = /(~\s*\d|\b(ca|env|vers|circa)\b)/i.test(s);
  const annees = [...s.matchAll(/\b(1[0-9]{3}|20[0-9]{2})\b/g)].map((m) => Number(m[1]));
  if (!annees.length) return VIDE;

  const anNaissance = annees[0];
  const b = bornes(anNaissance);
  const naissance = approximatif ? `~${anNaissance}` : String(anNaissance);

  // Un second année n'est un décès que si elle suit la première et est postérieure.
  const anDeces = annees.slice(1).find((a) => a >= anNaissance);
  if (anDeces == null) {
    return { ...VIDE, naissance, naissanceMin: b.min, naissanceMax: b.max };
  }
  const d = bornes(anDeces);
  return {
    naissance, naissanceMin: b.min, naissanceMax: b.max,
    deces: String(anDeces), decesMin: d.min, decesMax: d.max,
  };
}
