import { ErrorCode } from './error-codes.js';

type ErrorOptions = {
  /** Specific code for this case, e.g. "EMAIL_TAKEN" instead of "CONFLICT". */
  code?: string;
  /** Extra data for the client (field errors, ids…). Never secrets. */
  details?: unknown;
  /** The original error, kept for logging. */
  cause?: unknown;
};

/**
 * An error that is safe to show to the client. Services throw these; the
 * global error handler turns them into the standard JSON error response.
 *
 *   throw new NotFoundError('Product not found');
 *   throw new ConflictError('Email already registered', { code: 'EMAIL_TAKEN' });
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(
    statusCode: number,
    code: string,
    message: string,
    options: Omit<ErrorOptions, 'code'> = {},
  ) {
    super(message, { cause: options.cause });
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = options.details;
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request', options: ErrorOptions = {}) {
    super(400, options.code ?? ErrorCode.BAD_REQUEST, message, options);
  }
}

/** One problem found while validating a request. */
export type ValidationIssue = {
  location: 'body' | 'query' | 'params';
  path: string;
  message: string;
};

export class ValidationError extends AppError {
  constructor(issues: ValidationIssue[], message = 'Invalid request data') {
    super(400, ErrorCode.VALIDATION_ERROR, message, { details: issues });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required', options: ErrorOptions = {}) {
    super(401, options.code ?? ErrorCode.UNAUTHORIZED, message, options);
  }
}

export class ForbiddenError extends AppError {
  constructor(
    message = 'You do not have permission to do this',
    options: ErrorOptions = {},
  ) {
    super(403, options.code ?? ErrorCode.FORBIDDEN, message, options);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', options: ErrorOptions = {}) {
    super(404, options.code ?? ErrorCode.NOT_FOUND, message, options);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists', options: ErrorOptions = {}) {
    super(409, options.code ?? ErrorCode.CONFLICT, message, options);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests', options: ErrorOptions = {}) {
    super(429, options.code ?? ErrorCode.TOO_MANY_REQUESTS, message, options);
  }
}
