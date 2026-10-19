import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { env } from '@/config/env.js';
import { Prisma } from '@/generated/prisma/client.js';
import { AppError } from './app-error.js';
import { ErrorCode } from './error-codes.js';

type ErrorBody = {
  success: false;
  error: { code: string; message: string; details?: unknown };
};

type MappedError = { statusCode: number; body: ErrorBody };

function errorBody(
  code: string,
  message: string,
  details?: unknown,
): ErrorBody {
  return {
    success: false,
    error:
      details === undefined ? { code, message } : { code, message, details },
  };
}

/** Errors created by body-parser (express.json) carry `type` and `status`. */
function isBodyParserError(
  err: unknown,
): err is { type: string; status: number; message: string } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'type' in err &&
    'status' in err &&
    typeof err.status === 'number'
  );
}

/** Field names involved in a unique-constraint violation (shape varies by driver). */
function uniqueConstraintFields(
  err: Prisma.PrismaClientKnownRequestError,
): string[] | undefined {
  const target = err.meta?.target;
  if (Array.isArray(target)) return target.map(String);
  if (typeof target === 'string') return [target];
  return undefined;
}

function mapPrismaError(
  err: Prisma.PrismaClientKnownRequestError,
): MappedError | undefined {
  switch (err.code) {
    case 'P2002': {
      const fields = uniqueConstraintFields(err);
      return {
        statusCode: 409,
        body: errorBody(
          ErrorCode.CONFLICT,
          'A record with these values already exists',
          fields ? { fields } : undefined,
        ),
      };
    }
    case 'P2025':
      return {
        statusCode: 404,
        body: errorBody(ErrorCode.NOT_FOUND, 'Resource not found'),
      };
    case 'P2003':
      return {
        statusCode: 409,
        body: errorBody(
          ErrorCode.CONFLICT,
          'This action conflicts with related records',
        ),
      };
    default:
      return undefined;
  }
}

/**
 * Turns any thrown value into a status code + safe JSON body.
 * `exposeInternalDetails` adds the message and stack of unexpected errors to
 * the response; it's on outside production only.
 */
export function mapError(
  err: unknown,
  { exposeInternalDetails = !env.isProduction } = {},
): MappedError {
  if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      body: errorBody(err.code, err.message, err.details),
    };
  }

  if (err instanceof ZodError) {
    return {
      statusCode: 400,
      body: errorBody(
        ErrorCode.VALIDATION_ERROR,
        'Invalid data',
        err.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      ),
    };
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const mapped = mapPrismaError(err);
    if (mapped) return mapped;
  }

  if (isBodyParserError(err) && err.status >= 400 && err.status < 500) {
    if (err.type === 'entity.too.large') {
      return {
        statusCode: 413,
        body: errorBody(
          ErrorCode.PAYLOAD_TOO_LARGE,
          'Request body is too large',
        ),
      };
    }
    if (err.type === 'entity.parse.failed') {
      return {
        statusCode: 400,
        body: errorBody(
          ErrorCode.INVALID_JSON,
          'Request body is not valid JSON',
        ),
      };
    }
    return {
      statusCode: err.status,
      body: errorBody(
        ErrorCode.BAD_REQUEST,
        'The request could not be processed',
      ),
    };
  }

  // Unknown error: a bug or an infrastructure failure. Show details only
  // outside production, to help while developing.
  const details =
    exposeInternalDetails && err instanceof Error
      ? { name: err.name, message: err.message, stack: err.stack?.split('\n') }
      : undefined;
  return {
    statusCode: 500,
    body: errorBody(ErrorCode.INTERNAL_ERROR, 'Something went wrong', details),
  };
}

/**
 * Global error handler, registered last in app.ts. Express recognizes error
 * middleware by its four parameters, so `next` must stay in the signature.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // If the response already started streaming, let Express close the connection.
  if (res.headersSent) {
    next(err);
    return;
  }

  const { statusCode, body } = mapError(err);

  // Expected client errors (4xx) are already visible in the request log line.
  // Server errors get the full error object, including the stack.
  if (statusCode >= 500) {
    req.log.error({ err }, 'Unhandled error');
  }

  res.status(statusCode).json(body);
};
