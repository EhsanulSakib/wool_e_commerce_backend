import { randomUUID } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { pinoHttp } from 'pino-http';
import { logger } from './index.js';

const REQUEST_ID_HEADER = 'x-request-id';
const VALID_REQUEST_ID = /^[\w.-]{1,100}$/;

/**
 * Every request gets an id, so all log lines for one request can be found
 * together. A valid incoming X-Request-Id (e.g. from the frontend or a proxy)
 * is reused; otherwise a new UUID is generated. The id is echoed back in the
 * response header.
 */
function genReqId(req: IncomingMessage, res: ServerResponse): string {
  const incoming = req.headers[REQUEST_ID_HEADER];
  const id =
    typeof incoming === 'string' && VALID_REQUEST_ID.test(incoming)
      ? incoming
      : randomUUID();
  res.setHeader('X-Request-Id', id);
  return id;
}

/**
 * Express strips the mount path from `req.url` inside routers (a request to
 * /api/v1/products looks like "/" to the products router), so log the
 * original URL, which Express keeps intact.
 */
function fullPath(req: IncomingMessage & { originalUrl?: string }): string {
  return req.originalUrl ?? req.url ?? '';
}

/**
 * Logs one line per request (method, path, status, duration) and attaches a
 * child logger to `req.log` that automatically includes the request id.
 */
export const httpLogger = pinoHttp({
  logger,
  genReqId,
  customLogLevel(_req, res, err) {
    if (err || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessMessage(req, res, responseTime) {
    return `${req.method} ${fullPath(req)} ${res.statusCode} ${Math.round(responseTime)}ms`;
  },
  customErrorMessage(req, res) {
    return `${req.method} ${fullPath(req)} ${res.statusCode} failed`;
  },
  autoLogging: {
    // Health checks run every few seconds in production; don't flood the logs.
    ignore: (req) => req.url === '/health' || req.url === '/ready',
  },
});
