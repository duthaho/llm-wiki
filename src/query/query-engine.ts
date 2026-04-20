import type { LLMClient } from '../llm/types.js';
import type { WikiManager } from '../wiki/wiki-manager.js';

export interface QueryContext {
  title: string;
  content: string;
  path: string;
}

export function buildQueryPrompt(question: string, context: QueryContext[]): string {
  const contextBlock = context
    .map(c => `### ${c.title} (${c.path})\n${c.content}`)
    .join('\n\n---\n\n');

  return `You are a Vietnamese history expert. Answer the question based ONLY on the wiki pages provided below. If the information is not available in the context, say so.

## Question
${question}

## Wiki Context

${contextBlock}

## Rules
- Answer in Vietnamese
- Cite the wiki page title when referencing facts
- Be concise and factual
- If unsure, say "Thông tin này chưa có trong wiki"`;
}

export async function queryWiki(
  client: LLMClient,
  wiki: WikiManager,
  question: string,
  model: string,
): Promise<string> {
  // Search for relevant pages
  // Vietnamese words can be short (vua, ai, la) — use low threshold
  // Filter common stopwords instead
  const STOPWORDS = new Set(['là', 'và', 'của', 'có', 'được', 'trong', 'cho', 'với', 'này', 'đã', 'các', 'một', 'không']);
  const keywords = question.split(/\s+/).filter(w => w.length > 1 && !STOPWORDS.has(w.toLowerCase()));
  const allResults = new Map<string, QueryContext>();

  for (const keyword of keywords) {
    const results = await wiki.search(keyword);
    for (const r of results) {
      if (!allResults.has(r.path)) {
        const pathParts = r.path.replace(/\\/g, '/').split('/');
        const category = pathParts[0];
        const slug = pathParts[pathParts.length - 1].replace('.md', '');
        const content = await wiki.loadPage(category, slug);
        if (content) {
          allResults.set(r.path, { title: r.title, content, path: r.path });
        }
      }
    }
  }

  const context = Array.from(allResults.values()).slice(0, 5);

  if (context.length === 0) {
    return 'Không tìm thấy thông tin liên quan trong wiki.';
  }

  const prompt = buildQueryPrompt(question, context);

  return client.complete({
    model,
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });
}
