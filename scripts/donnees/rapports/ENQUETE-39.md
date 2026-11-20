# Enquête 39 — Sosa de Bruno : les 17 marqueurs coïncident-ils avec nos ancêtres proposés ?

> Cadre · question fermée · date d'arrêt des preuves : 18/11/2026 · version 1.0.
> Règle appliquée : H0 = homonymie / non-rattachement, aucune invention de nom, date, lieu ou cote,
> « non trouvé » plutôt qu'une approximation, URL + date de consultation + grade Admiralty (A-F, 1-6)
> par source, aucune coordonnée personnelle reproduite, **aucune fusion**.
> **Grade global : C3** (relevé Geneanet dérivé, non relu en fiche individuelle ; crédibilité plausible,
> non confirmée par acte). **Aucune modification de l'arbre, aucun rattachement, aucune fusion.**

## Question fermée

**Parmi les 17 personnes portant le marqueur « sosa » dans le relevé Geneanet « Familles de Thiérache »
(Bruno TASSIER-BRAGANTINI, `btrichet`), lesquelles coïncident — par le nom et les dates — avec les
ancêtres que notre arbre propose dans sa chaîne d'ascendance (G8–G4) et dans la liste des ancêtres
anciens `ca 1550`–`ca 1600` ?** Autrement dit : les 17 sosa sont-ils nos ancêtres, ou seulement ceux
de Bruno, et la coïncidence éventuelle constitue-t-elle une preuve de rattachement ?

## Hypothèses

- **H0 (homonymie / non-rattachement)** — Les 17 marqueurs sosa sont les **ancêtres directs de Bruno**,
  pas les nôtres (`PISTE-THIERACHE.md` §1) ; notre chaîne proposée a été extraite du même arbre
  collaboratif, si bien que toute coïncidence est **circulaire** et non probante. **Conservée** (non réfutée).
- **H1 (coïncidence utile)** — Une partie des sosa recoupe effectivement nos ancêtres proposés ; ce
  recoupement fournirait un repère de cohérence interne, mais **jamais un acte**. **Partiellement
  observée au grade C3 uniquement** (5 noms sur 17), sans élévation de grade.
- **H2 (dossier composite / divergence)** — Les sosa forment une lignée continue de Bruno qui **fork**
  avec la nôtre : Bruno descend de **Théodule (1840-1886)**, alors que notre chaîne passe par
  **Pierre Joseph (1835-1892)**, deux fils distincts de Jean-Baptiste (1791-1849). Les points
  communs (Lambert Joseph, Jean-Baptiste) sont des **ancêtres communs au sens de l'arbre**, pas une
  jonction établie. Alimentée par les données (S2) ; non résolue sans acte.
- **H3 (non résolu)** — Les fiches individuelles restent protégées (HTTP 403 Cloudflare) et n'ont pas
  été lues manuellement ; deux des 17 sosa sont des **personnes masquées** à ne pas identifier
  (RGPD, `CONFIDENTIALITE.md`) ; aucun acte ni cote n'est connu dans le dépôt.
- **Hypothèses auxiliaires** (non des faits de source) : les snapshots locaux sont fidèles à la page
  du 17/11/2026 ; le champ `sosa` est un marqueur de l'arbre de Bruno, pas un label de notre ascendance ;
  les dates `ca` sont des fourchettes, pas des dates exactes.

## Sources gradées

Toutes les sources ci-dessous sont **C3** — Admiralty : fiabilité C (source dérivée / compilation
tierce ou synthèse interne), crédibilité 3 (plausible, non confirmée par acte). **Aucune n'est un acte.**

| ID | Source | URL / référence | Date de consultation | Grade | Prouve / ne prouve pas |
| --- | --- | --- | --- | --- | --- |
| S1 | Page-liste « TASSIER (branches) — Familles de Thiérache », auteur Bruno TASSIER-BRAGANTINI (`btrichet`), 483 TASSIER / 9 branches, 17 marqueurs sosa | `https://gw.geneanet.org/btrichet?lang=fr&m=N&v=TASSIER` (snapshot `~/Downloads/TASSIER (branches) - Familles de Thiérache (généalogie) - Geneanet.html`, 237 Ko) | 17/11/2026 (reprise 18/11) | C3 | **Prouve** : l'existence des 17 marqueurs sosa et des 9 branches. **Ne prouve pas** : qu'il s'agit de nos ancêtres, aucun lieu, aucune cote (`PISTE-THIERACHE.md` §1, §3). |
| S2 | `enquetes/geneanet-ancetres-complets-data.js` — `GENEANET_COMPLET`, 653 personnes, 17 `sosa: true` (tous `branch: 2`) ; relations `parents`/`spouses`par URL ; `data/persons.json` (`Person/1.0.0`) en canonise 17 | fichier local (relevé inliné ; `data/persons.json` table de vérité) | 17-18/11/2026 | C3 | **Prouve** : la liste nominative des 17 sosa, leurs dates, leur branche et la structure de la lignée de Bruno (§H2). **Ne prouve pas** : une filiation — `parents` est une arête d'arbre, pas un acte. |
| S3 | `PISTE-THIERACHE.md` §1, §3, §4 — « 17 marqueurs sosa … ce sont les ancêtres directs de Bruno, pas les vôtres » ; chaîne ascendante proposée (G8–G4) ; liste des ancêtres anciens des branches 1–3 | fichier local (synthèse du 17/11/2026) | 17-18/11/2026 | C3 (synthèse d'hypothèses) | **Prouve** : que les sosa sont déclarés comme ancêtres de Bruno et que notre chaîne est une « proposition » marquée `[à démontrer]`. **Ne prouve pas** : l'identité des deux lignées. |
| S4 | `index.html` / `index-modulaire.html` — `people[]` : `lambert_joseph`, `jean_baptiste_tassier`, `pierre_joseph`, `firmin_leon`, `felicien_leon`, `jean_felicien`, champs `proposedParents` | fichiers locaux (arbre affiché) | 18/11/2026 | C3 (arbre collaboratif intégré) | **Prouve** : la composition exacte de **nos ancêtres proposés** et l'absence de rattachement des ancêtres anciens au graphe. **Ne prouve pas** : la filiation — 15 occurrences de `proposedParents` sont toutes non établies par acte. |
| S5 | `FRISE-TEMPORELLE.md` §3, §4 — jalons « ancêtres » (G8 Lambert Joseph 1748-1831, G7 Jean-Baptiste 1791-1849, `ca 1550`/`ca 1555`, Françoise GUENSON 1619-1687) ; enquêtes 15, 16, 22, 23 | fichier local (synthèse du 18/11/2026) | 18/11/2026 | C3 (synthèse) | **Prouve** : la liste des ancêtres cités dans notre récit et le qualificatif « proposé, non établi par acte ». **Ne prouve pas** : une coïncidence avec les sosa au-delà des noms. |
| S6 | `ENQUETE-15.md`, `ENQUETE-16.md` (branches 1 et 2) — H0 conservée, grade C3 maintenu, aucune fusion, actes non localisés | fichiers locaux | 18/11/2026 | C3 (enquêtes internes) | **Prouve** : l'absence de jonction documentée entre les branches et l'arbre. **Ne prouve pas** : l'ancêtre commun. |

**Sources écartées / non reproduites.** Aucun acte ancien (registre paroissial, acte de mariage ou de
baptême) n'a été consulté : **aucune cote n'est connue dans le dépôt et aucune n'est inventée ici**.
Le lien « Contacter » du site Geneanet n'a pas été actionné (objet de l'enquête #14) ; aucune adresse,
courriel, téléphone ni photo privée n'a été relevé. Aucun contournement du HTTP 403, de compte ou de
captcha n'a été tenté. Les deux personnes masquées (n° 15 et 16) ne sont **pas** identifiées.

## Les 17 marqueurs sosa du relevé

Tous appartiennent à la **branche 2** (S2). `dates` = libellé brut du relevé (`ca` = approximatif).

| n° | identifiant | Nom | Dates | Branche | Rôle / note |
| --- | --- | --- | --- | --- | --- |
| 1 | `i21964` | Ancêtre TASSIER | `ca 1555-` | 2 | TASSIER · racine sosa, sans prénom ni acte |
| 2 | `i1934` | Servais TASSIER | `ca 1580-1663` | 2 | TASSIER · fils du n° 1 |
| 3 | `i1919` | Médard TASSIER | `ca 1605-1672` | 2 | TASSIER · fils du n° 2 |
| 4 | URL Geneanet `chaveau&p=marie` | Marie CHAVEAU | `†1635` | 2 | conjoint · fille déclarée du n° 2 |
| 5 | URL Geneanet `guenson…&p=francoise` | Françoise GUENSON GAINSON GUENCHON | `1619-1687` | 2 | conjoint · 3 graphies, fille déclarée du n° 2 |
| 6 | `i1912` | Pierre dit Médard TASSIER | `1638-1704` | 2 | TASSIER · sosa sans parent déclaré |
| 7 | `i1916` | Jacques TASSIER | `1674-1746` | 2 | TASSIER · fils du n° 6 |
| 8 | `i207` | Jacques TASSIER | `ca 1700-/1796` | 2 | TASSIER · fils du n° 7 |
| 9 | URL Geneanet `froye&p=anne+marie` | Anne Marie FROYE | `ca 1710-1796` | 2 | conjoint · fille déclarée du n° 7 |
| 10 | `i199` | Lambert Joseph TASSIER | `1748-1831` | 2 | TASSIER · sosa sans parent déclaré |
| 11 | `i186` | Jean-Baptiste TASSIER | `1791-1849` | 2 | TASSIER · fils du n° 10 |
| 12 | `i173` | Théodule TASSIER | `1840-1886` | 2 | TASSIER · fils du n° 11 — **branche de Bruno** |
| 13 | `i23` | Désiré Marcel TASSIER | `1878-1953` | 2 | TASSIER · fils du n° 12 |
| 14 | `i14` | Arthur Marcel Fernand TASSIER | `1902-1983` | 2 | TASSIER · fils du n° 13 |
| 15 | `i0` | Personne masquée | — | 2 | conjoint ·enfant du n° 14 — **non identifiée** |
| 16 | `i16566` | Personne masquée | — | 2 | conjoint · enfant du n° 15 — **non identifiée** |
| 17 | URL Geneanet `liven&p=yolande` | Yolande LIVEN | `†1641` | 2 | conjoint · fille déclarée du n° 1 |

## Recoupement avec nos ancêtres proposés

Nos ancêtres proposés (S4, S5) sont, d'une part, la chaîne matérialisée dans l'arbre — **Lambert Joseph
(1748-1831)** × Jeanne Catherine Fontaine (G8), **Jean-Baptiste (1791-1849)** × Anne Joseph Fontaine
(G7), Pierre Joseph (1835-1892) × Philomène Decamps (G6), Firmin Léon (1866-1948) × Aline Angèle
Meunier (G5), Félicien Léon (1896) / Jean Félicien (1898) (G4) — et, d'autre part, les ancêtres
anciens `ca 1550`–`ca 1600` cités dans `PISTE-THIERACHE.md` §3 **sans être raccordés au graphe**.

**Coïncidences (5 sur 17) :**

| n° sosa | Nom / dates | Statut dans notre arbre | Nature du recoupement |
| --- | --- | --- | --- |
| 10 | Lambert Joseph TASSIER `1748-1831` | G8, `inTree: true`, `proposedParents: []` | **Coïncidence directe** — ancêtre le plus ancien de notre chaîne |
| 11 | Jean-Baptiste TASSIER `1791-1849` | G7, `inTree: true` | **Coïncidence directe** — père proposé de Pierre Joseph |
| 1 | Ancêtre TASSIER `ca 1555-` | ancêtre ancien cité (br. 2, « marqué sosa »), non raccordé | **Coïncidence C3** — simple mention, sans prénom ni acte |
| 2 | Servais TASSIER `ca 1580-1663` | ancêtre ancien cité (br. 2, sosa), non raccordé | **Coïncidence C3** — même nom, mêmes fourchettes |
| 17 | Yolande LIVEN `†1641` | conjointe citée aux côtés de Servais, non raccordée | **Coïncidence C3** — conjointe du n° 2 |

**Non-coïncidences (12 sur 17) :** n° 3 (Médard `ca 1605-1672`), 4 (Marie CHAVEAU), 5 (Françoise
GUENSON/GAINSON/GUENCHON `1619-1687`, citée comme « pièce orthographique » mais **hors chaîne
ascendante**), 6 (Pierre dit Médard `1638-1704`, cité comme surnom en §4, hors chaîne), 7 et 8 (les
deux Jacques), 9 (Anne Marie FROYE), 12 (Théodule `1840-1886`), 13 (Désiré Marcel `1878-1953`),
14 (Arthur Marcel Fernand `1902-1983`), 15 et 16 (personnes masquées). Aucun de ces noms ne figure
parmi nos ancêtres proposés.

**Point décisif (H2).** Les sosa ne forment pas notre lignée : la chaîne de Bruno passe de
Jean-Baptiste (n° 11) à **Théodule (n° 12) → Désiré Marcel (n° 13) → Arthur Marcel Fernand (n° 14)**,
tandis que la nôtre passe de Jean-Baptiste à **Pierre Joseph (1835-1892) → Firmin Léon (1866-1948)
→ Félicien Léon / Jean Félicien**. Les deux lignées **divergent chez les fils de Jean-Baptiste**. Les
deux coïncidences directes (n° 10 et 11) s'expliquent par l'origine commune des données : notre
chaîne a été **extraite du même arbre Geneanet** que les marqueurs de Bruno (S3, S4). Elles ne
constituent donc **aucune corroboration indépendante**.

## Résultats

- **`trouvé` (au grade C3 uniquement)** — 5 marqueurs sosa sur 17 coïncident par le nom et les dates
  avec des ancêtres que notre arbre propose : n° 10 et 11 dans la chaîne matérialisée (G8, G7), n° 1,
  2 et 17 parmi les ancêtres anciens cités mais non raccordés. Ce sont des **données d'arbre
  collaboratif**, pas des actes.
- **`non trouvé`** — aucun acte, aucune cote, aucun lieu n'établit qu'un de ces 17 sosa est notre
  ancêtre au sens généalogique du terme. Aucun rattachement des ancêtres anciens au graphe ; aucune
  jonction entre la chaîne de Bruno et la nôtre.
- **`hypothèse`** — **H0 conservée** ; H1 n'est réalisée qu'au grade C3 et reste circulaire ; H2 est
  alimentée par la divergence au nœud Jean-Baptiste (Théodule vs Pierre Joseph) ; H3 tient au HTTP 403
  et aux deux personnes masquées non identifiées.
- **Écarté / pas de fusion** — aucune fusion des 5 coïncidences dans notre ascendance, aucune
  identification de l'« Ancêtre TASSIER `ca 1555-` » à A. Jean Le TASSIER ou à Baptiste TASSIER, aucune
  substitution de Théodule à Pierre Joseph, aucune levée d'anonymat des n° 15 et 16. Le nom, l'époque
  et la région seuls ne suffisent pas (règle d'or de `methodologie.html` §1).
- **Bilan** : 5 coïncidences nominatives / 17 sosa, 0 acte, 0 ascendance modifiée ; **grade C3 maintenu,
  sans élévation**.

## Ce qui ferait changer la conclusion

- **Renforcerait H1** : un acte (baptême ou mariage, cote à obtenir) nommant **Lambert Joseph** comme
  père de **Jean-Baptiste**, puis un acte nommant le père de **Pierre Joseph (1835-1892)** — établissant
  que la chaîne de Bruno et la nôtre partagent bien le même tronc. Une fiche Geneanet lue manuellement
  avec renvoi à une cote vérifiable ne serait qu'un indice, pas une preuve.
- **Réfuterait H1 / conforterait H0** : un acte donnant à Jean-Baptiste un seul fils, ou démontrant que
  Pierre Joseph et Théodule appartiennent à deux familles distinctes — la divergence deviendrait
  alors une rupture documentée.
- **Résoudrait H2** : l'identification, par actes, des parents de Pierre Joseph et de Théodule, et la
  lecture manuelle des fiches `?n=tassier&p=theodule` et `?n=tassier&p=pierre+joseph`.
- **Confirmerait H3** : persistance du HTTP 403 et absence de cotes anciennes accessibles — la
  conclusion reste « non résolu », ce qui est honnête.

## Prochaine action concrète

1. **Étape manuelle (non délégable au robot)** : ouvrir en session visiteur les fiches
   `https://gw.geneanet.org/btrichet?lang=fr&n=tassier&p=lambert+joseph`,
   `...?n=tassier&p=jean+baptiste`, `...?n=tassier&p=theodule` et `...?n=tassier&p=pierre+joseph` ;
   relever uniquement parents déclarés, conjoints, dates, lieux et sources citées (cotes). Noter toute
   divergence avec S2/S3. Si l'accès reste bloqué, écrire « non résolu » et s'arrêter — **ne pas
   contourner**. Ne pas chercher à identifier les personnes masquées n° 15 et 16.
2. **Démarche d'actes (cote à obtenir, non encore connue)** : recherche dans les registres paroissiaux
   de la Thiérache (Archives du Nord, séries 5 Mi / 2 M ; archives belges pour l'indice `N. (Thuin)`)
   d'un acte de naissance de **Jean-Baptiste TASSIER vers 1791** nommant **Lambert Joseph** comme père,
   puis des actes de naissance de **Pierre Joseph (1835)** et **Théodule (1840)** pour trancher la
   divergence. Ne consigner une cote qu'après vérification ; ne pas en inventer.
3. **Croiser** avec l'enquête #15 (A. Jean Le TASSIER), #16 (Servais TASSIER), #17 (Baptiste TASSIER),
   #22 (Françoise GUENSON/GAINSON/GUENCHON) et #23 (Aldégonde × de MÉRODE) avant toute conclusion sur
   un ancêtre commun.
4. **Ne pas modifier l'arbre** (`index.html`, `index-modulaire.html`, `data/persons.json`, données
   `GENEANET`) : maintenir les ancêtres anciens non raccordés, les `proposedParents` en pointillés,
   les personnes masquées anonymes et **aucune fusion** tant qu'un acte direct n'établit pas la jonction.
