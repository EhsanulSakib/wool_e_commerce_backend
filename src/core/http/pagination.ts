import { z } from 'zod';

export const MAX_PAGE_SIZE = 100;
export const DEFAULT_PAGE_SIZE = 20;

/**
 * `?page=2&limit=20` → { page: 2, limit: 20 }.
 * Query values arrive as strings, so they're coerced to numbers.
 * Asking for more than MAX_PAGE_SIZE is a validation error (not silently
 * clamped), so clients find out about the limit.
 */
export const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),
});

export type Pagination = z.output<typeof paginationQuery>;

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

/** Converts page/limit to Prisma's skip/take. */
export function toSkipTake({ page, limit }: Pagination) {
  return { skip: (page - 1) * limit, take: limit };
}

export function buildPaginationMeta(
  total: number,
  { page, limit }: Pagination,
): PaginationMeta {
  return { page, limit, total, pages: Math.ceil(total / limit) };
}

/**
 * Builds a `?sort=` schema from an allowlist. Clients send a short key; the
 * schema returns the matching Prisma `orderBy`. Anything not in the list is
 * rejected, so users can never sort by arbitrary (or sensitive) columns.
 *
 *   const sort = sortQuery({ newest: { createdAt: 'desc' }, name: { name: 'asc' } }, 'newest');
 */
export function sortQuery<const TOptions extends Record<string, unknown>>(
  options: TOptions,
  defaultKey: keyof TOptions & string,
) {
  const keys = Object.keys(options) as [
    keyof TOptions & string,
    ...(keyof TOptions & string)[],
  ];
  return z
    .enum(keys)
    .default(defaultKey)
    .transform((key) => options[key] as TOptions[keyof TOptions]);
}
