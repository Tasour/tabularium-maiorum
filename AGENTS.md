# tabularium-maiorum — règles locales

> Fork local de Tabularium pour l'arbre **Tassier & Reymond**. En cas de conflit avec
> `~/.config/opencode/AGENTS.md`, ce fichier gagne.

## Service

- Unité : `tabularium-tassier.service` (user), active.
- Dev : `bun serveur/dev.ts` · Prod locale : `bun serveur/index.ts`.
- Port : **3210** (`PORT` en environnement), loopback uniquement.
- Base : Drizzle. Toute migration passe par `drizzle/`, jamais par une écriture manuelle.

## Vérification avant de dire terminé

```bash
bun test
```

Puis, si une vue change : capture avant/après (skill `screenshot-regression`) et contrôle
des erreurs console. Pour une preuve documentaire : `preuve-locale` (archivage local, jamais un lien).

## Invariants

1. **Aucune donnée inventée.** Un acte non lu reste non lu. Pas d'OCR deviné, pas de date déduite
   présentée comme certaine. Une hypothèse se marque comme hypothèse.
2. **Preuves locales.** Toute affirmation généalogique s'appuie sur un fichier conservé dans
   l'application (capture, transcription, cote), pas sur une URL qui peut mourir.
3. **Source unique de confiance.** Le module de confiance ne se duplique pas : `confiance-single-source`
   détecte la dérive entre les deux arbres. Le lancer après toute modification de ce module.
4. **Grades Admiralty et verdicts explicites** avant toute modification structurante :
   `validation-humaine-cursive` bloque une écriture sans verdict complet (source, choix, grade, date).
5. **Personnes vivantes** : jamais de nom de vivant envoyé à un service tiers. Sessions marquées
   sensibles → modèle à rétention documentée ou local uniquement.

## Skills à charger en premier

`enqueteur-osint` (agent) pour une recherche ; `preuve-locale` pour archiver ;
`garmin-sync-guardian` n'a **rien** à faire ici. Pour un import massif : `code-military-grade`.

## Pièges connus

- `bun` est requis pour les tests et le serveur. Il est installé via npm (`bun 1.4.5`).
- Le service tourne : redémarrer `tabularium-tassier` avant de conclure qu'un correctif échoue.
- Un acte lu par zone (`actes.zone`) ne vaut pas transcription : l'image agrandie est la preuve,
  le texte reste une lecture à confirmer.
