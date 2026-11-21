import { expect, test } from "bun:test";
import { filtrerRecherches, libellesFiltres, STATUTS_OUVERTES } from "../src/lib/filtre-recherches";

const r = (id: string, statut: string, titre = id) => ({ id, statut, titre, description: null, individuNom: null, individuPrenoms: null });
const normaliser = (s: string) => s.toLowerCase();
const liste = [r("a", "en_cours"), r("b", "a_faire"), r("c", "intervention_humaine"), r("d", "intervention_humaine"), r("e", "trouve")];

test("En cours ne contient QUE a_faire et en_cours", () => {
  expect(STATUTS_OUVERTES).toEqual(["a_faire", "en_cours"]);
  expect(filtrerRecherches(liste, "ouvertes", "", normaliser).map((x) => x.id)).toEqual(["a", "b"]);
});

test("Intervention humaine = filtre distinct", () => {
  expect(filtrerRecherches(liste, "intervention_humaine", "", normaliser).map((x) => x.id)).toEqual(["c", "d"]);
});

test("Trouvé et Toutes", () => {
  expect(filtrerRecherches(liste, "trouve", "", normaliser).map((x) => x.id)).toEqual(["e"]);
  expect(filtrerRecherches(liste, "toutes", "", normaliser).length).toBe(5);
});

test("recherche textuelle insensible à la casse", () => {
  const avecTexte = [r("x", "en_cours", "Acte de naissance"), r("y", "en_cours", "Recensement")];
  expect(filtrerRecherches(avecTexte, "ouvertes", "ACTE", normaliser).map((x) => x.id)).toEqual(["x"]);
});

test("libellés avec compteurs corrects", () => {
  const l = libellesFiltres(liste);
  expect(l[0].label).toBe("En cours et à faire (2)");
  expect(l[1].label).toBe("Intervention humaine (2)");
  expect(l[2].label).toBe("Trouvé (1)");
  expect(l[4].label).toBe("Toutes");
});
