import { expect, test } from "bun:test";
import { cheminParent, degreParent, type LienFiliation } from "../src/lib/parente";

const liens: LienFiliation[] = [
  { enfantId: "felicien", parentId: "firmin" },
  { enfantId: "felicien", parentId: "aline" },
  { enfantId: "arlette", parentId: "felicien" },
  { enfantId: "elisee", parentId: "felicien" },
];

test("même personne : degré 0", () => {
  expect(degreParent("felicien", "felicien", liens)).toBe(0);
});

test("parent direct : degré 1", () => {
  expect(degreParent("felicien", "firmin", liens)).toBe(1);
  expect(degreParent("firmin", "felicien", liens)).toBe(1);
});

test("grand-parent : degré 2", () => {
  expect(degreParent("elisee", "firmin", liens)).toBe(2);
});

test("fratrie : degré 2", () => {
  expect(degreParent("elisee", "arlette", liens)).toBe(2);
  expect(cheminParent("elisee", "arlette", liens)).toEqual(["elisee", "felicien", "arlette"]);
});

test("personne non liée : null", () => {
  expect(degreParent("elisee", "inconnu", liens)).toBeNull();
  // Firmin et Aline ne sont pas liés directement, mais sont co-parents : chemin de degré 2.
  expect(degreParent("firmin", "aline", liens)).toBe(2);
});

test("graphe vide", () => {
  expect(degreParent("a", "b", [])).toBeNull();
  expect(degreParent("a", "a", [])).toBe(0);
});
