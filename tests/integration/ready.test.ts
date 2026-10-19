import request from 'supertest';
import { afterAll, describe, expect, it } from 'vitest';
import { createApp } from '@/app.js';
import { disconnectDatabase } from '@/core/db/prisma.js';
import { hasRealServices } from '../helpers/env.js';

// Calls the real Neon database and Upstash Redis (read-only: SELECT 1 and PING).
describe.skipIf(!hasRealServices)('GET /ready (real services)', () => {
  const app = createApp();

  afterAll(async () => {
    await disconnectDatabase();
  });

  it('reports the database and Redis as up', async () => {
    const res = await request(app).get('/ready');

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('ready');
    expect(res.body.data.checks.database.status).toBe('up');
    expect(res.body.data.checks.redis.status).toBe('up');
  });
});
