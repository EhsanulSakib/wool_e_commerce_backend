import { existsSync } from 'node:fs';
import { defineConfig } from 'prisma/config';

// The Prisma CLI doesn't load .env by itself; use Node's built-in loader.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

/**
 * Configuration for the Prisma CLI (migrate, studio, generate).
 *
 * Neon gives two endpoints for the same database:
 * - DATABASE_URL (host contains "-pooler"): goes through PgBouncer. The app uses
 *   it at runtime, because a pooler handles many short-lived connections well.
 * - DIRECT_URL (no "-pooler"): a direct connection. Migrations need it, because
 *   they rely on session features (advisory locks) that a transaction pooler
 *   doesn't support.
 *
 * `process.env` is read directly (not via `env()`) so `prisma generate` still
 * works in CI where no database URL is set.
 */
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    // `npm run db:seed` (or `prisma db seed`) runs this command.
    seed: 'tsx prisma/seed/index.ts',
  },
  datasource: {
    url: process.env.DIRECT_URL,
  },
});
