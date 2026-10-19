import { registry } from '@/core/openapi/registry.js';
import {
  commonErrorResponses,
  errorResponse,
  jsonResponse,
  paginatedResponseSchema,
  successResponseSchema,
} from '@/core/openapi/schemas.js';
import {
  CreateExampleBodySchema,
  ExampleItemSchema,
  exampleIdSchemas,
  listExamplesSchemas,
} from './example.schema.js';

const BASE = '/api/v1/_example';
const tags = ['Example (dev only)'];

registry.registerPath({
  method: 'get',
  path: BASE,
  operationId: 'listExamples',
  security: [],
  tags,
  summary: 'List example items',
  description: 'Demonstrates pagination, sorting and search.',
  request: { query: listExamplesSchemas.query },
  responses: {
    200: jsonResponse(
      'A page of items',
      paginatedResponseSchema(ExampleItemSchema),
    ),
    400: errorResponse('Invalid query (VALIDATION_ERROR)'),
    ...commonErrorResponses,
  },
});

registry.registerPath({
  method: 'get',
  path: `${BASE}/{id}`,
  operationId: 'getExample',
  security: [],
  tags,
  summary: 'Get one example item',
  request: { params: exampleIdSchemas.params },
  responses: {
    200: jsonResponse('The item', successResponseSchema(ExampleItemSchema)),
    400: errorResponse('Invalid id (VALIDATION_ERROR)'),
    404: errorResponse('Item not found (NOT_FOUND)'),
    ...commonErrorResponses,
  },
});

registry.registerPath({
  method: 'post',
  path: BASE,
  operationId: 'createExample',
  security: [],
  tags,
  summary: 'Create an example item',
  request: {
    body: {
      content: { 'application/json': { schema: CreateExampleBodySchema } },
    },
  },
  responses: {
    201: jsonResponse('Created', successResponseSchema(ExampleItemSchema)),
    400: errorResponse('Invalid body (VALIDATION_ERROR)'),
    409: errorResponse('Name already used (EXAMPLE_NAME_TAKEN)'),
    ...commonErrorResponses,
  },
});
