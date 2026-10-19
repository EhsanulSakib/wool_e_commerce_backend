import { ConflictError, NotFoundError } from '@/core/errors/app-error.js';
import { eventBus } from '@/core/events/event-bus.js';
import { buildPaginationMeta, toSkipTake } from '@/core/http/pagination.js';
import { exampleRepository } from './example.repository.js';
import type {
  CreateExampleInput,
  ListExamplesQuery,
} from './example.schema.js';

// Events this module emits, added to the global event map.
declare module '@/core/events/event-bus.js' {
  interface AppEvents {
    'example.created': { id: string; name: string };
  }
}

/**
 * Business logic. Services know nothing about HTTP (no req/res): they take
 * plain inputs, enforce the rules, throw AppErrors, and return plain data.
 */
export const exampleService = {
  async list(query: ListExamplesQuery) {
    const { q, sort } = query;
    const [items, total] = await Promise.all([
      exampleRepository.findMany({ q, sort, ...toSkipTake(query) }),
      exampleRepository.count(q),
    ]);
    return { items, meta: buildPaginationMeta(total, query) };
  },

  async getById(id: string) {
    const item = await exampleRepository.findById(id);
    if (!item) throw new NotFoundError('Example item not found');
    return item;
  },

  async create(input: CreateExampleInput) {
    if (await exampleRepository.findByName(input.name)) {
      throw new ConflictError('An example item with this name already exists', {
        code: 'EXAMPLE_NAME_TAKEN',
        details: { field: 'name' },
      });
    }

    const item = await exampleRepository.create(input);
    eventBus.emit('example.created', { id: item.id, name: item.name });
    return item;
  },
};
