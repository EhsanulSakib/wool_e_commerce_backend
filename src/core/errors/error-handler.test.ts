import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { Prisma } from '@/generated/prisma/client.js';
import { ConflictError, NotFoundError, ValidationError } from './app-error.js';
import { mapError } from './error-handler.js';

function prismaError(code: string, meta?: Record<string, unknown>) {
  return new Prisma.PrismaClientKnownRequestError('prisma error', {
    code,
    clientVersion: 'test',
    ...(meta && { meta }),
  });
}

describe('mapError', () => {
  it('uses status, code, message and details from an AppError', () => {
    const result = mapError(
      new ConflictError('Email already registered', {
        code: 'EMAIL_TAKEN',
        details: { field: 'email' },
      }),
    );

    expect(result).toEqual({
      statusCode: 409,
      body: {
        success: false,
        error: {
          code: 'EMAIL_TAKEN',
          message: 'Email already registered',
          details: { field: 'email' },
        },
      },
    });
  });

  it('omits details when an AppError has none', () => {
    const result = mapError(new NotFoundError());

    expect(result.statusCode).toBe(404);
    expect(result.body.error).toEqual({
      code: 'NOT_FOUND',
      message: 'Resource not found',
    });
  });

  it('keeps validation issues from a ValidationError', () => {
    const issues = [
      { location: 'body' as const, path: 'name', message: 'Required' },
    ];

    const result = mapError(new ValidationError(issues));

    expect(result.statusCode).toBe(400);
    expect(result.body.error.code).toBe('VALIDATION_ERROR');
    expect(result.body.error.details).toEqual(issues);
  });

  it('maps a raw ZodError to 400 VALIDATION_ERROR', () => {
    const parsed = z.object({ email: z.email() }).safeParse({ email: 'nope' });
    if (parsed.success) throw new Error('expected a validation failure');

    const result = mapError(parsed.error);

    expect(result.statusCode).toBe(400);
    expect(result.body.error.code).toBe('VALIDATION_ERROR');
    expect(result.body.error.details).toEqual([
      { path: 'email', message: expect.any(String) },
    ]);
  });

  it('maps a Prisma unique violation (P2002) to 409 with the fields', () => {
    const result = mapError(prismaError('P2002', { target: ['email'] }));

    expect(result.statusCode).toBe(409);
    expect(result.body.error.code).toBe('CONFLICT');
    expect(result.body.error.details).toEqual({ fields: ['email'] });
  });

  it('maps Prisma "record not found" (P2025) to 404', () => {
    const result = mapError(prismaError('P2025'));

    expect(result.statusCode).toBe(404);
    expect(result.body.error.code).toBe('NOT_FOUND');
  });

  it('treats unknown Prisma error codes as server errors', () => {
    expect(mapError(prismaError('P9999')).statusCode).toBe(500);
  });

  it('shows message and stack of unexpected errors outside production', () => {
    const result = mapError(new Error('database exploded'), {
      exposeInternalDetails: true,
    });

    expect(result.statusCode).toBe(500);
    expect(result.body.error.message).toBe('Something went wrong');
    expect(result.body.error.details).toMatchObject({
      message: 'database exploded',
    });
  });

  it('hides everything about unexpected errors in production', () => {
    const result = mapError(new Error('database exploded'), {
      exposeInternalDetails: false,
    });

    expect(result).toEqual({
      statusCode: 500,
      body: {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' },
      },
    });
  });
});
