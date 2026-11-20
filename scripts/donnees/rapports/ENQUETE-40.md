# Enquête 40 — Consolidation des faux positifs écartés

**Date :** 19/11/2026 · **Grade global :** synthèse A1/C3 selon les cas.

## Question fermée

Quels candidats ont été explicitement écartés, pour quel motif et avec quelle source, afin d'éviter
qu'ils réapparaissent dans une future version de l'arbre ?

## Sources

Sources utilisées pour les évictions : JORFSearch (`jorf`, A1), recensements de La Chapelle 1931
et 1946 (`954W 184`, A1), acte de naissance 1925 (`3 E 10052`, A1), Libra Memoria (B2),
fichier INSEE des décès (A1), tables décennales 3E 4675 (A1), profils Copains d'avant (C3).
Toutes consultées les 14-19/11/2026.

## Hypothèses

- **H0** : chaque candidat écarté reste homonyme jusqu'à preuve contraire.
- **H1** : l'un d'eux a été écarté à tort et doit être réintégré.
- **H2** : l'éviction repose sur une déduction non documentée.

## Tableau des évictions

| Candidat | Motif d'éviction | Source | Grade |
| --- | --- | --- | --- |
| David Tassier, brigadier-chef de police 2019 | Métier et parcours incompatibles avec David SEMITAG (1969) | JORFSearch `jorf` | A1 |
| Gaston Favre (1922) et Lucienne Favre (1927) | Ménage Favre de 1931 distinct de celui de Delphine (1946) | Recensement 1931, `954W 184` | A1 |
| Joseph Favre (~1879) × Charlotte (~1881) | Autre ménage, enfants Gaston/Lucien/Lucienne : pas la fratrie de Joséphine | Recensement 1931 | A1 |
| Arlette Hélène Tassier (1925-2022) | Sœur d'Élisée, mariée Lerose/Leroux : **pas** la grand-mère Arlette Roussette | Acte 3 E 10052 | A1 |
| Arlette Roussette née Brevière (1934-2009) | Née en 1934, décédée dans le Nord : homonyme écartée | Libra Memoria | B2 |
| Laurent Reymond (profil public) | Détails familiaux contredits : probable homonyme | Copains d'avant | C3 |
| Monique (épouse de Robert Reymond) | Aucune Monique décédée le même jour retrouvée | Fichier INSEE décès | A1 |
| Candidats Favre de La Chapelle 1933-1942 | Âges/parents incompatibles avec le recensement 1946 | Tables 3E 4675 | A1 |

## Résultat

**H0 conservée, H1 non vérifiée, H2 écartée pour la plupart** : chaque éviction s'appuie sur une
source datée et sur un critère explicite (métier, âge, ménage, parenté). Aucune de ces personnes ne
doit être réintégrée sans nouvel acte.

## Ce qui ferait changer la conclusion

- Un acte de naissance ou de mariage reliant l'un de ces candidats à la lignée.
- Une correction de transcription dans une source A1 (ex. recensement mal lu).

## Prochaine action concrète

1. Conserver ce tableau dans `PISTE-THIERACHE.md` comme registre des homonymes écartés.
2. Le relire avant toute importation GEDCOM (ENQUETE-30) pour éviter une réintroduction.
3. Ne jamais supprimer une éviction sans documenter la raison de sa révision.
