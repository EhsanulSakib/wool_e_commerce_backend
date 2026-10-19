import { existsSync } from 'node:fs';
import { z } from 'zod';

// In development the values come from .env (Node loads it natively, no dotenv needed).
// In production the hosting platform injects real environment variables instead.
// Existing variables are never overwritten, so the shell or CI can always override .env.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),

  // PostgreSQL (Neon). The app uses the pooled URL; migrations use DIRECT_URL
  // through prisma.config.ts, so it isn't needed here.
  DATABASE_URL: z.url({
    protocol: /^postgres(ql)?$/,
    error: 'must be a postgres:// or postgresql:// connection string',
  }),
  DATABASE_POOL_MAX: z.coerce.number().int().min(1).max(50).default(10),

  // Redis (Upstash, accessed over its REST API)
  UPSTASH_REDIS_REST_URL: z.url({
    protocol: /^https$/,
    error: 'must be the https:// REST URL from the Upstash console',
  }),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // The logger isn't available yet (it depends on env), so print directly.
  console.error('❌ Invalid environment variables:\n');
  console.error(z.prettifyError(parsed.error));
  console.error('\nCheck your .env file against .env.example.');
  process.exit(1);
}

/** Validated, typed environment. The only place that reads `process.env`. */
export const env = parsed.data;

export type Env = typeof env;
