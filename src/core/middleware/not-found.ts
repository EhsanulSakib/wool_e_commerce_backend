import type { RequestHandler } from 'express';

/** Runs when no route matched. Returns the standard error shape. */
export const notFound: RequestHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} not found`,
    },
  });
};
