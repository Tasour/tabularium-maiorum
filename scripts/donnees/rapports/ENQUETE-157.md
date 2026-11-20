# Enquête 157 — Acte de naissance d'Anor, 29/09/1896 (`3 E 7213`) : lecture des parents de Léon-Félicien Tassier

**Date :** 19/11/2026 · **Grade global :** **A1** pour la notice, l'API, les pages de garde et l'acte original téléchargé puis lu directement ; **C1** pour les relevés et validations internes antérieurs · **Conclusion : TROUVÉ — les parents nommés sont Firmin Léon et Aline Angèle Meunier → H6 confirmée sur les parents**, avec une réserve graphique (Cassier/Tassier) non tranchée par ma propre lecture ; aucune cote, date ou transcription inventée.

> Suite de `ENQUETE-31.md` (18/11/2026, lecture antérieure), de `ENQUETE-156.md` et de `PISTE-THIERACHE.md` §2 et §10. Livrable unique `ENQUETE-157.md`. Règles appliquées : cote + URL + date de consultation + grade Admiralty (A–F, 1–6) par source ; « non trouvé » > approximation ; H0 = homonymie conservée par défaut, écartée ici uniquement sur le point précis testé ; aucune coordonnée personnelle (RGPD) ; **aucune modification du graphe**. Le rattachement d'Élisée à Jean Félicien n'est pas traité ici : seul le nom des parents de l'acte de 1896 est demandé.

## Question fermée

**L'acte de naissance d'Anor du 29/09/1896 (registre `3 E 7213`, ARK `t5wd46nfsz8x`) nomme-t-il « Firmin Léon » et « Aline Angèle Meunier » comme parents de l'enfant prénommé Léon-Félicien ?** Oui / non / non vérifiable — une seule réponse : **oui**, par lecture directe de l'original numérisé.

## Hypothèses

| Hypothèse | Énoncé | Statut en fin d'enquête |
| --- | --- | --- |
| **H0** | Homonymie / non-rattachement : l'acte du 29/09/1896 concerne un autre enfant ou nomme d'autres parents ; le pont Thiérache reste non documenté. | **Écartée sur le point testé** (les deux parents attendus sont nommés) ; conservée comme règle pour le rattachement d'Élisée, hors objet de cette enquête. |
| **H1** | L'acte nomme Firmin Léon et Aline Angèle Meunier comme parents de l'enfant né le 29/09/1896 à Anor, prénommé Léon-Félicien. | **Confirmée (A1, lecture directe de l'original)** → H6 confirmée. |
| **H2** | Les prénoms sont inversés ou graphiés autrement (Félicien-Léon, Léon Félicien). | **Non retenue** : le corps de l'acte porte « Léon Félicien » ; l'inversion relevée sur la fiche Geneanet (C3) ne concerne pas les parents. |
| **H3** | Le patronyme du père est lu « Cassier », non « Tassier ». | **Non tranchée par ma lecture** : je lis « Cassier » (initiale C arrondie, y compris en marge) ; un contrôle visuel humain antérieur, consigné, rapporte « Tassier ». Graphie seule, sans effet sur les prénoms parentaux. |

## Sources gradées (code Admiralty A–F, 1–6)

| ID | Source | URL / cote | Date | Grade | Apport / limite |
| --- | --- | --- | --- | --- | --- |
| S1 | Notice du registre — « ANOR / N [1891 - 1900] », 233 objets image, période 1891-01-01 / 1900-12-31 | cote **`3 E 7213`**, ARK `https://archivesdepartementales.lenord.fr/ark:/33518/t5wd46nfsz8x` | 19/11/2026 | **A1** | Cote et période confirmées par les champs `title`, `referenceCode` et `period` de l'API. |
| S2 | API du visualiseur — 233 URLs d'images et `location.original` | `https://archivesdepartementales.lenord.fr/visualizer/api?arkName=t5wd46nfsz8x&start=0&end=232&group=0` | 19/11/2026 | **A1** | **`group=0` obligatoire** (sans lui, HTTP 400 ; vérifié dans les enquêtes antérieures). Accès intermittent HTTP 521 contourné par en-tête `User-Agent` et nouvelles tentatives. Aucun index nominatif fourni par l'API. |
| S3 | Pages de garde lues en pleine résolution : **index 0 = « AN 1891. »** (timbre « 3 E 7213 », « Premier feuillet ») ; **index 160 = « AN 1898. »** | originaux via `location.original` de S2 (UUID `53de0206-afd5-4b5b-8920-aa0fb0e652c3` et `24ecd632-b2b4-4240-98aa-6dcb467aa599`) | 19/11/2026 | **A1** | Borne 1896 confirmée dans le volume : l'acte ciblé (index 130) est bien avant la garde 1898. |
| S4 | **Original de l'acte : index 130 (base 0) du tableau API**, page de droite, folio imprimé **3166**, **15ᵉ feuillet**, **acte n° 78** | `https://archivesdepartementales.lenord.fr/images/66fea130-8ad0-43bd-b37b-ac128c891e06.jpg` · vue `ark:/33518/t5wd46nfsz8x/66fea130-8ad0-43bd-b37b-ac128c891e06` | 19/11/2026 | **A1** | Téléchargé (HTTP 200 après retries) et lu en pleine résolution (3510×2515) puis recadré ×2–×4. Source directe de la transcription ci-dessous. |
| S5 | Fichier de preuve local `preuves/anor-1896-naissance-130.jpg` | `3 E 7213` / ARK `t5wd46nfsz8x` ; SHA-256 `96a971053ae4cc08028cb2ef5692bea3b469444d12a4bb12a9d8f50fb2cec53e` | 19/11/2026 (contrôle) | **A1** | **Hash identique** à l'original S4 téléchargé ce jour et différence pixel nulle (`ImageChops.difference().getbbox() = None`) : le fichier archivé est bien l'original non retouché. |
| S6 | `ENQUETE-31.md` — lecture antérieure du 18/11/2026 (acte n° 78, folio 3166) | fichier local ; même ARK | 19/11/2026 (relecture du relevé) | **C1** | Donne les mêmes parents, mais transcrit le patronyme « Cassier » et cite l'UUID `0dc5325c-bf53-4fd9-82cc-321669c99268` comme « image 129 ». **Décalage d'index constaté le 19/11** : cet UUID sert aujourd'hui les folios **3163/3164** (actes n° 68–73) ; l'acte n° 78 est à l'index **130** (S4). À consigner pour la reproductibilité. |
| S7 | `data/annotations/acte-1896.json` — huit zones de lecture et validation visuelle par l'utilisateur | fichier local ; `3 E 7213`, acte n° 78 | 19/11/2026 (relecture du relevé) | **C1** | Rapporte « Firmin Léon Tassier » et « Aline Angèle Meunier » comme lus, avec validation humaine du nom « Tassier ». Contrôle humain consigné, **pas** une seconde lecture indépendante de ma part ; je ne le substitue pas à ma lecture littérale. |
| S8 | `PISTE-THIERACHE.md` §2/§10 et fiche Geneanet `felicien+leon` | `https://gw.geneanet.org/btrichet?lang=fr&m=N&v=TASSIER` | 19/11/2026 (relecture du relevé) | **C3** | Attendu : Firmin Léon TASSIER (1866-1948) × Aline Angèle MEUNIER (†/1917). Arbre collaboratif, sans valeur probante autonome ; sert seulement de repère de comparaison. |
| S9 | `ALERTE-ACTE-1925.md` et `PISTE-THIERACHE.md` §10 — confirmation visuelle 19/11 du nom « Tassier » sur l'acte 1925 | fichiers locaux | 19/11/2026 | **C1** | Sans effet sur la lecture de l'acte de 1896 ; rappelle qu'aucune correction structurante du graphe n'est appliquée sans contrôle visuel humain. |

Sources écartées : aucun nom, âge, métier, lieu ou date n'a été déduit d'une ressemblance graphique ; aucune cote 3 E n'a été fabriquée ; aucune coordonnée personnelle n'a été collectée ou reproduite ; l'OCR (échoué en `ENQUETE-31`) n'a pas été réutilisé comme preuve ; aucun fichier du dépôt n'a été modifié hors le présent livrable.

## Résultat

**Trouvé — H1 confirmée, donc H6 confirmée sur les parents (A1).** L'acte n° 78 de la page de droite (folio imprimé 3166, 15ᵉ feuillet), à l'index 130 de l'API, s'ouvre sur « L'an mil huit cent quatre vingt seize, le vingt neuf septembre ». Il nomme explicitement le **père, comparant : « Firmin Léon [C]assier, âgé de trente ans »**, et la **mère : « Aline-Angèle Meunier, son épouse, âgée de vingt sept ans »**. Le nom de la mère, les deux prénoms du père, la date, le lieu (Anor) et le prénom de l'enfant (« Léon Félicien ») concordent exactement avec l'attendu du pont Thiérache. Le test décisif portant sur les noms des parents est donc **positif**.

### Transcription littérale (acte n° 78, original S4/S5)

> « L'an mil huit cent quatre vingt seize, le vingt neuf septembre à trois heures du soir, par devant nous Charles Joseph Bessac, maire & officier de l'état civil de la commune d'Anor, canton de Trélon, arrondissement d'Avesnes, département du Nord, a comparu **Firmin Léon Cassier, âgé de trente ans**, verrier, domicilié à Anor, lequel nous a présenté un enfant du sexe masculin, né aujourd'hui à deux heures du matin, en sa demeure rue de la Papeterie, de lui, comparant, & de **Aline-Angèle Meunier, son épouse, âgée de vingt sept ans**, ménagère, même domicile, auquel enfant il a été donné les prénoms de **Léon Félicien**. »

> Mention marginale autographe, partiellement lisible : « [C]assier Léon-Félicien, … légitime. Du 29 septembre. » Un cachet postérieur porte « MARIAGE à Maubeuge le 6 janvier 1923 … Lamarque Hélène … », dont l'attribution à cet enfant reste à vérifier (S7) et n'est pas utilisée ici.

**Réserve graphique (H3, non tranchée par moi).** Dans l'original téléchargé ce jour, l'initiale du patronyme du père et de la mention marginale est une **C arrondi à grande boucle** : je lis littéralement « Cassier », comme l'avait lu `ENQUETE-31.md` (S6). Le relevé `acte-1896.json` (S7) et la consigne de cette enquête rapportent que l'utilisateur a confirmé visuellement « Tassier » (le T cursif pouvant ressembler à un C). Le nom de famille n'est **pas** un nom d'un personnage distinct : prénom, date, lieu, conjointe et prénom de l'enfant sont uniques dans la page. Je **ne corrige donc pas** la lecture et je **ne modifie pas le graphe** : la question posée — les noms des parents — est tranchée indépendamment de la graphie du patronyme. Aucune conclusion n'est tirée de l'âge des parents (30 et 27 ans) sinon qu'il est compatible avec les années 1866 et 1869 déjà avancées ailleurs.

## Ce qui ferait changer la conclusion

- **Confirmerait sans réserve H1/H6** : un contrôle visuel humain renouvelé sur l'initiale du patronyme concluant à « Tassier », ou un acte postérieur (mariage Maubeuge 1923, décès 21/04/1980) portant « Tassier » avec les mêmes parents.
- **Réintroduirait H0** : la lecture d'un autre acte du 29/09/1896 à Anor nommant d'autres parents pour un « Léon-Félicien » ; ou la preuve que la « Aline-Angèle Meunier » de cet acte est une homonyme (acte de mariage des parents ne concordant pas).
- **Confirmerait H3** : une seconde lecture humaine indépendante confirmant « Cassier » comme patronyme de cette branche, sans acte ultérieur corrigeant en « Tassier » ; le rattachement resterait alors à documenter séparément, sans modifier les prénoms parentaux relevés ici.
- **Ne ferait pas changer la conclusion** : l'échec de l'OCR, le décalage d'index entre l'UUID cité en S6 et l'index réel (S4), le cachet marginal de 1923 non attribué, et l'inversion des prénoms sur la fiche Geneanet (S8).

## Prochaine action concrète

Consigner dans `PISTE-THIERACHE.md` §5 le résultat positif — **acte n° 78, `3 E 7213`, folio 3166, index API 130, UUID `66fea130-8ad0-43bd-b37b-ac128c891e06`**, parents **Firmin Léon × Aline Angèle Meunier**, lecture du 19/11/2026 — en précisant que la **graphie Cassier/Tassier reste réservée à un contrôle visuel humain** et qu'aucun nœud du graphe n'est modifié par cette enquête. Demander ensuite la copie de l'**acte de mariage de Firmin Léon et Aline Angèle Meunier** (cote à relever, non à inventer) pour établir la filiation de Firmin Léon et clore définitivement la question de la graphie.

*Fin de l'enquête 157 — livrable unique `ENQUETE-157.md` ; aucun autre fichier du dépôt n'a été modifié.*
