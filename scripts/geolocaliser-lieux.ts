/*
 * Géolocalisation ponctuelle des lieux importés (API officielle geo.api.gouv.fr).
 * Une seule passe d'administration : l'application reste utilisable sans réseau.
 * Règle : on ne retient qu'une correspondance de nom exacte et, quand le département
 * est connu, de code département identique. Les lieux « à confirmer / à préciser »
 * sont volontairement laissés sans coordonnées (aucune approximation).
 */
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { lieu } from "../src/db/schema";
import { eq } from "drizzle-orm";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const DEPARTEMENTS: Record<string, string> = { nord: "59", rhone: "69", isere: "38", savoie: "73" };
const normaliser = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const incertain = (nom: string) => /à confirmer|à préciser/i.test(nom);

type Commune = { nom: string; code: string; codeDepartement: string; centre?: { coordinates: [number, number] } };

let resolves = 0, ignores = 0;
for (const l of await db.select().from(lieu)) {
  if (l.latitude !== null && l.longitude !== null) continue;
  if (incertain(l.nom)) { ignores++; continue; }
  const nomCommune = l.nom.replace(/\s*\(([^)]+)\)\s*$/, "").trim();
  const depNom = l.nom.match(/\(([^)]+)\)/)?.[1] ?? l.departement ?? "";
  const depCode = /^\d{2,3}$/.test(depNom) ? depNom : DEPARTEMENTS[normaliser(depNom)] ?? null;
  const url = new URL("https://geo.api.gouv.fr/communes");
  url.searchParams.set("nom", nomCommune);
  url.searchParams.set("fields", "nom,code,codeDepartement,centre");
  url.searchParams.set("limit", "5");
  if (depCode) url.searchParams.set("departement", depCode);
  try {
    const reponse = await fetch(url.toString(), { signal: AbortSignal.timeout(8000) });
    if (!reponse.ok) { console.log(`KO  ${l.nom} : HTTP ${reponse.status}`); ignores++; continue; }
    const communes = (await reponse.json()) as Commune[];
    const cible = communes.find((c) => normaliser(c.nom) === normaliser(nomCommune));
    if (!cible?.centre?.coordinates) { console.log(`KO  ${l.nom} : aucune correspondance exacte`); ignores++; continue; }
    await db.update(lieu).set({
      latitude: cible.centre.coordinates[1],
      longitude: cible.centre.coordinates[0],
      codeInsee: cible.code,
      departement: depCode ?? cible.codeDepartement,
    }).where(eq(lieu.id, l.id));
    console.log(`OK  ${l.nom} → ${cible.nom} (${cible.codeDepartement}, ${cible.code})`);
    resolves++;
  } catch (e) {
    console.log(`KO  ${l.nom} : ${e instanceof Error ? e.message : "erreur réseau"}`);
    ignores++;
  }
}
console.log(`\n${resolves} lieux géolocalisés, ${ignores} laissés sans coordonnées (non vérifié > approximation).`);
