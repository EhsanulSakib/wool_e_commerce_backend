import type { ErrorRequestHandler } from 'express';
import { logger } from '@/core/logger/index.js';

/** Errors thrown by Express internals (e.g. invalid JSON) carry an HTTP status. */
function getClientErrorStatus(err: unknown): number | undefined {
  if (typeof err === 'object' && err !== null && 'status' in err) {
    const status = Number(err.status);
    if (status >= 400 && status < 500) return status;
  }
  return undefined;
}

/**
 * Basic global error handler. Module 03 replaces it with one that understands
 * AppError, Zod and Prisma errors. Express recognizes error middleware by its
 * four parameters, so `next` must stay in the signature.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // If the response already started streaming, let Express close the connection.
  if (res.headersSent) {
    next(err);
    return;
  }

  const clientStatus = getClientErrorStatus(err);
  if (clientStatus) {
    res.status(clientStatus).json({
      success: false,
      error: {
        code: 'BAD_REQUEST',
        message: 'The request could not be processed',
      },
    });
    return;
  }

  // Full details go to the log only; the client gets a generic message.
  logger.error(
    { err, method: req.method, path: req.originalUrl },
    'Unhandled error',
  );
  res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' },
  });
};
