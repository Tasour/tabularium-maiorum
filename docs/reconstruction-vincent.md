# Reconstruction de l'arbre complet — racine : Vincent Tassier

**Date :** 21/11/2026 · **Objectif :** documenter chaque lien de l'ascendance de Vincent, génération par génération.
**Statuts :** `établi` (acte A1 lu) · `hypothétique` (lien C3 non promu) · `non trouvé` (enquête ouverte) · `intervention humaine` (action non automatisable) · `abandonné` (plus d'action, motif écrit).

## 1. Chaîne connue (9 générations)

```
G1  Vincent Tassier (1999, Grenoble)
G2  David Tassier (1969) × Agnès Tassier (1967)
G3  Élisée Tassier (1927) × Arlette Roussette | Jean Reymond (1936) × Joséphine Reymond (1938)
G4  Jean Félicien (1898, Lyon) × Hélène Lamarque (1898) | Delphine Favre (~1899)
G5  Firmin Léon (1866) × Aline Meunier (1869)
G6  Pierre Joseph Tassier (1835) × Philomène Decamps (1843)
G7  Jean-Baptiste Tassier (1791) × Anne Joseph Fontaine (1796)
G8  Lambert Joseph Tassier (1748) × Jeanne Catherine Fontaine (1753)
G9+ réservoir : 653 ancêtres Geneanet (C3, non raccordés) avec indices parents dans les notes
```

Seuls les niveaux **G1→G2→G3** sont établis par déclaration/acte. À partir de G4, tous les liens sont `hypothétique`.

## 2. Trous à combler (ascendants sans parents)

| Ascédant | G | Enquêtes | Statut | Action restante (non automatisable) |
|---|---|---|---|---|
| Arlette Roussette | 3 | E03, E155 | intervention humaine | acte de mariage Élisée × Arlette, TD du Nord à consulter |
| Jean Reymond | 3 | E24, E91, E99, E100, E110 | intervention humaine | copie de `3E 4265` (Archives de Savoie, acte non numérisé) |
| Hélène Lamarque | 4 | E05 | intervention humaine | registre `3 E 8133`, 158 vues, sept. 1898 à Cerfontaine — lecture visuelle |
| Delphine Favre | 4 | E06, E07 | intervention humaine | TD La Chapelle 1897-1901, puis copie de l'acte |
| Philomène Decamps | 6 | E47, E72, E73, E159 | intervention humaine | mariage Pierre Joseph × Philomène : TD Anor/Trélon 1855-1865 |
| Antoine Joseph Meunier | 5 | E119 | intervention humaine | relever la cote du registre, puis copie (ayant droit) |
| Anne Joseph Fontaine | 7 | E76 | intervention humaine | demander la cote du registre de mariages aux AD du Nord |
| Lambert Joseph / Jeanne Catherine Fontaine | 8 | E77, E78 | intervention humaine | cote du registre paroissial à demander |

## 3. Liens hypothétiques à trancher

| Lien | Enquêtes | Statut | Test discriminant |
|---|---|---|---|
| Jean Félicien ← Firmin/Aline | E04, E160 | intervention humaine | acte lyonnais 1898 (fonds `2E`) ou mariage Maubeuge 1923 |
| Firmin ← Pierre Joseph/Philomène | E01, E31, E157 (trouvé : parents de Firmin) | partiellement établi | `3 E 7213` lu ; l'ascension de Pierre Joseph reste à prouver (E159) |
| Pierre Joseph ← Jean-Baptiste/Anne Joseph | E47, E72, E76 | intervention humaine | acte de mariage Anor/Trélon ~1860 |
| Jean-Baptiste ← Lambert/Jeanne Catherine | E77, E78 | intervention humaine | acte de mariage ~1770 (cote à demander) |
| Aline ← Antoine | E119 | intervention humaine | acte de naissance d'Aline, Mons 1869 |

## 4. Métrique de couverture

- **Sosa documentés par acte (G1–G3)** : 7 / 7 au niveau 3, puis 0 au-delà.
- **Liens hypothétiques** : 5 en attente de verdict.
- **Trous sans parents** : 8, tous avec une enquête ouverte et une action décrite.
- **Graphe établi** : 10 individuals `raccorde=true` ; 653 C3 non raccordés (H0 conservée).

## 5. Ce qui a été fait sans intervention humaine (21/11/2026)

- Les 161 enquêtes ont été classées : **158 intervention humaine**, **1 en cours** (garde non satisfaite), **2 trouvé**, **0 abandonné** (aucun rapport ne dit qu'il n'y a plus d'action) — voir `docs/classification-recherches.md`.
- matchID/INSEE a fourni des décès sourcés (B1) et l'audience des API a été documentée.
- Aucune promotion C3, aucune fusion, aucune cote inventée.

## 6. Décisions humaines attendues

1. Demander les copies d'actes listées en §2 (Archives du Nord, Archives de Savoie, mairies).
2. Lire visuellement les actes numérisés (E05, E31) — l'OCR manuscrit échoue systématiquement.
3. Pour chaque lien hypothétique du §3 : verdict `A1-témoin` daté ou acte, **jamais de promotion automatique**.
