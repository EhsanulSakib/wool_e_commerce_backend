/**
 * Stable, machine-readable error codes returned in `error.code`.
 * The frontend reacts to these (never to messages, which can change).
 * Feature modules add their own codes here as they are built
 * (e.g. EMAIL_TAKEN in module 12, OUT_OF_STOCK in module 29).
 */
export const ErrorCode = {
  // Generic HTTP errors
  BAD_REQUEST: 'BAD_REQUEST',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_JSON: 'INVALID_JSON',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  PAYLOAD_TOO_LARGE: 'PAYLOAD_TOO_LARGE',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  INTERNAL_ERROR: 'INTERNAL_ERROR',

  // Infrastructure
  DB_UNAVAILABLE: 'DB_UNAVAILABLE',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
