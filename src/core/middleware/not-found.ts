import type { RequestHandler } from 'express';
import { NotFoundError } from '@/core/errors/app-error.js';

/** Runs when no route matched; the error handler formats the response. */
export const notFound: RequestHandler = (req, _res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
};
