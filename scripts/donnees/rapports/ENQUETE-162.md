# Enquête 162 — Décès INSEE croisés (GénéaFrance, morts.fr, Acte-Décès.fr) : reconnaître les homonymes, combler deux décès

**Date :** 21/11/2026 · **Grade global :** **B1** pour les sources dérivées du fichier INSEE (capture SHA-256 vérifiée), **C3** pour Geneanet/MyHeritage, **non établi** pour toute filiation · **Conclusion : **deux décès manquants documentés (Élie, Emmanuel), aucune filiation nouvelle établie — **H0 conservée**.

> Suite des sondages `docs/sondage-trous-vincent-2026-11-21.md`. Livrable unique `ENQUETE-162.md`. Règles appliquées : **un grade ne s'additionne pas** — morts.fr, Acte-Décès.fr et GénéaFrance puisent dans le même fichier INSEE, les recouper n'augmente pas le grade ; une capture est archivée avec son SHA-256 (`data/preuves-sources.json`) ; aucun nom, date ni cote inventé ; RGPD strict (aucune coordonnée).

## Question fermée

**Les décès relevés dans GénéaFrance, morts.fr et Acte-Décès.fr pour les personnes de notre ascendances (Élie, Emmanuel, Arlette Hélène, Léon Félicien, Élisée) permettent-ils de combler un champ vide ou d'établir une filiation ?** Oui / non / non vérifiable — une seule réponse, en distinguant le décès lui-même (B1) de l'identité (non établie sans acte).

## Hypothèses

| Hypothèse | Énoncé | Statut en fin d'enquête |
| --- | --- | --- |
| **H0** | Homonymie : un décès au même nom et à la même naissance n'établit pas qu'il s'agit de notre ancêtre ; seul l'acte de décès nominatif le ferait. | **Conservée** |
| **H1** | Les décès de `1923→1997` (Élie) et `1929→2000` (Emmanuel) appartiennent aux frères d'Élisée connus par la table décennale d'Anor. | **Indice concordant (B1)** : naissance, nom et commune (Maubeuge) coïncident ; non promu sans acte |
| **H2** | Les entrées « Alain Léonard 1932 Denain → 2001 Denain » et « Joséphine Alina Marie 1906 Denain → 1980 Denain » appartiennent à notre lignée. | **Piste C3** : aucune source ne les relie à nos fiches — non raccordé |
| **H3** | Non résolu faute d'actes de décès consultés. | **Conclusion retenue** pour la filiation |

## Sources gradées (code Admiralty A-F, 1-6)

| ID | Source | URL / capture | Date | Grade | Apport / limite |
| --- | --- | --- | --- | --- | --- |
| S1 | **GénéaFrance** — décès Tassier (naissance + décès + commune) | `https://www.geneafrance.fr/` · capture `capture-2026-11-21-geneafrance` (SHA-256 `61b3e2dd…`) | 21/11/2026 | **B1** (dérivé INSEE / Mémoire des Hommes) | **Lit** : Élie 1923 Maubeuge → 28/02/1997 Maubeuge ; Emmanuel 1929 Maubeuge → 2000 Maubeuge ; Arlette Hélène 1925 → 2022 Cousolre ; Élisée 1927 → 2020 Gières ; Léon Félicien 1896 Anor → 1980 Maubeuge. **Ne prouve pas** la filiation. |
| S2 | **morts.fr** — 90 décès Tassier 1971-2024, section Nord (59) | `https://morts.fr/noms-de-famille/tassier` · capture `capture-2026-11-21-morts-fr…` (SHA-256 `7645a7d2…`) | 21/11/2026 | **B1** (même fonds INSEE que S1) | **Corrobore** S1 ligne à ligne. **Aucun gain de grade** : même fonds. |
| S3 | **Acte-Décès.fr** — 90 actes, INSEE depuis 1970, mise à jour 23/10/2026 | `https://www.acte-deces.fr/recherche-deces-famille-tassier` · capture `capture-2026-11-21-acte-deces-fr…` (SHA-256 `cd6e4c93…`) | 21/11/2026 | **B1** (même fonds) | **Aucun décès supplémentaire** de nos cibles. Ne prouve pas la filiation. |
| S4 | **Geneanet « Familles de Thiérache »** — arborescence depuis A. Jean Le TASSIER `ca 1550-1578` | `https://gw.geneanet.org/btrichet` · capture `capture-2026-11-21-gw-geneanet…` (SHA-256 `3755e8f6…`) | 21/11/2026 | **C3** (arbre collaboratif) | **Déjà présent** dans les 653 PZ (indices `p`). Aucune information nouvelle. |
| S5 | **MyHeritage** — 75 documents « Léon Tassier » | `https://www.myheritage.com/` · 2 captures (SHA-256 `32cd57ae…`, `027013fa…`) | 21/11/2026 | **C3** (arbre + champs vides « født den den i ») | **Homonymes non identifiés** : 1877, 1892, ~1867, 1980 transmis sans pièce. **Aucun rattachement**. |
| S6 | Table décennale Anor (déjà lue, `3 E TD 012107/392`, image 89, A1) | `ENQUETE-154.md` | 20/11/2026 | **A1** | **Prouve** l'existence d'Élie (22/08/1923) et Emmanuel (26/10/1929) comme frères d'Élisée, **sans nommer de parents**. C'est le seul A1 de ce dossier. |

## Résultat

- **`trouvé` (B1)** — deux champs vides de la base peuvent être comblés sans déduction : **Élie † 28/02/1997 Maubeuge** et **Emmanuel † 2000 Maubeuge** (S1 corroboré S2). La naissance (1923/1929) et la commune (Maubeuge) concordent avec l'A1 S6.
- **`trouvé` (B1, déjà connu)** — Arlette Hélène 1925→2022, Élisée 1927→2020, Léon Félicien 1896→1980 : confirment les données déjà importées, **sans gain de grade**.
- **`piste` (C3)** — Alain Léonard 1932 Denain → 2001 Denain et Joséphine Alina Marie 1906 Denain → 1980 Denain : créés comme individus non raccordés (H0), aucun lien de parenté attribué.
- **`non trouvé`** — aucun acte de décès nominatif consulté ; les prénoms des parents d'Élie/Emmanuel restent inconnus.
- **Conclusion : H0 conservée, H3 retenue pour la filiation.** Un décès B1 n'est pas un acte A1 : il comble une case, il n'établit pas un lien.

**Transcription littérale : aucune** — aucune image d'acte n'a été lue, seulement des listes dérivées.

## Ce qui ferait changer la conclusion

- **Confirmerait H1** : la copie de l'acte de décès n° correspondant (commune de Maubeuge, 1997 et 2000) nommant les parents — alors Élie et Emmanuel rejoindraient le noyau A1.
- **Confirmerait H2** : un acte (naissance, mariage ou décès) reliant explicitement les Tassier de Denain à Firmin Léon ou à Pierre Joseph.
- **Écarterait H1/H2** : un acte montrant que l'Élie décédé en 1997 a des parents différents de la table décennale de 1923.
- **Ne ferait pas changer la conclusion** : la répétition du même fichier INSEE sur un quatrième site ; les champs vides MyHeritage ; les arborescences Geneanet déjà importées.

## Prochaine action concrète

1. Ne rien promouvoir au grade A1 sur la foi de ces listes ; enregistrer les deux décès avec mention « B1, acte non consulté ».
2. Demander les copies des actes de décès de Maubeuge (1997 pour Élie, 2000 pour Emmanuel) — démarche humaine, communiquabilité 25 ans révolus.
3. Laisser les deux Tassier de Denain en C3 non raccordés, avec un `doute` explicite.
4. Conserver les 6 captures et leurs SHA-256 dans `data/preuves-sources.json`.

*Fin de l'enquête 162 — livrable unique `ENQUETE-162.md` ; aucun acte promu, H0 conservée.*
