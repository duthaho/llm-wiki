import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { WikiManager } from './wiki-manager.js';
import { rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const TEST_DIR = join(process.cwd(), 'test-wiki');

describe('WikiManager', () => {
  let wiki: WikiManager;

  beforeEach(() => {
    wiki = new WikiManager(TEST_DIR);
  });

  afterEach(() => {
    if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true });
  });

  it('should save and retrieve a wiki page', async () => {
    const pageContent = `---
title: Hùng Vương
type: person
era: prehistoric
tags: [vua]
sources: [https://vi.wikipedia.org/wiki/Hùng_Vương]
---

## Tóm tắt

Hùng Vương là danh hiệu.`;

    await wiki.savePage('people', 'hung-vuong', pageContent);
    const loaded = await wiki.loadPage('people', 'hung-vuong');
    expect(loaded).toContain('Hùng Vương');
  });

  it('should search pages by keyword', async () => {
    const page = `---
title: Văn Lang
type: dynasty
era: prehistoric
tags: []
sources: []
---

Văn Lang là quốc gia đầu tiên trong lịch sử Việt Nam.`;

    await wiki.savePage('eras', 'van-lang', page);
    const results = await wiki.search('quốc gia');
    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Văn Lang');
  });

  it('should list all pages', async () => {
    await wiki.savePage('people', 'test1', '---\ntitle: Test1\ntype: person\nera: prehistoric\ntags: []\nsources: []\n---\nContent');
    await wiki.savePage('events', 'test2', '---\ntitle: Test2\ntype: event\nera: prehistoric\ntags: []\nsources: []\n---\nContent');
    const pages = await wiki.listPages();
    expect(pages.length).toBe(2);
  });
});
