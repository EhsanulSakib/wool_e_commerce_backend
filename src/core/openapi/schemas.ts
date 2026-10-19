import type { ResponseConfig } from '@asteasolutions/zod-to-openapi';
import { z, type ZodType } from 'zod';

/** Shared response shapes used in every module's API docs. */

export const ErrorResponseSchema = z
  .object({
    success: z.literal(false),
    error: z.object({
      code: z.string().meta({ example: 'VALIDATION_ERROR' }),
      message: z.string().meta({ example: 'Invalid request data' }),
      details: z.unknown().optional(),
    }),
  })
  .meta({ id: 'ErrorResponse', description: 'Standard error response' });

export const PaginationMetaSchema = z
  .object({
    page: z.number().int().meta({ example: 1 }),
    limit: z.number().int().meta({ example: 20 }),
    total: z.number().int().meta({ example: 57 }),
    pages: z.number().int().meta({ example: 3 }),
  })
  .meta({ id: 'PaginationMeta' });

export function successResponseSchema<T extends ZodType>(data: T) {
  return z.object({ success: z.literal(true), data });
}

export function paginatedResponseSchema<T extends ZodType>(item: T) {
  return z.object({
    success: z.literal(true),
    data: z.array(item),
    meta: PaginationMetaSchema,
  });
}

/** `responses` entry for a JSON success body. */
export function jsonResponse(
  description: string,
  schema: ZodType,
): ResponseConfig {
  return { description, content: { 'application/json': { schema } } };
}

/** `responses` entry for an error status, using the standard error shape. */
export function errorResponse(description: string): ResponseConfig {
  return jsonResponse(description, ErrorResponseSchema);
}

/** Errors any endpoint can return. Spread into `responses`. */
export const commonErrorResponses = {
  429: errorResponse('Too many requests (TOO_MANY_REQUESTS)'),
  500: errorResponse('Unexpected server error (INTERNAL_ERROR)'),
} satisfies Record<number, ResponseConfig>;
