// UNIT: test pure logic in isolation. Fast, no server, no network.
import { describe, it, expect } from 'vitest';
import { createStore, validateTitle } from '../../src/todos.js';

describe('validateTitle', () => {
  it('trims whitespace', () => {
    expect(validateTitle('  buy milk  ')).toBe('buy milk');
  });

  it('rejects empty titles', () => {
    expect(() => validateTitle('   ')).toThrow('title is required');
  });

  it('rejects non-strings', () => {
    expect(() => validateTitle(42)).toThrow('title must be a string');
  });

  it('accepts exactly 100 characters (boundary)', () => {
    expect(validateTitle('a'.repeat(100))).toHaveLength(100);
  });

  it('rejects 101 characters (boundary + 1)', () => {
    expect(() => validateTitle('a'.repeat(101))).toThrow('100 characters');
  });
});

describe('store', () => {
  it('adds todos with incrementing ids', () => {
    const store = createStore();
    expect(store.add('a').id).toBe(1);
    expect(store.add('b').id).toBe(2);
  });

  it('toggles done state both ways', () => {
    const store = createStore();
    const { id } = store.add('a');
    expect(store.toggle(id).done).toBe(true);
    expect(store.toggle(id).done).toBe(false);
  });

  it('returns null when toggling a missing id', () => {
    expect(createStore().toggle(999)).toBeNull();
  });

  it('removes todos', () => {
    const store = createStore();
    const { id } = store.add('a');
    expect(store.remove(id)).toBe(true);
    expect(store.list()).toEqual([]);
  });

  it('list() returns a copy, not the internal array', () => {
    const store = createStore();
    store.add('a');
    store.list().pop();
    expect(store.list()).toHaveLength(1);
  });
});
