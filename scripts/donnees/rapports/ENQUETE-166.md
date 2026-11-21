# Enquête 166 — Relecture intégrale de la capture Acte-Décès.fr (17 643 px) : repères d'actes du Nord

**Date :** 21/11/2026 · **Grade global :** **B1** (fichier INSEE dérivé, capture locale) — **aucun acte lu** · **Conclusion :** un jour de décès manquant retrouvé (Emmanuel) et 6 numéros d'actes relevés comme repères de demande — **H0 conservée**, aucune promotion.

> Suite de `ENQUETE-165.md`. Livrable unique `ENQUETE-166.md`. Méthode : lecture visuelle de la capture déjà archivée (`preuves/screens-sources-2026-11-21/screencapture-acte-deces-fr-recherche-deces-famille-tassier-2026-11-21-14_22_46.png`, SHA-256 dans `data/preuves-sources.json`), découpée en **7 bandes de 2 500 px** couvrant les 17 643 px.

## Question fermée

**La capture fournit-elle des données manquantes pour nos fiches (dates complètes, numéros d'actes) ?** Oui / non / non vérifiable — une seule réponse, en distinguant le repère d'acte de la preuve d'identité.

## Hypothèses

| Hypothèse | Énoncé | Statut en fin d'enquête |
| --- | --- | --- |
| **H0** | Homonymie : un décès INSEE au même nom et à la même naissance n'établit pas l'identité familiale sans acte. | **Conservée** |
| **H1** | Le jour du décès d'Emmanuel, absent de notre base, est lisible dans la capture. | **Confirmé (B1)** : 04/02/2000, acte n°102 — date complète lue |
| **H2** | Les numéros d'actes relevés constituent des preuves d'identité. | **Infirmé** : ce sont des repères de demande, pas des actes consultés |
| **H3** | Non résolu faute d'actes lus. | **Conclusion retenue** pour la filiation |

## Sources gradées (code Admiralty A-F, 1-6)

| ID | Source | URL / capture | Date | Grade | Apport / limite |
| --- | --- | --- | --- | --- | --- |
| S1 | Capture Acte-Décès.fr — 7 bandes lues (17 643 px), 90 décès Tassier, sections par département | fichier local archivé · SHA-256 dans `data/preuves-sources.json` | 21/11/2026 | **B1** (dérivé INSEE) | **Lit** : dates complètes et numéros d'actes. **Ne lit pas** : les actes eux-mêmes. Même fonds que morts.fr et GénéaFrance → **aucun gain de grade** par recoupement. |
| S2 | Acte A1 déjà archivés (`3 E 7213`, `3 E 10052`, `1 Mi EC 012 R 003`) | `preuves/*.jpg` | 18-20/11/2026 | **A1** | Seules preuves d'identité du dossier ; les repères S1 ne les remplacent pas. |

## Résultat

- **`trouvé` (B1)** — **Emmanuel Tassier**, né 26/10/1929 Maubeuge, décédé le **04/02/2000** à Maubeuge, acte n°**102**. Le jour et le mois manquants sont comblés ; l'année 2000 déjà en base concordait.
- **`trouvé` (repères B1)** — numéros d'actes relevés pour nos fiches :
  - **Élie Tassier** : 28/02/1997 Maubeuge, acte n°**00153** ;
  - **Arlette Hélène Tassier** : 24/01/2022 Cousolre, acte n°**5** ;
  - **Léon Félicien Tassier** : 21/04/1980 Maubeuge, acte n°**233** ;
  - **Élisée Tassier** (section Isère 38) : 12/05/2020 Gières, acte n°**19** (déjà connu) ;
  - pistes Denain : **Alain Léonard** 20/03/2001 Denain acte n°**112**, **Joséphine Alina Marie** 15/05/1980 Denain acte n°**188**.
- **`trouvé` (repères B1, hors lignée)** — ~84 autres décès Tassier, tous homonymes écartés (naissances ou communes incompatibles). Aucun rattachement.
- **`non trouvé`** — aucun acte lu, aucune cote d'archives : un numéro d'acte n'est **pas** une cote et ne permet pas à lui seul de commander une copie.
- **Conclusion : H0 conservée, H3 retenue pour la filiation.** Enquête de repérage, pas de preuve nouvelle d'identité.

**Transcription littérale : aucune** — seulement des notices d'index dérivées de l'INSEE.

## Ce qui ferait changer la conclusion

- **Confirmerait H1 sans réserve** : l'acte n°102 de Maubeuge (2000) lu, nommant Emmanuel avec ses parents.
- **Confirmerait H2** : un acte où le numéro relevé et le nom établissent la filiation familiale — jamais le numéro seul.
- **Écarterait H1** : un acte montrant que l'Emmanuel décédé le 04/02/2000 est un homonyme.
- **Ne ferait pas changer la conclusion** : la répétition du même fonds INSEE sur un autre site, les homonymes, les numéros d'acte sans acte.

## Prochaine action concrète

1. Remplacer l'année seule d'Emmanuel par la date complète lue, avec mention B1 + acte n°102.
2. Ajouter les numéros d'actes en notes des fiches concernées et dans `docs/demandes-actes.md` (repères de demande).
3. Ne jamais présenter un numéro d'acte comme une cote ou une preuve d'identité (H0).
4. Demander les copies d'actes listées dans `docs/demandes-actes.md`.

*Fin de l'enquête 166 — livrable unique `ENQUETE-166.md` ; H0 conservée.*
