/*
 * Degré de parenté entre deux fiches : plus court chemin non orienté dans le
 * graphe de filiation. Outil de lecture, jamais une preuve : un chemin court
 * ne dit rien de la certitude des liens qui le composent (H0 conservée).
 */

export type LienFiliation = { enfantId: string; parentId: string };

/** Voisins non orientés : parent ↔ enfant. */
function voisins(liens: LienFiliation[]): Map<string, Set<string>> {
  const g = new Map<string, Set<string>>();
  const ajouter = (a: string, b: string) => {
    if (!g.has(a)) g.set(a, new Set());
    g.get(a)!.add(b);
  };
  for (const l of liens) {
    ajouter(l.enfantId, l.parentId);
    ajouter(l.parentId, l.enfantId);
  }
  return g;
}

/** Plus court chemin (ids) entre deux personnes, ou null. 0 si même personne. */
export function cheminParent(debut: string, fin: string, liens: LienFiliation[]): string[] | null {
  if (debut === fin) return [debut];
  const g = voisins(liens);
  if (!g.has(debut) || !g.has(fin)) return null;
  const file: string[][] = [[debut]];
  const vus = new Set([debut]);
  while (file.length) {
    const chemin = file.shift()!;
    const courant = chemin[chemin.length - 1];
    for (const suivant of g.get(courant) ?? []) {
      if (vus.has(suivant)) continue;
      const neuf = [...chemin, suivant];
      if (suivant === fin) return neuf;
      vus.add(suivant);
      file.push(neuf);
    }
  }
  return null;
}

/** Nombre de liens du plus court chemin (1 = parent/enfant, 2 = frère/sœur ou grand-parent). */
export function degreParent(debut: string, fin: string, liens: LienFiliation[]): number | null {
  const chemin = cheminParent(debut, fin, liens);
  return chemin ? chemin.length - 1 : null;
}
