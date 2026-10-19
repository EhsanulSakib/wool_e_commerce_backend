/**
 * True when real Neon/Upstash credentials are available (from .env locally or
 * GitHub secrets in CI). vitest.config.ts falls back to placeholder URLs
 * otherwise, and integration tests use this flag to skip themselves.
 */
export const hasRealServices =
  !process.env.DATABASE_URL?.includes('placeholder') &&
  !process.env.UPSTASH_REDIS_REST_URL?.includes('placeholder');
