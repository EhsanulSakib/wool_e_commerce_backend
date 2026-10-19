import { afterEach, describe, expect, it, vi } from 'vitest';
import { eventBus } from './event-bus.js';

declare module './event-bus.js' {
  interface AppEvents {
    'test.happened': { value: number };
  }
}

describe('eventBus', () => {
  afterEach(() => {
    eventBus.clear();
  });

  it('delivers the payload to every handler', async () => {
    const first = vi.fn();
    const second = vi.fn();
    eventBus.on('test.happened', first);
    eventBus.on('test.happened', second);

    await eventBus.emitAndWait('test.happened', { value: 42 });

    expect(first).toHaveBeenCalledWith({ value: 42 });
    expect(second).toHaveBeenCalledWith({ value: 42 });
  });

  it('runs handlers in the background with emit()', async () => {
    const handler = vi.fn();
    eventBus.on('test.happened', handler);

    eventBus.emit('test.happened', { value: 1 });
    expect(handler).not.toHaveBeenCalled(); // emitter didn't wait

    await vi.waitFor(() => expect(handler).toHaveBeenCalledOnce());
  });

  it('keeps going when a handler fails, and never throws', async () => {
    const healthy = vi.fn();
    eventBus.on('test.happened', () => {
      throw new Error('boom');
    });
    eventBus.on('test.happened', async () => {
      throw new Error('async boom');
    });
    eventBus.on('test.happened', healthy);

    await expect(
      eventBus.emitAndWait('test.happened', { value: 7 }),
    ).resolves.toBeUndefined();
    expect(healthy).toHaveBeenCalledOnce();
  });

  it('stops delivering after unsubscribing', async () => {
    const handler = vi.fn();
    const unsubscribe = eventBus.on('test.happened', handler);

    unsubscribe();
    await eventBus.emitAndWait('test.happened', { value: 3 });

    expect(handler).not.toHaveBeenCalled();
  });
});
