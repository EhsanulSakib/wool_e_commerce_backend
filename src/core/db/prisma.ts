import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '@/config/env.js';
import { logger } from '@/core/logger/index.js';
import { PrismaClient } from '@/generated/prisma/client.js';

const SLOW_QUERY_MS = 200;

/**
 * Prisma 7 talks to Postgres through a driver adapter. `PrismaPg` wraps a
 * node-postgres connection pool, which suits a long-running Express server.
 * The pool connects lazily, on the first query.
 */
const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
  max: env.DATABASE_POOL_MAX,
  // Neon's free tier scales to zero; the first connection after idle can take
  // a few seconds while the compute wakes up.
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 30_000,
});

/**
 * The single Prisma Client for the whole process. Every PrismaClient owns a
 * connection pool, so creating more than one would multiply connections.
 */
export const prisma = new PrismaClient({
  adapter,
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

prisma.$on('query', (event) => {
  if (event.duration >= SLOW_QUERY_MS) {
    logger.warn(
      { durationMs: event.duration, query: event.query },
      'Slow database query',
    );
  }
});
prisma.$on('warn', (event) =>
  logger.warn({ target: event.target }, event.message),
);
prisma.$on('error', (event) =>
  logger.error({ target: event.target }, event.message),
);

/** Closes the connection pool. Called during graceful shutdown. */
export async function disconnectDatabase() {
  await prisma.$disconnect();
}
