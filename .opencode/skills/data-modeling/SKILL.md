---
name: data-modeling
description: "Design database schemas that evolve — normalization strategies, indexing patterns, migration workflows, denormalization trade-offs, and schema documentation."
license: MIT
---

A good schema is easy to evolve. A bad schema requires a rewrite
when the product changes. Design for change, not for perfection.

## Normalization levels

```markdown
## 1NF (First Normal Form)
- Each cell contains a single value
- Each record is unique
- No repeating groups

## 2NF
- Meets 1NF
- All non-key columns depend on the entire primary key

## 3NF
- Meets 2NF
- No transitive dependencies (non-key → non-key)

## When to denormalize
- Read-heavy tables with complex joins
- Reporting/analytics queries
- Caching frequently accessed aggregates
- Time-series data with high write volume
```

## Schema design patterns

```sql
-- User table with audit fields
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ  -- Soft delete
);

-- Optimistic locking for concurrent updates
ALTER TABLE users ADD COLUMN version INTEGER NOT NULL DEFAULT 1;

-- Event sourcing for audit trail
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aggregate_id UUID NOT NULL,
  aggregate_type VARCHAR(50) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  payload JSONB NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version INTEGER NOT NULL
);

CREATE INDEX idx_events_aggregate ON events (aggregate_id, version);
CREATE INDEX idx_events_type ON events (event_type, created_at);
```

## Indexing patterns

```sql
-- Composite index for common query patterns
CREATE INDEX idx_orders_user_status ON orders (user_id, status, created_at DESC);

-- Partial index for active records
CREATE INDEX idx_active_users ON users (email) WHERE deleted_at IS NULL;

-- Covering index (includes all columns needed by query)
CREATE INDEX idx_products_covering ON products (category_id, price)
  INCLUDE (name, description, image_url);

-- GIN index for JSONB queries
CREATE INDEX idx_metadata ON products USING GIN (metadata);

-- Full-text search index
CREATE INDEX idx_search ON products
  USING GIN (to_tsvector('english', name || ' ' || description));
```

## Migration workflow

```typescript
// Prisma-style migration
// migrations/20240101_add_user_roles.sql

import { Migration } from '../migration-runner';

export const migration: Migration = {
  up: async (db) => {
    await db.query(`
      CREATE TABLE user_roles (
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        role_id INTEGER NOT NULL REFERENCES roles(id),
        granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        granted_by UUID REFERENCES users(id),
        PRIMARY KEY (user_id, role_id)
      );

      CREATE INDEX idx_user_roles_user ON user_roles (user_id);
      CREATE INDEX idx_user_roles_role ON user_roles (role_id);
    `);
  },

  down: async (db) => {
    await db.query('DROP TABLE user_roles;');
  },
};
```

## Denormalization strategies

```sql
-- Materialized view for complex aggregations
CREATE MATERIALIZED VIEW user_stats AS
SELECT
  u.id,
  u.name,
  COUNT(DISTINCT o.id) AS order_count,
  SUM(o.total) AS total_spent,
  MAX(o.created_at) AS last_order_at
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name;

-- Refresh periodically
REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats;

-- Summary table for analytics
CREATE TABLE daily_stats (
  date DATE NOT NULL,
  metric VARCHAR(50) NOT NULL,
  value NUMERIC NOT NULL,
  dimensions JSONB,
  PRIMARY KEY (date, metric)
);

-- Partition by date for performance
CREATE TABLE events_partitioned (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);

CREATE TABLE events_2024_q1 PARTITION OF events_partitioned
  FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
```

## Schema documentation

```markdown
## Table: users
**Purpose**: Stores user account information
**Access pattern**: Frequent reads, occasional writes

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | UUID | No | Primary key, auto-generated |
| email | VARCHAR(255) | No | Unique, used for login |
| name | VARCHAR(255) | No | Display name |
| created_at | TIMESTAMPTZ | No | Account creation time |
| updated_at | TIMESTAMPTZ | No | Last profile update |
| deleted_at | TIMESTAMPTZ | Yes | Soft delete timestamp |

**Indexes**:
- `users_email_unique` (unique) — Login lookup
- `idx_users_deleted_at` (partial) — Active users only

**Common queries**:
- Find user by email: `WHERE email = $1`
- List active users: `WHERE deleted_at IS NULL ORDER BY created_at DESC`
```

## Anti-patterns

- Don't use UUID v4 for primary keys in high-write tables — use ULID or sequential
- Don't store large text fields in main tables — use separate tables
- Don't skip indexes on foreign keys — joins are slow without them
- Don't use `SELECT *` — always specify columns
- Don't mix ORM and raw queries without understanding the abstraction
