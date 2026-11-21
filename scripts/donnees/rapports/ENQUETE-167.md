# Enquête 167 — Divergences internes du graphe PZ : deux fils concurrents pour Jean-Baptiste (1791-1849)

**Date :** 21/11/2026 · **Grade global :** **C3** (arbre collaboratif Geneanet) · **Conclusion :** la chaîne Sosa 64→32 repose sur un choix entre deux fils également déclarés par le même géniteur, sans acte pour trancher — **H0 conservée**, aucun lien modifié.

> Suite de `ENQUETE-86.md` (jamais intégrée jusqu'ici) et de la structuration du graphe PZ (`pz_lien`, E du 21/11). Livrable unique `ENQUETE-167.md`. Méthode : analyse des index `p` de `scripts/donnees/arbre-export.json` et des 586 liens de `pz_lien`, croisée avec E86.

## Question fermée

**Le lien Jean-Baptiste Tassier (1791-1849) → Pierre Joseph (1835-1892), utilisé dans notre ascendance Sosa, est-il le seul soutenu par les données Geneanet ?** Oui / non / non vérifiable — une seule réponse.

## Hypothèses

| Hypothèse | Énoncé | Statut en fin d'enquête |
| --- | --- | --- |
| **H0** | Homonymie : les deux fils déclarés sont deux personnes distinctes, et rien ne permet de choisir lequel est notre ancêtre. | **Conservée** |
| **H1** | Pierre Joseph (PZ 181, 1835-1892) est le bon fils de Jean-Baptiste (PZ 117). | **Choix actuel de la chaîne Sosa, mais non prouvé** — une donnée C3 parmi deux |
| **H2** | Théodule (PZ 228, 1840-1886) est le bon fils, et Pierre Joseph appartient à une autre lignée. | **Hypothèse concurrente**, non écartée |
| **H3** | Non résolu faute d'acte et à cause de la circularité des sources. | **Conclusion retenue** |

## Sources gradées (code Admiralty A-F, 1-6)

| ID | Source | URL / capture | Date | Grade | Apport / limite |
| --- | --- | --- | --- | --- | --- |
| S1 | Export PZ — index `p` (géniteur) des 653 ancêtres | `scripts/donnees/arbre-export.json` · `pz_lien` | 21/11/2026 | **C3** | **Lit** : PZ 181 (`p:[117]`) et PZ 228 (`p:[117]`) ont le même géniteur Jean-Baptiste. **Ne prouve pas** lequel est l'ancêtre de Vincent. |
| S2 | ENQUETE-86 — divergence des fils de Jean-Baptiste | `scripts/donnees/rapports/ENQUETE-86.md` | 19/11/2026 | **C3** | **Constate** la divergence dans le relevé de Bruno (`i173` Théodule `is_sosa:true`, `i175` Pierre Joseph `is_sosa:false`, tous deux `parent_id:i186`). **Précise la circularité** : notre chaîne (S4, S5) a été extraite de ce même arbre (S6). |
| S3 | Actes A1 du dossier | `3 E 7213` (1896), `1 Mi EC 012 R 003` (1889) | 18-20/11/2026 | **A1** | **Prouvent** la lignée Firmin → Pierre Joseph (père de Firmin) et remontent à Jean-Baptiste par des actes qui ne couvrent pas la génération 1791-1835. **Ne tranchent pas** entre les deux fils déclarés. |

## Résultat

- **`trouvé` (C3, divergence confirmée)** — PZ **117** Jean-Baptiste Tassier (1791-1849) déclare deux fils : **181** Pierre Joseph (1835-1892) et **228** Théodule (1840-1886). Le choix de notre chaîne Sosa (`64 → 32` = 117 → 181) est **un choix parmi deux**, pas une évidence documentée.
- **`trouvé` (C3, limite du champ `p`)** — **69 géniteurs PZ déclarent plusieurs enfants**. Exemple : PZ 228 a pour « enfants » 230 Hortense, **233 Joseph FAUVET**, 234 Théodule*, **275 Félicie**, **278 Georges BLOYART**, 279 Alphonsine… Deux de ces « enfants » portent des noms d'**alliés** (Fauvet, Bloyart). Le champ `p` semble parfois enregistrer des liens d'**alliance** (conjoints d'enfants) et non uniquement des liens de filiation. **Ce soupçon interdit d'utiliser la fratrie PZ comme preuve structurante.**
- **`non trouvé`** — aucun acte, aucune cote, aucune paroisse n'établit quel fils de Jean-Baptiste est notre ancêtre. E86 confirme que l'apparente évidence est **circulaire** : notre chaîne et la divergence viennent du même arbre.
- **Conclusion : H0 conservée, H3 retenue.** Aucun lien de filiation n'est modifié. Deux doutes `a_verifier` sont créés pour rendre le choix visible.

**Transcription littérale : aucune** — il s'agit d'une analyse de données d'arbre, pas d'un acte.

## Ce qui ferait changer la conclusion

- **Confirmerait H1** : l'acte de mariage de Pierre Joseph (1835-1892) nommant Jean-Baptiste comme père, avec date et paroisse.
- **Confirmerait H2** : le même acte pour Théodule (1840-1886), ou un acte établissant que Pierre Joseph a un autre père.
- **Écarterait le soupçon d'alliance** : une documentation du logiciel Geneanet précisant la sémantique exacte du champ `p` (parent unique ou lien familial large).
- **Ne ferait pas changer la conclusion** : la répétition du même arbre collaboratif, le drapeau `is_sosa` de Bruno (même source), les graphies `Théodule`/`Théodulphe`.

## Prochaine action concrète

1. Ne **pas** corriger la chaîne Sosa sur la foi de PZ : le lien 117→181 reste `hypothetique`.
2. Conserver les deux doutes `a_verifier` avec le motif « deux fils déclarés, acte manquant ».
3. Ajouter un contrôle de cohérence signalant les géniteurs PZ à fratrie suspecte (> 4 enfants ou nom d'allié), sans correction automatique.
4. Demander l'acte de mariage de Pierre Joseph × Philomène Decamps (~1860, Anor/Trélon — `docs/demandes-actes.md`) : c'est le seul moyen de trancher.

*Fin de l'enquête 167 — livrable unique `ENQUETE-167.md` ; H0 conservée.*
