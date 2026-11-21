/* E169 : mémoire de l'alerte 1925 (enquête de rigueur). */
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { tache } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);
const [deja] = await db.select().from(tache).where(eq(tache.id, "tas-tache-E169"));
if (deja) { console.log("E169 déjà enregistrée."); process.exit(0); }
const rapport = readFileSync(new URL("donnees/rapports/ENQUETE-169.md", import.meta.url), "utf8");
await db.insert(tache).values({
  id: "tas-tache-E169", titre: "E169 — Alerte 1925 : convergence d'agents écartée par le détenteur",
  type: "autre", statut: "en_cours", description: `Rapport source : ENQUETE-169.md\nGrade global : A1 (annotation archivée)\n\n${rapport}`,
});
console.log("E169 enregistrée — enquête de rigueur, aucun graphe modifié.");
