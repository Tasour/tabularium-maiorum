---
name: sqlite-patterns
description: "Use when building with SQLite — connection pragmas (WAL, synchronous, foreign_keys, busy_timeout), write concurrency and SQLITE_BUSY, STRICT tables, migrations and ALTER limits, indexes and EXPLAIN QUERY PLAN, FTS5, JSON functions, backups (VACUUM INTO, Litestream), and Turso/libSQL/Cloudflare D1."
license: MIT
---

# SQLite Patterns

## When to Use This Skill
- Local-first apps, CLIs, desktop/mobile apps, small-to-medium web apps
- "database is locked" errors
- Search or JSON queries in SQLite

## Pragmas on every connection
```sql
PRAGMA journal_mode = WAL;        -- readers don't block the writer
PRAGMA synchronous = NORMAL;      -- safe with WAL, much faster
PRAGMA foreign_keys = ON;         -- off by default!
PRAGMA busy_timeout = 5000;       -- wait instead of failing on lock
PRAGMA cache_size = -64000;       -- ~64 MB
PRAGMA temp_store = MEMORY;
```

## Concurrency
- One writer at a time; many concurrent readers with WAL.
- Keep write transactions short; batch inserts in one transaction (100× faster than autocommit).
- Use `BEGIN IMMEDIATE` for transactions that will write, to fail fast instead of deadlocking on upgrade.
- In app servers, funnel writes through one connection/queue if contention is high.

## Schema
```sql
CREATE TABLE notes (
  id INTEGER PRIMARY KEY,           -- rowid alias
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  meta TEXT CHECK (json_valid(meta)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;
CREATE INDEX notes_created ON notes(created_at);
```
- `STRICT` tables enforce column types.
- Store timestamps as ISO-8601 text or Unix integers consistently.
- `ALTER TABLE` is limited: add/rename/drop column work; others need create-copy-swap in a transaction.
- Track schema version with `PRAGMA user_version` or a migrations table.

## Query tuning
`EXPLAIN QUERY PLAN SELECT ...` — look for `SEARCH ... USING INDEX` vs `SCAN`. Run `PRAGMA optimize` periodically / on close.

## Full-text search
```sql
CREATE VIRTUAL TABLE notes_fts USING fts5(title, body, content='notes', content_rowid='id');
-- keep in sync with triggers on notes insert/update/delete
SELECT n.* FROM notes_fts f JOIN notes n ON n.id = f.rowid
WHERE notes_fts MATCH 'sqlite AND wal' ORDER BY rank LIMIT 20;
```

## JSON
`json_extract(meta, '$.tags')`, `->>` operator, `json_each` for arrays; index expressions: `CREATE INDEX ... ON notes(meta ->> '$.status')`.

## Backups
- `VACUUM INTO 'backup.db'` or the online backup API — never copy the file while it's being written.
- Litestream for continuous replication to object storage.

## Edge variants
- Turso/libSQL: replicas and embedded sync. Cloudflare D1: SQLite on Workers with per-request bindings. Both have their own limits on transactions and size — check docs.
