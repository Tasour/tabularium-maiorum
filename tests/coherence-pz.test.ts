import { expect, test } from "bun:test";
import { conflitsFiliation, detecterFratriesSuspectes, type PersonnePZ } from "../src/lib/coherence-pz";

const P: PersonnePZ[] = [
  { n: "Jean-Baptiste" },          // 0
  { n: "Pierre Joseph", p: [0] },  // 1
  { n: "Théodule", p: [0] },       // 2
  { n: "Hortense", p: [2] },       // 3
  { n: "Joseph FAUVET", p: [2] },  // 4 (allié)
  { n: "Georges BLOYART", p: [2] },// 5 (allié)
  { n: "Autre", p: [] },           // 6
];

test("conflit : deux fils pour le même géniteur", () => {
  expect(conflitsFiliation(P, 0)).toEqual([1, 2]);
  expect(conflitsFiliation(P, 2)).toEqual([3, 4, 5]);
  expect(conflitsFiliation(P, 6)).toEqual([]);
});

test("fratrie suspecte détectée (alliés)", () => {
  const s = detecterFratriesSuspectes(P, 10);
  const th = s.find((x) => x.generateur === 2);
  expect(th).toBeDefined();
  expect(th?.raison).toContain("noms d'alliés");
  expect(th?.raison).toContain("Joseph FAUVET");
});

test("fratrie nombreuse détectée", () => {
  const s = detecterFratriesSuspectes(P, 1);
  const jb = s.find((x) => x.generateur === 0);
  expect(jb?.raison).toContain("2 enfants déclarés");
});

test("aucun résultat sur un graphe sain", () => {
  const sain: PersonnePZ[] = [{ n: "Père" }, { n: "Fils", p: [0] }, { n: "Autre" }];
  expect(detecterFratriesSuspectes(sain)).toEqual([]);
});

test("index hors bornes ignorés", () => {
  const mauvais: PersonnePZ[] = [{ n: "X", p: [99] }];
  expect(detecterFratriesSuspectes(mauvais)).toEqual([]);
  expect(conflitsFiliation(mauvais, 99)).toEqual([]);
});

test("cœur pur : aucune écriture, aucun grade", () => {
  expect("apply" in detecterFratriesSuspectes(P)).toBe(false);
});
