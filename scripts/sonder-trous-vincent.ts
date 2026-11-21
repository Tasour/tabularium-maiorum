/*
 * Sondage API des 4 trous proches de l'ascendance de Vincent (21/11/2026).
 * DELETE : aucun résultat n'est promu en fait. Tout est compare aux bornes
 * connues de la fiche ; un homonyme n'est jamais raccorde (H0 conservee).
 * Ce script est un enregistrement auditable : il ecrit un rapport daté.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const RACINE = new URL("..", import.meta.url).pathname;
const DATE = "2026-11-21";

const CIBLES = [
  { id: "tas-arlette", nom: "Arlette Roussette", naissance: null, deces: null, lastName: "ROUSSETTE", firstName: "Arlette" },
  { id: "tas-jean", nom: "Jean Alceste Alfred Reymond", naissance: "1936-04-21", deces: "2023-11-02", lastName: "REYMOND", firstName: "Jean" },
  { id: "tas-helene_lamarque", nom: "Hélène Marie Alphonsine Lamarque", naissance: "1898-09-04", deces: null, lastName: "LAMARQUE", firstName: "Helene" },
  { id: "tas-delphine_favre", nom: "Delphine Favre", naissance: "~1899", deces: null, lastName: "FAVRE", firstName: "Delphine" },
  { id: "tas-josephine", nom: "Joséphine Juliette Favre", naissance: "1938-11-20", deces: null, lastName: "FAVRE", firstName: "Josephine" },
];

const annee = (s: string | null | undefined) => (s ? Number.parseInt(String(s).slice(0, 4), 10) : null);
const lignes = [
  "# Sondage API — trous proches de l'ascendance de Vincent",
  "",
  `**Date :** ${DATE} · **Source :** fichier des personnes décédées (INSEE / matchID), API publique, grade **B1** (dérivé).`,
  "",
  "Règle appliquée : un décès n'est retenu comme **indice** que si l'année de naissance est compatible avec la fiche (± 2 ans). Sinon c'est un **homonyme écarté** (H0 conservée). Aucun lien n'est modifié, aucune cote inventée.",
  "",
  "| Cible | Année attendue | Résultat du sondage | Conclusion |",
  "|---|---|---|---|",
];

for (const c of CIBLES) {
  const url = `https://deces.matchid.io/deces/api/v1/search?lastName=${encodeURIComponent(c.lastName)}&firstName=${encodeURIComponent(c.firstName)}&size=20`;
  let etat = "non vérifié (API inaccessible)";
  try {
    const reponse = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!reponse.ok) etat = `non vérifié (HTTP ${reponse.status})`;
    else {
      const json = (await reponse.json()) as any;
      const personnes = Array.isArray(json?.response?.persons) ? json.response.persons : [];
      const an = annee(c.naissance?.replace("~", ""));
      const dec = annee(c.deces);
      const compatibles = personnes.filter((x: any) => {
        const na = Number.parseInt(String(x?.birth?.date ?? "").slice(0, 4), 10);
        const da = Number.parseInt(String(x?.death?.date ?? "").slice(0, 4), 10);
        const naissanceOk = an != null && Number.isFinite(na) && Math.abs(na - an) <= 2;
        // Quand le décès de la cible est déjà documenté, l'écarter est discriminant :
        // un homonyme mort avant cette date ne peut pas être la même personne.
        const decesOk = dec == null || (Number.isFinite(da) && Math.abs(da - dec) <= 2);
        const nomOk = String(x?.name?.last ?? "").toLowerCase() === c.lastName.toLowerCase();
        const prenomOk = !x?.name?.first?.length || String(x.name.first[0]).toLowerCase().startsWith(c.firstName.toLowerCase().slice(0, 4));
        return naissanceOk && decesOk && nomOk && prenomOk;
      });
      const critere = c.deces ? "naissance + décès" : "naissance";
      etat = compatibles.length
        ? `${compatibles.length} décès à ${critere} compatible (${compatibles.slice(0, 3).map((x: any) => `${x.name.first.join(" ")} ${x.name.last}, ${x.birth.date} → ${x.death.date}`).join(" ; ")})`
        : `${personnes.length} décès au nom/prénom proche, **aucun** à ${critere} compatible (homonymes écartés)`;
    }
  } catch (e) { etat = `non vérifié (${e instanceof Error ? e.message : "réseau"})`; }
  const attendu = c.naissance ? (annee(c.naissance?.replace("~", "")) ?? "?") : "inconnue";
  const conclusion = etat.startsWith("0") || etat.includes("aucun") ? "silence documentaire d'accès — H0 conservée" : "indice à vérifier sur acte";
  lignes.push(`| ${c.nom} (${c.id}) | ${attendu} | ${etat} | ${conclusion} |`);
}

lignes.push("", "## Limites", "",
  "- Le fichier INSEE ne couvre que les décès depuis **1970** : l'absence d'un décès plus ancien est un silence d'accès, pas une preuve négative.",
  "- Aucun résultat n'a été promu en filiation ; les homonymes restent écartés.",
  "- Aucune cote d'acte n'est produite par cette source ; les démarches de copie restent à faire par le détenteur.",
  "", `Fin du sondage — livrable unique \`docs/sondage-trous-vincent-${DATE}.md\`.`, "");

mkdirSync(join(RACINE, "docs"), { recursive: true });
const chemin = join(RACINE, "docs", `sondage-trous-vincent-${DATE}.md`);
writeFileSync(chemin, lignes.join("\n"), "utf8");
console.log(`Sondage enregistré : ${chemin}`);
