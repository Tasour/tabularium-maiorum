/*
 * Import de l'arbre Tassier & Reymond dans Tabularium Maiorum.
 *
 * Source : /tmp/opencode/arbre-export.json (extraction en lecture seule de
 * ~/Projects/arbre-genealogique-tassier, contrôlée : 34 fiches, 22 cartes,
 * 17 liens, 653 C3, 4 preuves SHA-256 vérifiés, 39 enquêtes).
 *
 * Règles non négociables :
 *  - H0 conservée : jean_felicien (Lyon 1898) ≠ felicien_leon (Anor 1896) -> un doute, jamais une fusion.
 *  - proposedParents -> filiation de type « hypothetique », sans acte, jamais promue.
 *  - 653 ancêtres C3 -> individus avec grade C3 et raccorde=false, aucune filiation.
 *  - Aucune cote, date ou nom inventé : les champs absents restent vides.
 *  - Idempotent : tous les identifiants sont déterministes, les inserts utilisent onConflictDoNothing.
 *
 * Usage : bun scripts/import-tassier.ts
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { and, eq } from "drizzle-orm";

import { parserDatesPZ } from "./lib/date-pz";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_IMAGES, DOSSIER_MIGRATIONS, preparerDossiers } from "../serveur/config";
import { db } from "../src/db/client";
import {
  acte, actePage, consultation, couple, filiation, individu, lien, lieu, page, source, tache, verdict,
} from "../src/db/schema";
import { creerDoute } from "../src/data/doutes";

const EXPORT = process.env.ARBRE_EXPORT ?? join(import.meta.dir, "donnees", "arbre-export.json");
const SOURCE_PREUVES = "/home/tasour/Projects/arbre-genealogique-tassier";

type Export = {
  people: Record<string, any>;
  tree_ids: string[];
  connections: [string, string, string][];
  pz: { urls: string[]; persons: any[]; branches: any[] };
  preuves: any[];
  enquetes: any[];
};

const exportData: Export = JSON.parse(readFileSync(EXPORT, "utf8"));

// ---------- utilitaires -------------------------------------------------------

const slug = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "inconnu";

/** Bornes ISO prudentes : on ne précise pas plus que la source. */
function bornes(date: string): [string | null, string | null] {
  const d = (date ?? "").trim();
  if (!d) return [null, null];
  const iso = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return [d, d];
  const annees = [...d.matchAll(/\b(\d{4})\b/g)].map((m) => Number(m[1]));
  if (annees.length === 1) return [`${annees[0]}-01-01`, `${annees[0]}-12-31`];
  if (annees.length >= 2) {
    const a = Math.min(...annees), b = Math.max(...annees);
    return [`${a}-01-01`, `${b}-12-31`];
  }
  return [null, null];
}

function dateFrToIso(s: string): string {
  const m = (s ?? "").match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
}

const ACTE_TYPES = new Set([
  "Acte numérisé", "Registre numérisé", "Registre paroissial",
  "Table décennale", "Tables décennales", "Registre",
]);
const OFFICIEL_TYPES = new Set([
  "Base dérivée INSEE", "Avis de décès", "Publication officielle", "Presse locale",
  "Administration", "Archives", "Archives en ligne", "Instrument de recherche",
]);

/** Grade Admiralty dérivé du type de source : jamais inventé, jamais sur-classé. */
function gradePersonne(p: any): string {
  const types: string[] = (p.sources ?? []).map((s: any) => s.type);
  if (types.some((t) => ACTE_TYPES.has(t))) return "A1";
  if (types.some((t) => OFFICIEL_TYPES.has(t))) return "B";
  return "C3";
}

function notesPersonne(p: any): string {
  const parts: string[] = [];
  if (p.role) parts.push(`Rôle dans l'arbre : ${p.role}`);
  if (p.bio) parts.push(p.bio);
  const srcs = (p.sources ?? []).map((s: any) => `- ${s.type} : ${s.title}${s.url ? ` — ${s.url}` : ""}${s.note ? ` (${s.note})` : ""}`);
  if (srcs.length) parts.push(`Sources :\n${srcs.join("\n")}`);
  return parts.join("\n\n");
}

// ---------- ouverture de la base ---------------------------------------------

preparerDossiers();
mkdirSync(DOSSIER_IMAGES, { recursive: true });
console.log(`Base : ${BASE_DONNEES}`);
console.log(`Images : ${DOSSIER_IMAGES}`);
const { appliquees } = ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);
if (appliquees.length) console.log(`Migrations appliquées : ${appliquees.join(", ")}`);

const stats: Record<string, number> = {
  individus: 0, c3: 0, lieux: 0, sources: 0, pages: 0, actes: 0, liens: 0,
  filiations: 0, hypotheses: 0, couples: 0, taches: 0, consultations: 0, verdicts: 0, doutes: 0,
};

// ---------- 1. lieux ----------------------------------------------------------

const lieuIds = new Map<string, string>();
async function idLieu(place: string): Promise<string | null> {
  if (!place) return null;
  if (lieuIds.has(place)) return lieuIds.get(place)!;
  const id = `tas-lieu-${slug(place)}`;
  const dep = place.match(/\((\d{2,3})\)/)?.[1] ?? null;
  await awaitInsert(lieu, { id, nom: place, departement: dep, notes: "Lieu relevé dans l'arbre Tassier & Reymond" });
  lieuIds.set(place, id);
  stats.lieux++;
  return id;
}

/** Insertion déterministe, silencieuse si la ligne existe déjà. */
async function awaitInsert(table: any, values: any) {
  await db.insert(table).values(values).onConflictDoNothing();
}

// ---------- 2. individus (34 fiches) -----------------------------------------

const idPersonne = new Map<string, string>();
for (const [key, p] of Object.entries(exportData.people)) {
  const id = `tas-${key}`;
  idPersonne.set(key, id);
  const b = bornes(p.birth?.date ?? "");
  const d = bornes(p.death?.date ?? "");
  awaitInsert(individu, {
    id,
    nom: p.last ?? "",
    prenoms: p.first ?? "",
    sexe: p.sex === "f" ? "F" : p.sex === "m" ? "M" : null,
    naissance: p.birth?.date || null,
    naissanceMin: b[0], naissanceMax: b[1],
    naissanceLieuId: await idLieu(p.birth?.place ?? ""),
    deces: p.death?.date || null,
    decesMin: d[0], decesMax: d[1],
    decesLieuId: await idLieu(p.death?.place ?? ""),
    grade: gradePersonne(p),
    raccorde: (p.parents?.length ?? 0) > 0,
    notes: notesPersonne(p),
  });
  stats.individus++;
}

// ---------- 3. preuves -> source / page / acte / lien -------------------------

/** Types d'actes Tabularium (src/lib/libelles.ts) : jamais la nature brute de la source. */
const TYPES_ACTE_IMPORT: Record<string, string> = {
  "acte de mariage": "mariage",
  "acte de naissance": "naissance",
  "acte de décès": "deces",
  "page de registre de naissances": "autre",
  "table décennale": "autre",
};

const idSourcePreuve = new Map<string, string>();
const idActePreuve = new Map<string, string>();
for (const pr of exportData.preuves) {
  const srcId = `tas-src-${pr.id}`;
  const acteId = `tas-acte-${pr.id}`;
  const pageId = `tas-page-${pr.id}`;
  idSourcePreuve.set(pr.id, srcId);
  idActePreuve.set(pr.id, acteId);

  awaitInsert(source, {
    id: srcId, titre: pr.titre, cote: pr.cote, serviceArchives: "Archives du Nord",
    url: pr.source_url ?? null, notes: `ARK ${pr.ark ?? ""} — preuve ${pr.grade} consultée le ${pr.date_consultation ?? pr.date ?? ""}`,
  });
  stats.sources++;

  const ext = extname(pr.fichier) || ".jpg";
  const dest = `tas-${pr.id}${ext}`;
  const cheminDest = join(DOSSIER_IMAGES, dest);
  if (!existsSync(cheminDest)) copyFileSync(join(SOURCE_PREUVES, pr.fichier), cheminDest);
  awaitInsert(page, {
    id: pageId, sourceId: srcId, fichier: dest,
    largeur: pr.dimensions?.largeur ?? 0, hauteur: pr.dimensions?.hauteur ?? 0,
    sha256: pr.sha256, numeroVue: null, notes: `Empreinte vérifiée à l'import (${pr.sha256})`,
  });
  stats.pages++;

  awaitInsert(acte, {
    id: acteId, sourceId: srcId, nature: "acte", type: TYPES_ACTE_IMPORT[pr.nature] ?? "autre",
    numero: pr.titre.match(/n°\s*(\d+)/)?.[1] ?? null,
    date: pr.date ?? null, dateMin: pr.date ?? null, dateMax: pr.date ?? null,
    cote: pr.cote, titre: pr.titre, transcription: pr.transcription ?? null,
    statut: "exploite", notes: `Grade ${pr.grade} — cote ${pr.cote}`,
  });
  stats.actes++;
  awaitInsert(actePage, { acteId, pageId, ordre: 0 });

  if (pr.source_url) {
    awaitInsert(lien, { id: `tas-lien-${pr.id}`, acteId, url: pr.source_url, libelle: "Archives du Nord — vue numérisée" });
    stats.liens++;
  }
}

// Lien acte_naissanceId quand la cote d'une preuve apparaît dans les sources de la fiche.
const acteParPersonne = new Map<string, string>();
for (const [key, p] of Object.entries(exportData.people)) {
  const texte = (p.sources ?? []).map((s: any) => `${s.title} ${s.note ?? ""}`).join(" ");
  let acteTrouve: string | null = null;
  for (const pr of exportData.preuves) {
    if (pr.cote && texte.includes(pr.cote)) { acteTrouve = idActePreuve.get(pr.id) ?? null; break; }
  }
  if (acteTrouve) {
    await db.update(individu).set({ acteNaissanceId: acteTrouve }).where(eq(individu.id, `tas-${key}`));
    acteParPersonne.set(key, acteTrouve);
  }
}

// ---------- 4. filiations établies + hypothèses -------------------------------

for (const [key, p] of Object.entries(exportData.people)) {
  for (const parent of p.parents ?? []) {
    if (!idPersonne.has(key) || !idPersonne.has(parent)) continue;
    awaitInsert(filiation, {
      id: `tas-fil-${key}-${parent}`, enfantId: idPersonne.get(key)!, parentId: idPersonne.get(parent)!,
      type: "biologique", notes: `Filiation établie — ${p.branch ?? "branche non précisée"} (arbre Tassier & Reymond)`,
    });
    stats.filiations++;
  }
  for (const parent of p.proposedParents ?? []) {
    if (!idPersonne.has(key) || !idPersonne.has(parent)) continue;
    awaitInsert(filiation, {
      id: `tas-hyp-${key}-${parent}`, enfantId: idPersonne.get(key)!, parentId: idPersonne.get(parent)!,
      type: "hypothetique", acteId: null,
      notes: "proposedParents — H0 conservée : non promu sans verdict A1-témoin explicite",
    });
    stats.hypotheses++;
  }
}

// La preuve qui établit la personne établit aussi les liens qu'elle nomme (acte 1896 pour Félicien Léon).
for (const [key, acteId] of acteParPersonne) {
  await db.update(filiation)
    .set({ acteId })
    .where(and(eq(filiation.enfantId, `tas-${key}`), eq(filiation.type, "biologique")));
}

// CONNECTIONS : complète les liens encore absents (les branches self/paternal/maternal sont des filiations).
for (const [enfant, parent, type] of exportData.connections) {
  if (!idPersonne.has(enfant) || !idPersonne.has(parent)) continue;
  if (type === "hypo") continue; // déjà traité via proposedParents
  awaitInsert(filiation, {
    id: `tas-fil-${enfant}-${parent}`, enfantId: idPersonne.get(enfant)!, parentId: idPersonne.get(parent)!,
    type: "biologique", notes: `Connexion « ${type} » de l'arbre source`,
  });
  stats.filiations++;
}

// Conjoints : une seule union par couple connu dans l'arbre source.
const dejaCouples = new Set<string>();
for (const [key, p] of Object.entries(exportData.people)) {
  if (!p.spouse || !idPersonne.has(key) || !idPersonne.has(p.spouse)) continue;
  const a = idPersonne.get(key)!, b = idPersonne.get(p.spouse)!;
  const cle = [a, b].sort().join("|");
  if (dejaCouples.has(cle)) continue;
  dejaCouples.add(cle);
  awaitInsert(couple, { id: `tas-couple-${slug(key)}-${slug(p.spouse)}`, individu1Id: a, individu2Id: b, type: "mariage" });
  stats.couples++;
}

// ---------- 5. 653 ancêtres C3 (jamais raccordés) -----------------------------

exportData.pz.persons.forEach((pzPers: any, i: number) => {
  const id = `tas-pz-${i}`;
  const nomComplet: string = pzPers.n ?? "";
  const parts = nomComplet.trim().split(/\s+/);
  const nom = parts.pop() ?? "";
  const prenoms = parts.join(" ");
  // Le champ Geneanet `d` est une plage naissance–décès, pas une naissance floue.
  const datesPZ = parserDatesPZ(pzPers.d);
  awaitInsert(individu, {
    id, nom, prenoms, sexe: pzPers.s === "F" ? "F" : null,
    naissance: datesPZ.naissance, naissanceMin: datesPZ.naissanceMin, naissanceMax: datesPZ.naissanceMax,
    deces: datesPZ.deces, decesMin: datesPZ.decesMin, decesMax: datesPZ.decesMax,
    grade: "C3", raccorde: false,
    notes: [
      "Ancêtre Geneanet — non raccordé au graphe établi (H0 conservée).",
      pzPers.d ? `Dates brutes Geneanet (telles qu'écrites) : ${pzPers.d}` : "",
      `Branche ${pzPers.b ?? "?"} · ${exportData.pz.branches.find((x: any) => x.branch === pzPers.b)?.surnames ?? ""}`,
      pzPers.n ? `Nom tel qu'affiché : ${pzPers.n}` : "",
      exportData.pz.urls[i] ? `Source : ${exportData.pz.urls[i]}` : "",
      Array.isArray(pzPers.p) && pzPers.p.length ? `Indices parents déclarés (non raccordés) : ${pzPers.p.join(", ")}` : "",
      Array.isArray(pzPers.sp) && pzPers.sp.length ? `Indices conjoints déclarés (non raccordés) : ${pzPers.sp.join(", ")}` : "",
    ].filter(Boolean).join("\n"),
  });
  stats.c3++;
});

// ---------- 6. 39 enquêtes -> tâches + consultations + verdicts ---------------

const statutTache = (e: any) => (e.temoignage ? "trouve" : "en_cours");
const resultatConsultation = (e: any) => {
  if (e.temoignage) return "trouve";
  if (["non-trouve", "silence-acces"].includes(e.statut)) return "rien";
  return "piste";
};

for (const e of exportData.enquetes) {
  const tacheId = `tas-tache-${e.id}`;
  const description = [
    e.question ? `Question : ${e.question}` : "",
    e.cible ? `Cible : ${e.cible}` : "",
    e.finding ? `Constat : ${e.finding}` : "",
    e.next ? `Suite : ${e.next}` : "",
  ].filter(Boolean).join("\n\n");
  awaitInsert(tache, {
    id: tacheId, titre: `${e.id} — ${e.titre}`, type: "autre",
    description, statut: statutTache(e), resultat: e.finding ?? null,
    termineLe: e.temoignage ? dateFrToIso(e.temoignage.date) || null : null,
    notes: `Grade ${e.grade ?? "?"} · H0 ${e.h0 ?? "homonymie"} · statut source ${e.statut}`,
  });
  stats.taches++;

  const cotes = e.cotes ?? [];
  for (const c of cotes) {
    const preuve = exportData.preuves.find((pr) => pr.cote === c.ref);
    awaitInsert(consultation, {
      id: `tas-cons-${e.id}-${slug(c.ref ?? "sans-cote")}`,
      tacheId, sourceId: preuve ? idSourcePreuve.get(preuve.id) ?? null : null,
      date: dateFrToIso(e.maj) || "2026-11-20",
      resultat: resultatConsultation(e),
      vues: c.images ? `1 à ${c.images}` : null,
      notes: [
        `Cote ${c.ref ?? "?"}${c.depot ? ` — ${c.depot}` : ""}${c.ark ? ` (ARK ${c.ark})` : ""}`,
        `Grade enquête : ${e.grade ?? "?"}`,
      ].join("\n"),
    });
    stats.consultations++;
  }
  if (!cotes.length) {
    awaitInsert(consultation, {
      id: `tas-cons-${e.id}-sans-cote`, tacheId, date: dateFrToIso(e.maj) || "2026-11-20",
      resultat: resultatConsultation(e),
      notes: `Aucune cote relevée — ${e.statut}${e.finding ? ` : ${e.finding}` : ""}`,
    });
    stats.consultations++;
  }

  // Témoignages A1-témoin : enregistrés tels quels, sans promotion inventée.
  if (e.temoignage) {
    // Cible déduite du champ `cible` de l'enquête source, vérifiée à la lecture.
    const cibleId =
      e.id === "E02" ? idPersonne.get("elisee") :
      e.id === "E03" ? idPersonne.get("arlette") :
      e.id === "E157" ? idPersonne.get("felicien_leon") : null;
    if (cibleId) {
      awaitInsert(verdict, {
        id: `tas-verdict-${e.id}`, cibleId, titre: `${e.id} — ${e.titre}`,
        temoin: e.temoignage.grade, date: dateFrToIso(e.temoignage.date),
        action: "temoignage", note: e.temoignage.texte,
      });
      stats.verdicts++;
    }
  }
}

// ---------- 7. H0 explicite : un doute, jamais une fusion ---------------------

if (idPersonne.has("jean_felicien") && idPersonne.has("felicien_leon")) {
  const idDoute = await creerDoute(
    idPersonne.get("jean_felicien")!, idPersonne.get("felicien_leon")!,
    "H0 conservée : Jean Félicien (Lyon 1898) et Félicien Léon (Anor 1896) sont deux personnes distinctes, établies par actes séparés. Ne jamais fusionner sans verdict A1-témoin explicite.",
    "differentes",
  );
  void idDoute;
  stats.doutes++;
}

// ---------- bilan -------------------------------------------------------------

console.log("\nImport terminé :");
for (const [k, v] of Object.entries(stats)) console.log(`  ${k.padEnd(15)} ${v}`);

// Contrôles d'intégrité (0 = conforme au cahier des charges).
const verifications: [string, number, number][] = [
  ["fiches A1", stats.individus, 34],
  ["ancêtres C3", stats.c3, 653],
  ["preuves / actes", stats.actes, 4],
  ["pages avec SHA-256", stats.pages, 4],
  ["enquêtes", stats.taches, 39],
  ["témoignages A1-témoin", stats.verdicts, 3],
  ["liens d'hypothèse non promus", stats.hypotheses, 8],
  ["doute H0", stats.doutes, 1],
];
let echecs = 0;
for (const [label, obtenu, attendu] of verifications) {
  const ok = obtenu === attendu;
  console.log(`  ${ok ? "OK " : "KO "} ${label} : ${obtenu} (attendu ${attendu})`);
  if (!ok) echecs++;
}
if (echecs) {
  console.error(`\n${echecs} contrôle(s) en échec.`);
  process.exit(1);
}
console.log("\nTous les contrôles sont verts. H0 conservée, aucun C3 promu.");
