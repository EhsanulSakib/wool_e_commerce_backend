import { Router } from 'express';
import { env } from '@/config/env.js';

/**
 * Every feature module's router is mounted here, under /api/v1.
 * Example (module 12): apiRouter.use('/auth', authRouter);
 */
export const apiRouter = Router();

// Reference module showing the routes → controller → service → repository
// pattern (see docs/adding-a-module.md). Loaded only outside production, so it
// is neither mounted nor listed in the API docs there.
if (!env.isProduction) {
  const { exampleRouter } = await import('@/modules/_example/index.js');
  apiRouter.use('/_example', exampleRouter);
}
