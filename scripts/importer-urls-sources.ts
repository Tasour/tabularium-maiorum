/*
 * Import des URL d'archives citées dans les notes des fiches comme objets `source`.
 * Liste blanche de domaines institutionnels / d'archives ; les profils sociaux
 * et annuaires personnels sont volontairement exclus (RGPD, minimisation).
 * Idempotent : une URL déjà présente dans `source` n'est pas recréée.
 */
import { createHash } from "node:crypto";
import { eq } from "drizzle-orm";
import { ouvrirBase } from "../serveur/base";
import { BASE_DONNEES, DOSSIER_MIGRATIONS } from "../serveur/config";
import { db } from "../src/db/client";
import { individu, source } from "../src/db/schema";

ouvrirBase(BASE_DONNEES, DOSSIER_MIGRATIONS);

/** Domaines autorisés : archives, services publics, référentiels officiels. */
const DOMAINES = [
  "archivesdepartementales.lenord.fr", "archives-numeriques.savoie.fr", "archives.savoie.fr",
  "archives.isere.fr", "archives.grenoblealpesmetropole.fr", "fondsenligne.archives-lyon.fr",
  "recherches.archives-lyon.fr", "service-public.fr", "insee.fr", "deces.matchid.io",
  "legifrance.gouv.fr", "ville-gieres.fr", "ville-maubeuge.fr", "libramemoria.com",
  "acte-deces.fr", "jorfsearch.steinertriples.ch", "cnil.fr", "bcgcertification.org",
];
/** Domaines exclus : profils et données de contact (RGPD). */
const EXCLUS = ["linkedin.com", "viadeo.journaldunet.com", "copainsdavant.linternaute.com", "avis-deces.linternaute.com"];

const hote = (url: string) => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; } };
const autorise = (url: string) => {
  const h = hote(url);
  return DOMAINES.some((d) => h === d || h.endsWith(`.${d}`)) && !EXCLUS.some((d) => h.includes(d));
};

const deja = new Set((await db.select({ url: source.url }).from(source)).map((s) => s.url).filter(Boolean) as string[]);
const fiches = (await db.select().from(individu)).filter((i) => i.id.startsWith("tas-") && !i.id.startsWith("tas-pz-"));
let crees = 0, ignores = 0;

for (const f of fiches) {
  for (const ligne of (f.notes ?? "").split("\n")) {
    const m = ligne.match(/^-\s*([^:]+)\s*:\s*(.+?)\s*[—-]\s*(https?:\/\/\S+?)(?:\s*\((.+)\))?\s*$/);
    if (!m) continue;
    const [, type, titre, urlBrut, note] = m;
    const url = urlBrut.replace(/[.,;)]+$/, "");
    if (!autorise(url)) { ignores++; continue; }
    if (deja.has(url)) continue;
    const id = `tas-src-url-${createHash("sha1").update(url).digest("hex").slice(0, 10)}`;
    await db.insert(source).values({
      id, titre: titre.trim().slice(0, 200), typeRegistre: type.trim(), url,
      notes: [`URL relevée dans la fiche ${f.id}.`, note ? `Contexte : ${note}` : ""].filter(Boolean).join(" "),
    }).onConflictDoNothing();
    deja.add(url);
    crees++;
  }
}
console.log(`${crees} source(s) d'archives créée(s), ${ignores} URL(s) personnelle(s)/exclue(s), ${deja.size} URL(s) distincte(s) au total.`);
