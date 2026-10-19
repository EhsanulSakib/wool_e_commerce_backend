import { randomUUID } from 'node:crypto';
import type {
  CreateExampleInput,
  ExampleItem,
  ListExamplesQuery,
} from './example.schema.js';

/**
 * Data access for the example module. Real modules use Prisma here
 * (e.g. `prisma.product.findMany(...)`); this example keeps data in memory so
 * it doesn't need a database table. Only the repository talks to storage.
 */
const items = new Map<string, ExampleItem>();

type FindManyArgs = Pick<ListExamplesQuery, 'q' | 'sort'> & {
  skip: number;
  take: number;
};

function matches(item: ExampleItem, q: string | undefined) {
  return !q || item.name.toLowerCase().includes(q.toLowerCase());
}

export const exampleRepository = {
  async findMany({
    q,
    sort,
    skip,
    take,
  }: FindManyArgs): Promise<ExampleItem[]> {
    const direction = sort.direction === 'asc' ? 1 : -1;
    return [...items.values()]
      .filter((item) => matches(item, q))
      .sort((a, b) => (a[sort.field] > b[sort.field] ? direction : -direction))
      .slice(skip, skip + take);
  },

  async count(q?: string): Promise<number> {
    return [...items.values()].filter((item) => matches(item, q)).length;
  },

  async findById(id: string): Promise<ExampleItem | undefined> {
    return items.get(id);
  },

  async findByName(name: string): Promise<ExampleItem | undefined> {
    const lower = name.toLowerCase();
    return [...items.values()].find(
      (item) => item.name.toLowerCase() === lower,
    );
  },

  async create(input: CreateExampleInput): Promise<ExampleItem> {
    const item: ExampleItem = {
      id: randomUUID(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    items.set(item.id, item);
    return item;
  },

  /** Tests only. */
  clear(): void {
    items.clear();
  },
};
