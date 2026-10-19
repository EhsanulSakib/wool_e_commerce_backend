import { randomUUID } from 'node:crypto';
import { prisma } from '@/core/db/prisma.js';
import type { Prisma, User } from '@/generated/prisma/client.js';

/**
 * Tests share the one real database with development data, so:
 * - every row a test creates has a unique, clearly fake value
 *   (emails on the reserved `.invalid` domain can never belong to a real user)
 * - each test deletes exactly the rows it created, never anything else
 */
export const TEST_EMAIL_DOMAIN = 'test.wool.invalid';

export function uniqueEmail(label = 'user'): string {
  return `test-${label}-${randomUUID()}@${TEST_EMAIL_DOMAIN}`;
}

/**
 * Creates test data and remembers what it created.
 *
 * ```ts
 * const data = createTestData();
 * afterEach(() => data.cleanup());
 *
 * const user = await data.user({ role: 'ADMIN' });
 * ```
 *
 * Later modules add more factories (products, orders…). `cleanup()` deletes
 * in reverse dependency order: children first, then parents.
 */
export function createTestData() {
  const createdUserIds: string[] = [];

  return {
    async user(overrides: Partial<Prisma.UserCreateInput> = {}): Promise<User> {
      const user = await prisma.user.create({
        data: {
          email: uniqueEmail(),
          name: 'Test User',
          ...overrides,
        },
      });
      createdUserIds.push(user.id);
      return user;
    },

    async cleanup(): Promise<void> {
      if (createdUserIds.length > 0) {
        await prisma.user.deleteMany({
          where: { id: { in: createdUserIds } },
        });
        createdUserIds.length = 0;
      }
    },
  };
}

/**
 * Safety net for rows left behind when a test run crashed before cleanup.
 * Only matches the reserved test email domain, so real data is never touched.
 * Run it manually with `npm run test:cleanup`, never inside tests: test files
 * run in parallel, so it could delete rows another test is still using.
 */
export async function deleteLeftoverTestUsers(): Promise<number> {
  const { count } = await prisma.user.deleteMany({
    where: { email: { endsWith: `@${TEST_EMAIL_DOMAIN}` } },
  });
  return count;
}
