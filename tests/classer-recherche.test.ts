import { expect, test } from "bun:test";
import { classerRapport, compterSources, section } from "../scripts/lib/classer-recherche";

const rapport = (action: string, sources = 3, test = true) => [
  "# Enquête 999 — Test",
  "## Sources gradées",
  ...Array.from({ length: sources }, (_, i) => `| S${i} | Source ${i} | URL | 21/11/2026 | A1 | apport |`),
  "## Résultat",
  "non trouvé",
  ...(test ? ["## Ce qui ferait changer la conclusion", "Une copie d'acte."] : []),
  "## Prochaine action concrète",
  action,
].join("\n");

test("extraction de section", () => {
  expect(section("## A\nx\n## B\ny", /^## A$/)).toBe("x");
  expect(section("## A\nx", /B/)).toBe("");
});

test("comptage des sources ignore en-tête et séparateur", () => {
  expect(compterSources(rapport("1. Demander copie."))).toBe(3);
});

test("action de copie -> intervention humaine", () => {
  const r = classerRapport(rapport("1. Demander la copie intégrale de l'acte aux Archives."));
  expect(r.categorie).toBe("intervention_humaine");
  expect(r.motif).toContain("Demander la copie");
});

test("lecture visuelle -> intervention humaine", () => {
  expect(classerRapport(rapport("1. Ouvrir l'image 89 et lire visuellement l'acte.")).categorie).toBe("intervention_humaine");
});

test("abandon explicite -> abandonné", () => {
  const r = classerRapport(rapport("Aucune action concrète ne reste ; classer sans suite."));
  expect(r.categorie).toBe("abandonne");
  expect(r.motif).toContain("Aucune action");
});

test("ambigu (action vide) -> intervention humaine par défaut", () => {
  expect(classerRapport(rapport("")).categorie).toBe("intervention_humaine");
});

test("garde : moins de 2 sources -> en_cours", () => {
  const r = classerRapport(rapport("1. Demander copie.", 1));
  expect(r.categorie).toBe("en_cours");
  expect(r.motif).toContain("exploré suffisamment");
});

test("garde : pas de test discriminant -> en_cours", () => {
  expect(classerRapport(rapport("1. Demander copie.", 3, false)).categorie).toBe("en_cours");
});

test("rapport vide -> en_cours", () => {
  expect(classerRapport("").categorie).toBe("en_cours");
});

test("motif borné (jamais un texte interminable)", () => {
  const r = classerRapport(rapport("1. " + "x".repeat(1000)));
  expect(r.motif.length).toBeLessThan(300);
});

test("europe : accents et casse du marqueur d'abandon", () => {
  expect(classerRapport(rapport("Pistes épuisées.")).categorie).toBe("abandonne");
});

test("liste numérotée de sources (E02) et ledger (E10) comptés", () => {
  const liste = "# Rapport\n## Sources gradées\n1. **Acte** · A1 · url\n2. **INSEE** · B1 · url\n## Ce qui ferait changer la conclusion\nCopie.\n## Prochaine action\n1. Demander copie.";
  expect(compterSources(liste)).toBe(2);
  expect(classerRapport(liste).categorie).toBe("intervention_humaine");
});

test("synthèse sans URL ni cote (E150) -> en_cours, pas comptée comme source", () => {
  const synthese = "# Synthèse\n## Sources\nSynthèses des enquêtes 1 à 149 (grades A1 et C3).\n## Ce qui ferait changer la conclusion\nCopie.\n## Prochaine action\n1...." ;
  expect(compterSources(synthese)).toBe(0);
  expect(classerRapport(synthese).categorie).toBe("en_cours");
});
