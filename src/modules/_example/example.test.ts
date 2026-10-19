import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '@/app.js';
import { eventBus } from '@/core/events/event-bus.js';
import { exampleRepository } from './example.repository.js';

const app = createApp();
const BASE = '/api/v1/_example';

async function createItem(name: string, price: number) {
  const res = await request(app).post(BASE).send({ name, price });
  expect(res.status).toBe(201);
  return res.body.data as { id: string; name: string; price: number };
}

describe('example module', () => {
  beforeEach(() => {
    exampleRepository.clear();
  });

  afterEach(() => {
    eventBus.clear();
  });

  describe('POST /_example', () => {
    it('creates an item and emits example.created', async () => {
      const handler = vi.fn();
      eventBus.on('example.created', handler);

      const res = await request(app)
        .post(BASE)
        .send({ name: '  Merino Scarf  ', price: 1890 });

      expect(res.status).toBe(201);
      expect(res.body.data).toMatchObject({
        name: 'Merino Scarf',
        price: 1890,
      });
      await vi.waitFor(() =>
        expect(handler).toHaveBeenCalledWith({
          id: res.body.data.id,
          name: 'Merino Scarf',
        }),
      );
    });

    it('reports every invalid field at once', async () => {
      const res = await request(app).post(BASE).send({ name: 'x', price: -5 });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
      expect(res.body.error.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ location: 'body', path: 'name' }),
          expect.objectContaining({ location: 'body', path: 'price' }),
        ]),
      );
    });

    it('rejects unknown fields (strict schema)', async () => {
      const res = await request(app)
        .post(BASE)
        .send({ name: 'Wool Beanie', price: 990, isAdmin: true });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('returns 409 with a specific code for a duplicate name', async () => {
      await createItem('Wool Beanie', 990);

      const res = await request(app)
        .post(BASE)
        .send({ name: 'wool beanie', price: 1200 });

      expect(res.status).toBe(409);
      expect(res.body.error).toMatchObject({
        code: 'EXAMPLE_NAME_TAKEN',
        details: { field: 'name' },
      });
    });
  });

  describe('GET /_example', () => {
    beforeEach(async () => {
      await createItem('Cable Knit Cardigan', 5490);
      await createItem('Alpaca Scarf', 2490);
      await createItem('Merino Beanie', 1290);
    });

    it('returns a page with meta, using defaults', async () => {
      const res = await request(app).get(BASE);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(3);
      expect(res.body.meta).toEqual({ page: 1, limit: 20, total: 3, pages: 1 });
    });

    it('paginates with coerced query values', async () => {
      const res = await request(app).get(`${BASE}?page=2&limit=2`);

      expect(res.body.data).toHaveLength(1);
      expect(res.body.meta).toEqual({ page: 2, limit: 2, total: 3, pages: 2 });
    });

    it('sorts by an allowed key', async () => {
      const res = await request(app).get(`${BASE}?sort=price_asc`);

      expect(
        res.body.data.map((item: { price: number }) => item.price),
      ).toEqual([1290, 2490, 5490]);
    });

    it('searches by name', async () => {
      const res = await request(app).get(`${BASE}?q=scarf`);

      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe('Alpaca Scarf');
    });

    it('rejects a sort key outside the allowlist and a limit above 100', async () => {
      const res = await request(app).get(`${BASE}?sort=secret&limit=500`);

      expect(res.status).toBe(400);
      expect(res.body.error.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ location: 'query', path: 'sort' }),
          expect.objectContaining({ location: 'query', path: 'limit' }),
        ]),
      );
    });
  });

  describe('GET /_example/:id', () => {
    it('returns the item', async () => {
      const item = await createItem('Merino Gloves', 1590);

      const res = await request(app).get(`${BASE}/${item.id}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(expect.objectContaining({ id: item.id }));
    });

    it('returns 400 for a malformed id and 404 for an unknown one', async () => {
      expect((await request(app).get(`${BASE}/not-a-uuid`)).status).toBe(400);

      const res = await request(app).get(
        `${BASE}/0192f1a2-3b4c-7d5e-8f60-718293a4b5c6`,
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });
  });
});
