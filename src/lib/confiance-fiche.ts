/*
 * Indice de confiance d'une fiche, calculé depuis les preuves RÉELLEMENT présentes
 * dans la base. Jamais une probabilité généalogique : mesure l'état du dossier,
 * pas la vérité d'une filiation (cf. méthode Noeta, « complétion par génération »).
 *
 * Composantes (total 100) :
 *   - sources d'actes A1/A2 liées : 40
 *   - date de naissance documentée : 20
 *   - lieu de naissance documenté : 10
 *   - filiation établie par acte : 20
 *   - verdict du détenteur : 10
 * Les liens hypothétiques et les grades C3 ne rapportent rien : H0 conservée.
 */

export type PreuveFiche = {
  aUnActe: boolean;
  aUneDate: boolean;
  aUnLieu: boolean;
  aUneFiliationEtablie: boolean;
  aUnVerdict: boolean;
};

export type ConfianceFiche = { score: number; label: string; manques: string[] };

export function calculerConfiance(p: PreuveFiche): ConfianceFiche {
  let score = 0;
  const manques: string[] = [];
  if (p.aUnActe) score += 40; else manques.push("aucun acte à l'appui");
  if (p.aUneDate) score += 20; else manques.push("date de naissance inconnue");
  if (p.aUnLieu) score += 10; else manques.push("lieu de naissance inconnu");
  if (p.aUneFiliationEtablie) score += 20; else manques.push("filiation non établie par acte");
  if (p.aUnVerdict) score += 10; else manques.push("aucun verdict du détenteur");
  const label = score >= 80 ? "Solide" : score >= 50 ? "Partiel" : score >= 20 ? "Fragile" : "Non documenté";
  return { score, label, manques };
}
