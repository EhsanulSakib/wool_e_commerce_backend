import { Router } from 'express';
import { checkDatabase, checkRedis } from '@/core/health/checks.js';

export const healthRouter = Router();

/** Liveness check: answers as long as the process is running. */
healthRouter.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      uptime: Math.round(process.uptime()),
    },
  });
});

/**
 * Readiness check: can the app serve real traffic?
 * - Database down → 503 (the app can't work without it).
 * - Redis down → 200 with status "degraded" (Redis is only a cache, so the app
 *   keeps working from the database, just slower).
 */
healthRouter.get('/ready', async (_req, res) => {
  const [database, redis] = await Promise.all([checkDatabase(), checkRedis()]);

  const isReady = database.status === 'up';
  const status = !isReady
    ? 'unavailable'
    : redis.status === 'up'
      ? 'ready'
      : 'degraded';

  // Never cache readiness: it must reflect the current state.
  res.set('Cache-Control', 'no-store');

  if (!isReady) {
    res.status(503).json({
      success: false,
      error: {
        code: 'DB_UNAVAILABLE',
        message: 'The database is not reachable',
        details: { status, checks: { database, redis } },
      },
    });
    return;
  }

  res.json({ success: true, data: { status, checks: { database, redis } } });
});
