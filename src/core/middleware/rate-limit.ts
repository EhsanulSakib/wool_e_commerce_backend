import type { Request } from 'express';
import {
  rateLimit,
  type AugmentedRequest,
  type Options,
} from 'express-rate-limit';
import { env } from '@/config/env.js';
import { TooManyRequestsError } from '@/core/errors/app-error.js';

type LimiterOptions = {
  /** Time window in milliseconds. */
  windowMs: number;
  /** Max requests per key (by default the client IP) in the window. */
  limit: number;
  /** Message shown to the client when limited. */
  message?: string;
  /** Group requests by something other than IP (e.g. email for login). */
  keyGenerator?: Options['keyGenerator'];
  skip?: (req: Request) => boolean;
};

/**
 * Creates a rate limiter that answers in the standard error shape with
 * `429 TOO_MANY_REQUESTS` and a `Retry-After` header.
 *
 * Counters are kept in memory for now, which works for a single server
 * instance. Module 40 moves them to Redis so limits hold across instances.
 */
export function createRateLimiter(options: LimiterOptions) {
  const message =
    options.message ?? 'Too many requests, please try again later';

  return rateLimit({
    windowMs: options.windowMs,
    limit: options.limit,
    standardHeaders: 'draft-8', // RateLimit + RateLimit-Policy headers
    legacyHeaders: false, // no X-RateLimit-* headers
    ...(options.keyGenerator && { keyGenerator: options.keyGenerator }),
    ...(options.skip && { skip: options.skip }),
    handler(req, res, next) {
      // express-rate-limit attaches its counters to req.rateLimit.
      const resetTime = (req as AugmentedRequest).rateLimit?.resetTime;
      const retryAfterSeconds = resetTime
        ? Math.max(1, Math.ceil((resetTime.getTime() - Date.now()) / 1000))
        : Math.ceil(options.windowMs / 1000);
      res.setHeader('Retry-After', String(retryAfterSeconds));
      next(
        new TooManyRequestsError(message, { details: { retryAfterSeconds } }),
      );
    },
  });
}

/**
 * Applies to every route. Health checks are skipped so uptime monitors
 * never get limited. Stricter limiters (login, register…) are added per
 * route in later modules.
 *
 * Note for later: server-side requests from the Next.js app all come from
 * one IP, so module 14 must forward the real client IP (or exempt internal
 * traffic) before this limit is tightened.
 */
export const globalRateLimiter = createRateLimiter({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX,
  skip: (req) => req.path === '/health' || req.path === '/ready',
});
