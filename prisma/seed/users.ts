import { prisma } from '@/core/db/prisma.js';
import type { Prisma } from '@/generated/prisma/client.js';

/**
 * Sample customer accounts for development.
 * They have no password yet (auth arrives in module 12, which also seeds the
 * admin account from ADMIN_EMAIL / ADMIN_PASSWORD).
 */
const SAMPLE_USERS: Prisma.UserCreateInput[] = [
  {
    email: 'nusrat.customer@example.com',
    name: 'Nusrat Jahan',
    phone: '+8801711000001',
    role: 'CUSTOMER',
    status: 'ACTIVE',
  },
  {
    email: 'arif.customer@example.com',
    name: 'Arif Hossain',
    phone: '+8801811000002',
    role: 'CUSTOMER',
    status: 'ACTIVE',
  },
  {
    email: 'emma.customer@example.com',
    name: 'Emma Wilson',
    phone: null,
    role: 'CUSTOMER',
    status: 'INACTIVE',
  },
];

/** Upserts by email, so running it again updates instead of duplicating. */
export async function seedUsers(): Promise<number> {
  for (const user of SAMPLE_USERS) {
    await prisma.user.upsert({
      where: { email: user.email },
      create: user,
      update: {
        name: user.name,
        phone: user.phone ?? null,
        role: user.role ?? 'CUSTOMER',
        status: user.status ?? 'INACTIVE',
      },
    });
  }
  return SAMPLE_USERS.length;
}
