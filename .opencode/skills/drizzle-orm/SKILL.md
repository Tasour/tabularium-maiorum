---
name: drizzle-orm
description: "Use when working with Drizzle ORM — pgTable/sqliteTable/mysqlTable schemas, indexes and relations, drizzle-kit generate/migrate/push, select/join builder, relational query API, prepared statements, transactions, inferred types, and drivers (node-postgres, Neon, D1, Turso, Bun SQLite)."
license: MIT
---

# Drizzle ORM

## When to Use This Skill
- TypeScript projects that want SQL control with full types
- Serverless or edge databases (Neon, D1, Turso, PlanetScale)
- Moving from Prisma or raw SQL

## Schema
```ts
// db/schema.ts
import { pgTable, uuid, text, boolean, timestamp, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  published: boolean('published').notNull().default(false),
}, (t) => [index('posts_author_idx').on(t.authorId)]);

export const usersRelations = relations(users, ({ many }) => ({ posts: many(posts) }));
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

## Migrations
```ts
// drizzle.config.ts
export default defineConfig({ dialect: 'postgresql', schema: './db/schema.ts', out: './drizzle',
  dbCredentials: { url: process.env.DATABASE_URL! } });
```
- `drizzle-kit generate` → SQL files to review and commit.
- `drizzle-kit migrate` (or `migrate()` at deploy) to apply.
- `drizzle-kit push` only for prototyping.

## Queries
```ts
const db = drizzle(pool, { schema });

const rows = await db.select({ id: posts.id, title: posts.title, email: users.email })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))
  .where(and(eq(posts.published, true), ilike(posts.title, `%${q}%`)))
  .orderBy(desc(posts.id))
  .limit(20);

const withPosts = await db.query.users.findFirst({
  where: eq(users.email, email),
  with: { posts: { where: eq(posts.published, true) } },
});

await db.insert(users).values({ email }).onConflictDoNothing().returning();
```

## Transactions
```ts
await db.transaction(async (tx) => {
  await tx.update(accounts).set({ balance: sql`${accounts.balance} - ${amt}` }).where(eq(accounts.id, from));
  await tx.update(accounts).set({ balance: sql`${accounts.balance} + ${amt}` }).where(eq(accounts.id, to));
});
```

## Rules
- Use the `sql` template for raw fragments — values are parameterised; `sql.raw` is not.
- Pick the driver that matches the runtime (`drizzle-orm/neon-http`, `/d1`, `/libsql`, `/bun-sqlite`).
- Prepared statements (`.prepare()`) for hot queries.
- Keep schema in one module (or a folder re-exported) so drizzle-kit sees it all.
