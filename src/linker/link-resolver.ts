import matter from 'gray-matter';

export function findUnresolvedLinks(pages: Array<{ path: string; raw: string }>): string[] {
  // Build set of existing page titles (normalized)
  const existingTitles = new Set<string>();
  for (const page of pages) {
    const { data } = matter(page.raw);
    if (data.title) {
      existingTitles.add(data.title.toLowerCase().replace(/\s+/g, '-'));
    }
  }

  // Find all [[wikilinks]] and filter to unresolved
  const unresolvedSet = new Set<string>();
  const linkRegex = /\[\[([^\]]+)\]\]/g;

  for (const page of pages) {
    const { content } = matter(page.raw);
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const linkTitle = match[1];
      const normalized = linkTitle.toLowerCase().replace(/\s+/g, '-');
      if (!existingTitles.has(normalized)) {
        unresolvedSet.add(linkTitle);
      }
    }
  }

  return Array.from(unresolvedSet);
}
