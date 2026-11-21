# Skills importés — attribution

Ces skills proviennent de **opencodeskills.dev** (catalogue HTTP public), licence déclarée **MIT**.
Ils sont copiés localement pour deux raisons mesurées :

1. **Budget de contexte** — la catégorie `databases` complète annonce 28 skills = **2 384 tokens**
   de descriptions à chaque pas, contre **261 tokens** pour ces quatre-là.
2. **Hors ligne** — aucune requête réseau au chargement.

| Skill | Source | Licence |
|---|---|---|
| `sqlite-patterns` | https://opencodeskills.dev/catalog/databases/sqlite-patterns/SKILL.md | MIT |
| `drizzle-orm` | https://opencodeskills.dev/catalog/databases/drizzle-orm/SKILL.md | MIT |
| `schema-migrations` | https://opencodeskills.dev/catalog/databases/schema-migrations/SKILL.md | MIT |
| `data-modeling` | https://opencodeskills.dev/catalog/databases/data-modeling/SKILL.md | MIT |

Récupérés le 2026-11-21. Pour mettre à jour : re-télécharger les quatre `SKILL.md` depuis les URL
ci-dessus, puis vérifier que le champ `name` du frontmatter correspond toujours au dossier.

## Pourquoi ces quatre

Tabularium utilise **SQLite** (`drizzle.config.ts` → `dialect: "sqlite"`) et **Drizzle ORM**.
`sqlite-patterns` couvre WAL, `busy_timeout`, `foreign_keys`, FTS et sauvegardes ; `drizzle-orm`
couvre le schéma et les requêtes ; `schema-migrations` et `data-modeling` couvrent l'évolution du
schéma — le point sensible d'un arbre généalogique qui grossit.
