import { expect, test } from "bun:test";
import { clePhonetique, soundex } from "../src/lib/phonetique";

test("Soundex : graphies voisines", () => {
  expect(soundex("Tassier")).toBe(soundex("Tessier"));
  expect(soundex("Tassier")).toBe(soundex("TASIER"));
  expect(soundex("Gouadon")).toBe(soundex("Goüadon"));
});

test("Soundex : noms distincts", () => {
  expect(soundex("Tassier")).not.toBe(soundex("Meunier"));
  expect(soundex("Reymond")).not.toBe(soundex("Tassier"));
});

test("Soundex : accents, casse, ponctuation", () => {
  expect(soundex("Élisée")).toBe(soundex("elisee"));
  expect(soundex("Léon-Félicien")).toBe(soundex("leon felicien"));
});

test("Soundex : entrée vide", () => {
  expect(soundex("")).toBe("");
  expect(soundex("---")).toBe("");
});

test("clé phonétique nom + prénom", () => {
  const cle = clePhonetique("Tassier", "Jean Félicien");
  expect(cle).toContain("|");
  expect(clePhonetique("Tessier", "Jean Felicien")).toBe(cle);
  expect(clePhonetique("Tassier", "Marie")).not.toBe(cle);
});

test("clé phonétique sans prénom", () => {
  expect(clePhonetique("Tassier")).toBe(soundex("Tassier"));
  expect(clePhonetique(null)).toBe("");
});
