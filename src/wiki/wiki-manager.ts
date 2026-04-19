import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { globSync } from 'glob';
import matter from 'gray-matter';

export interface SearchResult {
  title: string;
  type: string;
  era: string;
  path: string;
  snippet: string;
}

export class WikiManager {
  constructor(private baseDir: string) {}

  async savePage(category: string, slug: string, content: string): Promise<string> {
    const dir = join(this.baseDir, category);
    await mkdir(dir, { recursive: true });
    const filePath = join(dir, `${slug}.md`);
    await writeFile(filePath, content, 'utf-8');
    return filePath;
  }

  async loadPage(category: string, slug: string): Promise<string | null> {
    const filePath = join(this.baseDir, category, `${slug}.md`);
    try {
      return await readFile(filePath, 'utf-8');
    } catch {
      return null;
    }
  }

  async search(keyword: string): Promise<SearchResult[]> {
    const files = globSync('**/*.md', { cwd: this.baseDir });
    const results: SearchResult[] = [];

    for (const file of files) {
      const content = await readFile(join(this.baseDir, file), 'utf-8');
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        const { data } = matter(content);
        const lines = content.split('\n');
        const matchLine = lines.find(l => l.toLowerCase().includes(keyword.toLowerCase())) || '';
        results.push({
          title: data.title || file,
          type: data.type || 'unknown',
          era: data.era || 'unknown',
          path: file,
          snippet: matchLine.trim().slice(0, 200),
        });
      }
    }

    return results;
  }

  async listPages(): Promise<{ title: string; type: string; era: string; path: string }[]> {
    const files = globSync('**/*.md', { cwd: this.baseDir });
    const pages = [];

    for (const file of files) {
      const content = await readFile(join(this.baseDir, file), 'utf-8');
      const { data } = matter(content);
      pages.push({
        title: data.title || file,
        type: data.type || 'unknown',
        era: data.era || 'unknown',
        path: file,
      });
    }

    return pages;
  }
}
