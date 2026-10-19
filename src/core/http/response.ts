import type { Response } from 'express';

/**
 * Helpers that send the standard success shape:
 *   { success: true, data, meta? }
 * Controllers use these instead of calling res.json directly, so every
 * endpoint answers the same way.
 */

export function ok<T>(res: Response, data: T, meta?: Record<string, unknown>) {
  return res
    .status(200)
    .json(
      meta === undefined
        ? { success: true, data }
        : { success: true, data, meta },
    );
}

export function created<T>(res: Response, data: T) {
  return res.status(201).json({ success: true, data });
}

export function noContent(res: Response) {
  return res.status(204).end();
}
