/* E164 : enquête de conformité de l'import PZ à la capture Geneanet. */
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { db } from "../src/db/client";
import { tache } from "../src/db/schema";

const racine = join(import.meta.dir, "..");

test("rapport E164 : 7 bandes, 9 branches, graphies alternatives documentées", () => {
  const t = readFileSync(join(racine, "scripts/donnees/rapports/ENQUETE-164.md"), "utf8");
  expect(t).toContain("7 bandes de 2 500 px");
  expect(t).toContain("17 437 px");
  expect(t).toContain("9 branches");
  expect(t).toContain("Marguerite BULTÉ");
  expect(t).toContain("H0 conservée");
  expect(t).not.toContain("$_i$_");
});

test("E164 reste en_cours : aucune source gradée, donc pas de promotion", async () => {
  const t = (await db.select().from(tache)).find((x) => x.id === "tas-tache-E164");
  expect(t).toBeDefined();
  expect(t?.statut).toBe("en_cours");
  expect(t?.description).toContain("ENQUETE-164.md");
});
