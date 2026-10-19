import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { registry } from './registry.js';

type OpenApiDocument = ReturnType<OpenApiGeneratorV31['generateDocument']>;

let cachedDocument: OpenApiDocument | undefined;

/**
 * Builds the OpenAPI 3.1 document from everything registered. Generated once,
 * on first request, after all modules have registered their routes.
 */
export function getOpenApiDocument(): OpenApiDocument {
  cachedDocument ??= new OpenApiGeneratorV31(
    registry.definitions,
  ).generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'Wool API',
      version: '0.1.0',
      description:
        'REST API for Wool, a wool knitwear store. All responses use the shape ' +
        '`{ success: true, data, meta? }` or `{ success: false, error: { code, message, details? } }`.',
      license: { name: 'Proprietary' },
    },
    servers: [{ url: '/', description: 'This server' }],
  });
  return cachedDocument;
}
