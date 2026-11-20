# Enquête 153 — Relecture visuelle de l'acte n° 358 (Maubeuge, 04/09/1925)

**Date :** 18/11/2026 · **Grade global :** A1 (image numérisée lue visuellement, avec recadrages), relecture partielle ; trois divergences avec la transcription A1 restent non stabilisées.

> **Suite donnée (19/11/2026) :** les lectures d'agents proposant « Gabourier / Gabourienne » ont été **écartées par l'utilisateur**, qui a fourni un grossissement de la ligne du nom et confirmé **« Tassier »**. La correction du 18/11 (commit `0c32d18`) a été annulée le 19/11 : l'arbre est rétabli à « Jean Félicien Tassier (Lyon 1898) / Hélène Marie Alphonsine Lamarque (Cerfontaine 1898) ». Voir `ALERTE-ACTE-1925.md` (clos) et `RAPPORT-CORRECTION-GABOURIER.md` (annulé). La transcription A1 d'origine redevient la lecture faisant foi ; la mention marginale reste non stabilisée.

## Question fermée

La lecture visuelle de l'image locale (Archives du Nord, 3 E 10052, vue 94, acte n° 358) confirme-t-elle les prénoms des parents, la date exacte et la mention marginale transcrits dans `data/annotations/acte-1925.json`, et que peut-elle dire d'Élisée, absente de l'acte ?

## Hypothèses

- **H0** : l'acte concerne Arlette Hélène, pas Élisée ; aucun rattachement d'Élisée n'est établi. **Conservée** — le prénom « Élisée » n'apparaît nulle part sur l'image.
- **H1** : les prénoms des parents lus visuellement confirment la transcription A1 (Jean Félicien / Hélène Marie Alphonsine). **Confirmée pour les prénoms** ; infirmée pour deux dates de naissance des parents (voir Résultat).
- **H2** : la mention marginale est entièrement stabilisable (jour, mois, année, conjoint). **Non retenue** : lecture partielle, graphie et dernier chiffre de l'année incertains.
- **H3** : la transcription A1 est exacte sur tous les points. **Infirmée partiellement** par la relecture visuelle ; H3 reste retenue pour la mention marginale seule.

## Sources consultées

| Source | Grade | Référence | Résultat |
| --- | --- | --- | --- |
| Image locale (JPEG 3421 × 2492, 936 Ko) | A1 | `preuves/maubeuge-1925-naissance-arlette-helene.jpg`, cote 3 E 10052 vue 94, acte n° 358 en haut à gauche | **Lue visuellement** ; recadrages agrandis en `/tmp/opencode/crop1925/` (non livrés, hors dépôt) |
| Transcription et annotations A1 | A1 (transcription déclarée) | `data/annotations/acte-1925.json`, `lecture_reference` | Parents, dates, mention marginale et absences consignés |
| Enquête précédente | — | `ENQUETE-34.md` | « transcription partielle », lecture OCR non fiable, demande de relecture visuelle (point 1 de la prochaine action) |

## Résultat

**Lecture visuelle réussie (H0 conservée, H1 confirmée pour les prénoms, H3 maintenue pour la mention marginale).** Ce qui est lu directement sur l'image :

- **Numéro et cadre** : « N° 358 » en marge, en haut de la page de gauche ; le « 5340 » est une numérotation de vue, pas un second acte. Les actes voisins (n° 359 en bas de page, n° 360/361 à droite) concernent d'autres enfants et ne sont pas rapportés à Arlette Hélène.
- **Date de naissance** : « Le *Quatre Septembre* mil neuf cent vingt-cinq » (formule imprimée complétée à la main) → **04/09/1925**. L'heure est portée sur la ligne suivante (« vingt une heures trente minutes », lecture à confirmer).
- **Enfant** : « *Arlette Hélène*, du sexe *Féminin* » ; c'est elle, et non Élisée, qui est l'objet de l'acte.
- **Père** : « de *Jean Félicien Tassier*, né à *Lyon (Rhône)* le *vingt neuf* *Septembre mil huit cent quatre-vingt-dix-huit*, *journalier* ». **Prénoms confirmés visuellement**, ainsi que Lyon (Rhône), 1898 et la profession. **Divergence** : le jour lu est « **vingt neuf** » (29), alors que la transcription A1 porte « vingt trois » (23/09/1898).
- **Mère** : « et de *Hélène Marie Alphonsine Lamarque*, née à *Cerfontaine (Nord)*, le *quatre Septembre mil neuf cent quatre*, *sans profession*, *mariée* ». **Prénoms confirmés visuellement**, ainsi que Cerfontaine (Nord) et le jour/mois (04/09). **Divergence** : l'année lue est « **mil neuf cent quatre** » (1904), alors que la transcription A1 porte 1898. Les glyphs « neuf » (final à jambage descendante) et « huit » du père (final « t » sans jambage, « i » pointé) sont distinguables sur l'image ; la relecture donne « neuf » dans les deux endroits. Ces deux divergences **ne sont pas substituées** dans les fichiers et demandent une seconde lecture indépendante avant toute correction.
- **Date de rédaction et déclarant** : « Dressé le *Cinq Septembre* mil neuf cent vingt-cinq » → acte rédigé le **05/09/1925**, le lendemain de la naissance ; « heures sur la déclaration faite par le *père* » : le nom du déclarant n'est pas répété, il est déduit du père nommé plus haut.
- **Mention marginale (colonne de gauche)** : « Marié à *Maubeuge* le *17 mars 195?* avec *Leroux Emile* ». La lecture visuelle incline pour le **17 mars** (le dossier relevait « 11 mars ») et pour la graphie **Leroux** (le dossier signalant aussi « Lerose ») ; le dernier chiffre de l'année, malgré une forme proche de « 1 », reste délicat. **Rien n'est stabilisé** : ni le jour, ni l'année (« 195? » conservé), ni le patronyme (`Leroux / Lerose`). Le mariage lui-même n'est établi que par cette mention partielle.

**Ce que l'acte NE dit PAS sur Élisée** (point central de la relecture) :

1. Le prénom **« Élisée » n'apparaît ni dans le corps de l'acte ni dans la mention marginale**. Ce silence n'est pas une preuve négative : l'acte enregistre une naissance de 1925, alors qu'Élisée est recherché né en 1927.
2. L'acte **n'établit aucune filiation** entre Élisée et Jean Félicien Tassier ou Hélène Marie Alphonsine Lamarque : les deux parents nommés le sont d'**Arlette Hélène uniquement**.
3. L'acte **ne dit pas qu'Arlette Hélène était la sœur d'Élisée**. La fratrie relève de la mémoire familiale et reste à confirmer par l'acte de naissance d'Élisée (23/02/1927, Maubeuge), non localisé.
4. L'acte **ne mentionne pas la naissance d'Élisée**, ni son acte de 1927, ni son mariage, ni son décès.
5. L'acte **ne documente aucun ascendant antérieur** (Firmin Léon Tassier, Aline Angèle Meunier, etc.) : « né à Lyon (Rhône) le 29/09/1898 » ne remonte pas au-delà du père.
6. L'acte **ne stabilise ni l'année du mariage d'Arlette ni le nom de son conjoint**, et ne prouve ni sa descendance ni son décès en 2022 (source externe).

## Ce qui ferait changer la conclusion

- Une **seconde relecture indépendante** de l'image (ou une copie certifiée de l'acte n° 358) tranchant le « vingt neuf / vingt trois » du père, le « mil neuf cent quatre / 1898 » de la mère et les « 17/11 mars 195? » de la marge : c'est la condition pour corriger `data/annotations/acte-1925.json`.
- Une **transcription visuelle non ambiguë de la mention marginale** stabilisant l'année et la graphie du conjoint (acte de mariage de Maubeuge, décennie 1950).
- L'**acte de naissance d'Élisée (23/02/1927, Maubeuge)** nommant ses parents : seule pièce susceptible d'établir une filiation et, avec l'acte de 1925, le lien de fratrie.

## Prochaine action concrète

1. **Ne rien modifier** dans `data/annotations/acte-1925.json`, les synthèses ou l'arbre sur la foi de cette seule relecture : soumettre les trois divergences (29/23, 1904/1898, 17/11 mars) à une seconde lecture avant toute correction.
2. Demander aux Archives du Nord une **copie certifiée de l'acte n° 358** (3 E 10052, vue 94) pour vérification des dates de naissance des parents.
3. Demander la **copie intégrale de l'acte de naissance d'Élisée** (23/02/1927, Maubeuge) — pièce la plus attendue pour verrouiller la filiation (cf. ENQUETE-150).
4. Demander l'**acte de mariage de Maubeuge (195x)** pour trancher « Leroux / Lerose » et l'année (cf. ENQUETE-29).
