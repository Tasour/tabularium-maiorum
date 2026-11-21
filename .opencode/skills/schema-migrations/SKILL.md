---
name: schema-migrations
description: "Use when designing or reviewing database schema migrations — migration tooling, expand/contract (parallel change), safe add/rename/drop column and type changes, NOT NULL and constraints, batched backfills, CREATE INDEX CONCURRENTLY, lock_timeout, deploy ordering with app code, and rollback plans."
license: MIT
---

# Schema Migrations

## When to Use This Skill
- Any migration on a table that's large or hot
- Renaming/removing columns that running code still uses
- Long backfills or new indexes in production

## Principles
- Migrations are versioned, committed, and applied by tooling (Flyway, Liquibase, Rails/Django/Prisma/Drizzle/Alembic migrations, golang-migrate, sqitch).
- Old and new application versions run simultaneously during deploys — every migration must be compatible with both.
- Separate schema changes from data backfills.

## Expand → migrate → contract
Renaming `users.name` to `full_name`:
1. **Expand**: add `full_name` (nullable). Deploy.
2. **Dual write**: app writes both columns; reads old. Deploy.
3. **Backfill** `full_name` from `name` in batches.
4. **Switch reads** to `full_name`. Deploy.
5. **Stop writing** `name`. Deploy.
6. **Contract**: drop `name` in a later release.

## Postgres-safe operations
```sql
SET lock_timeout = '3s';                       -- fail fast instead of queueing behind locks
ALTER TABLE orders ADD COLUMN note text;       -- fast (nullable, no default rewrite)
ALTER TABLE orders ADD COLUMN status text DEFAULT 'new';   -- fast on PG 11+
CREATE INDEX CONCURRENTLY orders_status_idx ON orders(status);  -- outside a transaction

-- NOT NULL without a long lock
ALTER TABLE orders ADD CONSTRAINT orders_status_nn CHECK (status IS NOT NULL) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_status_nn;
ALTER TABLE orders ALTER COLUMN status SET NOT NULL;   -- PG 12+ uses the validated check
```
Dangerous: changing column types (rewrite), adding FKs without `NOT VALID`, `CREATE INDEX` without `CONCURRENTLY`, long transactions holding locks.
MySQL: use `ALGORITHM=INSTANT/INPLACE` where supported, or gh-ost/pt-online-schema-change.

## Backfills
```sql
UPDATE users SET full_name = name
WHERE id IN (SELECT id FROM users WHERE full_name IS NULL ORDER BY id LIMIT 5000);
```
Loop in a script with small batches, commit each, sleep between, make it resumable and idempotent; monitor replication lag.

## Deploy ordering
- Additive schema changes **before** code that uses them.
- Destructive changes **after** code stops using them.
- Lint migrations in CI (squawk for Postgres, strong_migrations for Rails).

## Rollback
- Prefer roll-forward fixes; destructive down-migrations lose data.
- Take a backup or snapshot before irreversible steps.
- Test migrations against a production-sized copy.
