import { afterAll, afterEach, describe, expect, it } from 'vitest';
import { disconnectDatabase, prisma } from '@/core/db/prisma.js';
import { createTestData, TEST_EMAIL_DOMAIN } from '../helpers/factories.js';
import { hasRealServices } from '../helpers/env.js';

// Proves the test-data helpers create unique rows and remove only those,
// so it's safe to run tests against the shared development database.
describe.skipIf(!hasRealServices)('test data helpers (real database)', () => {
  const data = createTestData();

  afterEach(async () => {
    await data.cleanup();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  it('creates users with unique test emails and default values', async () => {
    const [a, b] = await Promise.all([data.user(), data.user()]);

    expect(a.email).not.toBe(b.email);
    expect(a.email.endsWith(`@${TEST_EMAIL_DOMAIN}`)).toBe(true);
    expect(a.role).toBe('CUSTOMER');
    expect(a.status).toBe('INACTIVE');
    // UUID v7: version digit is 7
    expect(a.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-/);
  });

  it('cleanup deletes only the rows it created', async () => {
    const before = await prisma.user.count();

    const user = await data.user({ role: 'STAFF' });
    expect(await prisma.user.count()).toBe(before + 1);

    await data.cleanup();

    expect(await prisma.user.findUnique({ where: { id: user.id } })).toBeNull();
    expect(await prisma.user.count()).toBe(before);
  });
});
