import type { Request, RequestHandler } from 'express';
import type { z, ZodType } from 'zod';
import {
  ValidationError,
  type ValidationIssue,
} from '@/core/errors/app-error.js';

export type RequestSchemas = {
  params?: ZodType;
  query?: ZodType;
  body?: ZodType;
};

type Parsed<S, Fallback> = S extends ZodType ? z.output<S> : Fallback;

/**
 * The request type a controller receives after `validate(schemas)` ran:
 * params, query and body have the types of the parsed schemas.
 *
 *   const schemas = { body: createProductBody } satisfies RequestSchemas;
 *   async function create(req: ValidatedRequest<typeof schemas>, res: Response) {
 *     req.body.name; // typed
 *   }
 */
export type ValidatedRequest<S extends RequestSchemas> = Request<
  Parsed<S['params'], Record<string, string>>,
  unknown,
  Parsed<S['body'], unknown>,
  Parsed<S['query'], Record<string, unknown>>
>;

const LOCATIONS = ['params', 'query', 'body'] as const;

// The returned handler is typed loosely (`any`) on purpose: Express infers a
// route's request type from all its handlers, and this lets the controller's
// own ValidatedRequest<...> type win instead of conflicting with it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LooseHandler = RequestHandler<any, any, any, any>;

/**
 * Validates and parses params, query and body with Zod. On success the parsed
 * values (with defaults applied and strings coerced) replace the raw ones; on
 * failure it responds 400 VALIDATION_ERROR listing every problem at once.
 */
export function validate(schemas: RequestSchemas): LooseHandler {
  return (req, _res, next) => {
    const issues: ValidationIssue[] = [];

    for (const location of LOCATIONS) {
      const schema = schemas[location];
      if (!schema) continue;

      const result = schema.safeParse(req[location] ?? {});
      if (!result.success) {
        for (const issue of result.error.issues) {
          issues.push({
            location,
            path: issue.path.join('.'),
            message: issue.message,
          });
        }
        continue;
      }

      if (location === 'query') {
        // Express 5 exposes req.query through a getter, so it can't be
        // assigned directly; define an own property on this request instead.
        Object.defineProperty(req, 'query', {
          value: result.data,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        req[location] = result.data;
      }
    }

    if (issues.length > 0) {
      next(new ValidationError(issues));
      return;
    }
    next();
  };
}
