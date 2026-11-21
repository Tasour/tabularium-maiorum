/*
 * Complétion des fiches à partir de faits déjà présents dans la base (relevés d'actes A1)
 * et de règles de qualité. Idempotent, aucune valeur inventée, aucune promotion C3.
 *
 * 1. Sexe : normalisation f -> F ; complétion depuis le sexe relevé dans l'acte.
 * 2. Dates exactes et lieux : depuis les relevés rattachés (actes lus).
 * 3. Professions : depuis les relevés rattachés, seulement si le champ est vide.
 * 4. Anonymes `? ?` : qualificatif « À identifier ».
 * 5. PZ sans date : note explicite « aucune date connue dans la source ».
 * 6. Lieux non géolocalisés : note « coordonnées non vérifiées » (jamais de coordonnée devinée).
 */
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { individu, lieu, releve } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

const stats: Record<string, number> = { sexeNormalise: 0, sexeReleve: 0, dates: 0, lieux: 0, professions: 0, anonymes: 0, notesDate: 0, notesLieu: 0 };
const ajouterNote = (notes: string | null, texte: string) => [notes, texte].filter(Boolean).join("\n");

const tous = await db.select().from(individu);
const parId = new Map(tous.map((i) => [i.id, i]));
const releves = await db.select().from(releve);

// --- 1. sexe ------------------------------------------------------------------
for (const i of tous) {
  if (i.sexe === "f") {
    await db.update(individu).set({ sexe: "F" }).where(eq(individu.id, i.id));
    stats.sexeNormalise++;
  }
}
for (const r of releves) {
  if (!r.individuId || !r.sexe || !["M", "F"].includes(r.sexe)) continue;
  const i = parId.get(r.individuId);
  if (!i || i.sexe) continue;
  await db.update(individu).set({
    sexe: r.sexe,
    notes: ajouterNote(i.notes, `Sexe « ${r.sexe} » relevé dans l'acte ${r.acteId} (rôle ${r.role ?? "non précisé"}).`),
  }).where(eq(individu.id, i.id));
  i.sexe = r.sexe;
  stats.sexeReleve++;
}

// --- 2 & 3. dates, lieux, professions depuis les relevés -----------------------
const ISO = /^\d{4}-\d{2}-\d{2}$/;
for (const r of releves) {
  if (!r.individuId) continue;
  const i = parId.get(r.individuId);
  if (!i) continue;
  const patch: Record<string, unknown> = {};
  const notes: string[] = [];

  // Naissance exacte relevée : ne remplacer qu'une année seule.
  if (r.naissance && ISO.test(r.naissance) && (!i.naissance || /^\d{4}$/.test(i.naissance))) {
    patch.naissance = r.naissance;
    patch.naissanceMin = r.naissance;
    patch.naissanceMax = r.naissance;
    notes.push(`Date de naissance précisée au ${r.naissance} d'après l'acte ${r.acteId} (valeur antérieure : ${i.naissance}).`);
  }
  if (r.deces && ISO.test(r.deces) && (!i.deces || /^\d{4}$/.test(i.deces))) {
    patch.deces = r.deces;
    patch.decesMin = r.deces;
    patch.decesMax = r.deces;
    notes.push(`Date de décès précisée au ${r.deces} d'après l'acte ${r.acteId} (valeur antérieure : ${i.deces}).`);
  }
  // Lieu de naissance relevé : ne remplacer que « à préciser / à confirmer ».
  if (r.naissanceLieu && (!i.naissanceLieuId || (i.naissanceLieuId ?? "").includes("a-preciser"))) {
    let l = (await db.select().from(lieu)).find((x) => x.nom.toLowerCase() === r.naissanceLieu!.toLowerCase());
    if (!l) {
      const id = `tas-lieu-${r.naissanceLieu.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
      await db.insert(lieu).values({ id, nom: r.naissanceLieu, notes: "Lieu relevé dans un acte ; hors de France ou non géolocalisé." }).onConflictDoNothing();
      l = (await db.select().from(lieu)).find((x) => x.id === id) ?? null;
    }
    if (l) {
      patch.naissanceLieuId = l.id;
      notes.push(`Lieu de naissance précisé : « ${r.naissanceLieu} » d'après l'acte ${r.acteId}.`);
    }
  }
  if (!i.profession && r.profession) {
    patch.profession = r.profession;
    notes.push(`Profession « ${r.profession} » relevée dans l'acte ${r.acteId}.`);
  }
  if (!Object.keys(patch).length) continue;
  if (notes.length) patch.notes = ajouterNote(i.notes, notes.join(" "));
  await db.update(individu).set(patch).where(eq(individu.id, i.id));
  if (patch.naissance || patch.deces) stats.dates++;
  if (patch.naissanceLieuId) stats.lieux++;
  if (patch.profession) stats.professions++;
  Object.assign(i, patch);
}

// Décès de Philomène Decamps : « décédée à Anor le 06/04/1879 » (acte de mariage 1889, A1).
const philomene = parId.get("tas-philomene_decamps");
if (philomene && !philomene.decesLieuId) {
  await db.update(individu).set({
    decesLieuId: "tas-lieu-anor-nord",
    notes: ajouterNote(philomene.notes, "Lieu de décès « Anor » lu dans l'acte de mariage du 11/02/1889 (1 Mi EC 012 R 003)."),
  }).where(eq(individu.id, philomene.id));
  stats.lieux++;
}

// --- 4. anonymes --------------------------------------------------------------
for (const i of tous) {
  if (!i.id.startsWith("tas-pz-")) continue;
  if (i.nom === "?" && i.prenoms === "?" && !i.qualificatif) {
    await db.update(individu).set({ qualificatif: "À identifier" }).where(eq(individu.id, i.id));
    stats.anonymes++;
  }
}

// --- 5 & 6. notes explicites --------------------------------------------------
for (const i of tous) {
  if (!i.id.startsWith("tas-pz-")) continue;
  const notes = i.notes ?? "";
  if (!i.naissance && !notes.includes("Aucune date connue dans la source")) {
    await db.update(individu).set({ notes: ajouterNote(notes, "Aucune date connue dans la source Geneanet.") }).where(eq(individu.id, i.id));
    stats.notesDate++;
  }
}
const NOTE_LIEU = "Coordonnées non vérifiées : nom ambigu ou marqué « à confirmer / à préciser ».";
for (const l of await db.select().from(lieu)) {
  if (l.latitude != null || l.longitude != null) continue;
  const lignes = [...new Set((l.notes ?? "").split("\n").filter(Boolean))];
  const deja = lignes.some((x) => x.toLowerCase().includes("coordonnées non vérifiées"));
  const notes = deja ? lignes.join("\n") : [...lignes, NOTE_LIEU].join("\n");
  if (notes !== l.notes) {
    await db.update(lieu).set({ notes }).where(eq(lieu.id, l.id));
    stats.notesLieu++;
  }
}

console.log("Complétion terminée :");
for (const [k, v] of Object.entries(stats)) console.log(`  ${k.padEnd(16)} ${v}`);
console.log("Aucune promotion C3, aucune valeur inventée.");
