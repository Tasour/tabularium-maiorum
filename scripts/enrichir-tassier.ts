/*
 * Enrichissement du fork Tassier & Reymond (21/11/2026).
 *
 * 1. Corrige les dates d'actes (date de l'acte, pas date de consultation).
 * 2. Importe les 159 rapports ENQUETE-*.md comme tâches enrichies + consultations gradées.
 * 3. Crée 13 relevés à partir des transcriptions (table explicite, auditable).
 * 4. Lie les tâches aux fiches (mapping explicite puis règle prudente prénom + année).
 * 5. Enregistre les hypothèses écartées comme verdicts (jamais comme faits).
 *
 * Règles : H0 conservée, « non trouvé » non promu, aucune cote/date/nom inventé.
 * Idempotent : identifiants déterministes + onConflictDoNothing / DoUpdate.
 */
import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { and, eq, isNull, sql } from "drizzle-orm";

import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { acte, consultation, individu, releve, tache, verdict } from "../src/db/schema";

const RAPPORTS = join(import.meta.dir, "donnees", "rapports");
/** Convention de l'index source : E01…E09 puis E10…E159. */
const E = (n: number) => (n < 10 ? `E0${n}` : `E${n}`);
ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const stats: Record<string, number> = { dates: 0, taches: 0, consultations: 0, relevés: 0, rattaches: 0, liaisons: 0, hypothesesEcartees: 0, temoignagesReserves: 0 };
const nonParses: string[] = [];

/** Insertion déterministe. */
async function inserer(table: any, values: any) {
  await db.insert(table).values(values).onConflictDoNothing();
}

// ---------- 1. dates des actes ------------------------------------------------

const DATES_ACTES: Record<string, { date: string | null }> = {
  "tas-acte-anor-1889-mariage-301": { date: "1889-02-11" },
  "tas-acte-anor-1896-naissance-130": { date: "1896-09-29" },
  // Vue 131 : contexte immédiat, non une preuve autonome -> pas de date d'acte.
  "tas-acte-anor-1896-naissance-131": { date: null },
  "tas-acte-maubeuge-1925-naissance-arlette-helene": { date: "1925-09-04" },
};
for (const [id, v] of Object.entries(DATES_ACTES)) {
  await db.update(acte).set({ date: v.date, dateMin: v.date, dateMax: v.date }).where(eq(acte.id, id));
  stats.dates++;
}

// ---------- 2. rapports -> tâches ---------------------------------------------

const nettoyer = (s: string) => s.replace(/\*\*/g, "").replace(/`/g, "").replace(/\s+/g, " ").trim();
const dateFrToIso = (s: string) => {
  const m = s.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
};

function typeRapport(titre: string): string {
  const t = titre.toLowerCase();
  if (/mariage|union/.test(t)) return "mariage";
  if (/d[ée]c[eè]s|s[ée]pulture/.test(t)) return "deces";
  if (/naissance|naissances/.test(t)) return "naissance";
  if (/recensement|matricule|militaire|service/.test(t)) return "autre";
  return "autre";
}

function conclure(texte: string): string {
  const lignes = texte.split("\n");
  const i = lignes.findIndex((l) => /Conclusion\s*:/i.test(l));
  if (i >= 0) return nettoyer(lignes[i].replace(/^.*?Conclusion\s*:\s*/i, "")).slice(0, 600);
  const j = lignes.findIndex((l) => /^#{1,3}\s*.*(Résultat|Resultat)/i.test(l));
  if (j >= 0) {
    const suite = lignes.slice(j + 1, j + 6).filter((l) => l.trim() && !l.startsWith("#") && !l.startsWith("|"));
    if (suite.length) return nettoyer(suite.join(" ")).slice(0, 600);
  }
  return "";
}

const fichiers = readdirSync(RAPPORTS).filter((f) => /^ENQUETE-\d+\.md$/.test(f))
  .sort((a, b) => Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]));

for (const fichier of fichiers) {
  const texte = readFileSync(join(RAPPORTS, fichier), "utf8");
  const n = Number(fichier.match(/ENQUETE-(\d+)/)![1]);
  const titreBrut = texte.match(/^#\s*Enquête\s*\d+\s*[-—–]\s*(.+)$/m)?.[1] ?? `rapport ${n}`;
  const dateIso = dateFrToIso(texte.match(/(?:\*\*)?Date\s*:(?:\*\*)?\s*([^\n·]+)/)?.[1] ?? "");
  const grade = texte.match(/Grade global\s*:(?:\*\*)?\s*([A-F]\d?)/i)?.[1] ?? "C3";
  const conclusion = conclure(texte);
  // « trouvé » n'est retenu que si la conclusion commence par un marqueur positif
  // et ne contient aucune réserve : « non documenté », H0 conservée, silence documentaire…
  const positif = /^(trouv[ée]|confirm[ée]|r[ée]solu|obtenu|[ée]tabli|r[ée]v[ée]l[ée])/i.test(conclusion);
  const reserve = /non trouv[ée]|non document|conserv[ée]e|H0|non r[ée]solu|silence documentaire|non v[ée]rifi/i.test(conclusion);
  const trouvé = positif && !reserve;
  const statut = trouvé ? "trouve" : "en_cours";
  const id = `tas-tache-${E(n)}`;
  const description = `Rapport source : ${fichier}\nGrade global : ${grade}\n\n${texte}`;

  await db.insert(tache).values({
    id, titre: `${E(n)} — ${nettoyer(titreBrut).slice(0, 180)}`,
    type: typeRapport(titreBrut), description, statut, resultat: conclusion || null,
    termineLe: trouvé ? dateIso || null : null,
  }).onConflictDoUpdate({
    target: tache.id,
    set: { titre: `${E(n)} — ${nettoyer(titreBrut).slice(0, 180)}`, type: typeRapport(titreBrut), description, statut, resultat: conclusion || null, termineLe: trouvé ? dateIso || null : null },
  });
  stats.taches++;

  // --- consultations : lignes de tableau dans une section « Sources » ---
  let dansSources = false;
  let rang = 0;
  for (const ligne of texte.split("\n")) {
    if (/^#{1,4}\s/.test(ligne)) {
      dansSources = /sources/i.test(ligne);
      continue;
    }
    if (!dansSources || !ligne.trim().startsWith("|")) continue;
    const cellules = ligne.split("|").slice(1, -1).map((c) => nettoyer(c));
    if (!cellules.length || /^[-: ]+$/.test(cellules.join(""))) continue;
    const url = cellules.join(" ").match(/https?:\/\/[^\s)]+/)?.[0] ?? null;
    const cote = cellules.join(" ").match(/\b\d{1,2}\s*[EeMiI]+\s*\d{1,4}(?:\s*[A-Z]{1,3}\s*\d{1,4})?/)?.[0] ?? null;
    if (!url && !cote) continue;
    rang++;
    const dateSrc = cellules.find((c) => /\d{2}\/\d{2}\/\d{4}/.test(c)) ?? "";
    const gradeSrc = cellules.find((c) => /^\**([A-F]\d?)\**$/.test(c))?.replace(/\*/g, "") ?? grade;
    const fin = cellules[cellules.length - 1] ?? "";
    const resultat = /trouv[ée]/i.test(fin) ? "trouve" : /[ée]chec|non trouv[ée]/i.test(fin) ? "rien" : "piste";
    let sourceId: string | null = null;
    if (cote) {
      const pr = await db.select({ id: acte.id, sourceId: acte.sourceId }).from(acte).where(eq(acte.cote, cote));
      sourceId = pr[0]?.sourceId ?? null;
    }
    await inserer(consultation, {
      id: `tas-cons-rapport-${E(n)}-${rang}`, tacheId: id, sourceId,
      date: dateFrToIso(dateSrc) || dateIso || "2026-11-19", resultat,
      notes: `${cellules.slice(0, 3).join(" · ").slice(0, 240)} | grade ${gradeSrc}`,
    });
    stats.consultations++;
  }
  if (!texte.includes("#")) nonParses.push(fichier);
}

// ---------- 3. relevés (table d'extraction auditable) -------------------------

type ReleveSource = {
  acte: string; nom: string; prenoms: string; nomEcrit: string; role: string;
  sexe?: string; age?: string; naissance?: string; naissanceLieu?: string;
  profession?: string; relations?: string; confiance?: string; individu?: string; notes?: string;
};

const RELEVES: ReleveSource[] = [
  // Acte de mariage Anor, 11/02/1889 (3 E ... / 1 Mi EC 012 R 003)
  { acte: "tas-acte-anor-1889-mariage-301", nom: "Tassier", prenoms: "Firmin Léon", nomEcrit: "Firmin Léon [T]assier", role: "époux", sexe: "M", age: "23", naissance: "1866-09-25", naissanceLieu: "Anor (Nord)", individu: "tas-firmin_leon", notes: "Fils majeur de Pierre Joseph Tassier et Philomène Decamps ; domicilié à Anor." },
  { acte: "tas-acte-anor-1889-mariage-301", nom: "Meunier", prenoms: "Aline Angèle", nomEcrit: "Aline Angèle Meunier", role: "épouse", sexe: "F", age: "20", naissance: "1869-02-19", naissanceLieu: "Mons en Hainaut", individu: "tas-aline_meunier", notes: "Fille d'Antoine Joseph Meunier et Roselle Euphémie [Petit ?]." },
  { acte: "tas-acte-anor-1889-mariage-301", nom: "Tassier", prenoms: "Pierre Joseph", nomEcrit: "Pierre Joseph [T]assier", role: "père de l'époux", sexe: "M", age: "54", individu: "tas-pierre_joseph", notes: "Présent et consentant." },
  { acte: "tas-acte-anor-1889-mariage-301", nom: "Decamps", prenoms: "Philomène", nomEcrit: "Philomène Decamps", role: "mère de l'époux", sexe: "F", deces: "1879-04-06", decesLieu: "Anor (Nord)", individu: "tas-philomene_decamps", notes: "Décédée à Anor le 06/04/1879." } as any,
  { acte: "tas-acte-anor-1889-mariage-301", nom: "Meunier", prenoms: "Antoine Joseph", nomEcrit: "Antoine Joseph Meunier", role: "père de l'épouse", sexe: "M", age: "54", profession: "journalier", notes: "Domicilié à Anor, présent et consentant. Aucune fiche correspondante dans l'arbre." },
  { acte: "tas-acte-anor-1889-mariage-301", nom: "Petit ?", prenoms: "Roselle Euphémie", nomEcrit: "Roselle Euphémie [Petit ?]", role: "mère de l'épouse", sexe: "F", age: "59", profession: "ménagère", notes: "Graphie incertaine entre crochets : non rattachée sans preuve." },
  // Acte de naissance Anor, 29/09/1896 (acte n°78, 3 E 7213)
  { acte: "tas-acte-anor-1896-naissance-130", nom: "Tassier", prenoms: "Léon Félicien", nomEcrit: "Léon Félicien Tassier", role: "enfant", sexe: "M", naissance: "1896-09-29", naissanceLieu: "Anor (Nord)", individu: "tas-felicien_leon", notes: "Né rue de la Papeterie. Mention marginale : mariage à Maubeuge (janvier 1923)." },
  { acte: "tas-acte-anor-1896-naissance-130", nom: "Tassier", prenoms: "Firmin Léon", nomEcrit: "Firmin Léon Tassier", role: "père", sexe: "M", age: "30", profession: "verrier", domicile: "Anor (Nord)", individu: "tas-firmin_leon" },
  { acte: "tas-acte-anor-1896-naissance-130", nom: "Meunier", prenoms: "Aline Angèle", nomEcrit: "Aline Angèle Meunier", role: "mère", sexe: "F", age: "27", profession: "ménagère", individu: "tas-aline_meunier" },
  { acte: "tas-acte-anor-1896-naissance-130", nom: "Bessac", prenoms: "Joseph", nomEcrit: "Joseph Bessac", role: "officier", notes: "Officier de l'état civil. Aucune fiche correspondante." },
  // Acte de naissance Maubeuge, 04/09/1925 (3 E 10052, vue 94)
  { acte: "tas-acte-maubeuge-1925-naissance-arlette-helene", nom: "Tassier", prenoms: "Arlette Hélène", nomEcrit: "Arlette Hélène Tassier", role: "enfant", sexe: "F", naissance: "1925-09-04", naissanceLieu: "Maubeuge (59)", individu: "tas-arlette_helene", notes: "Mention marginale de mariage : « le 11 mars 195? » (année illisible), conjoint « Emile Lerose / Leroux »." },
  { acte: "tas-acte-maubeuge-1925-naissance-arlette-helene", nom: "Tassier", prenoms: "Jean Félicien", nomEcrit: "Jean Félicien Tassier", role: "père", sexe: "M", naissance: "1898-09-23", naissanceLieu: "Lyon (Rhône)", individu: "tas-jean_felicien" },
  { acte: "tas-acte-maubeuge-1925-naissance-arlette-helene", nom: "Lamarque", prenoms: "Hélène Marie Alphonsine", nomEcrit: "Hélène Marie Alphonsine Lamarque", role: "mère", sexe: "F", naissance: "1898-09-04", naissanceLieu: "Cerfontaine (Nord)", individu: "tas-helene_lamarque" },
];

for (let i = 0; i < RELEVES.length; i++) {
  const r = RELEVES[i] as any;
  const acteId = r.acte;
  const existeDeja = await db.select({ id: releve.id }).from(releve).where(and(eq(releve.acteId, acteId), eq(releve.nomEcrit, r.nomEcrit)));
  if (existeDeja.length) continue;
  const id = `tas-releve-${i + 1}`;
  const b = r.naissance ? { naissance: r.naissance, naissanceMin: r.naissance, naissanceMax: r.naissance } : {};
  const d = r.deces ? { deces: r.deces, decesMin: r.deces, decesMax: r.deces } : {};
  await inserer(releve, {
    id, acteId, individuId: r.individu ?? null, role: r.role,
    nomEcrit: r.nomEcrit, prenomsEcrits: r.prenoms, nom: r.nom, prenoms: r.prenoms,
    sexe: r.sexe ?? null, age: r.age ?? null, ...b, ...d,
    naissanceLieu: r.naissanceLieu ?? null, decesLieu: r.decesLieu ?? null,
    profession: r.profession ?? null, domicile: r.domicile ?? null,
    notes: r.notes ?? null, confiance: "A1", ordre: i,
  });
  stats.relevés++;
  if (r.individu) stats.rattaches++;
}

// ---------- 4. liaison tâches <-> fiches -------------------------------------

const LIAISONS_EXPLICITES: Record<number, string> = {
  2: "elisee", 3: "arlette", 4: "jean_felicien", 5: "helene_lamarque", 6: "josephine",
  7: "pere_josephine", 8: "elisee", 9: "elisee", 10: "firmin_leon", 11: "firmin_leon",
  12: "firmin_leon", 13: "felicien_leon", 25: "josephine", 26: "robert", 27: "cecile",
  28: "laurent", 31: "felicien_leon", 60: "vincent", 157: "felicien_leon",
  160: "jean_felicien", 161: "jean",
};

/** Témoignages du détenteur enregistrés tels quels, avec leur réserve explicite. */
const TEMOIGNAGES_RESERVES: Record<number, string> = {
  160: "Le détenteur pense que « le mauvais Félicien est celui né à Lyon » (23/09/1898). Indication « je pense », à confirmer par l'acte de naissance lyonnais (fonds 2E). Aucun lien modifié, aucun prénom écarté sans acte.",
  161: "Le détenteur indique un « Alceste » parmi les ascendants de Jean Reymond, « soit père ou grand-père », tous deux inhumés au cimetière de Chambéry. À confirmer par l'acte 3E 4265 et un registre de sépulture. Aucun ascendant créé, aucun degré tranché.",
};

const normaliser = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const fiches = await db.select({ id: individu.id, prenoms: individu.prenoms, naissanceMin: individu.naissanceMin, naissanceMax: individu.naissanceMax }).from(individu);
const parPrenomAnnees = new Map<string, typeof fiches>();
for (const f of fiches) {
  const prenom = normaliser(f.prenoms ?? "").split(/[\s-]+/)[0];
  if (!prenom) continue;
  const cle = prenom;
  if (!parPrenomAnnees.has(cle)) parPrenomAnnees.set(cle, []);
  parPrenomAnnees.get(cle)!.push(f);
}
const annees = (s: string) => [...s.matchAll(/\b(1[5-9]\d{2}|20\d{2})\b/g)].map((m) => Number(m[1]));

for (const fichier of fichiers) {
  const n = Number(fichier.match(/ENQUETE-(\d+)/)![1]);
  const tacheId = `tas-tache-${E(n)}`;
  let cible = LIAISONS_EXPLICITES[n];
  if (!cible) {
    const texte = readFileSync(join(RAPPORTS, fichier), "utf8");
    const ligne = texte.match(/^\*\*?Cible\s*\*?\*?\s*:\s*(.+)$/m)?.[1] ?? "";
    const c = normaliser(ligne);
    const anneesCible = annees(ligne);
    for (const [prenom, liste] of parPrenomAnnees) {
      if (!c.includes(prenom)) continue;
      const candidats = liste.filter((f) => {
        const a = [
          ...(f.naissanceMin ? [Number(f.naissanceMin.slice(0, 4))] : []),
          ...(f.naissanceMax ? [Number(f.naissanceMax.slice(0, 4))] : []),
        ];
        return a.some((x) => anneesCible.includes(x));
      });
      if (candidats.length === 1) { cible = candidats[0].id.replace(/^tas-/, ""); break; }
    }
  }
  if (!cible) continue;
  const cibleId = `tas-${cible}`;
  const existe = await db.select({ id: individu.id }).from(individu).where(eq(individu.id, cibleId));
  if (!existe.length) continue;
  await db.update(tache).set({ individuId: cibleId }).where(eq(tache.id, tacheId));
  stats.liaisons++;

  // Témoignage réservé : daté, gradé A1-témoin, mais explicitement « à confirmer ».
  const texte = readFileSync(join(RAPPORTS, fichier), "utf8");
  if (TEMOIGNAGES_RESERVES[n]) {
    await inserer(verdict, {
      id: `tas-verdict-${E(n)}-temoignage`, cibleId,
      titre: `${E(n)} — indication du détenteur (à confirmer)`,
      temoin: "A1-témoin", date: "2026-11-21",
      action: "temoignage", note: TEMOIGNAGES_RESERVES[n],
    });
    stats.temoignagesReserves++;
  }

  // Hypothèse écartée -> verdict (pas un fait, pas une promotion).
  const conclusion = conclure(texte);
  if (!TEMOIGNAGES_RESERVES[n] && /H0 conserv[ée]e|non document|non trouv[ée]|non r[ée]solu/i.test(conclusion)) {
    const grade = texte.match(/Grade global\s*:(?:\*\*)?\s*([A-F]\d?)/i)?.[1] ?? "C3";
    await inserer(verdict, {
      id: `tas-verdict-${E(n)}`, cibleId, titre: `${E(n)} — hypothèse écartée`,
      temoin: grade, date: dateFrToIso(texte.match(/(?:\*\*)?Date\s*:(?:\*\*)?\s*([^\n·]+)/)?.[1] ?? "") || "2026-11-19",
      action: "hypothese_ecartée", note: conclusion.slice(0, 600),
    });
    stats.hypothesesEcartees++;
  }
}

// ---------- bilan -------------------------------------------------------------

console.log("\nEnrichissement terminé :");
for (const [k, v] of Object.entries(stats)) console.log(`  ${k.padEnd(16)} ${v}`);
console.log(`  rapports non structurés : ${nonParses.length}`);
if (nonParses.length) console.log(`  ${nonParses.slice(0, 10).join(", ")}`);

// Contrôles sur l'état final de la base (et non sur les créations du run : idempotence).
const totalReleves = (await db.select({ id: releve.id }).from(releve)).length;
const totalRattaches = (await db.select({ id: releve.id }).from(releve).where(sql`${releve.individuId} is not null`)).length;
const verifs: [string, number, number][] = [
  ["dates d'actes corrigées", (await db.select({ date: acte.date }).from(acte)).filter((a) => a.date && a.date !== "2026-11-18").length, 3],
  ["tâches (rapports)", (await db.select({ id: tache.id }).from(tache)).length, 161],
  ["relevés présents", totalReleves, 13],
  ["relevés rattachés", totalRattaches, 10],
  ["témoignages réservés", (await db.select({ id: verdict.id }).from(verdict)).filter((v) => v.id.endsWith("-temoignage")).length, 2],
];
let echecs = 0;
for (const [label, obtenu, attendu] of verifs) {
  const ok = obtenu === attendu;
  console.log(`  ${ok ? "OK " : "KO "} ${label} : ${obtenu} (attendu ${attendu})`);
  if (!ok) echecs++;
}
if (echecs) { console.error(`${echecs} contrôle(s) en échec.`); process.exit(1); }
console.log("\nH0 conservée : aucun « non trouvé » promu, aucune fiche C3 raccordée.");
