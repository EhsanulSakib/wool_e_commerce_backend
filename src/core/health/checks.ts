import { redis } from '@/core/cache/redis.js';
import { prisma } from '@/core/db/prisma.js';
import { logger } from '@/core/logger/index.js';

const CHECK_TIMEOUT_MS = 5_000;

export type DependencyStatus = {
  status: 'up' | 'down';
  latencyMs: number;
};

/** Runs a check with a timeout and measures how long it took. */
async function runCheck(
  name: string,
  check: () => Promise<unknown>,
): Promise<DependencyStatus> {
  const startedAt = performance.now();
  let timer: NodeJS.Timeout | undefined;

  try {
    await Promise.race([
      check(),
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`timed out after ${CHECK_TIMEOUT_MS} ms`)),
          CHECK_TIMEOUT_MS,
        );
      }),
    ]);
    return {
      status: 'up',
      latencyMs: Math.round(performance.now() - startedAt),
    };
  } catch (err) {
    // Details stay in the logs; callers only see up/down.
    logger.warn({ err, dependency: name }, `${name} health check failed`);
    return {
      status: 'down',
      latencyMs: Math.round(performance.now() - startedAt),
    };
  } finally {
    clearTimeout(timer);
  }
}

export function checkDatabase() {
  return runCheck('database', () => prisma.$queryRaw`SELECT 1`);
}

export function checkRedis() {
  return runCheck('redis', async () => {
    const reply = await redis.ping();
    if (reply !== 'PONG') throw new Error(`unexpected PING reply: ${reply}`);
  });
}
