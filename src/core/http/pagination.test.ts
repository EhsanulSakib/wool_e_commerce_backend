import { describe, expect, it } from 'vitest';
import {
  buildPaginationMeta,
  paginationQuery,
  sortQuery,
  toSkipTake,
} from './pagination.js';

describe('paginationQuery', () => {
  it('applies defaults and coerces strings', () => {
    expect(paginationQuery.parse({})).toEqual({ page: 1, limit: 20 });
    expect(paginationQuery.parse({ page: '3', limit: '50' })).toEqual({
      page: 3,
      limit: 50,
    });
  });

  it('rejects page < 1 and limit > 100', () => {
    expect(paginationQuery.safeParse({ page: '0' }).success).toBe(false);
    expect(paginationQuery.safeParse({ limit: '500' }).success).toBe(false);
  });
});

describe('toSkipTake / buildPaginationMeta', () => {
  it('converts page/limit for Prisma and builds meta', () => {
    expect(toSkipTake({ page: 3, limit: 20 })).toEqual({ skip: 40, take: 20 });
    expect(buildPaginationMeta(57, { page: 3, limit: 20 })).toEqual({
      page: 3,
      limit: 20,
      total: 57,
      pages: 3,
    });
    expect(buildPaginationMeta(0, { page: 1, limit: 20 }).pages).toBe(0);
  });
});

describe('sortQuery', () => {
  const sort = sortQuery(
    { newest: { createdAt: 'desc' }, name: { name: 'asc' } },
    'newest',
  );

  it('maps an allowed key to its orderBy and defaults when missing', () => {
    expect(sort.parse('name')).toEqual({ name: 'asc' });
    expect(sort.parse(undefined)).toEqual({ createdAt: 'desc' });
  });

  it('rejects keys outside the allowlist', () => {
    expect(sort.safeParse('password').success).toBe(false);
  });
});
