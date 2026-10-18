import { createServer } from 'node:http';
import { createApp } from '@/app.js';
import { env } from '@/config/env.js';
import { logger } from '@/core/logger/index.js';

const SHUTDOWN_TIMEOUT_MS = 10_000;

const server = createServer(createApp());

server.on('listening', () => {
  logger.info(
    `🚀 Server listening on http://localhost:${env.PORT} (${env.NODE_ENV})`,
  );
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

let shuttingDown = false;

/**
 * Graceful shutdown: stop accepting new connections, let in-flight requests
 * finish, then exit. A timer forces the exit if something hangs.
 * Later modules add cleanup here (database disconnect, Redis, schedulers).
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

  server.close((err) => {
    if (err) {
      logger.error({ err }, 'Error while closing the server');
      process.exit(1);
    }
    logger.info('Server closed');
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
