import { z } from 'zod';
import { paginationQuery, sortQuery } from '@/core/http/pagination.js';
import type { RequestSchemas } from '@/core/middleware/validate.js';

/**
 * Zod schemas are the single source of truth for a module's API:
 * they validate requests, provide TypeScript types, and generate the docs.
 */

// --- Shapes -------------------------------------------------------------------

export const ExampleItemSchema = z
  .object({
    id: z.uuid(),
    name: z.string().meta({ example: 'Merino Crew Sweater' }),
    price: z.number().meta({ example: 3490 }),
    createdAt: z.iso.datetime(),
  })
  .meta({ id: 'ExampleItem' });

export type ExampleItem = z.output<typeof ExampleItemSchema>;

// --- Requests -----------------------------------------------------------------

export const listExamplesSchemas = {
  query: paginationQuery.extend({
    q: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .optional()
      .meta({ description: 'Search by name' }),
    sort: sortQuery(
      {
        newest: { field: 'createdAt', direction: 'desc' },
        name: { field: 'name', direction: 'asc' },
        price_asc: { field: 'price', direction: 'asc' },
        price_desc: { field: 'price', direction: 'desc' },
      },
      'newest',
    ),
  }),
} satisfies RequestSchemas;

export const exampleIdSchemas = {
  params: z.object({ id: z.uuid() }),
} satisfies RequestSchemas;

export const CreateExampleBodySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(60)
      .meta({ example: 'Merino Crew Sweater' }),
    price: z.number().positive().max(1_000_000).meta({ example: 3490 }),
  })
  .strict()
  .meta({ id: 'CreateExampleBody' });

export const createExampleSchemas = {
  body: CreateExampleBodySchema,
} satisfies RequestSchemas;

export type ListExamplesQuery = z.output<typeof listExamplesSchemas.query>;
export type CreateExampleInput = z.output<typeof CreateExampleBodySchema>;
