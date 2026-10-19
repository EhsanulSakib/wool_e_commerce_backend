import { pino } from 'pino';
import { env } from '@/config/env.js';

/**
 * Paths whose values are replaced with "[Redacted]" in every log line, so
 * credentials and tokens never end up in log files or log platforms.
 */
const REDACT_PATHS = [
  'req.headers.authorization',
  'req.headers.cookie',
  'req.headers["x-api-key"]',
  'res.headers["set-cookie"]',
  '*.password',
  '*.passwordHash',
  '*.token',
  '*.accessToken',
  '*.refreshToken',
];

/**
 * Structured JSON logger. In development the output is pretty-printed for
 * humans; in production it stays as JSON so log platforms can search it.
 * Tests run silent to keep the output clean.
 */
export const logger = pino({
  level: env.isTest ? 'silent' : env.LOG_LEVEL,
  redact: { paths: REDACT_PATHS, censor: '[Redacted]' },
  ...(env.isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:HH:MM:ss',
        // Request logs already include method, path, status and time in the
        // message; hide the bulky req/res objects in the dev console.
        ignore: 'pid,hostname,req,res,responseTime',
      },
    },
  }),
});
