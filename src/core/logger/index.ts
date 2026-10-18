import { pino } from 'pino';
import { env } from '@/config/env.js';

const isDevelopment = env.NODE_ENV === 'development';

/**
 * Structured JSON logger. In development the output is pretty-printed for
 * humans; in production it stays as JSON so log platforms can search it.
 * Tests run silent to keep the output clean.
 */
export const logger = pino({
  level: env.NODE_ENV === 'test' ? 'silent' : env.LOG_LEVEL,
  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  }),
});
