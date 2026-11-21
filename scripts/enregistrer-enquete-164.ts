/* Enregistre la tâche E164 (enquête de conformité lecture seule). Idempotent. */
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { tache } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);
const [deja] = await db.select().from(tache).where(eq(tache.id, "tas-tache-E164"));
if (deja) { console.log("E164 déjà enregistrée."); process.exit(0); }
const rapport = readFileSync(new URL("donnees/rapports/ENQUETE-164.md", import.meta.url), "utf8");
await db.insert(tache).values({
  id: "tas-tache-E164", titre: "E164 — Conformité de l'import PZ à la capture Geneanet (17 437 px)",
  type: "autre", statut: "en_cours", description: `Rapport source : ENQUETE-164.md\nGrade global : C3\n\n${rapport}`,
});
console.log("E164 enregistrée — enquête de conformité, aucune donnée modifiée.");
