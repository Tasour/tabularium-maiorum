# Enquête 30 — Export/import GEDCOM et réconciliation

**Date :** 18/11/2026 · **Grade global :** chantier technique (A1 pour les données locales).

## Question fermée

Peut-on exporter le relevé de 653 personnes vers un GEDCOM 5.5.1 interopérable, puis importer un
GEDCOM externe (Geneanet/Bruno, Gramps) **sans écraser** les fiches et les preuves déjà réunies ?

## Hypothèses

- **H0** : un export direct écrase ou dégrade les données locales ( grades Admiralty, sources, `proposedParents`).
- **H1** : un export avec mapping explicite préserve l'essentiel et produit un fichier valide.
- **H2** : l'import externe exige une réconciliation manuelle (homonymes, 57 doublons mesurés).

## Sources / état des lieux

| Élément | Grade | Fait |
| --- | --- | --- |
| `enquetes/geneanet-ancetres-complets-data.js` | A1 (local) | 653 personnes, 144 noms, URLs uniques vérifiées par `node:test` |
| `enquetes/geneanet-thierache-data.js` | A1 (local) | 483 TASSIER, sous-ensemble du précédent |
| Schéma `Person` (arbre) | A1 (local) | `parents` établis / `proposedParents` C3 / `isLiving` / sources gradées |
| `TOP-10-CHANTIERS.md` chantier 6 | — | GEDCOM + CSV identifié comme chantier à part entière |
| `AUDIT-ingenieur.md` | A1 (local) | 3466 enregistrements pour ~682 personnes, 3 schémas incompatibles |

## Résultat

**Non implémenté (H0/H2 confirmées comme risques).** Le dépôt ne contient aucun export GEDCOM.
Les données sont déjà dupliquées six fois ; un import naïf ajouterait une septième copie et
pourrait écraser les champs `proposedParents` et `nature` non représentés en GEDCOM standard.

Mapping proposé (à valider) :
- `INDI` ← `Person` (nom, dates, sexe inconnu laissé vide) ;
- `FAM` ← couples `spouses` ;
- `SOUR` ← `sources` (titre, URL, date de consultation) ;
- `NOTE` ← `bio`, `proposedParents` et grade Admiralty ;
- les 57 homonymes (même nom, URL différente) doivent rester **distincts** (ID stable = UUID de la fiche Geneanet).

## Ce qui ferait changer la conclusion

- Un export de test produit, validé par un logiciel tiers (Gramps) sans perte de champs.
- Une procédure d'import « fusion sans écrasement » testée sur une copie du dépôt.

## Prochaine action concrète

1. Écrire `scripts/gedcom-export.mjs` (Node, zéro dépendance) : lit `geneanet-ancetres-complets-data.js`,
   produit `export.ged` avec mapping ci-dessus et IDs stables.
2. Écrire `scripts/gedcom-import.mjs` : parse `INDI/FAM/SOUR/NOTE`, **ne remplace jamais** une fiche
   existante, crée des entrées `imported.*` et un rapport de différences.
3. Ajouter un test `test/gedcom.test.mjs` : 653 INDI en export, aucun doublon d'UID, import sur copie
   n'écrase aucune source locale.
4. Ne lancer l'import réel du GEDCOM de Bruno qu'après l'enquête #14 (contact manuel) et le
   consentement/RGPD vérifié.
