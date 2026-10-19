import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '@/app.js';
import { checkDatabase, checkRedis } from '@/core/health/checks.js';

// Replace the real checks so these tests never call Neon or Upstash.
vi.mock('@/core/health/checks.js', () => ({
  checkDatabase: vi.fn(),
  checkRedis: vi.fn(),
}));

const up = { status: 'up', latencyMs: 12 } as const;
const down = { status: 'down', latencyMs: 5000 } as const;

const app = createApp();

describe('GET /ready', () => {
  beforeEach(() => {
    vi.mocked(checkDatabase).mockReset();
    vi.mocked(checkRedis).mockReset();
  });

  it('returns 200 "ready" when the database and Redis are up', async () => {
    vi.mocked(checkDatabase).mockResolvedValue(up);
    vi.mocked(checkRedis).mockResolvedValue(up);

    const res = await request(app).get('/ready');

    expect(res.status).toBe(200);
    expect(res.headers['cache-control']).toBe('no-store');
    expect(res.body).toEqual({
      success: true,
      data: { status: 'ready', checks: { database: up, redis: up } },
    });
  });

  it('returns 200 "degraded" when only Redis is down', async () => {
    vi.mocked(checkDatabase).mockResolvedValue(up);
    vi.mocked(checkRedis).mockResolvedValue(down);

    const res = await request(app).get('/ready');

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('degraded');
  });

  it('returns 503 when the database is down', async () => {
    vi.mocked(checkDatabase).mockResolvedValue(down);
    vi.mocked(checkRedis).mockResolvedValue(up);

    const res = await request(app).get('/ready');

    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('DB_UNAVAILABLE');
    expect(res.body.error.details.checks.database.status).toBe('down');
  });
});
