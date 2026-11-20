# Enquête 15 — Branche Geneanet 1 : A. Jean Le TASSIER (ca 1550) — ancêtre commun ?

> Cadre · question fermée · date d'arrêt des preuves : 18/11/2026 · version 1.0.
> Règle appliquée : H0 = homonymie / non-rattachement, aucune invention de date, lieu, nom ou cote, « non trouvé » plutôt qu'une approximation, URL + date + grade Admiralty (A-F, 1-6) par source, aucune donnée de contact personnelle reproduite.
> **Grade global : C3** (relevé Geneanet dérivé, non relu en fiche individuelle ; crédibilité plausible, non confirmée par acte).

## Question fermée

**A. Jean Le TASSIER (`ca 1550-1578/`), époux d'Aldégonde de BLATON dans la branche 1 du relevé Geneanet « Familles de Thiérache », est-il établi par un acte comme l'ancêtre commun des TASSIER des branches 1 à 3 — c'est-à-dire le relevé repose-t-il sur un document nommant Jean, sa conjointe et un enfant, ou n'est-il qu'une fiche-racine sans lieu ni cote ?**

## Hypothèses

- **H0 (homonymie / non-rattachement)** : A. Jean Le TASSIER est une fiche-racine du relevé ; aucun acte ne l'établit comme ancêtre des autres branches. Le nom, l'époque (~1550) et la Thiérache ne sont que des quasi-identifiants. **Conservée** (non réfutée).
- **H1 (ancêtre commun)** : la chaîne structurelle du relevé — Jean × Aldégonde de BLATON → Gilles Le TASSIER (`ca 1570-1636/`) → Pierre Le TASSIER (`ca 1595-1657`) → Aldégonde Le TASSIER (1629) × Ignace Joseph de MÉRODE — reflète une filiation réelle, Jean étant la souche commune. **Non documentée**, simple hypothèse (C3).
- **H2 (dossier composite)** : le relevé mêle plusieurs Jean TASSIER de la même génération ou de graphie proche — **A. Jean Le TASSIER** `ca 1550-1578/`, **Messire Jean Le TASSIER** †1661 (branche 1), **Jean dit Grand Jean TASSIER** `ca 1585-1668` (branche 2), **Jean dit Petit Jean** †1636 — et deux conjointes annoncées pour le même Jean : **Aldégonde de BLATON** et **Marion SEGHIN** `ca 1550-1578/` (`PISTE-THIERACHE.md` §3). Conflit interne à ne pas résoudre par une fusion.
- **H3 (non résolu)** : la page de liste s'arrête vers 1550 et ne donne ni lieu ni acte ; les fiches individuelles sont protégées par Cloudflare (HTTP 403 en téléchargement automatique) et n'ont pas été lues manuellement.
- **Hypothèses auxiliaires** (non des faits de source) : les snapshots locaux sont fidèles à la page du 17/11/2026 ; le `parent_id` de Gilles vers Jean est une **structure d'arbre**, pas une filiation établie ; le préfixe « Le » propre à la branche 1 reste un indice onomastique faible (objet de l'enquête #19), pas une preuve.

## Sources gradées

Toutes les sources ci-dessous sont **C3** — Admiralty : fiabilité C (source dérivée / compilation tierce), crédibilité 3 (plausible, non confirmée). Aucune n'est un acte.

| ID | Source | URL / référence | Date | Grade | Prouve / ne prouve pas |
| --- | --- | --- | --- | --- | --- |
| S1 | Page-liste « TASSIER (branches) — Familles de Thiérache », auteur Bruno TASSIER-BRAGANTINI (`btrichet`), 483 personnes / 9 branches | `https://gw.geneanet.org/btrichet?lang=fr&m=N&v=TASSIER` (snapshot `~/Downloads/TASSIER (branches) - Familles de Thiérache (généalogie) - Geneanet.html`, 237 Ko) | 17/11/2026 (reprise 18/11) | C3 | **Prouve** : l'existence de la branche 1 (38 personnes) et la présence de A. Jean Le TASSIER `ca 1550-1578/`, Aldégonde de BLATON, Gilles, Pierre et Messire Jean. **Ne prouve pas** : l'ancêtre commun, aucun lieu, aucune cote d'acte (`PISTE-THIERACHE.md` §3, §7, §9). |
| S2 | `enquetes/geneanet-thierache-data.js` — fiche **A. Jean Le TASSIER**, `ca 1550-1578/`, `parents: []`, conjointe **Aldégonde de BLATON** | fichier local (relevé inliné, `i20173`) | 17-18/11/2026 | C3 | **Prouve** : la position de Jean comme racine de la branche 1, sans parent déclaré, et son union annoncée avec Aldégonde de BLATON. **Ne prouve pas** : l'existence de Jean comme personne documentée, ni son rôle d'ancêtre commun — `parents: []` est une absence de données, pas une origine. |
| S3 | `enquetes/geneanet-ancetres-complets-data.js` (653 personnes) — chaîne de la branche 1 : **Gilles Le TASSIER** `ca 1570-1636/` (`parents` → A. Jean) ; **Pierre Le TASSIER** `ca 1595-1657` (`parents` → Gilles, conjointe Françoise SPOURNEAU) ; **Aldégonde Le TASSIER** `1629` (`parents` → Pierre, conjoint Ignace Joseph de MÉRODE) ; **Messire Jean Le TASSIER** †1661 (`parents` → Gilles) ; **Marion SEGHIN** (sans conjoint renseigné) | fichier local (second relevé, chevauchant S2) | 17-18/11/2026 | C3 | **Prouve** : la cohérence interne de la chaîne proposée au sein du relevé et le rattachement d'Aldégonde (1629) à Pierre. **Ne prouve pas** : la filiation réelle ; aucun acte, ni lieu, ni cote. Le `parent_id` est une arête d'arbre, pas une preuve. Conflit H2 : Marion SEGHIN est dite « seconde épouse » du même Jean dans `PISTE-THIERACHE.md` §3 mais porte `spouses: []` ici. |
| S4 | `PISTE-THIERACHE.md` §3, §4, §7, §9 (synthèse locale du 17/11/2026 : « la page de liste s'arrête vers 1550 et ne donne aucun lieu ni acte » ; titre *Messire Jean Le TASSIER* †1661 ; alliance *Aldégonde Le TASSIER* 1629 × de MÉRODE) | fichier local | 17-18/11/2026 | C3 (synthèse d'hypothèses, non gradée Admiralty à l'origine) | **Prouve** : la limite documentaire de la piste et l'obstacle technique documenté. **Ne prouve pas** : l'ancêtre commun, partout marqué « [à démontrer] ». |
| S5 | Fiches individuelles Geneanet `?n=tassier&p=a.+jean+le` et `?n=de+blaton&oc=1&p=aldegonde` (liens portés par S2/S3) | `https://gw.geneanet.org/btrichet?n=tassier&p=a.+jean+le` ; `https://gw.geneanet.org/btrichet?n=de+blaton&oc=1&p=aldegonde` | 18/11/2026 (accès automatisé) | C3 (non relues) | **Prouverait** (après lecture manuelle) : parents, conjointes, dates, lieux et sources citées (cotes). **Ne prouverait pas** : la filiation au grade actuel — un arbre collaboratif n'est pas un acte. **Accès : HTTP 403 Cloudflare au robot ; non contourné.** |

**Sources écartées / non reproduites.** Aucun acte ancien (registre paroissial, acte de mariage ou de baptême) n'a été consulté : **aucune cote n'est connue dans le dépôt** et aucune n'est inventée ici. Le lien « Contacter » du site Geneanet n'a pas été actionné (objet de l'enquête #14) ; aucune adresse, courriel, téléphone ni photo privée n'a été relevé. Aucun contournement du HTTP 403, de compte ou de captcha n'a été tenté. L'acte de mariage de 1629 (Aldégonde × de MÉRODE) relève de l'enquête #23 et n'a pas été consulté ici.

## Résultats

- **`non trouvé`** — aucun acte, aucune cote, aucun lieu n'établit A. Jean Le TASSIER comme ancêtre commun. La racine de la branche 1 est une fiche sans parent, sans lieu et sans source.
- **`non résolu`** — **H0 conservée** ; H1 n'est pas documentée ; H2 est alimentée par la pluralité des Jean (A. Jean `ca 1550-1578/`, Messire Jean †1661, Grand Jean `ca 1585-1668`, Petit Jean †1636) et par le conflit Aldégonde de BLATON / Marion SEGHIN ; H3 tient à l'accès 403 et à l'arrêt de la page-liste vers 1550.
- **`trouvé` (au grade C3 uniquement)** — dans le relevé, A. Jean Le TASSIER est la racine de la branche 1 (38 personnes), époux d'Aldégonde de BLATON, avec Gilles puis Pierre puis Aldégonde (1629) en descendants déclarés. Ce sont des **données d'arbre collaboratif**, pas des actes.
- **Écarté** — toute fusion des branches 1, 2 et 3, toute identification d'A. Jean Le TASSIER à l'« Ancêtre TASSIER `ca 1555-` » (branche 2) ou à Baptiste TASSIER `ca 1555-/1622` (branche 3), et tout choix entre Aldégonde de BLATON et Marion SEGHIN : le nom, l'époque et la région seuls ne suffisent pas (règle d'or de `methodologie.html` §1).
- **Bilan** : aucun acte localisé, aucune ascendance modifiée dans l'arbre ; grade C3 maintenu, sans élévation.

## Ce qui ferait changer la conclusion

- **Renforce H1** : un acte de mariage de **Jean Le TASSIER × Aldégonde de BLATON** (ou × Marion SEGHIN) vers 1560-1580 avec filiation, ou un acte de baptême de **Gilles Le TASSIER** `ca 1570` nommant Jean comme père. Une fiche Geneanet lue manuellement avec renvoi à une cote vérifiable ne serait qu'un indice, pas une preuve.
- **Réfute H1 / conforte H0** : un acte donnant à Gilles un père autre que Jean, ou une localisation de la branche 1 hors de la zone des branches 2 et 3 sans mobilité documentée.
- **Résout H2** : la lecture des fiches individuelles montrant que « A. Jean Le TASSIER `ca 1550-1578/` », « Messire Jean Le TASSIER †1661 » et « Jean dit Grand Jean TASSIER `ca 1585-1668` » sont des personnes distinctes, et l'identification de la conjointe correcte de Jean.
- **Confirme H3** : persistance du HTTP 403 et absence de cotes anciennes accessibles — la conclusion reste « non résolu », ce qui est honnête.

## Prochaine action concrète

1. **Étape manuelle (non délégable au robot)** : ouvrir en session visiteur les fiches `https://gw.geneanet.org/btrichet?lang=fr&n=tassier&p=a.+jean+le`, `...?n=de+blaton&oc=1&p=aldegonde` et `...?n=seghin&p=marion` ; relever uniquement les parents déclarés, les conjointes, les dates, les lieux et les sources citées (cotes). Noter toute divergence avec S2/S3, en particulier le statut de Marion SEGHIN. Si l'accès reste bloqué, écrire « non résolu » et s'arrêter — **ne pas contourner**.
2. **Démarche d'actes (cote à obtenir, non encore connue)** : rechercher dans les registres paroissiaux de la Thiérache (Archives du Nord, série 5 Mi / 2 M ; et, pour l'indice `N. (Thuin) TASSIER`, archives belges compétentes) un acte de mariage d'un **Jean Le TASSIER × Aldégonde de BLATON** vers **1560-1580**, puis l'acte de baptême de **Gilles** vers **1570**. Ne consigner une cote qu'après l'avoir vérifiée ; ne pas en inventer.
3. **Croiser** avec l'enquête #16 (Servais TASSIER, branche 2), l'enquête #17 (Baptiste TASSIER, branche 3), l'enquête #19 (onomastique du préfixe « Le ») et l'enquête #23 (Aldégonde Le TASSIER × de MÉRODE, acte 1629) avant toute conclusion sur un ancêtre commun.
4. **Ne pas modifier l'arbre** (`index.html`, `index-modulaire.html`, données `GENEANET`) tant qu'un acte direct n'établit pas la jonction ; conserver les 50 personnes masquées anonymes et aucune donnée de contact personnelle.
