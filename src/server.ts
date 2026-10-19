import { createServer } from 'node:http';
import { createApp } from '@/app.js';
import { env } from '@/config/env.js';
import { disconnectDatabase } from '@/core/db/prisma.js';
import { checkDatabase, checkRedis } from '@/core/health/checks.js';
import { logger } from '@/core/logger/index.js';

const SHUTDOWN_TIMEOUT_MS = 10_000;

const server = createServer(createApp());

server.on('listening', () => {
  logger.info(
    `🚀 Server listening on http://localhost:${env.PORT} (${env.NODE_ENV})`,
  );
  void logDependencyStatus();
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    logger.fatal(`Port ${env.PORT} is already in use`);
  } else {
    logger.fatal({ err }, 'Server failed to start');
  }
  process.exit(1);
});

server.listen(env.PORT);

/**
 * Checks the database and Redis once at startup so connection problems show
 * up in the logs immediately. The server keeps running either way: Neon may
 * just be waking up, and GET /ready reports the live status.
 */
async function logDependencyStatus() {
  const [database, redis] = await Promise.all([checkDatabase(), checkRedis()]);

  if (database.status === 'up') {
    logger.info(`🐘 Database connected (${database.latencyMs} ms)`);
  } else {
    logger.error('🐘 Database is not reachable — check DATABASE_URL');
  }

  if (redis.status === 'up') {
    logger.info(`🧱 Redis connected (${redis.latencyMs} ms)`);
  } else {
    logger.warn(
      '🧱 Redis is not reachable — check UPSTASH_REDIS_REST_URL / TOKEN (the app still works without it)',
    );
  }
}

let shuttingDown = false;

/**
 * Graceful shutdown: stop accepting new connections, let in-flight requests
 * finish, close the database pool, then exit. A timer forces the exit if
 * something hangs. Redis needs no cleanup (Upstash uses stateless HTTPS).
 */
function shutdown(reason: string, exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ reason }, 'Shutting down gracefully...');

  const forceExit = setTimeout(() => {
    logger.error('Shutdown took too long, forcing exit');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
  forceExit.unref();

  server.close(async (err) => {
    if (err) {
      logger.error({ err }, 'Error while closing the server');
      process.exit(1);
    }
    logger.info('Server closed');

    try {
      await disconnectDatabase();
      logger.info('Database pool closed');
    } catch (dbErr) {
      logger.error({ err: dbErr }, 'Error while closing the database pool');
      exitCode = 1;
    }

    process.exit(exitCode);
  });

  // Idle keep-alive connections would otherwise keep the server open.
  server.closeIdleConnections();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  logger.fatal({ err: reason }, 'Unhandled promise rejection');
  shutdown('unhandledRejection', 1);
});

process.on('uncaughtException', (err) => {
  // The process is in an unknown state; exit immediately.
  logger.fatal({ err }, 'Uncaught exception');
  process.exit(1);
});
