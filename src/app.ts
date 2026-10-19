import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import { env } from '@/config/env.js';
import { errorHandler } from '@/core/errors/error-handler.js';
import { corsPolicy, securityHeaders } from '@/core/http/security.js';
import { httpLogger } from '@/core/logger/http-logger.js';
import { notFound } from '@/core/middleware/not-found.js';
import { globalRateLimiter } from '@/core/middleware/rate-limit.js';
import { docsRouter } from '@/core/openapi/docs.routes.js';
import { healthRouter } from '@/modules/health/health.routes.js';
import { apiRouter } from '@/routes.js';

const BODY_LIMIT = '100kb';

type AppOptions = {
  /** Serve /docs and /openapi.json (defaults to DOCS_ENABLED). */
  docs?: boolean;
};

/**
 * Builds the Express app without starting a server, so tests can import it
 * and send requests with Supertest without opening a port.
 *
 * Middleware order matters — each request passes through them top to bottom:
 */
export function createApp({ docs = env.DOCS_ENABLED }: AppOptions = {}) {
  const app = express();

  // Behind a proxy (Render, Railway, Vercel rewrites) this makes req.ip the
  // real client IP instead of the proxy's, which rate limiting depends on.
  app.set('trust proxy', env.TRUST_PROXY);
  app.disable('x-powered-by');

  // 1. Request id + one log line per request (first, so everything is logged)
  app.use(httpLogger);

  // 2. Security headers and CORS
  app.use(securityHeaders);
  app.use(corsPolicy);

  // 3. Rate limiting before any body parsing, so rejected requests cost little
  app.use(globalRateLimiter);

  // 4. Parsers (with size limits) and compression
  app.use(compression());
  app.use(express.json({ limit: BODY_LIMIT }));
  app.use(express.urlencoded({ extended: false, limit: BODY_LIMIT }));
  app.use(cookieParser());

  // 5. Routes
  app.use(healthRouter);
  if (docs) app.use(docsRouter);
  app.use('/api/v1', apiRouter);

  // 6. Nothing matched → 404; any error → standard error response (always last)
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
