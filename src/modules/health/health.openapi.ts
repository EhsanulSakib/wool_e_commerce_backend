import { z } from 'zod';
import { registry } from '@/core/openapi/registry.js';
import {
  ErrorResponseSchema,
  jsonResponse,
  successResponseSchema,
} from '@/core/openapi/schemas.js';

const DependencyStatusSchema = z
  .object({
    status: z.enum(['up', 'down']),
    latencyMs: z.number().int().meta({ example: 42 }),
  })
  .meta({ id: 'DependencyStatus' });

const ReadinessSchema = z
  .object({
    status: z.enum(['ready', 'degraded', 'unavailable']),
    checks: z.object({
      database: DependencyStatusSchema,
      redis: DependencyStatusSchema,
    }),
  })
  .meta({ id: 'Readiness' });

registry.registerPath({
  method: 'get',
  path: '/health',
  operationId: 'getHealth',
  security: [],
  tags: ['Health'],
  summary: 'Liveness check',
  description: 'Answers as long as the process is running.',
  responses: {
    200: jsonResponse(
      'The server is running',
      successResponseSchema(
        z.object({
          status: z.literal('ok'),
          uptime: z.number().int().meta({ example: 3600 }),
        }),
      ),
    ),
  },
});

registry.registerPath({
  method: 'get',
  path: '/ready',
  operationId: 'getReadiness',
  security: [],
  tags: ['Health'],
  summary: 'Readiness check',
  description:
    'Checks the database and Redis. Redis being down only degrades the service (it is a cache); the database being down makes it unavailable.',
  responses: {
    200: jsonResponse(
      'Ready or degraded',
      successResponseSchema(ReadinessSchema),
    ),
    503: jsonResponse(
      'The database is not reachable (DB_UNAVAILABLE)',
      ErrorResponseSchema,
    ),
  },
});
