import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '@/app.js';

const app = createApp();
const ALLOWED_ORIGIN = 'http://localhost:3000';

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ success: true, data: { status: 'ok' } });
    expect(typeof res.body.data.uptime).toBe('number');
  });
});

describe('unknown routes', () => {
  it('returns 404 in the standard error shape', async () => {
    const res = await request(app).get('/api/v1/does-not-exist');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Route GET /api/v1/does-not-exist not found',
      },
    });
  });
});

describe('request ids', () => {
  it('generates an X-Request-Id when none is sent', async () => {
    const res = await request(app).get('/health');

    expect(res.headers['x-request-id']).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('echoes a valid incoming X-Request-Id', async () => {
    const res = await request(app)
      .get('/health')
      .set('X-Request-Id', 'test-123');

    expect(res.headers['x-request-id']).toBe('test-123');
  });

  it('replaces an invalid incoming X-Request-Id', async () => {
    const res = await request(app)
      .get('/health')
      .set('X-Request-Id', 'bad id with spaces <script>');

    expect(res.headers['x-request-id']).not.toContain('script');
  });
});

describe('security headers', () => {
  it('sets helmet headers and hides the framework', async () => {
    const res = await request(app).get('/health');

    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['strict-transport-security']).toBeDefined();
    expect(res.headers['content-security-policy']).toContain(
      "default-src 'self'",
    );
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});

describe('CORS', () => {
  it('allows the configured frontend origin with credentials', async () => {
    const res = await request(app).get('/health').set('Origin', ALLOWED_ORIGIN);

    expect(res.headers['access-control-allow-origin']).toBe(ALLOWED_ORIGIN);
    expect(res.headers['access-control-allow-credentials']).toBe('true');
  });

  it('gives no CORS headers to other origins', async () => {
    const res = await request(app)
      .get('/health')
      .set('Origin', 'https://evil.example');

    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('answers preflight requests from the allowed origin', async () => {
    const res = await request(app)
      .options('/api/v1/_example')
      .set('Origin', ALLOWED_ORIGIN)
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'Content-Type');

    expect(res.status).toBe(204);
    expect(res.headers['access-control-allow-methods']).toContain('POST');
  });
});

describe('request bodies', () => {
  it('returns 400 INVALID_JSON for malformed JSON', async () => {
    const res = await request(app)
      .post('/api/v1/_example')
      .set('Content-Type', 'application/json')
      .send('{"broken": ');

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('INVALID_JSON');
  });

  it('returns 413 PAYLOAD_TOO_LARGE for bodies over 100kb', async () => {
    const res = await request(app)
      .post('/api/v1/_example')
      .send({ name: 'x'.repeat(200 * 1024), price: 1 });

    expect(res.status).toBe(413);
    expect(res.body.error.code).toBe('PAYLOAD_TOO_LARGE');
  });
});

describe('rate limit headers', () => {
  it('reports the rate limit policy on API responses', async () => {
    const res = await request(app).get('/api/v1/_example');

    expect(res.headers['ratelimit-policy']).toBeDefined();
  });
});
