import cors from 'cors';
import helmet from 'helmet';
import { env } from '@/config/env.js';

/**
 * Security headers (X-Content-Type-Options, Strict-Transport-Security,
 * a strict Content-Security-Policy, X-Frame-Options…). Helmet's defaults are
 * a good fit for a JSON API.
 */
export const securityHeaders = helmet();

/**
 * Only the origins in CORS_ORIGINS (the frontend) may call the API from a
 * browser, with cookies. Requests without an Origin header (server-to-server,
 * curl, uptime monitors) aren't subject to CORS and pass through.
 * A disallowed origin simply gets no CORS headers, so the browser blocks it.
 */
export const corsPolicy = cors({
  origin(origin, callback) {
    callback(null, !origin || env.CORS_ORIGINS.includes(origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Request-Id',
    'Idempotency-Key',
  ],
  exposedHeaders: [
    'X-Request-Id',
    'RateLimit',
    'RateLimit-Policy',
    'Retry-After',
  ],
  maxAge: 600, // browsers may cache the preflight answer for 10 minutes
});
