import { Router } from 'express';

export const healthRouter = Router();

/** Liveness check: answers as long as the process is running. */
healthRouter.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      uptime: Math.round(process.uptime()),
    },
  });
});
