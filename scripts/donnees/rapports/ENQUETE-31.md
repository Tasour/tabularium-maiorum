# Enquête 31 — Image Anor 1896 : lecture de l'acte du 29/09/1896

**Date :** 18/11/2026 · **Grade global :** A1 — acte original numérisé lu directement (image 129/233).
**Résultat : trouvé (H1 confirmée sur les prénoms et les parents), avec une réserve sur le nom de famille.**

## Question fermée

La page du **29 septembre 1896** du registre **3 E 7213** (ANOR / N [1891-1900]) nomme-t-elle
**Firmin Léon** et **Aline Angèle Meunier** comme parents du nouveau-né ?

## Hypothèses

- **H0 (homonymie)** : aucun acte de la famille recherchée à cette date ; le rapprochement
  INSEE/Geneanet est une coïncidence.
- **H1** : l'acte existe et nomme Firmin Léon × Aline Angèle Meunier comme parents de
  Léon Félicien, né le 29/09/1896 à Anor.
- **H2** : l'acte existe mais les prénoms sont inversés ou graphiés autrement
  (Félicien-Léon, Léon-Félicien).
- **H3** : l'acte existe et les parents sont corrects, mais le **nom de famille lu est « Cassier »**
  et non « Tassier » — variante, erreur de clerc ou famille différente.

## Sources consultées

| Source | Grade | URL / cote | Date | Résultat |
| --- | --- | --- | --- | --- |
| API du visualiseur (233 images) | A1 | `https://archivesdepartementales.lenord.fr/visualizer/api?arkName=t5wd46nfsz8x&end=232&group=0&start=0` | 18/11/2026 | 233 URLs `/images/{uuid}.jpg` accessibles |
| Notice du registre | A1 | `https://archivesdepartementales.lenord.fr/ark:/33518/t5wd46nfsz8x` · **3 E 7213**, ANOR / N [1891-1900] | 18/11/2026 | Cote et période confirmées |
| **Image 129/233, page de droite, acte n° 78** | **A1** | `https://archivesdepartementales.lenord.fr/images/0dc5325c-bf53-4fd9-82cc-321669c99268.jpg` · vue `ark:/33518/t5wd46nfsz8x/0dc5325c-bf53-4fd9-82cc-321669c99268` | 18/11/2026 | **Trouvé** : acte du 29/09/1896, folio imprimé **3166**, **15ᵉ feuillet**, lu en pleine résolution puis recadré ×2–×6. **RECTIFICATIF 21/11/2026 :** l'image téléchargée à cette URL montre en réalité les folios **3163/3164** et les actes n°68-73, 78 « Delavarde Ferdinand Joseph ». L'UUID cité ici est donc **mal attribué** à l'acte de Léon Félicien (folio 3166). L'acte lu reste conservé dans `preuves/anor-1896-naissance-130.jpg` ; cette image-ci est archivée comme **contexte du registre** (`preuves/acte-1896-image-129-par-acte78.jpg`, SHA-256 `4f1eba24…`), jamais comme preuve de l'acte. |
| Repères de navigation (images 0, 40, 80, 95, 125, 130, 135, 160) | A1 | mêmes URLs `/images/{uuid}.jpg` | 18/11/2026 | Couvertures imprimées « AN 1891 » (image 0) et « AN 1898 » (image 160) ; image 95 = 2ᵉ feuillet de 1895, image 125 = 11ᵉ feuillet (juillet 1896) |
| OCR tesseract (`fra`/`eng`, psm 6) sur images 90–200 et 129–130 | — | Traitement local | 18/11/2026 | **Échec** : écriture cursive non reconnue ; aucune donnée exploitable, aucun résultat inventé |

## Résultat

**Trouvé — H1 confirmée, H3 non résolue.** L'acte n° 78 de la page de droite (folio 3166,
15ᵉ feuillet) de l'image 129 commence par :

> « L'an mil huit cent quatre-vingt-seize, le **vingt-neuf septembre**, à trois heures du soir,
> devant nous, Joseph Bessac [Besa?] Marie, officier de l'état civil de la commune d'Anor,
> canton de Trélon, arrondissement d'Avesnes, département du Nord, a comparu **Firmin Léon
> Cassier**, âgé de trente ans, […] domicilié à Anor, lequel nous a présenté un enfant du sexe
> masculin, né aujourd'hui à deux heures du matin, en sa demeure […] de lui, comparant, et
> d'**Aline-Angèle Meunier**, son épouse, âgée de vingt-sept ans, ménagère, même domicile,
> auquel enfant il a été donné les prénoms de **Léon-Félicien**. »

Les mentions marginales du même acte portent « **Cassier Léon-Félicien** », « né le 29 septembre »,
« marié à Maubeuge janvier 1923 » et « décédé […] le **21 avril 1980** », cette dernière date
concordant avec le décès connu (21/04/1980).

**Réserve indispensable :** le nom de famille est lu **Cassier**, avec une initiale en C arrondi,
identique à celle de « Célina » et différente du T de « Trélon » écrit par le même clerc ; la
mention marginale répète « Cassier Léon-Félicien ». L'acte ne dit donc pas « Tassier ». Le
prénom, la date, le lieu, la mère et le prénom de l'enfant correspondent exactement à l'attendu ;
le passage Cassier → Tassier doit être documenté avant tout rattachement.

## Ce qui ferait changer la conclusion

- **Confirme H1 sans réserve** : un acte postérieur (mariage Maubeuge 1923, décès 1980) écrivant
  le nom « Tassier », ou une mention marginale corrigeant « Cassier » en « Tassier ».
- **Confirme H3 / écarte le rattachement** : si les actes ultérieurs maintiennent « Cassier » et
  qu'aucun lien de filiation ne relie ce Léon-Félicien à la lignée Tassier : homonymie (H0).
- **Affaiblit H1** : une relecture de l'image 129 par une seconde personne lisant « Tassier » ou
  une graphie « Félicien-Léon » (H2).
- Ne change rien : l'échec de l'OCR, déjà constaté dans l'enquête 01.

## Prochaine action concrète

1. Consigner la transcription ci-dessus dans `PISTE-THIERACHE.md` §5 avec la cote **3 E 7213**,
   l'acte **n° 78**, le folio **3166** et l'UUID de l'image 129.
2. Vérifier le nom de famille sur l'**acte de mariage à Maubeuge, janvier 1923** (enquête 33) et
   sur l'**acte de décès du 21/04/1980** : c'est le test décisif pour trancher Cassier / Tassier.
3. Consulter la **table décennale Anor 1891-1900** (enquête 32) pour voir sous quel nom
   « Léon-Félicien » est indexé ; une entrée « Cassier » conforterait la lecture de l'acte.
4. Si H1 est retenue, corriger les fiches `felicien_leon` / `jean_felicien` en mentionnant
   explicitement la variante « Cassier » relevée dans l'acte de naissance.
