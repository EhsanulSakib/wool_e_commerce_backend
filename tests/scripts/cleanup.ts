import { disconnectDatabase } from '@/core/db/prisma.js';
import { deleteLeftoverTestUsers } from '../helpers/factories.js';

// Removes test rows left behind by crashed test runs (test email domain only).
try {
  const users = await deleteLeftoverTestUsers();
  console.log(`Removed ${users} leftover test user(s).`);
} finally {
  await disconnectDatabase();
}
