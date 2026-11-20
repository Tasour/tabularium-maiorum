# Enquête 43 — Acte de mariage Reymond × Favre : date, cote, parents (19/11/2026)

> Enquête **#43** de `PROCHAINES-10-ENQUETES-P6.md` (ligne 12) · livrable unique `ENQUETE-43.md` · suite de `GEN3-03-jean-parents.md`, `GEN3-04-josephine-parents.md`, `ENQUETE-27.md` et de `enquetes/branche-reymond-data.js` · cibles : **Jean Alceste Alfred Reymond** (21/04/1936 Chambéry — 02/11/2023 Jacob-Bellecombette) et **Joséphine Juliette Favre** (20/11/1938 La Chapelle) · date d'arrêt des preuves : 19/11/2026 · version 1.0.
> Règle appliquée : H0 = homonymie ; aucune date, cote, commune ni filiation inventée ; « non trouvé » prime sur l'approximation ; grade Admiralty (A-F, 1-6) + URL/cote + date pour chaque source ; aucune donnée de contact personnelle reproduite. **Aucune date de mariage, aucune cote d'acte et aucun nom de parent des époux n'est avancé ici.**

## 1. Question fermée

**L'acte de mariage de Jean Reymond et de Joséphine Favre — non daté dans le dépôt — peut-il être localisé avec une date, une cote et les noms des parents des deux époux ?**

Question secondaire (non fusionnée) : ce mariage peut-il encore être repéré par une table décennale en ligne, ou faut-il passer par un registre non numérisé ou par la mairie ? **Test discriminant** : l'acte lu, ou à défaut une mention marginale sur un acte de naissance ou un livret de famille — jamais la seule concordance des prénoms et des avis de décès.

## 2. Hypothèses

| Hypothèse | Énoncé | Statut en fin d'enquête |
| --- | --- | --- |
| **H0** | Homonymie : les « Jean » et « Joséphine » nommés comme époux dans les faire-part ne sont pas les personnes visées par l'acte recherché, ou l'union civile n'est pas documentée. | **Conservé** (non réfuté faute d'acte consulté) |
| **H1** | L'acte de mariage, une fois obtenu, nomme les deux époux ainsi que les parents de Jean et ceux de Joséphine, et donne la date et le lieu exacts. | **Non documenté** — simple hypothèse |
| **H2** | Dossier composite / erreur de cote : une cote de naissance déjà employée dans le dépôt (3E 4265, 3E 4675) est recyclée pour désigner ce mariage, ou deux unions sont fusionnées. | **Écarté par principe** : ces cotes désignent des naissances (1936 et 1938) et ne peuvent pas désigner un mariage ; elles ne sont pas réutilisées |
| **H3** | Non résolu faute d'acte : ni la date, ni la commune, ni la cote, ni le contenu du mariage ne sont accessibles dans les sources consultées. | **Conclusion retenue** |

Hypothèses auxiliaires (non confondues avec le test discriminant) : le mariage est **postérieur à la naissance de Joséphine (20/11/1938)** et, si la fratrie déclarée est exacte, **antérieur à la naissance de Laurent (07/04/1965, date elle-même non confirmée par acte)** — fenêtre large, **pas une date** ; Chambéry (ville de naissance de Jean et des enfants) et La Chapelle (origine de Joséphine) sont deux **communes candidates, aucune établie**. L'absence de mise en ligne d'un acte est un **silence documentaire d'accès**, non une preuve négative.

## 3. Sources gradées (code Admiralty A-F, 1-6)

| ID | Source | URL / cote | Date | Grade | Ce que ça apporte / limite |
| --- | --- | --- | --- | --- | --- |
| S1 | `enquetes/branche-reymond-data.js` — déclaration de l'utilisateur (`user`, `jean_obit`, `cecile_obit`) | fichier local | 14/11/2026 | **B2 / C3** (déclaration, faire-part) | **Prouve (déclaré)** : Jean et Joséphine sont époux, parents d'Agnès, Laurent et Cécile. **Ne prouve pas** : la date, le lieu ou l'acte de mariage ; deux avis concordants restent deux dérivés, non un acte. |
| S2 | INSEE / matchID — Jean Reymond (1936-2023) | `https://deces.matchid.io/search?q=Jean%20REYMOND%201936` | 14/11/2026 (reconsulté 18/11/2026, interface JS bloquée au robot) | **B1** | **Prouve** : Jean Alceste Alfred Reymond, 21/04/1936 Chambéry (73065), décédé 02/11/2023 Jacob-Bellecombette (73137). **Ne prouve pas** : le mariage, la date de celui-ci ni les parents de Jean. |
| S3 | Archives de la Savoie — tables décennales, naissances de La Chapelle 1933-1942 | `https://archives-numeriques.savoie.fr/ark:/77293/8b287dff9745a43d3f7ecccf613f7e76` · **3E 4675** | 14/11/2026 | **A1** (index) | **Prouve** : « Favre Joséphine Juliette, 20 novembre 1938 ». **Ne prouve pas** : le mariage ; une table de **naissances** ne porte pas les mariages et ne nomme pas les parents. |
| S4 | Archives de la Savoie — moteur « Registres paroissiaux et état civil (1501-1932) » | `https://recherche-archives.savoie.fr/?id=recherche_guidee_etat_civil_web` | 19/11/2026 | **A1** | **Prouve** : le formulaire en ligne ne couvre que **1501-1932** ; un mariage postérieur à 1938 ne peut pas y être trouvé. **Ne prouve pas** : l'inexistence de l'acte, qui peut exister en salle de lecture ou en mairie. |
| S5 | Archives de la Savoie — « Conseils complémentaires pour la recherche généalogique » (`S7` de `GEN3-03`) | `https://patrimoines.savoie.fr/web/psp_45869/recherche-genealogique-conseils-complementaires` | 18/11/2026 | **A1** | **Prouve** (règles officielles) : tables décennales **uniquement 1853-1942** ; registres **3E 1-4169 numérisés**, **3E 4170-5292 non numérisés** (hors tables) ; mariages communicables sur papier jusqu'en **1942** (75 ans, année de référence 2018), sur internet jusqu'en **1917** (100 ans). **Ne prouve pas** : le contenu ni la cote de l'acte visé. |
| S6 | `GEN3-03-jean-parents.md` §4-§6 et `GEN3-04-josephine-parents.md` §Résultat — état des filiations | fichiers locaux | 18/11/2026 | **A1** (cadre) / **non trouvé** (actes) | **Prouve** : les parents de Jean sont **inconnus** (H3 retenu) ; chez Joséphine, la mère **Delphine Favre** est probable par recensement 1946, le père **non identifié**, l'acte **non consulté**. **Ne prouve pas** : les noms qui figureront sur l'acte de mariage. |
| S7 | Mairie de Chambéry — « Demander un acte de mariage » | `https://www.chambery.fr/45-demander-un-acte-de-mariage.htm` | 19/11/2026 | **—** (démarche officielle, hors grade) | **Prouve** : voie de demande d'extrait/copie pour un mariage célébré à Chambéry ; les actes de plus de 100 ans relèvent des Archives de la Savoie. **Ne prouve pas** : qu'un mariage Reymond × Favre y a été célébré, ni sa date. |
| S8 | Filae — « Chambéry : état civil et archives historiques » (`S9` de `GEN3-03`, **écartée**) | `https://www.filae.com/archives-Savoie/etat-civil-genealogie-Chamb%C3%A9ry-v3027422.html` | 18-19/11/2026 | **B2** (agrégateur payant) | **Prouve** : 26 576 actes de mariage chambériens indexés commercialement. **Ne prouve pas** : l'acte ici visé ; accès payant, non contestable, non retenu comme preuve. Aucun contournement tenté. |

Sources écartées sans résultat : recherches generalistes et annuaires collaboratifs sur « Jean Reymond Joséphine Favre », « Jean Alceste Alfred Reymond » et « Joséphine Juliette Favre » (19/11/2026) — **aucune** mention de l'acte ni des parents ; Geneanet/Geneastar ne renvoient que des Favre/Reymond sans lien. **Aucune cote n'a été supposée** : 3E 4265 = naissances Chambéry 1936, 3E 4675 = naissances La Chapelle 1938. Aucune adresse, téléphone, courriel ni donnée sensible n'a été collecté ou reproduit.

## 4. Résultats

- **Trouvé / confirmé** — l'**identité des deux époux** au grade B1/B2 (S1-S3) ; le **cadre d'accès** aux archives (S4-S5) : le mariage, postérieur à 1938, est **hors du moteur en ligne (1501-1932)** et **hors de toute table décennale (1853-1942)** — donc hors d'une recherche par index en ligne ; la **voie de demande** en mairie ou en salle de lecture (S5, S7) ; l'**absence de filiation paternelle documentée** de part et d'autre (S6).
- **Non trouvé** — la **date exacte** du mariage ; la **commune** de célébration ; la **cote** du registre et le **numéro d'acte** ; le **contenu de l'acte** ; les **parents de Jean** ; les **parents de Joséphine** (le père en particulier) ; une mention marginale laissée par le mariage sur les actes de naissance connus.
- **Hypothèse** — H1 reste possible : l'acte, s'il est obtenu, nommera les époux et leurs parents. H2 est écarté par la destination des deux cotes déjà enregistrées. H0 reste l'hypothèse nulle.
- **Filiation — état exact des connaissances.** Les parents des époux sont **non trouvés** et **aucun prénom parental n'est avancé**. Pour Jean : aucun nom de père ni de mère dans une source consultée ; la tradition du « chef d'orchestre de Chambéry » (`user_traditions`, C3) ne fournit aucun nom et n'est pas une preuve (`GEN3-03`). Pour Joséphine : la maternité de Delphine Favre est **probable** par le recensement 1946 (A1), **pas** par un acte ; le père reste **non identifié** (`GEN3-04`). Un acte de mariage porte normalement les parents des deux époux : il n'a pas été lu, donc rien n'est inscrit.
- **Conclusion** : **H0 conservé, H3 retenu — non résolu.** Date, cote et parents des époux sont **non trouvés**. « Non trouvé » plutôt qu'une approximation, même si l'union elle-même est très probablement documentée quelque part.

## 5. Ce qui ferait changer la conclusion

- **Pour H1** : la copie intégrale de l'acte de mariage, avec date, commune, cote et les parents des deux époux ; une **mention marginale de mariage** sur l'acte de naissance de Jean (3E 4265) ou de Joséphine (3E 4675) donnerait déjà la **date et le lieu**, donc le registre à demander.
- **Un livret de famille ou un acte de naissance d'enfant (Laurent 1965, Agnès 1967, Cécile 1969)** nommant les parents et, éventuellement, la date de mariage des époux — corroboration indépendante, pas substitution à l'acte.
- **Pour H0** : un acte de mariage à la même époque entre un autre Jean Reymond et une autre Joséphine, ou l'absence d'union civile entre les deux personnes nommées dans les avis.
- **Ne ferait pas changer la conclusion** : le silence du moteur en ligne (limite 1501-1932, S4) ; l'absence de table décennale (limite 1942, S5) ; la répétition des traditions familiales ; un résultat d'agrégateur payant non consulté (S8) ; la simple concordance des prénoms dans deux faire-part.

## 6. Prochaine action concrète (cote ou démarche)

1. **Obtenir d'abord la date et le lieu** par la famille (livret de famille, faire-part de mariage) ou par la **mention marginale** d'un acte de naissance déjà localisé : c'est le préalable à toute demande, aucune date n'étant documentée ici.
2. **Démarche prioritaire** : demander la **copie intégrale** de l'acte de mariage à la **mairie du lieu de célébration** si celle-ci est Chambéry (S7), ou consulter le registre en salle de lecture aux **Archives de la Savoie** (244 quai de la Rize, 73000 Chambéry, S5) en citant les noms, les prénoms complets et l'année dès qu'elle sera connue. Mariage postérieur à 1942 : **délai de 75 ans non écoulé pour un tiers** ; la copie intégrale avec filiation doit être demandée par un ayant droit (S5, `MODELES-DEMANDES-ACTES.md` §Règles communes).
3. **Relever sur l'acte** : date et commune de célébration, cote et numéro d'acte, noms/prénoms/professions/domiciles des deux époux et de **leurs parents**, témoins et mentions marginales. Ne retenir une filiation que si l'acte la nomme explicitement — **ne pas inventer de prénom parental**.
4. **Ne pas chercher par table décennale** : Joséphine est née en 1938 et les tables s'arrêtent en 1942 (S5) ; aucune table de mariage ne peut couvrir cette union. **Ne pas recycler** 3E 4265 (naissances Chambéry 1936) ni 3E 4675 (naissances La Chapelle 1938) pour un acte de mariage (H2).
5. **Recouper avant toute fusion** : confronter l'acte à `GEN3-03` (filiation de Jean), `GEN3-04` (filiation de Joséphine), à l'enquête #44 (décès de Jean) et aux avis de décès ; ne modifier le graphe qu'après lecture d'une source directe.
6. **Consigner** la date, la commune, la cote, le numéro d'acte et le résultat (`trouvé` / `non trouvé`) dans `PISTE-THIERACHE.md` §5 et `branche-reymond-data.js` en opération dédiée — distinct de ce livrable unique.

*Fin de l'enquête 43 — livrable unique `ENQUETE-43.md` ; aucun autre fichier du dépôt n'a été modifié.*
