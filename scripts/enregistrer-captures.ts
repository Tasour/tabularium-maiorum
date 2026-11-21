/*
 * Enregistre les captures de sources publiques dans un registre SHA-256.
 * Idempotent : refus d'écraser une empreinte existante sous un autre nom.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const RACINE = new URL("..", import.meta.url).pathname;
const DOSSIER = join(RACINE, "preuves", "screens-sources-2026-11-21");
const REGISTRE = join(RACINE, "data", "preuves-sources.json");
const DATE = "2026-11-21";

const SOURCES: Record<string, { titre: string; url: string; grade: string; contenu: string }> = {
  "gw-geneanet-org-btrichet": { titre: "Geneanet — Familles de Thiérache (arborescence TASSIER)", url: "https://gw.geneanet.org/btrichet?lang=fr&n=tassier&oc=1", grade: "C3", contenu: "Arborescence depuis A. Jean Le TASSIER ca 1550-1578 ; déjà représentée dans les 653 PZ." },
  "myheritage-no-names-leon-tassier-2026-11-21-14_19_01-2": { titre: "MyHeritage — résultats « Léon Tassier » (65+)", url: "https://www.myheritage.com/", grade: "C3", contenu: "75 documents, champs de naissance vides : homonymes non identifiés, aucun rattachement." },
  "myheritage-no-names-leon-tassier-2026-11-21-14_19_01": { titre: "MyHeritage — détail Léon Félicien Tassier 1896-1980", url: "https://www.myheritage.com/", grade: "C3", contenu: "Décès 1980 transmis par un arbre, sans pièce : homonyme non promu." },
  "morts-fr-nom-de-famille-tassier": { titre: "morts.fr — avis de décès Tassier (90, 1971-2024)", url: "https://morts.fr/noms-de-famille/tassier", grade: "B1", contenu: "Section Nord (59) : Élie 1923→1997, Emmanuel 1929→2000, Arlette Hélène 1925→2022, Léon Félicien 1896→1980. Même fonds INSEE." },
  "acte-deces-fr-recherche-deces-famille-tassier": { titre: "Acte-Décès.fr — décès familles Tassier (90 actes)", url: "https://www.acte-deces.fr/recherche-deces-famille-tassier", grade: "B1", contenu: "INSEE depuis 1970, mise à jour 23/10/2026. Aucun décès supplémentaire de nos cibles." },
  "geneafrance": { titre: "GénéaFrance — décès Tassier (naissance + décès + commune)", url: "https://www.geneafrance.fr/", grade: "B1", contenu: "Sources multiples (Mémoire des Hommes, INSEE). Élie 1923 Maubeuge→1997 Maubeuge, Emmanuel 1929→2000 Maubeuge, Léon Félicien 1896 Anor→1980 Maubeuge." },
};

let registre: any = { date: DATE, regles: ["SHA-256 de la capture", "grade B1 = dérivé INSEE, jamais A1", "même fonds = pas de gain de grade"], preuves: [] };
if (existsSync(REGISTRE)) registre = JSON.parse(readFileSync(REGISTRE, "utf8"));
const parHash = new Map<string, string>();
for (const p of registre.preuves ?? []) {
  if (parHash.has(p.sha256)) throw new Error(`Conflit de hash : ${p.sha256} déjà enregistré sous ${parHash.get(p.sha256)} et ${p.fichier}`);
  parHash.set(p.sha256, p.fichier);
}
const deja = new Set((registre.preuves ?? []).map((p: any) => p.fichier));
let ajoutees = 0;
for (const fichier of readdirSync(DOSSIER).filter((f) => f.endsWith(".png")).sort()) {
  if (deja.has(`preuves/screens-sources-2026-11-21/${fichier}`)) continue;
  const cle = Object.keys(SOURCES).find((k) => fichier.includes(k));
  const buf = readFileSync(join(DOSSIER, fichier));
  const sha256 = createHash("sha256").update(buf).digest("hex");
  if (parHash.has(sha256)) throw new Error(`Conflit : ${fichier} a le même SHA-256 que ${parHash.get(sha256)}`);
  const info = SOURCES[cle ?? ""] ?? { titre: fichier, url: "", grade: "C3", contenu: "Capture source, non classée." };
  registre.preuves.push({
    id: `capture-${DATE}-${cle ?? "divers"}`, fichier: `preuves/screens-sources-2026-11-21/${fichier}`,
    sha256, titre: info.titre, source_url: info.url, cote: "", date: DATE, grade: info.grade,
    contenu: info.contenu, taille_octets: buf.length,
  });
  parHash.set(sha256, fichier);
  ajoutees++;
}
mkdirSync(join(RACINE, "data"), { recursive: true });
writeFileSync(REGISTRE, JSON.stringify(registre, null, 2), "utf8");
console.log(`${ajoutees} capture(s) enregistrée(s), ${registre.preuves.length} au total.`);
