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

## 4. Métrique de couverture (calculée le 21/11/2026)

Vue **« Ascendance »** dans l'application : numérotation Sosa-Stradonitz de Vincent, avec statut de preuve par lien.

| Mesure | Valeur |
|---|---|
| Ancêtres Sosa identifiés | **18** (gen 2 à 8) |
| Liens **établis** | **9** (gen 2–4 : David, Agnès, Élisée, Arlette, Jean, Joséphine, Jean Félicien, Hélène Lamarque, Delphine Favre) |
| Liens **hypothétiques** | **9** (gen 5–8 : Firmin, Aline, Pierre Joseph, Philomène, Antoine, Jean-Baptiste, Anne Joseph, Lambert, Jeanne Catherine) |
| Parents manquants | **20** (cases Sosa vides) |
| Profondeur | **8 générations** |
| C3 promus | **0** (H0 conservée) |

- **Liens hypothétiques** : 9 Sosa, tous en attente de verdict — la vue les affiche en orange, jamais comme établis.
- **Trous sans parents** : 8, tous avec une enquête ouverte et une action décrite.
- **Graphe établi** : 10 individus `raccorde=true` ; 653 C3 non raccordés.

### Sondage API des trous proches

`docs/sondage-trous-vincent-2026-11-21.md` : le fichier des décès (matchID/INSEE, B1) a été interrogé
pour Arlette Roussette, Jean Reymond, Hélène Lamarque, Delphine Favre et Joséphine Favre. **Aucun
décès ne correspond aux cibles** (homonymes écartés, y compris 4 « Jean Reymond » nés vers 1936 mais
décédés avant 2023). Silence documentaire d'accès — aucune promotion, H0 conservée.

## 4bis. Décès B1 ajoutés (21/11/2026, ENQUETE-162)

| Fiche | Décès ajouté | Source | Statut |
|---|---|---|---|
| Élie Tassier (Sosa 2 de la gen 3) | **28/02/1997, Maubeuge** | GénéaFrance + morts.fr (B1, même fonds INSEE) | Indice concordant avec la naissance 1923 ; acte non consulté |
| Emmanuel Tassier | **2000, Maubeuge** | idem | Seule l'année est connue, aucun jour inventé |

Ces décès comblent des cases, ils **n'établissent aucune filiation** (H0 conservée). Voir `docs/demandes-actes.md` pour les copies à demander.

## 4ter. Les 9 verdicts à prendre (dans l'ordre de la numérotation Sosa)

| Sosa | Personne | Gén. | Ce qui est établi | Ce qui reste à trancher |
|---|---|---|---|---|
| 16 | Firmin Léon Tassier | 5 | Acte `3 E 7213` (1896) : ses parents sont Pierre Joseph × Philomène | Filiation de Firmin ← Pierre Joseph/Philomène (E159) |
| 17 | Aline Angèle Meunier | 5 | Acte 1889 : épouse de Firmin | Filiation d'Aline ← Antoine Joseph Meunier (E119) |
| 32 | Pierre Joseph Tassier | 6 | Acte 1889 le nomme père de Firmin | Filiation ← Jean-Baptiste × Anne Joseph (E76) |
| 33 | Philomène Decamps | 6 | Acte 1889 : décédée à Anor le 06/04/1879 | Ses propres parents (non documentés) |
| 34 | Antoine Joseph Meunier | 6 | Acte 1889 : journalier, père d'Aline | Ses parents (E119) |
| 64 | Jean-Baptiste Tassier | 7 | Table décennale (1791) | Filiation ← Lambert × Jeanne Catherine (E78) |
| 65 | Anne Joseph Fontaine | 7 | Table décennale (1796) | Ses parents (non documentés) |
| 128 | Lambert Joseph Tassier | 8 | Table décennale (1748) | Ses parents (E77 : coïncidence circulaire) |
| 129 | Jeanne Catherine Fontaine | 8 | Table décennale (1753) | Ses parents (non documentés) |

Chaque verdict se prend sur une pièce lue, **jamais** par déduction d'un nom ou d'une ressemblance. Les enquêtes correspondantes sont en « Intervention humaine ».

## 5. Ce qui a été fait sans intervention humaine (21/11/2026)

- Les 161 enquêtes ont été classées : **158 intervention humaine**, **1 en cours** (garde non satisfaite), **2 trouvé**, **0 abandonné** (aucun rapport ne dit qu'il n'y a plus d'action) — voir `docs/classification-recherches.md`.
- matchID/INSEE a fourni des décès sourcés (B1) et l'audience des API a été documentée.
- Aucune promotion C3, aucune fusion, aucune cote inventée.

## 6. Décisions humaines attendues

1. Demander les copies d'actes listées en §2 (Archives du Nord, Archives de Savoie, mairies).
2. Lire visuellement les actes numérisés (E05, E31) — l'OCR manuscrit échoue systématiquement.
3. Pour chaque lien hypothétique du §3 : verdict `A1-témoin` daté ou acte, **jamais de promotion automatique**.
