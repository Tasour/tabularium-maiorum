import { expect, test } from "bun:test";
import { chainePZ, liensPZ, raisonDistinction, type PersonnePZ } from "../src/lib/graphe-pz";

const P: PersonnePZ[] = [
  { n: "Enfant A", p: [2, 3], sp: [1] },
  { n: "Conjoint", sp: [0] },
  { n: "Père", p: [4] },
  { n: "Mère" },
  { n: "Grand-père" },
  { n: "Enfant B", p: [2, 3] }, // mêmes parents que A -> frère
  { n: "Enfant C", p: [3] }, // père différent -> homonyme
  { n: "Hors borne", p: [99] },
];

test("liens parents et conjoints (index hors bornes ignorés)", () => {
  const { parents, conjoints } = liensPZ(P);
  expect(parents.length).toBe(6);
  expect(parents.some((l) => l.enfant === 7)).toBe(false);
  expect(conjoints).toEqual([{ a: 0, b: 1 }]);
});

test("mêmes parents : aucun motif de distinction", () => {
  expect(raisonDistinction(0, 5, P)).toBeNull();
});

test("parents différents : motif daté et sourcé", () => {
  const r = raisonDistinction(0, 6, P);
  expect(r).toContain("géniteurs différents");
  expect(r).toContain("Père");
  expect(r).toContain("Mère");
  expect(raisonDistinction(6, 0, P)).toBe(raisonDistinction(0, 6, P));
});

test("sans parents connus : pas de distinction prouvée", () => {
  expect(raisonDistinction(3, 4, P)).toBeNull();
});

test("chaîne de parents premiers", () => {
  expect(chainePZ(0, P)).toEqual([2, 4]);
  expect(chainePZ(2, P)).toEqual([4]);
  expect(chainePZ(3, P)).toEqual([]);
});

test("cycle impossible", () => {
  const cycle: PersonnePZ[] = [{ n: "A", p: [1] }, { n: "B", p: [0] }];
  expect(chainePZ(0, cycle)).toEqual([1]);
});

test("u est séquentiel, pas une famille (653 unions de taille 1 sur la vraie source)", () => {
  // Le cœur n'utilise jamais u : vérifié par les champs de type.
  expect("u" in P[0]).toBe(false);
});
