/* Extraction des cotes citées dans les rapports, avec contexte vérifiable. */

export const REGEX_COTE = /\b\d{1,2}\s?[EEM]\s?\d{3,5}(?:\/\d{3,5})?(?:\s?R\s?\d{3})?\b/g;

export type CoteTrouvee = { cote: string; rapports: string[]; contexte: string };

const nettoyer = (s: string) => s.replace(/\*\*/g, "").replace(/`/g, "").replace(/\s+/g, " ").trim();

/** Cotes d'un rapport, avec la ligne où elles apparaissent (jamais la cote seule). */
export function cotesDuRapport(texte: string, id: string): { cote: string; contexte: string; rapport: string }[] {
  const resultats: { cote: string; contexte: string; rapport: string }[] = [];
  const vues = new Set<string>();
  for (const ligne of texte.split("\n")) {
    for (const m of ligne.match(REGEX_COTE) ?? []) {
      const cote = m.replace(/\s+/g, " ").trim();
      // Une cote suivie d'un tiret numérique est une plage de cotation
      // (ex. 3E 4170-5292), pas un registre : on ne l'extrapole pas.
      const fin = (ligne.match(new RegExp(`${m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*-\\s*\\d`)) ?? [])[0];
      if (fin) continue;
      const cle = `${cote}|${id}`;
      if (vues.has(cle)) continue;
      vues.add(cle);
      resultats.push({ cote, contexte: nettoyer(ligne).slice(0, 220), rapport: id });
    }
  }
  return resultats;
}

/** Déduit le service d'archives depuis le contexte ; "" si non déterminable. */
export function serviceDepuisContexte(contexte: string): string {
  const c = contexte.toLowerCase();
  if (c.includes("savoie") || c.includes("chambéry")) return "Archives départementales de la Savoie";
  if (c.includes("isère") || c.includes("grenoble") || c.includes("gières")) return "Archives départementales de l'Isère";
  if (c.includes("lyon") || c.includes("rhône")) return "Archives municipales de Lyon";
  if (c.includes("archives du nord") || c.includes("lenord") || c.includes("maubeuge") || c.includes("anor") || c.includes("cerfontaine") || c.includes("trélon")) return "Archives départementales du Nord";
  return "";
}

/** Regroupe par cote, en gardant tous les rapports sources. */
export function regrouperCotes(trouvees: { cote: string; contexte: string; rapport: string }[]): CoteTrouvee[] {
  const par = new Map<string, CoteTrouvee>();
  for (const t of trouvees) {
    const existant = par.get(t.cote);
    if (existant) {
      if (!existant.rapports.includes(t.rapport)) existant.rapports.push(t.rapport);
    } else {
      par.set(t.cote, { cote: t.cote, rapports: [t.rapport], contexte: t.contexte });
    }
  }
  return [...par.values()].sort((a, b) => a.cote.localeCompare(b.cote));
}

/** Vraie plage de registres (ex. 3E 4170-5292) : ne pas importer comme acte prouvé. */
export function estPlage(cote: string): boolean {
  const m = cote.match(/(\d{3,5})\s*-\s*(\d{3,5})/);
  return !!m && Number(m[2]) > Number(m[1]);
}
