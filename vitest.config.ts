import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Tests use the same Neon database and Upstash Redis as development (from .env).
// There is no separate test database, so tests must never wipe tables: each
// test creates its own uniquely named data and deletes only that data.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    // Fallbacks only for environments without a .env (e.g. CI without secrets),
    // so env validation passes for unit tests that don't touch the services.
    env: {
      DATABASE_URL:
        process.env.DATABASE_URL ??
        'postgresql://placeholder:placeholder@localhost:5432/placeholder',
      UPSTASH_REDIS_REST_URL:
        process.env.UPSTASH_REDIS_REST_URL ?? 'https://placeholder.invalid',
      UPSTASH_REDIS_REST_TOKEN:
        process.env.UPSTASH_REDIS_REST_TOKEN ?? 'placeholder',
    },
  },
});
