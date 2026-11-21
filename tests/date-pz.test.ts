import { expect, test } from "bun:test";
import { parserDatesPZ } from "../scripts/lib/date-pz";

test("plage naissance-décès complète", () => {
  expect(parserDatesPZ("1830-1895")).toEqual({
    naissance: "1830", naissanceMin: "1830-01-01", naissanceMax: "1830-12-31",
    deces: "1895", decesMin: "1895-01-01", decesMax: "1895-12-31",
  });
});

test("« ca 1550-1578/ » : naissance approximative, décès 1578", () => {
  const r = parserDatesPZ("ca 1550-1578/");
  expect(r.naissance).toBe("~1550");
  expect(r.naissanceMin).toBe("1550-01-01");
  expect(r.deces).toBe("1578");
});

test("naissance seule, décès inconnu", () => {
  const r = parserDatesPZ("1896-");
  expect(r.naissance).toBe("1896");
  expect(r.deces).toBeNull();
  expect(r.decesMin).toBeNull();
});

test("année seule", () => {
  expect(parserDatesPZ("1923").naissance).toBe("1923");
  expect(parserDatesPZ("1923").deces).toBeNull();
});

test("vide ou sans année -> rien d'inventé", () => {
  expect(parserDatesPZ("")).toEqual({ naissance: null, naissanceMin: null, naissanceMax: null, deces: null, decesMin: null, decesMax: null });
  expect(parserDatesPZ("?").naissance).toBeNull();
  expect(parserDatesPZ("vers ?").naissance).toBeNull();
});

test("deuxième année antérieure ignorée (texte non structuré)", () => {
  const r = parserDatesPZ("1896 / 1850");
  expect(r.naissance).toBe("1896");
  expect(r.deces).toBeNull();
});

test("~ et ca marqués approximatifs", () => {
  expect(parserDatesPZ("~1826").naissance).toBe("~1826");
  expect(parserDatesPZ("env. 1826").naissance).toBe("~1826");
});

test("bornes de naissance étroites (1 an, pas 65 ans)", () => {
  const r = parserDatesPZ("1830-1895");
  expect(r.naissanceMax! <= r.decesMin!).toBe(true);
});
