# Enquête 158 — Table décennale d'Anor 1792-1873 : section « Naissances », lettre T, année 1866 (suite de l'enquête 156)

**Date :** 20/11/2026 · **Date d'arrêt des preuves :** 20/11/2026 · **Grade global :** **A1** pour la notice, l'API, le téléchargement intégral des 262 images originales, les en-têtes de tables et la lecture de la table « Naissances 1863-1873 » ; **non établi** pour l'entrée recherchée (non trouvée) · **Conclusion : non trouvé — H0 conservée** ; aucune cote, date, graphie, filiation ni numéro d'acte inventé.

> Point B de `ENQUETE-156.md`. Le périmètre demandé (images 0-120) a été parcouru, puis **étendu aux 262 images** après constat qu'il couvre les tables 1792-1843 et non 1866. Règles appliquées : « non trouvé » > approximation ; H0 = homonymie / non-rattachement conservée ; cote + URL + date + grade Admiralty (A–F, 1–6) par source ; RGPD strict (aucune coordonnée personnelle) ; **aucune modification du graphe**. Livrable unique `ENQUETE-158.md`.

## Question fermée

**La table décennale d'Anor 1792-1873 (`1 Mi 188 R 000`, ARK `v3thsq9cz517`) indexe-t-elle, dans sa section « Naissances », une entrée « TASSIER » — ou graphie voisine `CASSIER` — pour l'année 1866 (naissance de Firmin Léon le 25/09/1866), avec un numéro d'acte exploitable ?** Oui / non / non vérifiable — une seule réponse.

Test discriminant : la **présence littérale du nom** dans la colonne « Noms » de la table « Naissances 1863 à 1873 », pas la concordance des dates issues de l'acte de mariage de 1889 ou de Geneanet.

## Hypothèses

| Hypothèse | Énoncé | Statut en fin d'enquête |
| --- | --- | --- |
| **H0** | Homonymie / non-rattachement : ni l'acte de naissance de 1866 ni son index ne sont établis ; la date du 25/09/1866 et les parents Pierre Joseph Tassier × Philomène Decamps proviennent de sources indirectes. | **Conservée** (non réfutée) |
| **H1** | Une entrée « TASSIER ... 25 7bre 1866 » figure dans l'index « Naissances » avec un numéro d'acte. | **Écartée pour cette source** : aucune entrée TASSIER/CASSIER lue dans la table complète, et **l'index ne comporte aucune colonne « numéro d'acte »** (colonnes : `Noms`, `Prénoms`, `Dates`). |
| **H2** | Graphie divergente (`Cassier` relevé en 1896), date de déclaration décalée ou autre registre. | **Non écartée** : la section C a été lue sans résultat, mais les variantes manuscrites ne sont pas épuisées. |
| **H3** | Lecture partielle / mauvaise localisation des pages (hypothèse de l'enquête 156 : « images vraisemblablement 0-120 »). | **Levée quant à la localisation** : 0-120 = tables 1792-1843 (en-tête « Année 1833 à 1843 » à l'image 113) ; la table 1863-1873 est aux images **221-237**. Maintenue quant à la lecture cursive manuelle. |

## Sources gradées (code Admiralty A–F, 1–6)

| ID | Source | URL / cote | Date | Grade | Apport / limite |
| --- | --- | --- | --- | --- | --- |
| S1 | Notice « ANOR / TD [1792-1873] » | cote **`1 Mi 188 R 000`**, ARK `https://archivesdepartementales.lenord.fr/ark:/33518/v3thsq9cz517` | 20/11/2026 | **A1** | 262 medias confirmés ; titre, cote et période 1792-1873 cohérents. Aucune cote 3 E supposée. |
| S2 | API du visualiseur (paramètre `group=0` obligatoire) | `https://archivesdepartementales.lenord.fr/visualizer/api?arkName=v3thsq9cz517&start=0&end=261&group=0` | 20/11/2026 | **A1** | 262 URL d'originaux obtenues ; HTTP 200. Sans `group=0`, HTTP 400 (déjà vérifié en 156). |
| S3 | **262 images originales téléchargées en pleine résolution (4456 × 3216)** et planche de contact des images 0-120 puis 121-235 | `https://archivesdepartementales.lenord.fr/images/<uuid>.jpg` (URL exactes via S2) | 20/11/2026 | **A1** | Repérage des sections. Limite : l'échelle de la planche ne permet pas la lecture des noms ; les pages pertinentes ont donc été relues en pleine résolution (S4-S6). |
| S4 | **Image 0 — page de garde** | UUID `5254a800-8687-4d2d-b2f5-23865ff85c34` · `https://archivesdepartementales.lenord.fr/ark:/33518/v3thsq9cz517/5254a800-8687-4d2d-b2f5-23865ff85c34` | 20/11/2026 | **A1** (lu) | Écritures littérales : « ANOR / Tables décennales des / N.°. M.°. D. / 1792, 7bre — 1802 / établie chronologiquement » et « ANOR / Table des / naissances / 1799, 7bre — 1802 ». **Prouve** que le volume compile des tables décennales successives. |
| S5 | **Images 113, 185, 221 — en-têtes de décennie** | 113 : `ec717a1a-1085-4e52-8970-89ffc98dff92` · 185 : `75bb673b-092b-40a0-8187-0b7c5fd50247` · 221 : `43020b42-93d2-4f52-a508-9358c0a702dd` · URLs ARK `https://archivesdepartementales.lenord.fr/ark:/33518/v3thsq9cz517/<uuid>` | 20/11/2026 | **A1** (lus) | En-têtes lus : image 113 « Année 1833 à 1843 » (avec « Naissances ») ; image 185 « Année 1853 à 1863 » ; **image 221 « Département du Nord / Arrondissement d'Avesnes / Commune d'Anor / Année 1863 à 1873 »**. **Corrige la localisation de l'enquête 156** : les images 0-120 ne contiennent pas 1866. |
| S6 | **Images 222-237 — table « Naissances 1863 à 1873 » lue intégralement en pleine résolution (colonnes « Noms » et « Prénoms »)** | 222 : `1ff53b25-7b63-42f1-a7f2-109f60c58670` · 235 : `2fcb1637-dac7-437a-adce-1bbbc00da5a4` · 236 : `38f3d277-2065-4892-99cd-8171f1525b98` · 237 : `362de8b9-e9cf-42de-9a86-90ed2c4d550a` · URLs ARK `https://archivesdepartementales.lenord.fr/ark:/33518/v3thsq9cz517/<uuid>` | 20/11/2026 | **A1** (lecture directe) | En-tête lu à l'image 222 : « Naissances », colonnes **`Noms / Prénoms / Dates`** — **aucune colonne de numéro d'acte**. Séquence alphabétique A→W sur 16 images (222-237). **Aucune entrée TASSIER ni CASSIER relevée ; aucun prénom « Firmin » relevé.** Noms de la lettre T lus (images 217 et 236) : « Tellier », « Thibault », « Thiry », « Thiébaud », « Tricot », « Thuillie » — tous écartés. L'image 237 marque la fin des Naissances (V/W) et le début des « Mariages ». |
| S7 | Image 261 — clôture du volume | UUID `9580c9e2-5cd5-49f6-9062-739332366703` · `https://archivesdepartementales.lenord.fr/ark:/33518/v3thsq9cz517/9580c9e2-5cd5-49f6-9062-739332366703` | 20/11/2026 | **A1** | « Vu et clos … 7bre 1873 » : borne haute confirmée ; cohérent avec l'absence de suite après 1873. |
| S8 | Synthèses internes `ENQUETE-151.md`, `ENQUETE-156.md` | fichiers locaux | 19-20/11/2026 | **C1** | Reprise du cadre : l'acte N° 115 du 25/09/1866 dans `5 Mi 011 R 005` concerne un autre enfant ; la cible et ses parents sont énoncés à l'acte de mariage de 1889 (A1, source indirecte). Non une lecture d'index. |

Sources écartées : aucune entrée n'a été déduite d'une ressemblance graphique ; le silence de l'index n'est pas une preuve d'inexistence de l'acte ; aucune cote 3 E n'a été fabriquée pour 1866 ; aucun numéro d'acte n'a été attribué. Aucune donnée de contact personnelle n'a été collectée ou reproduite. Aucun fichier du dépôt n'a été modifié hors le présent livrable.

## Résultat

**Non trouvé — H0 conservée, H3 levée pour la localisation.**

Ce qui est **trouvé et vérifié** (A1) :

- **Localisation exacte de la section** : l'en-tête de l'image **221** porte « Année 1863 à 1873 » ; l'image **222** ouvre la table « **Naissances** » dont les colonnes sont « **Noms / Prénoms / Dates** ». La table court de l'image **222 à l'image 237** (lettres A → W), avant le passage aux « Mariages » à l'image 237 et la clôture de 1873 à l'image 261. **Les images 0-120, où l'enquête 156 supposait la section, couvrent en réalité les tables 1792-1843** (en-tête « Année 1833 à 1843 » lu à l'image 113) : l'hypothèse de localisation est donc corrigée.
- **Lecture intégrale de la table compétente** : les colonnes « Noms » et « Prénoms » des 16 images 222-237 ont été lues en pleine résolution. **Aucune entrée « TASSIER » ni « CASSIER » n'y figure ; aucun prénom « Firmin » n'y a été relevé.** La lettre T (images 217 et 236) ne contient que « Tellier », « Thibault », « Thiry », « Thiébaud », « Tricot », « Thuillie », tous écartés. Le prénom « Firmin Léon » connu par l'acte de mariage de 1889 n'apparaît pas dans l'index.
- **Limite structurelle inédite** : **l'index ne comporte pas de colonne « numéro d'acte »**. Même si une entrée Tassier avait été trouvée, elle n'aurait pas fourni de numéro d'acte : l'objectif initial de l'enquête 156 (« avec un numéro d'acte exploitable ») n'était pas accessible par cette source. Le repère d'acte doit venir du registre, pas de la table.

Ce qui reste **non établi** : l'acte de naissance lui-même (déjà non trouvé dans `5 Mi 011 R 005` en ENQUETE-151), la filiation Pierre Joseph × Philomène Decamps pour cet acte, et toute cote 3 E pour 1866. Le résultat négatif de l'index n'est **pas** une preuve d'inexistence : la lecture est cursive et manuelle, et une graphie non reconnue (`Tassié`, `Tossier`…) reste possible (H2).

**Conclusion** : **H0 conservée** ; H1 écartée pour l'index (absence d'entrée + absence de colonne de numéro) ; H2 non écartée ; H3 levée quant à la localisation des pages, maintenue quant à la marge d'erreur de lecture. Aucun rattachement n'est établi, aucun nœud du graphe n'est modifié.

## Ce qui ferait changer la conclusion

- **Confirmerait H1** : la lecture, dans les images 222-237, d'une ligne « TASSIER ... 7bre 1866 » (ou « Firmin ... ») — non observée ici —, puis le rapprochement avec le registre `5 Mi 011 R 005` pour obtenir le numéro d'acte, que la table ne fournit pas.
- **Confirmerait H2** : la mise en évidence d'une graphie alternative dans la colonne « Noms » (ex. `Cassier`, déjà relevé à l'acte de naissance de 1896), ou d'une date de déclaration décalée ; révision alors de la recherche dans le registre 1866.
- **Lèverait définitivement H3** : une relecture indépendante des images 222-237 par un second lecteur, ou une transcription/OCR validée de la colonne « Noms », confirmant l'absence.
- **Ne ferait pas changer la conclusion** : la seule concordance des dates (25/09/1866) entre l'acte de mariage 1889 et Geneanet ; l'acte N° 115 du 25/09/1866 du registre (autre enfant) ; la clôture de 1873 ; la planche de contact ; l'absence de numéro d'acte dans l'index.

## Prochaine action concrète

1. **Ne pas réitérer la recherche dans les images 0-120** : elles couvrent 1792-1843. Consigner la correction de localisation (table « Naissances 1863-1873 » = images **221-237**, en-tête image 221, ouverture image 222) dans `PISTE-THIERACHE.md` §5, en opération dédiée — sans modifier le graphe.
2. **Demander en copie l'acte de naissance du 25/09/1866** à la mairie d'Anor / aux Archives départementales du Nord, en citant `5 Mi 011 R 005`, la page de garde « AN 1866 » (image 553) et l'absence d'index Tassier dans `1 Mi 188 R 000`. Le **numéro d'acte ne peut pas être obtenu de la table** (colonnes `Noms / Prénoms / Dates` seulement) : il devra être relevé sur l'acte ou fourni par le service d'état civil.
3. **Faire relire en indépendant la colonne « Noms » des images 222-237** (notamment 224-225 pour `Cassier` et 236 pour `Tassier`) avant d'écrire un « non trouvé » définitif sur l'index ; ne retenir que des noms lus littéralement.
4. **Conserver H0** : ne promouvoir ni le 25/09/1866, ni « Pierre Joseph Tassier × Philomène Decamps », ni la graphie `Cassier` au rang de fait d'acte de naissance ; ne reproduire aucune coordonnée personnelle ; ne modifier aucun nœud ni rattachement avant production d'un acte conforme. **Aucun autre fichier du dépôt n'est modifié par la présente enquête.**

*Fin de l'enquête 158 — livrable unique `ENQUETE-158.md` ; aucun autre fichier du dépôt n'a été modifié.*
