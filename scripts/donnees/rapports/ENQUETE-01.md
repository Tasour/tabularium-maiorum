# Enquête 01 — Acte de naissance d'Anor, 1896

**Date :** 18/11/2026 · **Grade global :** piste documentaire localisée, acte non encore lu.

## Question fermée

L'acte de naissance de **Léon Félicien Tassier**, né le 29/09/1896 à Anor (Nord), nomme-t-il
**Firmin Léon Tassier** et **Aline Angèle Meunier** comme parents ?

## Hypothèses

- **H0 (homonymie)** : le Léon Félicien d'Anor (INSEE, † 1980 Maubeuge) n'appartient pas à la
  famille de Firmin Léon ; le rapprochement avec Jean Félicien (1898, Lyon) est une coïncidence.
- **H1** : c'est le même homme, fils de Firmin Léon et Aline Angèle Meunier, et il est le frère
  ou le cousin de Jean Félicien, père probable d'Élisée.
- **H2** : l'acte existe mais le prénom est translittéré différemment (Félicien-Léon, Léon-Félicien).

## Sources consultées

| Source | Grade | URL / cote | Date | Résultat |
| --- | --- | --- | --- | --- |
| Recherche ciblée Archives du Nord | A1 (inventaire) | `https://archivesdepartementales.lenord.fr/search/form/dc4e871d-0b62-41fb-9921-5ded573781b8` | 18/11/2026 | Registre **`ANOR / N [1891-1900]`, cote 3 E 7213**, 233 images |
| Notice du registre | A1 | `https://archivesdepartementales.lenord.fr/ark:/33518/t5wd46nfsz8x` | 18/11/2026 | Cote et période confirmées |
| Visualiseur (API interne) | A1 | `https://archivesdepartementales.lenord.fr/visualizer/api?arkName=t5wd46nfsz8x&end=232&group=0&start=0` | 18/11/2026 | 233 URLs d'images accessibles |
| Microfilm | A1 (inventaire) | `1 Mi EC 012 R 003` — ANOR / N (1881-1890), MD (1889-1897) | 18/11/2026 | Source alternative si le numérisé est illisible |
| Table décennale Anor | A1 | `3E TD 012/09` (1873-1882), `3E TD 012087/012` (1913-1922) | 18/11/2026 | Repérage des années 1891-1900 à confirmer |
| OCR d'un échantillon d'images (90-200) | — | Traitement local tesseract | 18/11/2026 | **Aucun résultat** : écriture manuscrite non reconnue |

## Résultat

**Localisé, non lu.** La bonne cote est désormais connue (3 E 7213), ainsi que l'ARK du
visualiseur et l'API qui expose les 233 images. L'acte lui-même n'a pas pu être lu automatiquement
(OCR inefficace sur l'écriture du registre). Le test discriminant reste donc **ouvert**.

## Ce qui ferait changer la conclusion

- **Confirme H1** : l'acte du 29/09/1896 nomme Firmin Léon Tassier et Aline Angèle Meunier.
- **Confirme H0** : l'acte nomme d'autres parents, ou aucun Léon Félicien n'est trouvé en 1896.
- **Affaiblit H1** : la date de naissance de l'INSEE (29/09/1896) ne correspond pas à l'acte.

## Prochaine action concrète

1. Ouvrir le visualiseur `ark:/33518/t5wd46nfsz8x` dans un navigateur et parcourir les images
   autour de septembre 1896 (estimé entre les images 120 et 180 du registre).
2. Lire visuellement l'acte du 29/09/1896, relever les parents, la date et le lieu exacts.
3. Consigner la cote, le numéro d'acte et la transcription dans `PISTE-THIERACHE.md` §5.
4. Si H1 confirmée : mettre à jour `felicien_leon` et le rattachement de `jean_felicien` ;
   si H0 confirmée : retirer le lien `hypo` et documenter l'éviction.
