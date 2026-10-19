import { disconnectDatabase } from '@/core/db/prisma.js';
import { logger } from '@/core/logger/index.js';
import { seedUsers } from './users.js';

/**
 * Seeds reference and sample data.
 *
 * Every seed function must be idempotent (safe to run any number of times),
 * because there is only one database: use `upsert` keyed on a unique field,
 * never delete or truncate existing data.
 *
 * Later modules add their own seed files here (currencies, catalog,
 * shipping zones…) in dependency order.
 */
async function main() {
  logger.info('🌱 Seeding database...');

  const users = await seedUsers();
  logger.info(`Users: ${users} upserted`);

  logger.info('🌱 Seeding finished');
}

try {
  await main();
} catch (err) {
  logger.error({ err }, 'Seeding failed');
  process.exitCode = 1;
} finally {
  await disconnectDatabase();
}
