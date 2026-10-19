import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    // Placeholder connection values so tests never touch the real Neon/Upstash
    // services. These are set before .env is read, and .env never overrides
    // existing variables. Tests that need the database mock it (or, from
    // module 02 onwards, use a dedicated test database).
    env: {
      DATABASE_URL: 'postgresql://test:test@localhost:5432/wool_test',
      UPSTASH_REDIS_REST_URL: 'https://redis.test.invalid',
      UPSTASH_REDIS_REST_TOKEN: 'test-token',
    },
  },
});
