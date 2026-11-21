<p align="center">
  <img src="public/icone-192.png" alt="" width="96" height="96">
</p>

<h1 align="center">Tabularium Maiorum</h1>

<p align="center">
  <em>Les archives des ancêtres</em> — logiciel libre de recherche généalogique, seul ou en famille.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/licence-AGPL--3.0-0c8599" alt="Licence AGPL-3.0"></a>
  <img src="https://img.shields.io/badge/Windows%20%C2%B7%20macOS%20%C2%B7%20Linux%20%C2%B7%20Docker-installable-0c8599" alt="Windows, macOS, Linux, Docker">
  <img src="https://img.shields.io/badge/langue-fran%C3%A7ais-0c8599" alt="En français">
</p>

À Rome, le *tabularium* était le bâtiment où l'on conservait les archives publiques ; les *maiores*, ce sont les
ancêtres. Tabularium Maiorum est l'atelier où l'on rassemble les traces laissées par les siens, où on les lit, où on
les recoupe, et d'où l'on reconstruit leur histoire. Au quotidien, on dit simplement **Tabularium**.

---

## Fork Tassier & Reymond — source de vérité de l'arbre familial

Ce fork contient l'intégralité de l'arbre **Tassier & Reymond**, migré depuis
`~/Projects/arbre-genealogique-tassier` (décision du 21/11/2026 : Tabularium devient la source de
vérité ; l'ancien `index.html` est archivé en lecture seule). Licence **AGPL-3.0 assumée** : ce fork
et ses modifications restent sous AGPL s'ils sont publiés.

### Ce qui a été importé

| Donnée | Volume | Table Tabularium |
| --- | --- | --- |
| Fiches établies | 34 | `individu` (ids `tas-*`) |
| Ancêtres Geneanet non raccordés | 653 | `individu` (ids `tas-pz-*`, grade `C3`, `raccorde=false`) |
| Filiations | 36 | `filiation` (avec `acte_id` quand un acte l'établit) |
| Hypothèses de parenté | 8 liens | `filiation` de type `hypothetique`, **jamais promues** |
| Preuves numérisées + SHA-256 | 4 | `source` / `page` / `acte` / `lien` |
| Enquêtes | 39 | `tache` / `consultation` |
| Témoignages `A1-témoin` | 3 | `verdict` |
| Doute H0 explicite | 1 | `doute` (`differentes`) |

### Enrichissement du 21/11/2026

- **161 rapports d'enquête** (`ENQUETE-01` à `161`, dont **122 absents de l'ancien index**) sont
  importés comme tâches enrichies, avec le rapport markdown complet, le grade global et la
  conclusion. « Non résolu / non trouvé / non documenté / H0 conservée » reste `en_cours` : jamais promu en fait.
- **E160 et E161** (21/11/2026) instruisent deux indications du détenteur : « le mauvais Félicien
  est celui né à Lyon » et « un Alceste, père ou grand-père de Jean Reymond, inhumé à Chambéry ».
  Elles sont enregistrées comme **témoignages `A1-témoin` réservés**, datés et marqués « à confirmer »
  — aucun lien modifié, aucun ascendant créé, aucun degré tranché. H0 conservée dans les deux cas.
- **558 consultations** reprennent les sources gradées (cotes, URLs, dates, grades Admiralty).
- **13 relevés** extraits des 4 transcriptions, avec les graphies telles qu'écrites
  (`[T]assier`, `[Petit ?]`) et les rôles d'acte ; 10 sont rattachés à une fiche existante.
- **Dates d'actes corrigées** : ce sont les dates des actes (1889-02-11, 1896-09-29, 1925-09-04),
  non la date de consultation. La vue 131 reste sans date (contexte, non preuve autonome).
  Les dates ISO `AAAA-MM-JJ` sont désormais reconnues par les champs de saisie (plus d'alerte
  « Format non reconnu ») ; les types d'actes sont normalisés vers `naissance` / `mariage` /
  `autre`, valeurs attendues par l'interface.
- **Garde-fou H0 vérifié à chaque import** : 0 C3 promu, 0 filiation vers un C3, doute Jean
  Félicien / Félicien Léon conservé, 0 type d'acte invalide.
- **19 recherches liées à une fiche** : le « Journal des recherches » s'affiche enfin sur les
  personnes concernées. Les cas ambigus restent non liés (ex. E99, père non identifié).
- **15 hypothèses écartées** enregistrées comme verdicts `hypothese_ecartée`, datées et gradées —
  distinctes des 3 témoignages `A1-témoin`.
- **Badges de rigueur** dans l'interface : grade Admiralty, « C3 · non raccordé », acte à l'appui,
  verdicts datés sur la fiche ; empreinte SHA-256 dans le panneau de l'acte.
- **9 lieux géolocalisés** via `geo.api.gouv.fr` en une passe d'administration ; 5 restent sans
  coordonnées (nom ambigu ou « à confirmer ») — aucune approximation. L'app reste utilisable
  sans réseau.

### Complétions P1 (21/11/2026)

- **E160/E161** citent désormais l'API publique du fichier des décès (matchID/INSEE, grade **B1**,
  consultée le 21/11/2026). Elle corrobore Léon-Félicien (1896 Anor → 1980 Maubeuge) et ne trouve
  aucun « Alceste Reymond » comme prénom principal — mais le fichier ne couvre que **1970+** :
  silence documentaire d'accès, **pas** une preuve négative. Les deux enquêtes restent `en_cours`.
- **Décès d'Arlette Hélène** complété (24/01/2022, Cousolre) depuis `ENQUETE-109.md` (B1), uniquement
  parce que le champ était vide ; aucune autre fiche n'a été déduite.
- **15 URL d'archives** promues en objets `source` (19 au total) ; 22 profils/annuaires personnels
  exclus (RGPD).
- **Antoine Joseph Meunier**, nommé « père de l'épouse » dans l'acte de 1889, est créé en fiche
  **C3 non raccordée** avec une filiation `hypothetique` : non promu au noyau A1 sans verdict.

Scripts idempotents : `completer-fiches.ts`, `importer-urls-sources.ts`, `ajouter-antoine-meunier.ts`.

### Complétion des individus (21/11/2026)

Script idempotent `scripts/enrichir-individus.ts` : complète les fiches **uniquement à partir de faits déjà présents dans la base** (relevés d'actes A1) et de règles de qualité.

- Sexe : 9 anciennes valeurs `f` normalisées en `F`, 5 complétées depuis le sexe relevé dans l'acte (total **15 fiches** renseignées).
- Dates exactes issues des actes : Firmin `1866-09-25`, Aline `1869-02-19`, décès de Philomène `1879-04-06` ; l'ancienne valeur reste en notes.
- Lieux : Firmin « Thiérache (à préciser) » → **Anor**, Aline → **Mons en Hainaut** (lieu créé, non géolocalisé), décès de Philomène → **Anor**.
- Professions : Firmin « verrier », Aline « ménagère » (actes 1889/1896).
- 32 ancêtres anonymes `? ?` reçoivent le qualificatif **« À identifier »**.
- 111 PZ sans date portent la mention explicite « aucune date connue dans la source » ; 7 lieux sans coordonnées portent « coordonnées non vérifiées ».
- Aucune promotion C3, aucun sexe/lieu/profession deviné pour les PZ (la source Geneanet ne les contient pas).

### Dernier bloc de liens (21/11/2026)

- **A** : seule l'union Firmin × Aline est datée (**11/02/1889**, acte A1 lu `1 Mi EC 012 R 003`).
  La mention marginale du 06/01/1923, dont l'attribution est à vérifier (E157), n'est **pas** enregistrée.
- **B** : **40 / 162** enquêtes sont liées à une personne (23 cibles explicites traitées) ; E150 reste
  non liée (synthèse sans cible).
- **C** : les 6 liens Agnès/Cécile/Laurent ← Jean/Joséphine existaient déjà ; aucun dupliqué, aucun type
  modifié sans verdict (règle locale 4). Contrôle d'unicité par paire, pas par id.

### Cotes, image source et confiance calculée (21/11/2026)

- **17 cotes d'inventaire** supplémentaires importées comme sources (`3 E 8133`, `3E 4265`, `6M 946`…),
  avec mention « cote relevée, acte non consulté ». Les **plages de cotation** (`3E 4170-5292` tronquée en
  `3E 4170`) sont **exclues** : jamais extrapolées en registre.
- **Rectificatif E31** : l'URL présentée comme l'acte n°78 de 1896 montre en réalité les folios 3163/3164
  (acte 78 « Delavarde »). L'image est archivée avec SHA-256 comme **contexte du registre**, jamais comme
  preuve de la naissance ; l'acte du folio 3166 reste `preuves/anor-1896-naissance-130.jpg`.
- **Indice de confiance par fiche** (`confianceIndividu`, lecture seule) : 0-100 calculé depuis les preuves
  réellement liées — acte (40), date (20), lieu (10), filiation établie (20), verdict (10). Un lien
  hypothétique ne rapporte rien. Affiché dans « Rigueur de la preuve » avec les manques détaillés au survol.
- **Bug de données corrigé** : l'acte de naissance de 1925 (Arlette Hélène) était attaché à Élisée (1927)
  et à Arlette Roussette (sans date). Liens retirés avec motif ; la preuve reste sur la bonne fiche.

### Graphe Geneanet structuré (21/11/2026)

Les champs `p` (géniteur) et `sp` (conjoint) des 653 ancêtres PZ, jusqu'ici stockés comme texte, sont
désormais structurés dans la table **`pz_lien`** (migration `0015`) : **416 liens de parenté** et
**170 liens de conjoints**, tous **grade C3**, jamais promus dans le noyau A1.

- **Corroboration** : la chaîne PZ `192 → 181 → 117 → 93` est exactement notre chaîne Sosa
  `16 → 32 → 64 → 128` (Firmin → Pierre Joseph → Jean-Baptiste → Lambert). Contrôle interne, pas une preuve.
- **Faux doublons corrigés** : 15 paires de `docs/relecture-doublons.md` ont des **géniteurs différents**
  → personnes distinctes, enregistrées comme `doute differentes` avec le motif lu. Ex. : PZ 554 (Anne
  TASSIER, géniteur Jean dit Petit Jean) ≠ PZ 570 (Anne TASSIER, géniteur Thomas Baptiste).
- `u` est un numéro séquentiel (653 « unions » de taille 1) : **jamais** utilisé comme identifiant de famille.
- Aucun C3 promu, 0 filiation vers un PZ.

### Bloc autonome final (21/11/2026)

- **2 relevés vides** créés accidentellement par l'UI supprimés (`nettoyer-releves-vides.ts`, idempotent) ;
  le relevé « Antoine Joseph Meunier » est désormais rattaché à sa fiche même sur une base régénérée.
- **Géolocalisation** : aucun des 6 lieux restants n'a de correspondance exacte dans `geo.api.gouv.fr` →
  tous conservés sans coordonnées, explicitement annotés « non vérifié ».
- **`docs/demandes-actes.md`** : 14 démarches groupées en 6 services, générées depuis les rapports
  (`generer-demandes-actes.ts`) — cotes relevées seulement, aucun courrier envoyé.
- **`docs/reconstruction-vincent.md`** complété : 2 décès B1 et les **9 verdicts à prendre** ordonnés par Sosa.
- Filtre « Hypothétiques » de la vue Ascendance vérifié : 18 → 9 lignes, 0 lien établi affiché.

### Captures de sources publiques (21/11/2026)

Six captures de Geneanet, MyHeritage, morts.fr, Acte-Décès.fr et GénéaFrance sont archivées dans
`preuves/screens-sources-2026-11-21/` avec SHA-256 (`data/preuves-sources.json`, script idempotent
`enregistrer-captures.ts`). **ENQUETE-162.md** documente le croisement.

- **Grade B1** pour les sources dérivées du fichier INSEE ; **C3** pour Geneanet/MyHeritage.
- **Règle essentielle** : morts.fr, Acte-Décès.fr et GénéaFrance puisent dans le **même fonds INSEE** —
  les recouper n'augmente **pas** le grade.
- Décès comblés : **Élie † 28/02/1997 Maubeuge**, **Emmanuel † 2000 Maubeuge** (B1, acte non consulté,
  mention explicite en notes ; aucune journée inventée pour Emmanuel).
- Deux **Tassier de Denain** (Alain Léonard 1932-2001, Joséphine Alina Marie 1906-1980) créés en **C3
  non raccordés** : aucun lien de parenté, aucun doute absurde (leurs dates excluent Firmin et Pierre Joseph).
- MyHeritage : 75 documents « Léon Tassier » aux champs vides — homonymes non identifiés, rien promu.
- H0 conservée, 0 C3 promu, 0 lien déduit d'un décès.

### Vue d'ascendance Sosa (21/11/2026)

- Nouvelle page **« Ascendance »** (menu latéral) : numérotation Sosa-Stradonitz depuis
  **Vincent Tassier** (racine = 1, père = 2, mère = 3…), jusqu'à la génération 8.
- Calcul pur `src/lib/sosa.ts` (7 tests) + 5 tests d'intégration sur la base réelle : **18 ancêtres**,
  **9 liens établis** (gen 2–4) et **9 liens hypothétiques** (gen 5–8), **20 parents manquants**,
  0 C3 promu. Les liens hypothétiques sont affichés en orange avec mention explicite.
- Sondage API des trous proches (`docs/sondage-trous-vincent-2026-11-21.md`) : le fichier des décès
  (matchID/INSEE, B1) ne contient **aucun décès correspondant** aux 5 cibles — homonymes écartés,
  silence documentaire d'accès, H0 conservée.

### Classification des recherches et reconstruction depuis Vincent (21/11/2026)

- Nouveau statut **`intervention_humaine`** (label « Intervention humaine », orange) : une recherche
  explorée suffisamment (≥ 2 sources gradées + test discriminant) mais dont il reste une action non
  automatisable — copie d'acte, lecture visuelle d'un manuscrit, relevé de cote, décision H0. Ce statut
  **ne clôt pas** `termineLe` : c'est une attente, pas une fin.
- `abandonne` existe déjà ; il n'est attribué que si le rapport dit explicitement qu'il n'y a plus
  d'action, avec motif écrit. Les cas ambigus restent en `intervention_humaine`.
- Les **161 enquêtes** sont classées : **158 intervention humaine**, **1 en cours** (garde non
  satisfaite), **2 trouvé**, **0 abandonné**. Journal auditable : `docs/classification-recherches.md`.
- L'onglet « Recherches » affiche le nouveau statut (filtre dédié + inclus dans « En cours et à faire »).
- **`docs/reconstruction-vincent.md`** : chaîne Sosa de Vincent sur 9 générations, 8 ascendants sans
  parents, 5 liens hypothétiques, enquêtes responsables et actions humaines restantes. Aucun C3 promu.

### Dernière tranche (21/11/2026)

- **Cousolre (59)** géolocalisée via `geo.api.gouv.fr` (correspondance exacte, code 59157) ; 6 lieux
  restent sans coordonnées, explicitement marqués « non vérifié ».
- **2 cotes nominatives** importées comme `source` (`3 E 10054` Élisée 1927, `3E 4265` Jean Reymond
  1936) avec mention « cote relevée en inventaire A1, acte non consulté » — **aucun acte promu**.
  Les plages administratives (`3E 4170-5292`) sont exclues.
- **`docs/relecture-doublons.md`** : les 37 paires C3 restantes et les 2 relevés en attente sont
  consignés pour validation humaine, sans fusion automatique.
- L'outil `tools.archives.geocode` (plugin `archives-navigateur`) expose le géocodage officiel
  borné aux correspondances exactes.

### Correction des doublons possibles (21/11/2026)

Le tableau de bord affichait **1 465 doublons possibles**. Cause racine : le champ Geneanet `d`
des 653 ancêtres est une plage **naissance–décès** (`1830-1895`), anciennement importée comme une
naissance floue de 65 ans — toute date du XIXᵉ siècle « correspondait ». Correctifs :

- parseur dédié `scripts/lib/date-pz.ts` (8 tests) + passe idempotente `corriger-dates-pz.ts` pour
  les fiches déjà importées ; la chaîne brute reste dans les notes ;
- **C3 non raccordés exclus par défaut** de la détection (ils sont distincts par construction, H0),
  avec un interrupteur « Comparer aussi les C3 » ;
- seuil porté de **40 à 55** et **signal requis** (date, lieu ou parents) — un simple nom commun
  ne suffit plus.

Résultat mesuré : **0 doublon affiché par défaut**, **37** quand on active l'option C3 (au lieu de
1 465). Aucune fusion automatique : les rares suggestions restent validées par une personne.

### Quick wins d'ergonomie

- **Bandeau de charge** sur la liste des individus au-delà de 500 fiches, avec rappel H0/C3.
- **Recherche phonétique** (interrupteur « Phonétique ») : `Tassier ≈ Tessier`. Aide à la
  recherche uniquement — deux noms proches restent des homonymes possibles, jamais une preuve.
- **Degré de parenté** : `degreParent(a, b)` calcule le plus court chemin non orienté dans la
  filiation (RPC lecture seule). Outil de lecture, pas une preuve de certitude des liens.

Commandes : `bun scripts/enrichir-tassier.ts` (idempotent) puis
`bun scripts/geolocaliser-lieux.ts` (une seule fois).

### Règles non négociables conservées

- **H0 — homonymie conservée** : Jean Félicien (Lyon 1898) et Félicien Léon (Anor 1896) sont deux
  fiches distinctes, avec un `doute` explicite. Aucune fusion sans verdict `A1-témoin`.
- **C3 jamais promu** : les 653 ancêtres n'ont aucune filiation et ne sont jamais raccordés automatiquement.
- **Aucune cote, date ou nom inventé** : les champs absents restent vides ; le sexe non renseigné
  n'est pas deviné.
- **RGPD strict** : aucune coordonnée personnelle.
- **Traçabilité** : chaque preuve porte son empreinte SHA-256 dans `page.sha256`, vérifiée à l'import.
- **Doublons** : Tabularium signale ~1 465 « doublons possibles » parmi les 687 individus (surtout
  les C3). Ce sont des **suggestions** : aucune fusion n'est automatique, conformément à H0.

### Champs ajoutés au schéma (migration `0014_import_tassier.sql`)

- `page.sha256` — empreinte de l'image
- `individu.grade` — grade Admiralty (`A1`, `B`, `C3`)
- `individu.raccorde` — `true` uniquement si une filiation est établie par acte
- `verdict` — témoignages datés du détenteur de l'arbre

### Reproduire l'import

```bash
bun install
bun scripts/import-tassier.ts          # idempotent, écrit dans ./data
bun scripts/enrichir-tassier.ts        # idempotent, rapports + relevés + rigueur
bun test                               # 348 tests, 0 skippé
bun run type-check
bun run local                          # http://localhost:3210
```

L'export figé est versionné dans `scripts/donnees/arbre-export.json`. Le script le relit à chaque
exécution ; tous les identifiants sont déterministes et les insertions idempotentes. Les tests
`tests/import-tassier.test.ts` régénèrent leur propre base temporaire et vérifient 11 invariants
(volumes, SHA-256, H0, non-promotion des C3, fidélité des cotes).

Le fichier `tabularium.ini` désactive la vérification de mise à jour : l'arbre fonctionne sans appel
réseau externe.

### Ouverture sans écran de connexion (raccourci Omarchy)

Le raccourci `atelier.tabularium` lance `~/.local/bin/tabularium-ouvrir`, qui ouvre
`GET /api/auth/autologin?jeton=…`. Cette route **locale uniquement** (boucle `127.0.0.1`/`::1`)
pose un cookie de session de 30 jours pour le compte `arbre@local.invalid`, exactement comme une
connexion normale (`HttpOnly`, `SameSite=Strict`), puis redirige vers `/`. Le secret est lu depuis
`~/.config/tabularium/autologin.env` (mode `600`), jamais écrit dans le `.desktop` ni dans le
fichier de service. L'authentification ordinaire reste intacte : sans jeton, la route répond `404`
et l'écran de connexion réapparaît. Ne jamais activer `TABULARIUM_AUTOLOGIN_*` sur une instance
exposée hors de la boucle locale.

---

![L'accueil : l'état de la recherche en un coup d'œil](docs/captures/accueil.webp)

## Pourquoi cet outil

Une recherche généalogique commence toujours de la même façon : des dizaines d'actes téléchargés sur les sites des
archives départementales, des photos de famille dont plus personne ne connaît tous les visages, des notes prises en
salle de lecture, des tableaux qui se contredisent. Les logiciels de généalogie classiques partent de l'arbre : on y
saisit des conclusions, et les documents qui les justifient restent ailleurs.

Tabularium fait l'inverse : **il part des documents**. Une conclusion n'est jamais saisie à la main, elle se déduit de
ce que disent les sources. On travaille comme un enquêteur : on relève, on compare, on vérifie, et l'arbre n'est que le
résultat de ce travail. Quand deux actes ne disent pas la même chose, on le voit ; quand une branche ne repose sur
aucune preuve, on le sait.

## Comment ça marche

| | Étape | |
|:-:|---|---|
| 1 | **Rassembler** | Actes d'état civil et paroissiaux, tables décennales, photos de famille, papiers retrouvés dans un grenier : chaque document est rangé dans son registre ou son album, avec sa cote. Aux archives, le téléphone photographie un acte et l'envoie directement. |
| 2 | **Relever** | Sur l'image de l'acte, on surligne chaque personne et on note ce qui est écrit, tel quel : nom, âge, profession, domicile, liens. Sur une photo, on entoure les visages pour les identifier. |
| 3 | **Recouper** | Une même personne apparaît dans plusieurs documents : son baptême, son mariage, la naissance de ses enfants, son décès. Tabularium rapproche ces relevés, propose des rattachements, montre ce qui concorde et ce qui se contredit. Quand on hésite entre deux fiches, on les marque « peut-être la même personne » sans les fusionner, jusqu'à ce que le doute soit levé. |
| 4 | **Reconstruire** | Les fiches individuelles et l'arbre se construisent à partir des relevés. Chaque date, chaque lieu, chaque lien de parenté renvoie à l'acte qui le prouve : on sait toujours d'où vient une information. |

<table>
  <tr>
    <td width="50%"><img src="docs/captures/atelier.webp" alt="Atelier : les personnes surlignées sur l'acte, les relevés à droite"></td>
    <td width="50%"><img src="docs/captures/fiche.webp" alt="Fiche individuelle : chaque information renvoie à son acte"></td>
  </tr>
  <tr>
    <td><em>Relever</em> : chaque personne surlignée sur l'acte de mariage, ses relevés à droite.</td>
    <td><em>Reconstruire</em> : la fiche, dont chaque date et chaque lien renvoient à l'acte qui le prouve.</td>
  </tr>
</table>

![L'arbre d'ascendance, construit à partir des relevés](docs/captures/arbre.webp)

Et pour ne rien oublier, chaque piste ouverte devient une **recherche** : ce qu'on cherche, où on a déjà regardé
(registre, vues consultées), ce qu'on a trouvé — ou pas.

## Une généalogie qui a une géographie

Nos ancêtres ne sont pas nés nulle part. Ils sont nés ici et là, dans un village, puis un autre ; ils se sont mariés
dans la paroisse voisine ou à l'autre bout du pays, au gré du travail, des guerres, des rencontres. Tabularium place
chaque lieu sur la carte pour rendre cette histoire visible :

- la **cartographie** place l'ascendance ou la descendance d'une personne sur les lieux de naissance, génération par
  génération, et peut les faire apparaître une à une pour suivre les migrations au fil des siècles ;
- le **parcours de vie** de chaque individu relie sur une carte sa naissance, son mariage, les naissances de ses
  enfants et son décès ;
- l'**accueil** mesure la dispersion : dans combien de communes et de départements vos ancêtres sont nés, et où surtout.

![Cartographie : l'ascendance placée sur les lieux de naissance, une couleur par génération](docs/captures/cartographie.webp)

## En famille

<img src="docs/captures/mobile.webp" alt="Une fiche sur téléphone" width="260" align="right">

La généalogie se fait rarement seul. Un cousin a les photos, une tante se souvient des prénoms, un autre fait les
déplacements aux archives. Chacun a son compte : en **lecture** pour consulter l'arbre et les photos, en **écriture**
pour participer. Les modifications apparaissent en direct chez tous, on sait qui a modifié quoi, et deux personnes ne
peuvent pas s'écraser l'une l'autre sans s'en apercevoir.

Sur **téléphone** : consulter l'arbre, retrouver quelqu'un, photographier un acte aux archives. Sur **tablette** :
annoter les actes au doigt. Le site s'installe sur l'écran d'accueil comme une application.

<br clear="right">

## Vos données restent chez vous

Tabularium est un **logiciel libre** ([licence AGPL-3.0](LICENSE)) : gratuit, sans publicité, sans abonnement. Il
s'installe sur votre ordinateur ou sur votre propre serveur ; vos documents et votre arbre ne sont envoyés à aucun
service. Une sauvegarde complète se télécharge en un clic.

## Ce qu'on y trouve

- **Accueil** : l'état de la recherche en un coup d'œil — chiffres clés, avancement des documents, complétude des
  fiches, naissances par siècle, patronymes et lieux, recherches à mener, activité récente.
- **Documents** : actes, tables décennales, photos de famille, rangés par registre ou album.
- **Atelier d'annotation** : zones surlignées sur l'image, relevés tels qu'écrits (nom, âge, profession, filiation…).
- **Individus** : fiches construites à partir des relevés, synthèse des sources, suggestions de rattachement,
  doutes « peut-être la même personne » suivis jusqu'à la fusion ou la vérification, doublons possibles détectés
  automatiquement, homonymes distingués par le nom de leur mère et leur année de naissance (ou un qualificatif).
- **Arbre**, **cartographie** par génération, **parcours de vie** sur carte.
- **Photos** : identification des personnes, portraits sur les fiches et dans l'arbre.
- **Recherches** : le carnet des pistes à suivre et des consultations aux archives.
- **Registres matricules** : classe, matricule, signalement, conseil de révision, campagnes, localités successives
  (reprises dans le parcours de vie) ; recensements et actes notariés avec leurs rôles.
- **Citations de sources** : chaque fait de la fiche renvoie à son acte, cité selon les usages (archives, registre,
  cote, acte, vue, lien) et copiable en un clic.
- **Calendrier républicain** : dates saisies telles qu'écrites (« 3 brumaire an IV »), converties à l'affichage, aide intégrée.
- **Archives** : l'annuaire des 101 archives départementales et des ressources nationales, à compléter soi-même.
- **GEDCOM** : export (5.5.1, avec les citations de sources) et import depuis les autres logiciels de généalogie.
- **Recherche globale** (<kbd>Ctrl</kbd>+<kbd>K</kbd>) : retrouver une personne, un document, un lieu depuis n'importe où.
- **Thème sombre**, ou automatique selon le système.
- **Collaboration** : comptes lecture / écriture / admin, mises à jour en direct, journal, détection des conflits.

## Installer Tabularium

Deux façons, selon l'usage :

| | Sur son ordinateur | Sur un serveur |
|---|---|---|
| Pour qui | une personne, éventuellement sa famille à la maison | une famille ou une association, accès depuis partout |
| Installation | télécharger, décompresser, double-cliquer | Docker (NAS, Raspberry Pi, serveur) |
| Accès | cet ordinateur ; en option, le réseau de la maison | partout, en HTTPS |

### Sur son ordinateur (Windows, macOS, Linux)

1. Télécharger le zip de son système dans la page [Releases](https://github.com/nayosis/tabularium-maiorum/releases)
   (dernière version).
2. Le décompresser où l'on veut, par exemple dans Documents.
3. Double-cliquer sur **Tabularium** : le navigateur s'ouvre. Au premier lancement, créer son compte.

Une petite fenêtre reste ouverte tant que Tabularium tourne : la fermer arrête Tabularium.
Les données sont dans le dossier **Documents/Tabularium** (Linux : `~/Tabularium`).

Le programme n'est pas signé (la signature est payante) ; le système demande donc confirmation la première fois :

- **Windows** : « Windows a protégé votre ordinateur » → *Informations complémentaires* → *Exécuter quand même*.
- **macOS** : clic droit sur Tabularium → *Ouvrir* → *Ouvrir*.

Pour consulter Tabularium depuis une tablette ou un autre ordinateur de la maison, voir le fichier `LISEZMOI.txt`
du zip (réglage `reseau=oui`).

**Mise à jour** : remplacer le dossier du programme par celui de la nouvelle version. Les données, dans
Documents/Tabularium, ne sont pas touchées.

### Sur un serveur (Docker)

```bash
mkdir tabularium && cd tabularium
curl -O https://raw.githubusercontent.com/nayosis/tabularium-maiorum/main/docker-compose.yml
docker compose up -d
```

Puis ouvrir `http://<serveur>:3000` et créer le compte administrateur. Pour un accès depuis Internet, placer
Tabularium derrière un reverse proxy en HTTPS : voir [docs/serveur.md](docs/serveur.md).

L'image `ghcr.io/nayosis/tabularium-maiorum` fonctionne sur PC (amd64) et sur ARM (Raspberry Pi, la plupart des NAS).

## Utiliser Tabularium à plusieurs

| Rôle | Peut… |
|---|---|
| Lecture | tout consulter |
| Écriture | saisir et modifier |
| Admin | en plus : gérer les comptes lecture et écriture, télécharger les sauvegardes, voir le journal |
| Administrateur principal | le compte créé au premier lancement ; en plus : gérer les admins, restaurer une sauvegarde |

Tabularium n'envoie aucun e-mail : un admin crée le compte (adresse + rôle) et transmet lui-même le **lien**
affiché (usage unique, valable 48 h) pour que la personne choisisse son mot de passe. Même principe pour un
mot de passe oublié (page Comptes → menu du compte → « Lien de réinitialisation »).

## Sauvegardes

- Page **Sauvegarde** : télécharger un ZIP complet (base + images). À faire régulièrement !
- L'administrateur principal peut restaurer un ZIP, par exemple pour passer de la version ordinateur à un serveur.
- Détails : [docs/donnees.md](docs/donnees.md).

## Cartes

Les cartes utilisent les tuiles et la recherche de lieux d'[OpenStreetMap](https://www.openstreetmap.org),
service gratuit financé par des dons, avec des [règles d'usage](https://operations.osmfoundation.org/policies/tiles/).
Pour une utilisation intensive, configurer un autre fournisseur de tuiles (`TABULARIUM_TUILES`, voir
[docs/serveur.md](docs/serveur.md)).
Les codes INSEE des communes (y compris les anciennes communes fusionnées) viennent du service officiel
[Découpage administratif](https://geo.api.gouv.fr/decoupage-administratif) de l'État (geo.api.gouv.fr) ; seuls le
nom de la commune et son département lui sont envoyés.

## Auteur

Tabularium Maiorum est conçu et maintenu par **Vincent Gouadon** ([@nayosis](https://github.com/nayosis)), développeur.
Il est développé avec **Claude**, l'assistant d'intelligence artificielle d'Anthropic, sous la supervision de
l'auteur : Vincent définit les besoins et les choix, relit, teste et valide chaque évolution ; Claude en écrit
l'essentiel du code.

## Versions

Les nouveautés de chaque version sont dans le [journal des versions](CHANGELOG.md).
Tabularium signale lui-même aux administrateurs qu'une nouvelle version est disponible : il consulte la page des
versions de ce dépôt (au plus deux fois par jour, sans rien transmettre). Pour le désactiver :
`TABULARIUM_VERIFIER_MISES_A_JOUR=non` (serveur) ou `verifier_mises_a_jour=non` dans `tabularium.ini` (ordinateur).

## Contribuer

Les idées, signalements de bugs et contributions sont les bienvenus : voir [CONTRIBUTING.md](CONTRIBUTING.md).
