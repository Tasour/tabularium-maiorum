# Enquête 169 — Mémoire de l'alerte 1925 : trois lectures convergentes écartées par le détenteur

**Date :** 21/11/2026 · **Grade global :** **A1** (annotation d'acte archivée avec SHA-256) · **Conclusion :** la divergence « Gabourier » est tranchée par le contrôle visuel humain ; la leçon est érigée en contrôle de cohérence vérifiable — **H0 conservée**.

> Livrable unique `ENQUETE-169.md`. Source : `ALERTE-ACTE-1925.md` de l'arbre d'origine et `data/annotations/acte-1925.json` archivé dans le fork (SHA-256 `4097ed37…`), en particulier le champ `resolution_lecture_2026-11-19`.

## Question fermée

**Une convergence de lectures automatiques peut-elle justifier une correction structurante du graphe ?** Oui / non — une seule réponse, documentée par le cas réel.

## Chronologie (faits datés)

| Date | Fait |
|---|---|
| 18/11/2026 | Relecture visuelle (E153) **puis trois lectures indépendantes d'agents** proposent « **Gabourier** » / « Cabourier » pour le père, « Gabourienne » / « Lamarque » pour la mère. |
| 18/11/2026 | L'utilisateur valide « Corriger maintenant » ; correction appliquée (commit `0c32d18`) : nœuds renommés, `proposedParents` supprimés, liens d'Élisée passés en `hypo`, branche Geneanet détachée. |
| 19/11/2026 | L'utilisateur fournit un **grossissement de la ligne du nom** et confirme qu'il s'agit de « **Tassier** » (T majuscule bouclé, puis `assier`). |
| 19/11/2026 | La correction est **annulée** : `jean_felicien` redevient Tassier (Lyon 1898), `helene_lamarque` redevient Lamarque, `proposedParents:["firmin_leon","aline_meunier"]` restauré, liens `paternal` restaurés. |
| 21/11/2026 | L'annotation et sa résolution sont archivées dans le fork comme preuve locale ; un contrôle de cohérence est ajouté. |

## Hypothèses

| Hypothèse | Énoncé | Statut |
|---|---|---|
| **H0** | La cursive manuscrite est ambiguë ; la lecture de l'acte par le détenteur prévaut sur l'inférence d'agents. | **Confirmée par le cas réel** |
| **H1** | Trois lectures convergentes constituent une preuve suffisante. | **Infirmée** — elles avaient toutes tort |
| **H2** | Le nom « Tassier » de l'acte de 1925 est établi. | **Confirmé par l'utilisateur sur l'image** (A1-témoin visuel) |

## Règle mécanique déduite

Aucune modification **structurante** (nom, `parents`, `proposedParents`, filiation) ne peut être appliquée sur la seule lecture d'un agent — **même confirmée plusieurs fois** — sans :
- un **acte A1 lu et archivé** localement, ou
- un **verdict `A1-témoin` daté** du détenteur, idéalement sur l'image elle-même.

Le contrôle `scripts/verifier-ecritures-structurantes.ts` applique cette règle aux données du fork : il vérifie que les 9 liens hypothétiques de la chaîne Sosa n'ont pas été promus et que les 5 témoignages enregistrés portent bien date + grade.

## Résultat

- **`trouvé` (A1)** — la résolution est conservée localement avec son SHA-256, opposable à toute future correction.
- **`vérifié`** — aucun lien hypothétique promu, aucun nom modifié par une lecture d'agent dans le fork.
- **Conclusion : H0 conservée.** Enquête de rigueur, pas d'apport généalogique nouveau.

## Ce qui ferait changer la conclusion

- Un acte A1 archivé contredisant la lecture « Tassier » — aucun à ce jour.
- Un verdict du détenteur révoquant sa confirmation du 19/11/2026 — aucun à ce jour.

## Prochaine action concrète

1. Conserver `data/annotations/acte-1925.json` et son SHA-256.
2. Exécuter `verifier-ecritures-structurantes.ts` avant toute modification du graphe.
3. Ne jamais promouvoir un lien `hypothetique` sans acte ou verdict daté.

*Fin de l'enquête 169 — livrable unique `ENQUETE-169.md` ; H0 conservée.*
