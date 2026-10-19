import { apiReference } from '@scalar/express-api-reference';
import { Router } from 'express';
import helmet from 'helmet';
import { getOpenApiDocument } from './document.js';

const SCALAR_CDN = 'https://cdn.jsdelivr.net';

export const docsRouter = Router();

/** Machine-readable spec (the frontend generates its API types from it). */
docsRouter.get('/openapi.json', (_req, res) => {
  res.json(getOpenApiDocument());
});

/**
 * Interactive docs (Scalar). The page loads its script from a CDN and uses an
 * inline config script, so it gets its own Content Security Policy that allows
 * exactly that. The rest of the API keeps helmet's strict default policy.
 */
docsRouter.use(
  '/docs',
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", SCALAR_CDN],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          SCALAR_CDN,
          'https://fonts.googleapis.com',
        ],
        fontSrc: ["'self'", 'data:', SCALAR_CDN, 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", SCALAR_CDN],
        workerSrc: ["'self'", 'blob:'],
      },
    },
  }),
  apiReference({
    url: '/openapi.json',
    pageTitle: 'Wool API',
  }),
);
