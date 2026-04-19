import { parse as parseHTML } from 'node-html-parser';

const VI_WIKI_BASE = 'https://vi.wikipedia.org/api/rest_v1/page';

export function buildApiUrl(articleTitle: string): string {
  const encoded = encodeURIComponent(articleTitle);
  return `${VI_WIKI_BASE}/html/${encoded}`;
}

export function parseWikiResponse(html: string): string {
  const root = parseHTML(html);

  // Remove tables, infoboxes, navboxes, references
  root.querySelectorAll('table, .infobox, .navbox, .reflist, .reference, sup.reference, style, script')
    .forEach(el => el.remove());

  // Extract text from paragraphs, headings, and lists
  const sections: string[] = [];
  root.querySelectorAll('h2, h3, h4, p, li').forEach(el => {
    const text = el.textContent.trim();
    if (text) {
      const tag = el.tagName.toLowerCase();
      if (tag.startsWith('h')) {
        sections.push(`\n${'#'.repeat(parseInt(tag[1]))} ${text}\n`);
      } else if (tag === 'li') {
        sections.push(`- ${text}`);
      } else {
        sections.push(text);
      }
    }
  });

  return sections.join('\n').trim();
}

export async function fetchArticle(articleTitle: string): Promise<{ title: string; content: string; url: string }> {
  const url = buildApiUrl(articleTitle);
  const response = await fetch(url, {
    headers: { 'Accept': 'text/html', 'User-Agent': 'VNHistoryWiki/1.0' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${articleTitle}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const content = parseWikiResponse(html);

  return {
    title: articleTitle,
    content,
    url: `https://vi.wikipedia.org/wiki/${encodeURIComponent(articleTitle)}`,
  };
}
