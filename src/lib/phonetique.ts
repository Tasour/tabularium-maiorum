/*
 * Clés phonétiques pour la recherche tolérante aux graphies anciennes.
 * Soundex simplifié (American Soundex) : TASSIER et TESSIER → T260.
 * Outil de recherche, jamais de preuve : deux noms proches phonétiquement
 * restent des homonymes possibles (H0 conservée).
 */

const CODE: Record<string, string> = {
  b: "1", f: "1", p: "1", v: "1",
  c: "2", g: "2", j: "2", k: "2", q: "2", s: "2", x: "2", z: "2",
  d: "3", t: "3",
  l: "4",
  m: "5", n: "5",
  r: "6",
};

const sansAccents = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Soundex sur un mot : une lettre initiale + 3 chiffres, ou "" si aucune lettre. */
export function soundex(mot: string): string {
  const s = sansAccents(mot).replace(/[^a-z]/g, "");
  if (!s) return "";
  const premier = s[0];
  let code = CODE[premier] ?? "";
  let precedent = CODE[premier] ?? "";
  for (const c of s.slice(1)) {
    const chiffre = CODE[c];
    if (!chiffre) { precedent = ""; continue; } // voyelles et h/w séparent
    if (chiffre !== precedent) code += chiffre;
    if (code.length === 4) break;
    precedent = chiffre;
  }
  return (premier + code.slice(1, 4)).padEnd(4, "0").slice(0, 4).toUpperCase();
}

/** Clé de recherche : Soundex du nom (+ du premier prénom quand fourni). */
export function clePhonetique(nom: string | null | undefined, prenoms?: string | null): string {
  const n = soundex(nom ?? "");
  if (!prenoms) return n;
  const p = sansAccents(prenoms).split(/[\s,-]+/).map(soundex).find(Boolean) ?? "";
  return n && p ? `${n}|${p}` : n || p;
}
