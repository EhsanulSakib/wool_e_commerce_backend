import { Router } from 'express';
import { validate } from '@/core/middleware/validate.js';
import { exampleController } from './example.controller.js';
import {
  createExampleSchemas,
  exampleIdSchemas,
  listExamplesSchemas,
} from './example.schema.js';
import './example.openapi.js';

/** Paths + middleware chain. Mounted at /api/v1/_example (development only). */
export const exampleRouter = Router();

exampleRouter.get('/', validate(listExamplesSchemas), exampleController.list);
exampleRouter.get(
  '/:id',
  validate(exampleIdSchemas),
  exampleController.getById,
);
exampleRouter.post(
  '/',
  validate(createExampleSchemas),
  exampleController.create,
);
