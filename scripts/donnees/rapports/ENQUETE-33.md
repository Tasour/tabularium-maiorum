# Enquête 33 — Décès de Léon Félicien Tassier, Maubeuge 1980

**Date :** 18/11/2026 · **Grade global :** B1 (dérivé INSEE) pour l'identité et la cote d'acte ; acte original non lu, filiation non trouvée.

## Question fermée

L'acte de décès de Maubeuge du **21/04/1980** donne-t-il, dans les sources publiques consultables,
**le lieu de naissance exact** et **le nom des parents** de **Léon Félicien Tassier**, né le
29/09/1896 à Anor (59) ?

## Hypothèses

- **H0 (homonymie)** : l'entrée « Léon Felicien TASSIER, Anor 1896 – Maubeuge 1980 » n'est pas le
  Félicien Léon de la fiche Geneanet (`felicien_leon`) ni un parent de Jean Félicien (1898, Lyon) ;
  la concordance de prénom et de secteur géographique est fortuite. **Non écartée** : la source
  publique ne porte aucun élément de filiation permettant de trancher.
- **H1** : c'est le même homme ; l'acte n°233 nomme Anor et les parents annoncés
  **Firmin Léon Tassier × Aline Angèle Meunier** (enquêtes #01 et #13). **Hypothèse, non vérifiée**.
- **H2** : l'acte porte un lieu de naissance plus précis qu'Anor (section, hameau, établissement)
  et/ou des parents différents de ceux annoncés. **Hypothèse non testée**, acte non lu.
- **H3 (qualité de source)** : le dossier confond le **fichier INSEE des personnes décédées**
  (sans champ de filiation) et la **copie intégrale de l'acte de décès** (qui, elle, mentionne les
  parents). **Confirmée par les sources officielles consultées** — c'est le résultat de l'enquête.

## Sources consultées

| Source | Grade | URL / cote | Date | Résultat |
| --- | --- | --- | --- | --- |
| Fichier INSEE des personnes décédées — description et dessin d'enregistrement (data.gouv.fr) | A1 (officiel) | `https://www.data.gouv.fr/fr/datasets/fichier-des-personnes-decedees/` | 18/11/2026 | Zones du fichier : nom, prénoms, sexe, date de naissance, code du lieu de naissance, localité de naissance en clair, pays de naissance, date du décès, code du lieu de décès, **numéro d'acte**. **Aucun champ « parents »** : le dérivé public ne peut pas répondre à la question. |
| acte-deces.fr — Maubeuge, décès 1980 (source `leon` du dossier) | B1 (dérivé INSEE) | `https://www.acte-deces.fr/acte-de-deces-maubeuge-1980` | 18/11/2026 | Entrée relevée : « **Léon TASSIER (Léon Felicien TASSIER) décédé le 21 avril 1980 à l'age de 83 ans et né à Anor le 29 septembre 1896. Acte numéro 233** ». Données mises à jour le 23/10/2026. |
| acte-deces.fr — recherche « famille Tassier » (source `elisee` du dossier) | B1 (dérivé INSEE) | `https://www.acte-deces.fr/recherche-deces-famille-tassier` | 18/11/2026 | Même entrée, **acte n°233** confirmé ; prénom transcrit « Felicien » sans accent. Aucun parent indiqué. |
| Service-Public.fr — « Acte de décès : demande de copie intégrale » (F1444) | A1 (officiel) | `https://www.service-public.fr/particuliers/vosdroits/F1444` | 18/11/2026 | Toute personne peut demander un acte de décès **sans justification ni justification d'identité** ; gratuit. La copie intégrale mentionne date/heure/lieu du décès, prénoms, nom, **date et lieu de naissance** du défunt, et **prénoms, nom, professions et domiciles de ses parents**. Vérifié le 13/08/2026. |
| Service-Public.fr — aide « demandes d'actes » (code du patrimoine L213-2, 4°) | A1 (officiel) | `https://www.service-public.fr/particuliers/vosdroits/R1406/aide-remarque` | 18/11/2026 | Les actes de décès de **plus de 25 ans** sont librement communicables par les archives publiques ; l'acte de 1980 est donc communicable. |
| Archives municipales de Maubeuge (source `maubeuge_archives` du dossier) | A1 (inventaire) | `https://ville-maubeuge.fr/que-faire-a-maubeuge/a-voir-a-faire/lieux/archives-municipales/` | 14/11/2026 (dossier) | Détenteur de l'acte original ; état civil sur place, décès en ligne seulement jusqu'en 1940. Acte n°233 non consulté. |
| `enquetes/elisee-tassier-data.js`, source `leon` (l. 16) | B1 (local) | fichier local | 14/11/2026 | Point de départ : « Anor 29/09/1896 – Maubeuge 21/04/1980 », avec `notProves: "Aucun lien de parenté établi"`. |

## Résultat

**Trouvé (partiellement) / non trouvé.**

- **Trouvé** : le **numéro d'acte 233** (Maubeuge, 1980), le **lieu de naissance « Anor » au niveau
  communal**, la date de naissance **29/09/1896**, l'âge au décès (**83 ans**) et la date/lieu du
  décès. La cote manquante de l'acte original est désormais remplacée par ce numéro d'acte.
- **Non trouvé** : le **nom des parents**. Le schéma officiel de l'INSEE ne comporte aucun champ de
  filiation ; les deux agrégateurs consultés ne mentionnent que le défunt. Aucune approximation
  (« Firmin », « Aline ») n'est attribuable à la source `leon`.
- **Non trouvé** : le lieu de naissance **exact** au sens de l'état civil (section, hameau,
  établissement) — la donnée publique s'arrête à la commune d'Anor.
- **H3 confirmée** : par nature, une copie intégrale d'acte de décès contient bien le lieu de
  naissance **et** les parents (A1, F1444) ; mais l'objet consulté ici est le fichier INSEE dérivé,
  pas l'acte. La question posée ne peut donc recevoir une réponse définitive sans la copie n°233.
- **H0 reste ouverte** : l'absence de filiation empêche de rapprocher la victime de 1980 de
  Firmin Léon × Aline Angèle Meunier ou de Jean Félicien. Le test discriminant reste l'acte de
  naissance d'Anor 1896 (**3 E 7213**, enquête #01), non l'acte de décès.

## Ce qui ferait changer la conclusion

- **Confirme H1** : la copie intégrale n°233 nomme Anor et **Firmin Léon Tassier × Aline Angèle
  Meunier** comme parents.
- **Confirme H0** : la copie nomme d'autres parents ou un lieu de naissance autre qu'Anor.
- **Précise le lieu exact** : la copie porte une section/hameau/établissement en plus d'Anor.
- **Infirme H3** : une numérisation publique de l'acte original de 1980 exposant la filiation est
  trouvée (non observée dans les sources consultées).

## Prochaine action concrète

1. Demander la **copie intégrale de l'acte de décès n°233/1980** à la **mairie de Maubeuge**
   (état civil) : gratuit, sans lien de parenté à justifier, via le téléservice `R42838`, par
   courrier ou sur place. Relever uniquement : lieu de naissance exact, noms et prénoms des
   parents, conjoint, déclarant et degré de parenté.
2. Repli : saisir les **Archives départementales du Nord** (acte de décès de plus de 25 ans,
   librement communicable) en citant « Maubeuge, décès 1980, acte n°233 » ; le téléservice de
   demande d'acte de plus de 75 ans du dossier ne s'applique pas ici, le délai décès étant de 25 ans.
3. Ne modifier aucun rattachement (`leon`, `felicien_leon`, `jean_felicien`) avant lecture de la
   copie. Consigner la transcription dans `PISTE-THIERACHE.md` §5 et corriger la fiche `leon` :
   la cote d'acte est désormais connue, la filiation reste **non trouvée**.
4. Recouper avec l'enquête #01 : c'est l'**acte de naissance d'Anor 1896 (3 E 7213)**, et non
   l'acte de décès de 1980, qui testera la filiation proposée.
