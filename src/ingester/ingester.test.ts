import { describe, it, expect } from 'vitest';
import { buildIngestionPrompt, buildDiscoveryPrompt, parseWikiPage } from './ingester.js';
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
