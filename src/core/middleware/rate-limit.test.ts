import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { errorHandler } from '@/core/errors/error-handler.js';
import { httpLogger } from '@/core/logger/http-logger.js';
import { createRateLimiter } from './rate-limit.js';

function appWithLimit(limit: number) {
  const app = express();
  app.use(httpLogger);
  app.use(createRateLimiter({ windowMs: 60_000, limit, message: 'Slow down' }));
  app.get('/ping', (_req, res) => {
    res.json({ success: true, data: 'pong' });
  });
  app.use(errorHandler);
  return app;
}

describe('createRateLimiter', () => {
  it('allows requests up to the limit, then answers 429', async () => {
    const app = appWithLimit(2);

    expect((await request(app).get('/ping')).status).toBe(200);
    expect((await request(app).get('/ping')).status).toBe(200);

    const limited = await request(app).get('/ping');

    expect(limited.status).toBe(429);
    expect(limited.body.error.code).toBe('TOO_MANY_REQUESTS');
    expect(limited.body.error.message).toBe('Slow down');
    expect(Number(limited.headers['retry-after'])).toBeGreaterThan(0);
  });
});
