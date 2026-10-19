import { logger } from '@/core/logger/index.js';

/**
 * Map of event name → payload type. It starts empty; each module adds its own
 * events with declaration merging, next to the code that emits them:
 *
 *   declare module '@/core/events/event-bus.js' {
 *     interface AppEvents {
 *       'order.placed': { orderId: string; customerEmail: string | null };
 *     }
 *   }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AppEvents {}

export type AppEventName = keyof AppEvents;

type Handler<E extends AppEventName> = (
  payload: AppEvents[E],
) => void | Promise<void>;

/**
 * A small in-process event bus. Modules use it for side effects that aren't
 * their own job (orders emit "order.placed"; notifications listens and sends
 * the email), so modules don't import each other's internals.
 *
 * - Handlers run asynchronously after the emitter continues, so a slow email
 *   never delays the HTTP response.
 * - A failing handler is logged and never crashes the request or other handlers.
 * - Later (post-MVP) this can be swapped for a real queue (BullMQ) with the
 *   same emit/on API.
 */
class EventBus {
  readonly #handlers = new Map<AppEventName, Set<Handler<never>>>();

  /** Subscribes to an event. Returns a function that unsubscribes. */
  on<E extends AppEventName>(event: E, handler: Handler<E>): () => void {
    const handlers = this.#handlers.get(event) ?? new Set();
    handlers.add(handler as Handler<never>);
    this.#handlers.set(event, handlers);
    return () => handlers.delete(handler as Handler<never>);
  }

  /**
   * Fire and forget. `setImmediate` defers the handlers until the current work
   * (e.g. finishing and sending the HTTP response) has moved on, so even a
   * handler that blocks for a while can't delay the caller.
   */
  emit<E extends AppEventName>(event: E, payload: AppEvents[E]): void {
    setImmediate(() => void this.emitAndWait(event, payload));
  }

  /**
   * Runs all handlers and waits for them to finish (still never throws).
   * Useful in tests and scripts where you need the side effects to be done.
   */
  async emitAndWait<E extends AppEventName>(
    event: E,
    payload: AppEvents[E],
  ): Promise<void> {
    const handlers = [...(this.#handlers.get(event) ?? [])] as Handler<E>[];

    await Promise.all(
      handlers.map(async (handler) => {
        try {
          await handler(payload);
        } catch (err) {
          logger.error({ err, event }, `Event handler for "${event}" failed`);
        }
      }),
    );
  }

  /** Removes all handlers (tests only). */
  clear(): void {
    this.#handlers.clear();
  }
}

export const eventBus = new EventBus();
