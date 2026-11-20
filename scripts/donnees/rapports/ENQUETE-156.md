# Enquête 156 — Table décennale d'Anor 1792-1873 : recherche d'une entrée Tassier 1866

**Date :** 19/11/2026 · **Grade global :** **A1** pour la notice, l'API et les pages lues ; **non établi** pour l'entrée recherchée (non trouvée dans le périmètre examiné) · **Conclusion : non trouvé — H0 conservée, lecture partielle** ; aucune cote, date ni transcription inventée.

> Suite de `ENQUETE-151.md` (acte de naissance de Firmin Léon non trouvé dans `5 Mi 011 R 005`) et de `ENQUETE-49.md` S5. Livrable unique `ENQUETE-156.md`. Règle appliquée : « non trouvé » > approximation ; H0 = homonymie / non-rattachement conservée ; cote + URL + date + grade Admiralty ; aucune coordonnée personnelle ; **aucune modification du graphe**.

## Question fermée

**La table décennale d'Anor 1792-1873 (`1 Mi 188 R 000`) indexe-t-elle une entrée « TASSIER Firmin Léon » (ou graphie voisine `CASSIER`) correspondant à une naissance du 25/09/1866, avec un numéro d'acte exploitable ?** Oui / non / non vérifiable — une seule réponse.

## Hypothèses

| Hypothèse | Énoncé | Statut |
| --- | --- | --- |
| **H0** | Homonymie / non-rattachement : la date et les parents convergent entre l'acte de mariage 1889 et Geneanet, mais aucune lecture d'acte ni d'index ne confirme la naissance. | **Conservée** |
| **H1** | Une entrée « TASSIER ... 25 7bre 1866 » figure dans la table avec un numéro d'acte. | **Non documentée** dans le périmètre lu |
| **H2** | Graphie divergente (`Cassier`, capitale C relevée en 1896), date de déclaration décalée, ou autre registre. | **Non écartée** |
| **H3** | Lecture partielle : 262 images, seule une partie examinée en pleine résolution. | **Retenue** |

## Sources gradées

| ID | Source | URL / cote | Date | Grade | Apport / limite |
| --- | --- | --- | --- | --- | --- |
| S1 | Notice « ANOR / TD [1792-1873] » | cote **`1 Mi 188 R 000`**, ARK `https://archivesdepartementales.lenord.fr/ark:/33518/v3thsq9cz517` | 19/11/2026 | **A1** | Notice confirmée : 262 medias. Aucune cote 3 E supposée. |
| S2 | API du visualiseur | `https://archivesdepartementales.lenord.fr/visualizer/api?arkName=v3thsq9cz517&start=0&end=261&group=0` | 19/11/2026 | **A1** | **262 URLs d'images** accessibles. Le paramètre **`group=0` est obligatoire** : sans lui, HTTP 400 (vérifié). Un `end` supérieur au nombre d'images renvoie également HTTP 400. |
| S3 | Planche de contact des images 0-256 (pas de 8) | traitement local, 33 vignettes | 19/11/2026 | — | Repérage visuel : registre unique, sections successives de tableaux manuscrits, fortes variations d'écriture. Aucun nom lisible à cette échelle. |
| S4 | Images **244, 256-261** lues en pleine résolution (4472×3224) | originals via `location.original` de S2 | 19/11/2026 | **A1** | **Section mariages, lettre L** (image 244 : entrées 1863-1866) ; **lettres M/P/R/S/T** (images 258-260 : « Thiry, Thivart, Thomas, Thibault, Vion »…) ; **lettres V/W et mention de clôture « Vu et clos … 7bre 1873 »** (image 261, dernière du volume). **Aucune entrée « Tassier » relevée** dans ce périmètre. Noms voisins lus et écartés : Thiry, Thivart, Thomas, Thibault. |
| S5 | Acte de mariage 1889 (`ENQUETE-37`) | `1 Mi EC 012 R 003`, image 301 | 19/11/2026 | **A1** | Donne 25/09/1866 et les parents Pierre Joseph × Philomène Decamps : repère **hors de la table lue**, non une lecture de l'entrée. |

Sources écartées : aucune entrée n'a été déduite de la seule ressemblance graphique ; la page de clôture 1873 atteste que le volume est complet, mais pas que chaque section a été lue. Aucune coordonnée personnelle.

## Résultat

**Non trouvé dans le périmètre examiné — H0 conservée, H3 retenue.** La cible est **localisée** (notice, ARK, 262 images, API opérationnelle) et la fin du volume est atteinte (clôture 1873, image 261), mais **aucune entrée « Tassier / Cassier » n'a été lue** dans les pages examinées (section mariages lettres L à V/W). La section des **naissances** du volume (images vraisemblablement 0-120) n'a pas été parcourue intégralement en pleine résolution : l'absence relevée n'est donc **pas** une preuve négative. Aucun numéro d'acte n'est attribué à Firmin Léon ; aucune cote 3 E n'est fabriquée pour 1866.

## Ce qui ferait changer la conclusion

- Lecture de la section « Naissances » de la table (images 0-120) : entrée « TASSIER ... 25 7bre 1866 » avec numéro d'acte → H1, et repère pour demander la copie.
- Entrée sous graphie `CASSIER` → H2 confirmée ; révision de la recherche dans le registre 1866.
- Localisation de la table d'Anor **1855-1872** (cote à relever, non extrapolée) pour le mariage Pierre Joseph × Philomène Decamps (~1860).

## Prochaine action concrète

Parcourir les **images 0-120** de l'ARK `v3thsq9cz517` en pleine résolution, repérer la section « Naissances » puis la lettre T, et relever littéralement toute entrée Tassier/Cassier de 1866 avec son numéro d'acte. Consigner le résultat — positif ou négatif — dans `PISTE-THIERACHE.md` §5.
