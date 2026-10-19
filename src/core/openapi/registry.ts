import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

/**
 * Collects every documented route. Each module registers its own paths in a
 * `<module>.openapi.ts` file, using the same Zod schemas that validate the
 * requests, so the docs can't drift from the real behavior.
 */
export const registry = new OpenAPIRegistry();
