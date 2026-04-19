import matter from 'gray-matter';
import { marked } from 'marked';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { globSync } from 'glob';
import { generateHtml } from './template.js';

export interface GraphNode {
  id: string;
  title: string;
  type: string;
  era: string;
  category: string;
  slug: string;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  pages: Record<string, string>;
}

export function resolveNodeId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-');
}

export function extractGraphData(pages: Array<{ path: string; raw: string }>): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const pageContents: Record<string, string> = {};
  const nodeIds = new Set<string>();

  // First pass: build nodes
  for (const page of pages) {
    const { data, content } = matter(page.raw);
    if (!data.title) continue;

    const id = resolveNodeId(data.title);
    const pathParts = page.path.replace(/\\/g, '/').split('/');
    const category = pathParts[0];
    const slug = pathParts[pathParts.length - 1].replace('.md', '');

    nodes.push({
      id,
      title: data.title,
      type: data.type || 'unknown',
      era: data.era || 'unknown',
      category,
      slug,
    });
    nodeIds.add(id);
    pageContents[id] = marked.parse(content.trim()) as string;
  }

  // Second pass: build edges
  const edgeSet = new Set<string>();
  for (const page of pages) {
    const { data, content } = matter(page.raw);
    if (!data.title) continue;

    const sourceId = resolveNodeId(data.title);
    const linkRegex = /\[\[([^\]]+)\]\]/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const targetId = resolveNodeId(match[1]);
      if (nodeIds.has(targetId) && targetId !== sourceId) {
        const edgeKey = `${sourceId}->${targetId}`;
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          edges.push({ source: sourceId, target: targetId });
        }
      }
    }
  }

  return { nodes, edges, pages: pageContents };
}

export async function buildGraphFile(wikiDir: string, outputPath: string): Promise<{ nodeCount: number; edgeCount: number }> {
  const files = globSync('**/*.md', { cwd: wikiDir });
  const pages: Array<{ path: string; raw: string }> = [];

  for (const file of files) {
    const raw = await readFile(join(wikiDir, file), 'utf-8');
    pages.push({ path: file, raw });
  }

  const data = extractGraphData(pages);
  const html = generateHtml(data);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf-8');

  return { nodeCount: data.nodes.length, edgeCount: data.edges.length };
}
