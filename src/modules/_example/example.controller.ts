import type { Response } from 'express';
import { created, ok } from '@/core/http/response.js';
import type { ValidatedRequest } from '@/core/middleware/validate.js';
import type {
  createExampleSchemas,
  exampleIdSchemas,
  listExamplesSchemas,
} from './example.schema.js';
import { exampleService } from './example.service.js';

/**
 * HTTP layer only: read the already-validated input from the request, call
 * the service, send the response. No business rules, no database access.
 * Errors thrown by the service go to the global error handler automatically
 * (Express 5 forwards rejected promises).
 */
export const exampleController = {
  async list(req: ValidatedRequest<typeof listExamplesSchemas>, res: Response) {
    const { items, meta } = await exampleService.list(req.query);
    ok(res, items, meta);
  },

  async getById(req: ValidatedRequest<typeof exampleIdSchemas>, res: Response) {
    ok(res, await exampleService.getById(req.params.id));
  },

  async create(
    req: ValidatedRequest<typeof createExampleSchemas>,
    res: Response,
  ) {
    created(res, await exampleService.create(req.body));
  },
};
