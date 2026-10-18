import { Router } from 'express';

/**
 * Every feature module's router is mounted here, under /api/v1.
 * Example (module 12): apiRouter.use('/auth', authRouter);
 */
export const apiRouter = Router();
