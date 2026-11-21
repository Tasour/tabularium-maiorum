import { expect, test } from "bun:test";
import { calculerConfiance } from "../src/lib/confiance-fiche";

const base = { aUnActe: false, aUneDate: false, aUnLieu: false, aUneFiliationEtablie: false, aUnVerdict: false };

test("fiche vide : 0/100 Non documenté, tous les manques cités", () => {
  const r = calculerConfiance(base);
  expect(r.score).toBe(0);
  expect(r.label).toBe("Non documenté");
  expect(r.manques.length).toBe(5);
});

test("fiche complète : 100/100 Solide, aucun manque", () => {
  const r = calculerConfiance({ aUnActe: true, aUneDate: true, aUnLieu: true, aUneFiliationEtablie: true, aUnVerdict: true });
  expect(r.score).toBe(100);
  expect(r.label).toBe("Solide");
  expect(r.manques).toEqual([]);
});

test("un lien hypothétique ne rapporte rien (H0 conservée)", () => {
  const r = calculerConfiance({ ...base, aUneDate: true, aUneFiliationEtablie: false });
  expect(r.score).toBe(20);
  expect(r.manques).toContain("filiation non établie par acte");
});

test("paliers Partiel et Fragile", () => {
  expect(calculerConfiance({ ...base, aUnActe: true, aUneDate: true }).label).toBe("Partiel");
  expect(calculerConfiance({ ...base, aUnActe: true }).label).toBe("Fragile");
});

test("score borné 0-100", () => {
  expect(calculerConfiance(base).score).toBeGreaterThanOrEqual(0);
  expect(calculerConfiance({ aUnActe: true, aUneDate: true, aUnLieu: true, aUneFiliationEtablie: true, aUnVerdict: true }).score).toBeLessThanOrEqual(100);
});
