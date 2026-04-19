import { writeFile, readFile, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

export interface RawArticle {
  title: string;
  content: string;
  url: string;
  fetchedAt?: string;
}

export class RawStore {
  constructor(private baseDir: string) {}

  async save(era: string, article: RawArticle): Promise<string> {
    const dir = join(this.baseDir, era);
    await mkdir(dir, { recursive: true });

    const filePath = join(dir, `${article.title}.md`);
    const content = matter.stringify(article.content, {
      title: article.title,
      url: article.url,
      fetchedAt: new Date().toISOString(),
    });

    await writeFile(filePath, content, 'utf-8');
    return filePath;
  }

  async load(era: string, title: string): Promise<RawArticle | null> {
    const filePath = join(this.baseDir, era, `${title}.md`);
    try {
      const raw = await readFile(filePath, 'utf-8');
      const { data, content } = matter(raw);
      return { title: data.title, content: content.trim(), url: data.url, fetchedAt: data.fetchedAt };
    } catch {
      return null;
    }
  }

  async exists(era: string, title: string): Promise<boolean> {
    const filePath = join(this.baseDir, era, `${title}.md`);
    try {
      await access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
