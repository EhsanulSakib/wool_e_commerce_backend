import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '@/app.js';

describe('API docs', () => {
  const app = createApp({ docs: true });

  it('serves an OpenAPI 3.1 document with the registered routes', async () => {
    const res = await request(app).get('/openapi.json');

    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe('3.1.0');
    expect(Object.keys(res.body.paths)).toEqual(
      expect.arrayContaining([
        '/health',
        '/ready',
        '/api/v1/_example',
        '/api/v1/_example/{id}',
      ]),
    );
    expect(res.body.components.schemas).toHaveProperty('ErrorResponse');
  });

  it('serves the interactive docs page with its own CSP', async () => {
    const res = await request(app).get('/docs');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    expect(res.headers['content-security-policy']).toContain(
      'https://cdn.jsdelivr.net',
    );
  });

  it('is not available when docs are disabled', async () => {
    const noDocs = createApp({ docs: false });

    expect((await request(noDocs).get('/docs')).status).toBe(404);
    expect((await request(noDocs).get('/openapi.json')).status).toBe(404);
  });
});
