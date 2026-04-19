import Anthropic from '@anthropic-ai/sdk';
import matter from 'gray-matter';
import type { ArticleEntry } from '../fetcher/article-list.js';
import type { WikiFrontmatter } from '../schema/schema.js';

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
  client: Anthropic,
  title: string,
  rawContent: string,
  model: string = 'claude-sonnet-4-6',
): Promise<string> {
  const wikiTitle = title.replace(/_/g, ' ');
  const wikiUrl = `https://vi.wikipedia.org/wiki/${encodeURIComponent(title)}`;
  const prompt = buildDiscoveryPrompt(wikiTitle, wikiUrl, rawContent);

  const response = await client.messages.create({
    model,
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map(block => block.text)
    .join('');

  const fenceMatch = text.match(/```markdown\n([\s\S]*?)```/);
  return fenceMatch ? fenceMatch[1].trim() : text.trim();
}

export async function ingestArticle(
  client: Anthropic,
  entry: ArticleEntry,
  rawContent: string,
  model: string = 'claude-sonnet-4-6',
): Promise<string> {
  const prompt = buildIngestionPrompt(entry, rawContent);

  const response = await client.messages.create({
    model,
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map(block => block.text)
    .join('');

  // Extract markdown from code fence if present
  const fenceMatch = text.match(/```markdown\n([\s\S]*?)```/);
  return fenceMatch ? fenceMatch[1].trim() : text.trim();
}
