import matter from 'gray-matter';
import type { ArticleEntry } from '../fetcher/article-list.js';
import type { WikiFrontmatter, WikiPageType, Era } from '../schema/schema.js';
import { VALID_ERAS } from '../schema/schema.js';
import type { LLMClient } from '../llm/types.js';

// Maps Vietnamese values back to English enum values
const TYPE_ALIASES: Record<string, WikiPageType> = {
  'người': 'person', 'nhân vật': 'person',
  'sự kiện': 'event', 'trận đánh': 'event',
  'thời kỳ': 'era', 'thời đại': 'era',
  'địa danh': 'place', 'địa điểm': 'place',
  'khái niệm': 'concept', 'văn hóa': 'concept',
  'triều đại': 'dynasty', 'nhà': 'dynasty',
};

const ERA_ALIASES: Record<string, Era> = {
  'tiền sử': 'prehistoric', 'ancient': 'prehistoric', 'thời tiền sử': 'prehistoric',
  'bắc thuộc': 'chinese-domination', 'bắc-thuộc': 'chinese-domination',
  'thời bắc thuộc lần thứ nhất': 'chinese-domination',
  'thời bắc thuộc lần thứ hai': 'chinese-domination',
  'thời bắc thuộc lần thứ ba': 'chinese-domination',
  'thời kỳ bắc thuộc': 'chinese-domination',
  'thời kỳ bắc thuộc lần thứ ba': 'chinese-domination',
};

/**
 * Fix malformed YAML frontmatter from LLMs that don't follow strict YAML.
 * Handles: inline arrays, missing closing ---, Vietnamese enum values.
 */
export function normalizePage(raw: string): string {
  // Extract raw text before and after frontmatter
  let text = raw.trim();

  // Remove code fences if present
  const fenceMatch = text.match(/```(?:markdown|yaml)?\n([\s\S]*?)```/);
  if (fenceMatch) text = fenceMatch[1].trim();

  // Fix inline YAML arrays: "tags: - a - b - c" → proper list
  text = text.replace(
    /^(tags|sources):\s*-\s*(.+)$/gm,
    (_match, field: string, rest: string) => {
      // Split on " - " pattern (items separated by " - ")
      const items = rest.split(/\s+-\s+/).map(s => s.trim()).filter(Boolean);
      return `${field}:\n${items.map(i => `  - ${i}`).join('\n')}`;
    },
  );

  // Fix inconsistent YAML list indentation (- item at col 0 after indented - item)
  // Matches: a "field:\n" followed by a mix of "  - x" and "- x" lines
  text = text.replace(
    /^(tags|sources):\n((?:\s*- .+\n?)+)/gm,
    (_match, field: string, block: string) => {
      const items = block.split('\n')
        .map(l => l.trim())
        .filter(l => l.startsWith('- '))
        .map(l => `  ${l}`);
      return `${field}:\n${items.join('\n')}\n`;
    },
  );

  // Ensure closing --- exists
  const firstDash = text.indexOf('---');
  if (firstDash !== -1) {
    const afterFirst = text.indexOf('\n', firstDash) + 1;
    const secondDash = text.indexOf('---', afterFirst);
    if (secondDash === -1) {
      // Find where frontmatter ends (first ## heading or blank line after key-value pairs)
      const lines = text.slice(afterFirst).split('\n');
      let insertAt = afterFirst;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('##') || (line === '' && i > 0 && lines[i - 1].trim() === '')) {
          break;
        }
        insertAt += lines[i].length + 1;
      }
      text = text.slice(0, insertAt) + '---\n' + text.slice(insertAt);
    }
  }

  // Parse and normalize frontmatter values
  try {
    const { data, content } = matter(text);

    // Normalize type
    if (data.type && typeof data.type === 'string') {
      const lower = data.type.toLowerCase().trim();
      data.type = TYPE_ALIASES[lower] ?? lower;
    }

    // Normalize era
    if (data.era && typeof data.era === 'string') {
      const lower = data.era.toLowerCase().trim();
      data.era = ERA_ALIASES[lower] ?? lower;
    }

    // Ensure tags is an array
    if (!Array.isArray(data.tags)) {
      data.tags = data.tags ? String(data.tags).split(',').map((s: string) => s.trim()).filter(Boolean) : [];
    }

    // Ensure sources is an array
    if (!Array.isArray(data.sources)) {
      data.sources = data.sources ? [String(data.sources)] : [];
    }

    return matter.stringify(content.trim() + '\n', data);
  } catch {
    // If parsing fails, return as-is
    return text;
  }
}

export function buildIngestionPrompt(entry: ArticleEntry, content: string): string {
  return `You are a Vietnamese history wiki compiler. Given a raw Wikipedia article, produce a structured wiki page in Vietnamese.

## Output Format

Produce a markdown file with YAML frontmatter. Output ONLY the markdown, no code fences:

---
title: ${entry.wikiTitle}
type: ${entry.type}
era: ${entry.era}
tags:
${entry.tags.map(t => `  - ${t}`).join('\n')}
sources:
  - https://vi.wikipedia.org/wiki/${entry.title}
---

## Tóm tắt
[2-3 câu tóm tắt ngắn gọn]

## Bối cảnh lịch sử
[Bối cảnh thời đại, tình hình chính trị]

## Nội dung chính
[Nội dung chi tiết, sự kiện quan trọng]

## Di sản / Ý nghĩa
[Ý nghĩa lịch sử, ảnh hưởng đến ngày nay]

## Liên quan
- [[Related Page 1]]
- [[Related Page 2]]

## Rules
- Write in Vietnamese
- Use [[wikilinks]] to link to other potential wiki pages (people, places, events, concepts)
- Keep content factual, based only on the source material
- Do NOT include tables, infoboxes, or references sections
- Do NOT invent information not in the source

## Source Article Content

${content}`;
}

export interface ParsedWikiPage {
  frontmatter: WikiFrontmatter;
  content: string;
  links: string[];
}

export function parseWikiPage(raw: string): ParsedWikiPage {
  const { data, content } = matter(raw);
  const linkRegex = /\[\[([^\]]+)\]\]/g;
  const links: string[] = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }

  return {
    frontmatter: data as WikiFrontmatter,
    content: content.trim(),
    links,
  };
}

export function buildDiscoveryPrompt(title: string, wikiUrl: string, content: string): string {
  return `You are a Vietnamese history wiki compiler. Given a raw Wikipedia article, produce a structured wiki page in Vietnamese.

The article title is "${title}". You must determine the appropriate type and era from the content.

## Type Options
- person — Historical figures (kings, generals, scholars)
- event — Battles, treaties, revolts, reforms
- era — Time periods
- place — Geographical locations significant to history
- concept — Cultural, political, or economic concepts
- dynasty — Ruling dynasties

## Era Options
- prehistoric — Before 111 BC (Hung Kings, Van Lang, Au Lac)
- chinese-domination — 111 BC to 938 AD
- ngo-dinh — 938–1009
- ly-dynasty — 1009–1225
- tran-dynasty — 1225–1400
- le-dynasty — 1428–1789
- nguyen-dynasty — 1802–1945
- french-colonization — 1858–1945
- independence-wars — 1945–1975
- reunification-doi-moi — 1975–present

## Output Format

Produce a markdown file with YAML frontmatter. Output ONLY the markdown, no code fences:

---
title: ${title}
type: [determine from content]
era: [determine from content]
tags:
  - [relevant tag 1]
  - [relevant tag 2]
sources:
  - ${wikiUrl}
---

## Tóm tắt
[2-3 câu tóm tắt ngắn gọn]

## Bối cảnh lịch sử
[Bối cảnh thời đại, tình hình chính trị]

## Nội dung chính
[Nội dung chi tiết, sự kiện quan trọng]

## Di sản / Ý nghĩa
[Ý nghĩa lịch sử, ảnh hưởng đến ngày nay]

## Liên quan
- [[Related Page 1]]
- [[Related Page 2]]

## Rules
- Write in Vietnamese
- Use [[wikilinks]] to link to other potential wiki pages
- Keep content factual, based only on the source material
- Do NOT include tables, infoboxes, or references sections
- Do NOT invent information not in the source

## Source Article Content

${content}`;
}

export async function ingestDiscoveredArticle(
  client: LLMClient,
  title: string,
  rawContent: string,
  model: string,
): Promise<string> {
  const wikiTitle = title.replace(/_/g, ' ');
  const wikiUrl = `https://vi.wikipedia.org/wiki/${encodeURIComponent(title)}`;
  const prompt = buildDiscoveryPrompt(wikiTitle, wikiUrl, rawContent);

  const text = await client.complete({
    model,
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  return normalizePage(text);
}

export async function ingestArticle(
  client: LLMClient,
  entry: ArticleEntry,
  rawContent: string,
  model: string,
): Promise<string> {
  const prompt = buildIngestionPrompt(entry, rawContent);

  const text = await client.complete({
    model,
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  return normalizePage(text);
}
