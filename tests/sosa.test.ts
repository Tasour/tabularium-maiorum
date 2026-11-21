import { expect, test } from "bun:test";
import { ascendanceSosa, type FiliationSosa, type PersonneSosa } from "../src/lib/sosa";

const p = (id: string, sexe: string | null = null): PersonneSosa =>
  ({ id, nom: id.toUpperCase(), prenoms: id, sexe, naissance: null, deces: null });
const f = (enfant: string, parent: string, type = "biologique"): FiliationSosa => ({ enfantId: enfant, parentId: parent, type });

test("racine Sosa 1, père 2, mère 3", () => {
  const r = ascendanceSosa("vincent",
    [p("vincent"), p("david", "M"), p("agnes", "F")],
    [f("vincent", "agnes"), f("vincent", "david")])!;
  expect(r.racine.id).toBe("vincent");
  expect(r.noeuds.map((n) => [n.sosa, n.personne.id])).toEqual([[2, "david"], [3, "agnes"]]);
});

test("grands-parents 4-7 et genres", () => {
  const r = ascendanceSosa("v",
    [p("v"), p("p", "M"), p("m", "F"), p("pp", "M"), p("pm", "F"), p("mp", "M"), p("mm", "F")],
    [f("v", "m"), f("v", "p"), f("p", "pm"), f("p", "pp"), f("m", "mm"), f("m", "mp")])!;
  expect(r.noeuds.map((n) => n.sosa)).toEqual([2, 3, 4, 5, 6, 7]);
  expect(r.noeuds.find((n) => n.sosa === 4)?.personne.id).toBe("pp");
  expect(r.noeuds.find((n) => n.sosa === 7)?.personne.id).toBe("mm");
});

test("lien hypothétique conservé comme tel", () => {
  const r = ascendanceSosa("e",
    [p("e"), p("f", "M"), p("m", "F")],
    [f("e", "m", "hypothetique"), f("e", "f", "hypothetique")])!;
  expect(r.noeuds.every((n) => n.lien === "hypothetique")).toBe(true);
  expect(r.hypothetiques).toBe(2);
  expect(r.trouves).toBe(0);
});

test("trous comptés : la racine et son parent sans ascendants", () => {
  const r = ascendanceSosa("v", [p("v"), p("p", "M")], [f("v", "p")])!;
  expect(r.noeuds.length).toBe(1); // le parent connu (Sosa 2)
  expect(r.manquants).toBe(3); // 2 pour la racine + 1 pour le père (son propre père)
});

test("profondeur bornée", () => {
  const personnes = Array.from({ length: 20 }, (_, i) => p(`n${i}`, "M"));
  const filiations = personnes.slice(1).map((x, i) => f(x.id, personnes[i].id));
  const r = ascendanceSosa("n0", personnes, filiations, 3)!;
  expect(r.profondeur).toBeLessThanOrEqual(3);
});

test("racine introuvable -> null", () => {
  expect(ascendanceSosa("absent", [], [])).toBeNull();
});

test("sans sexe : ordre d'import conservé (mère avant père)", () => {
  const r = ascendanceSosa("v", [p("v"), p("mere"), p("pere")], [f("v", "mere"), f("v", "pere")])!;
  expect(r.noeuds.find((n) => n.sosa === 2)?.personne.id).toBe("pere");
  expect(r.noeuds.find((n) => n.sosa === 3)?.personne.id).toBe("mere");
});
