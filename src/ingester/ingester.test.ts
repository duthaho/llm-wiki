import { describe, it, expect } from 'vitest';
import { buildIngestionPrompt, buildDiscoveryPrompt, parseWikiPage, normalizePage } from './ingester.js';
import matter from 'gray-matter';
import type { ArticleEntry } from '../fetcher/article-list.js';

describe('buildIngestionPrompt', () => {
  it('should include article content and schema instructions', () => {
    const entry: ArticleEntry = {
      title: 'Hùng_Vương',
      wikiTitle: 'Hùng Vương',
      type: 'person',
      era: 'prehistoric',
      tags: ['vua', 'truyền thuyết'],
    };
    const content = 'Hùng Vương là danh hiệu của các vị vua nước Văn Lang.';
    const prompt = buildIngestionPrompt(entry, content);

    expect(prompt).toContain('Hùng Vương');
    expect(prompt).toContain('person');
    expect(prompt).toContain('prehistoric');
    expect(prompt).toContain('Tóm tắt');
    expect(prompt).toContain('[[');
  });
});

describe('buildDiscoveryPrompt', () => {
  it('should include title, type/era options, and content', () => {
    const prompt = buildDiscoveryPrompt('Triệu Đà', 'https://vi.wikipedia.org/wiki/Triệu_Đà', 'Triệu Đà là vua.');
    expect(prompt).toContain('Triệu Đà');
    expect(prompt).toContain('person');
    expect(prompt).toContain('chinese-domination');
    expect(prompt).toContain('Triệu Đà là vua.');
    expect(prompt).toContain('[determine from content]');
  });
});

describe('normalizePage', () => {
  it('should fix inline YAML arrays', () => {
    const input = `---
title: Hai Bà Trưng
type: person
era: chinese-domination
tags: - khởi nghĩa - nữ anh hùng - 40
sources: - https://vi.wikipedia.org/wiki/Hai_Bà_Trưng
---

## Tóm tắt

Content here.`;
    const result = normalizePage(input);
    const { data } = matter(result);
    expect(data.tags).toEqual(['khởi nghĩa', 'nữ anh hùng', 40]);
    expect(data.sources).toEqual(['https://vi.wikipedia.org/wiki/Hai_Bà_Trưng']);
  });

  it('should fix missing closing ---', () => {
    const input = `---
title: Test
type: person
era: prehistoric
tags: - a - b
sources: - https://example.com

## Tóm tắt

Content here.`;
    const result = normalizePage(input);
    expect(result).toContain('## Tóm tắt');
    const { data, content } = matter(result);
    expect(data.title).toBe('Test');
    expect(content).toContain('Tóm tắt');
  });

  it('should normalize Vietnamese type/era values', () => {
    const input = `---
title: Test
type: người
era: bắc thuộc
tags:
  - test
sources:
  - https://example.com
---

Content.`;
    const result = normalizePage(input);
    const { data } = matter(result);
    expect(data.type).toBe('person');
    expect(data.era).toBe('chinese-domination');
  });

  it('should handle era alias "ancient" → "prehistoric"', () => {
    const input = `---
title: Test
type: person
era: ancient
tags:
  - test
sources: []
---

Content.`;
    const result = normalizePage(input);
    const { data } = matter(result);
    expect(data.era).toBe('prehistoric');
  });

  it('should pass through well-formed pages unchanged', () => {
    const input = `---
title: Văn Lang
type: dynasty
era: prehistoric
tags:
  - quốc gia
sources:
  - https://vi.wikipedia.org/wiki/Văn_Lang
---

## Tóm tắt

Content.
`;
    const result = normalizePage(input);
    const { data } = matter(result);
    expect(data.title).toBe('Văn Lang');
    expect(data.type).toBe('dynasty');
    expect(data.tags).toEqual(['quốc gia']);
  });
});

describe('parseWikiPage', () => {
  it('should parse a valid wiki page with frontmatter', () => {
    const raw = `---
title: Hùng Vương
type: person
era: prehistoric
tags:
  - vua
  - truyền thuyết
sources:
  - https://vi.wikipedia.org/wiki/Hùng_Vương
---

## Tóm tắt

Hùng Vương là danh hiệu.

## Liên quan

- [[Văn Lang]]
`;
    const result = parseWikiPage(raw);
    expect(result.frontmatter.title).toBe('Hùng Vương');
    expect(result.frontmatter.type).toBe('person');
    expect(result.links).toContain('Văn Lang');
  });
});
