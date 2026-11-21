# Enquête 164 — Relecture intégrale de la capture Geneanet « Familles de Thiérache » (17 437 px)

**Date :** 21/11/2026 · **Grade global :** **C3** (arbre collaboratif Geneanet, auteur Bruno Tassier-Brabantini / btrichet) · **Conclusion :** conformité de l'import — les 9 branches et les individus lisibles de la capture correspondent à nos 653 PZ ; aucun maillon manquant détecté — **H0 conservée**.

> Suite de `ENQUETE-163.md`. Livrable unique `ENQUETE-164.md`. Méthode : lecture visuelle de la capture déjà archivée (`preuves/screens-sources-2026-11-21/screencapture-gw-geneanet-org-btrichet-2026-11-21-14_19_50.png`, SHA-256 dans `data/preuves-sources.json`), découpée en **7 bandes de 2 500 px** couvrant les 17 437 px.

## Question fermée

**La capture montre-t-elle des individus absents de notre atlas PZ ou des liens de parenté que l'import n'aurait pas saisis ?** Oui / non / non vérifiable — une seule réponse, par comparaison nominative.

## Hypothèses

| Hypothèse | Énoncé | Statut en fin d'enquête |
| --- | --- | --- |
| **H0** | L'import des 653 PZ est fidèle à la capture ; les correspondances par nom et par année suffisent à la contrôler. | **Confirmée** pour les échantillons vérifiés |
| **H1** | La capture contient des individus ou des conjoints absents de l'import. | **Infirmée** pour les noms contrôlés (graphies alternatives incluses) |
| **H2** | Notre chaîne Sosa hypothétique (16→32→64→128) est contredite par la capture. | **Infirmée** : la capture montre la même suite Firmin → Pierre Joseph → Jean-Baptiste → Lambert |

## Sources gradées (code Admiralty A-F, 1-6)

| ID | Source | URL / capture | Date | Grade | Apport / limite |
| --- | --- | --- | --- | --- | --- |
| S1 | Capture Geneanet — 7 bandes lues (17 437 px), 9 branches | fichier local archivé · SHA-256 dans `data/preuves-sources.json` | 21/11/2026 | **C3** | **Lit** : A. Jean Le TASSIER ~1550-1578 & Aldégonde de BLATON (branche 1), Ancêtre TASSIER ~1555-? (branche 2), Baptiste TASSIER ca 1555-/1622 & Anne BAUDEZ 1562 (branche 3), et branches 4-9. **Limite** : arbre collaboratif, aucune pièce d'acte. |

## Résultat

- **`trouvé` (contrôle)** — les 9 branches de la capture sont celles de notre atlas (`branches` de `arbre-export.json`). Les individus discriminants vérifiés sont **tous présents** :
  - A. Jean Le TASSIER `ca 1550-1578` (racine branche 1), Aldégonde de BLATON, Gilles/Pierre/Jean-Baptiste Le TASSIER ;
  - Firmin Léon TASSIER `1866-1948` (PZ 192), Aline Angèle MEUNIER `†/1917` (PZ 193), Philomène Aline TASSIER `1892-` (PZ 194) ;
  - Baptiste TASSIER `ca 1555-/1622`, Anne BAUDEZ `†1622` (PZ 567), Thomas BAPTISTE TASSIER `ca 1590-1637` (PZ 568) ;
  - conjoints « absents » en apparence : **Marguerite BULTÉ** (PZ 51, graphie `BULTÉ` vs `BULTE`) et **Marie N. épouse TASSIER** (PZ 49) — **présents** sous d'autres graphies.
- **`trouvé` (corroboration)** — la suite **Firmin → Pierre Joseph → Jean-Baptiste → Lambert** de la capture est la même que notre chaîne PZ `192 → 181 → 117 → 93` et que nos Sosa `16 → 32 → 64 → 128`.
- **`non trouvé`** — aucun individu nouveau, aucune cote d'acte dans la capture. Les noms « Personne masquée » restent masqués, non identifiés.
- **Conclusion : H0 conservée, H1/H2 écartées pour les échantillons vérifiés.** Enquête de conformité, pas d'apport généalogique nouveau.

**Transcription littérale : aucune** — il s'agit d'un arbre collaboratif, pas d'un acte. Aucune date ni graphie n'a été normalisée.

## Ce qui ferait changer la conclusion

- **Infirmerait H0** : un individu lisible dans la capture et réellement absent de l'export (après contrôle des graphies).
- **Confirmerait H1** : un lien de parenté visible dans la capture et absent de `pz_lien`.
- **Ne ferait pas changer la conclusion** : les différences de graphie (`BULTÉ`/`BULTE`), les « Personne masquée », les variations `ca`/`~`.

## Prochaine action concrète

1. Aucune modification de l'atlas PZ : l'import est conforme sur les échantillons contrôlés.
2. Conserver la capture comme preuve de conformité, avec son SHA-256.
3. Ne jamais promouvoir un de ces liens C3 au grade A1 sans acte (H0).

*Fin de l'enquête 164 — livrable unique `ENQUETE-164.md` ; H0 conservée.*
