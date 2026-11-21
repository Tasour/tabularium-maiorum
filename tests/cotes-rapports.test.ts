import { expect, test } from "bun:test";
import { cotesDuRapport, estPlage, regrouperCotes, serviceDepuisContexte } from "../scripts/lib/cotes-rapports";

test("extraction d'une cote avec son contexte", () => {
  const r = cotesDuRapport("La cote **3 E 7213** est confirmée (acte 1896).", "E01");
  expect(r.length).toBe(1);
  expect(r[0].cote).toBe("3 E 7213");
  expect(r[0].contexte).toContain("confirmée");
  expect(r[0].rapport).toBe("E01");
});

test("déduplication par rapport", () => {
  const r = cotesDuRapport("3E 4265 puis encore 3E 4265.", "E91");
  expect(r.length).toBe(1);
});

test("plusieurs cotes sur une même ligne", () => {
  expect(cotesDuRapport("Registres 3 E 10116 et 3 E 10117.", "E02").length).toBe(2);
});

test("service déduit du contexte", () => {
  expect(serviceDepuisContexte("Archives de Savoie — cote 3E 4265")).toContain("Savoie");
  expect(serviceDepuisContexte("registre d'Anor, Archives du Nord")).toContain("Nord");
  expect(serviceDepuisContexte("texte sans indice")).toBe("");
});

test("regroupement multi-rapports", () => {
  const g = regrouperCotes([
    { cote: "3E 4675", contexte: "a", rapport: "E06" },
    { cote: "3E 4675", contexte: "b", rapport: "E07" },
  ]);
  expect(g.length).toBe(1);
  expect(g[0].rapports).toEqual(["E06", "E07"]);
});

test("plage de registres détectée", () => {
  expect(estPlage("3E 4170-5292")).toBe(true);
  expect(estPlage("3 E 7213")).toBe(false);
  expect(estPlage("3 E 10053/10054")).toBe(false);
});
