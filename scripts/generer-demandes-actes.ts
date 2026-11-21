/*
 * Génère docs/demandes-actes.md : groupement par service d'archives des démarches
 * déjà documentées dans ENQUETE-*.md. Aucune cote n'est inventée : seules les
 * cotes explicitement relevées dans les rapports sont reprises. Aucun envoi.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RACINE = new URL("..", import.meta.url).pathname;
const RAPPORTS = join(RACINE, "scripts", "donnees", "rapports");
const DATE = "2026-11-21";

/** Demandes curatées, chacune citant son rapport source et sa cote relevée. */
const DEMANDES = [
  {
    service: "Archives départementales du Nord (Lille)",
    items: [
      { titre: "Acte de naissance d'Élisée Tassier, 23/02/1927, Maubeuge", cote: "3 E 10054", rapports: ["ENQUETE-154.md"], etat: "Mise en ligne prévue > 2028 — copie à demander" },
      { titre: "Acte de mariage d'Élisée Tassier × « Arlette », Maubeuge 195x", cote: "à relever dans l'inventaire", rapports: ["ENQUETE-155.md", "ENQUETE-108.md"], etat: "Année illisible (« 11 mars 195? »), graphie Lerose/Leroux non stabilisée" },
      { titre: "Acte de naissance de Jean Félicien Tassier, 23/09/1898, Lyon (fonds 2E)", cote: "à relever (arrondissement inconnu)", rapports: ["ENQUETE-04.md", "ENQUETE-160.md"], etat: "Ne pas recycler la cote 3E 4265 (Chambéry 1936)" },
      { titre: "Mariage Pierre Joseph Tassier × Philomène Decamps, Anor/Trélon ~1860", cote: "à relever (TD 3E TD 012/07 consultée, aucune entrée lue)", rapports: ["ENQUETE-47.md", "ENQUETE-72.md", "ENQUETE-159.md"], etat: "H0 conservée : lecture partielle des tables" },
      { titre: "Mariage Jean-Baptiste Tassier × Anne Joseph Fontaine (~1770-1790)", cote: "à demander au service", rapports: ["ENQUETE-76.md"], etat: "Cote du registre de mariages non relevée" },
      { titre: "Mariage Lambert Joseph Tassier × Jeanne Catherine Fontaine", cote: "à demander au service", rapports: ["ENQUETE-78.md"], etat: "Registre paroissial, cote à demander" },
    ],
  },
  {
    service: "Archives départementales de la Savoie",
    items: [
      { titre: "Acte de naissance de Jean Alceste Alfred Reymond, 21/04/1936, Chambéry", cote: "3E 4265", rapports: ["ENQUETE-24.md", "ENQUETE-91.md"], etat: "Cote confirmée par l'instrument, acte non numérisé et non consulté" },
      { titre: "Registres de sépulture du cimetière de Chambéry — « Reymond Alceste »", cote: "à relever dans l'inventaire", rapports: ["ENQUETE-161.md"], etat: "Aucune cote extrapolée" },
    ],
  },
  {
    service: "Mairie de Maubeuge — état civil",
    items: [
      { titre: "Acte de décès d'Élie Tassier, 28/02/1997, Maubeuge", cote: "numéro d'acte à demander", rapports: ["ENQUETE-162.md"], etat: "Indice B1 à confirmer par l'acte (acte non consulté)" },
      { titre: "Acte de décès d'Emmanuel Tassier, 2000, Maubeuge", cote: "numéro d'acte à demander", rapports: ["ENQUETE-162.md"], etat: "Seule l'année est connue (B1) — aucun jour inventé" },
      { titre: "Acte de mariage Jean Félicien Tassier × Hélène Lamarque, janvier 1923", cote: "à relever", rapports: ["ENQUETE-160.md"], etat: "Mention marginale de l'acte de 1925" },
    ],
  },
  {
    service: "Mairie de Gières — état civil",
    items: [
      { titre: "Acte de décès d'Élisée Tassier, 12/05/2020, acte n°19", cote: "acte n°19 (numéro, pas une cote)", rapports: ["ENQUETE-69.md", "ENQUETE-44.md"], etat: "Décès documenté par bulletin A1 + INSEE ; filiation non portée par ces sources" },
    ],
  },
  {
    service: "Archives départementales / mairie de La Chapelle (Savoie)",
    items: [
      { titre: "Acte de naissance de Delphine Favre, ~1899, La Chapelle", cote: "à relever dans les TD série 3 E (1897-1901)", rapports: ["ENQUETE-06.md"], etat: "Maternité de Joséphine confirmée par recensement 1946" },
    ],
  },
  {
    service: "Archives du Nord — militaire (sans correspondance retenue)",
    items: [
      { titre: "Fiche matricule d'Élisée Tassier (service au Maroc)", cote: "à demander (registres 1859-1921 en ligne)", rapports: ["ENQUETE-09.md", "ENQUETE-100.md"], etat: "Tradition C3 non documentée" },
    ],
  },
];

const lignes = [
  "# Demandes de copies d'actes — prêtes à l'envoi",
  "",
  `**Date :** ${DATE} · **Statut :** aucun courrier envoyé, aucune cote inventée.`,
  "",
  "> Chaque ligne reprend une démarche déjà rédigée dans un rapport d'enquête. Les cotes marquées « à relever » doivent être **confirmées par le service** avant toute commande : ne pas les extrapoler d'un inventaire lu partiellement. Le grade d'une source ne s'additionne pas : morts.fr, Acte-Décès.fr et GénéaFrance partent du même fichier INSEE.",
  "",
];

let total = 0;
for (const groupe of DEMANDES) {
  lignes.push(`## ${groupe.service}`, "");
  for (const d of groupe.items) {
    for (const r of d.rapports) {
      if (!readdirSync(RAPPORTS).includes(r)) throw new Error(`Rapport source absent : ${r}`);
    }
    lignes.push(`- **${d.titre}** — cote : ${d.cote} · rapports : ${d.rapports.join(", ")} · ${d.etat}`);
    total++;
  }
  lignes.push("");
}
lignes.push(`**Total : ${total} démarches** groupées en ${DEMANDES.length} services.`, "");
writeFileSync(join(RACINE, "docs", "demandes-actes.md"), lignes.join("\n"), "utf8");
console.log(`${total} démarches générées dans docs/demandes-actes.md`);
