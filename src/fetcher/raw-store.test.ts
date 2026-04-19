import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { RawStore } from './raw-store.js';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const TEST_DIR = join(process.cwd(), 'test-raw');

describe('RawStore', () => {
  let store: RawStore;

  beforeEach(() => {
    store = new RawStore(TEST_DIR);
  });

  afterEach(() => {
    if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true });
  });

  it('should save and load a raw article', async () => {
    const article = { title: 'Hùng_Vương', content: 'Test content', url: 'https://vi.wikipedia.org/wiki/Hùng_Vương' };
    await store.save('prehistoric', article);

    const loaded = await store.load('prehistoric', 'Hùng_Vương');
    expect(loaded).not.toBeNull();
    expect(loaded!.content).toBe('Test content');
    expect(loaded!.url).toBe(article.url);
  });

  it('should return null for non-existent article', async () => {
    const loaded = await store.load('prehistoric', 'nonexistent');
    expect(loaded).toBeNull();
  });

  it('should check if article exists', async () => {
    const article = { title: 'Test', content: 'Content', url: 'https://example.com' };
    await store.save('prehistoric', article);
    expect(await store.exists('prehistoric', 'Test')).toBe(true);
    expect(await store.exists('prehistoric', 'Nope')).toBe(false);
  });
});
