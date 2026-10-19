import { Redis } from '@upstash/redis';
import { env } from '@/config/env.js';

/**
 * Upstash Redis client. It sends each command as an HTTPS request to the
 * Upstash REST API, so there is no long-lived connection to open or close.
 *
 * Used from module 40 for caching and rate limiting. Redis is optional for the
 * app to work: if it's down, callers should fall back to the database.
 */
export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
  // Retry transient network errors a couple of times with a short backoff.
  retry: {
    retries: 2,
    backoff: (retryCount) => Math.min(100 * 2 ** retryCount, 1_000),
  },
  enableTelemetry: false,
});
