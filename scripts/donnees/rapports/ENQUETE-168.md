# Enquête 168 — Plan de lecture Trélon 1700-1800 : transformer E167 en démarche ciblée

**Date :** 21/11/2026 · **Grade global :** **A1** pour les notices de disponibilité (cotes et ARK) ; **non établi** pour tout acte (images non lues) · **Conclusion :** la divergence E167 (deux fils pour Jean-Baptiste) a un **plan de résolution concret** : 3 registres numérisés couvrent 1694-1828 — **H0 conservée**, aucun acte lu.

> Suite de `ENQUETE-167.md`. Livrable unique `ENQUETE-168.md`. Méthode : intégration de `ENQUETE-81.md` (jamais importée) et cadrage des années repères de notre chaîne Sosa (1748 Lambert, 1753 Jeanne Catherine, 1791 Jean-Baptiste, 1796 Anne Joseph).

## Question fermée

**Les registres Trélon disponibles permettent-ils de trancher le conflit entre Pierre Joseph et Théodule, fils déclarés de Jean-Baptiste ?** Oui / non / non vérifiable — une seule réponse, sachant qu'aucune image n'a été lue ici.

## Hypothèses

| Hypothèse | Énoncé | Statut en fin d'enquête |
| --- | --- | --- |
| **H0** | Homonymie : sans acte lu, le choix entre les deux fils reste indécidable. | **Conservée** |
| **H1** | Une ligne TASSIER dans `5 Mi 011 R 022` aux années 1748/1753/1791/1796 permet la jonction documentée. | **Attendue, non documentée** : registre localisé, images non lues |
| **H2** | Le registre `5 Mi 011 R 023` (1793-1828) porte la naissance de Jean-Baptiste (1791) — impossible, l'année 1791 est **avant** 1793 → à chercher en `5 Mi 011 R 022`. | **Cadrage temporel établi** (A1) |
| **H3** | Non résolu faute de lecture d'images. | **Conclusion retenue** |

## Sources gradées (code Admiralty A-F, 1-6)

| ID | Source | URL / cote | Date | Grade | Apport / limite |
| --- | --- | --- | --- | --- | --- |
| S1 | Notice **Trélon BMS (lacunes) 1694-1792** — 1 211 medias | `5 Mi 011 R 022` · `https://archivesdepartementales.lenord.fr/ark:/33518/2vrh76qlk459` | 19/11/2026 (reprise E81) | **A1** (notice) | **Prouve** : couverture de 1694 à 1792 → contient les années repères **1748, 1753, 1791**. **Ne prouve pas** : la présence d'un acte TASSIER. Titre signale des **lacunes**. |
| S2 | Notice **Trélon BMS (lacunes) 1635-1726** — 250 medias | `5 Mi 011 R 021` · `https://archivesdepartementales.lenord.fr/ark:/33518/frn1sc6qvl3b` | 19/11/2026 | **A1** (notice) | Couverture chevauchant 1700-1726. **Ne prouve aucun acte lu**. |
| S3 | Notice **Trélon NMD 1793-1828** — 1 110 medias | `5 Mi 011 R 023` · `https://archivesdepartementales.lenord.fr/ark:/33518/sfg3cdv8k916` | 19/11/2026 | **A1** (notice) | Couvre l'état civil républicain. **Ne couvre PAS 1791** (avant 1793) : piège temporel évité. |
| S4 | Tables décennales Trélon **1792-1802** et **1802-1812** | cotes relevées dans E81 | 19/11/2026 | **A1** (inventaire) | Servent d'**index**, jamais de preuve de filiation. |

## Résultat

- **`trouvé` (A1, niveau contenant)** — 3 cotes + ARK enregistrées comme **sources d'inventaire** (jamais comme actes). Les 4 années repères de notre chaîne ont un registre correspondant :
  - **1748** (Lambert) et **1753** (Jeanne Catherine) → `5 Mi 011 R 022` (BMS 1694-1792) ;
  - **1791** (Jean-Baptiste) → `5 Mi 011 R 022` **uniquement** (avant l'état civil de 1793) ;
  - **1796** (Anne Joseph Fontaine) → `5 Mi 011 R 023` (NMD 1793-1828).
- **`non trouvé`** — **aucune image lue** sur 2 571 medias. Aucune ligne TASSIER relevée, aucun acte, aucune cote d'acte. La divergence E167 reste ouverte.
- **`cadré`** — le conflit « deux fils de Jean-Baptiste » (E167) a désormais une **procédure de résolution** : lire l'index TD puis les pages BMS aux années repères, et exiger date + paroisse + parents + numéro d'acte.
- **Conclusion : H0 conservée, H3 retenue.** Enquête de **préparation de lecture**, pas de preuve.

**Transcription littérale : aucune** — aucune image n'a été ouverte.

## Ce qui ferait changer la conclusion

- **Trancherait E167** : une ligne TASSIER lue dans `5 Mi 011 R 022` à 1791 avec parents, puis un acte nommant le père de Jean-Baptiste → élévation au grade A1 et choix argumenté entre 181 et 228.
- **Écarterait H1** : lecture intégrale des pages des années repères sans entrée TASSIER (silence documentaire d'index, pas preuve négative).
- **Ne ferait pas changer la conclusion** : la disponibilité des registres (déjà prouvée), les tables décennales seules, le drapeau `is_sosa` de l'arbre Geneanet.

## Prochaine action concrète

1. Ouvrir l'index TD 1792-1802, puis les vues `5 Mi 011 R 022` autour de **1791**, **1753**, **1748** ; relever littéralement toute ligne TASSIER.
2. Pour chaque ligne, ouvrir l'acte et exiger date, paroisse, parents et numéro d'acte.
3. Ne modifier la chaîne Sosa qu'après un acte A1 — jamais sur une ligne d'index seule (H0).
4. Mettre à jour `docs/demandes-actes.md` avec ces cotes de lecture.

*Fin de l'enquête 168 — livrable unique `ENQUETE-168.md` ; H0 conservée.*
