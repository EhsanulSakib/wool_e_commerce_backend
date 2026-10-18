import express from 'express';
import { errorHandler } from '@/core/errors/error-handler.js';
import { notFound } from '@/core/middleware/not-found.js';
import { healthRouter } from '@/modules/health/health.routes.js';
import { apiRouter } from '@/routes.js';

/**
 * Builds the Express app without starting a server, so tests can import it
 * and send requests with Supertest without opening a port.
 */
export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));

  app.use(healthRouter);
  app.use('/api/v1', apiRouter);

  // Order matters: 404 after all routes, error handler last.
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
