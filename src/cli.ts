import { Command } from 'commander';
import Anthropic from '@anthropic-ai/sdk';
import { fetchArticle } from './fetcher/wiki-api.js';
import { getArticlesByEra } from './fetcher/article-list.js';
import { RawStore } from './fetcher/raw-store.js';
import { ingestArticle, ingestDiscoveredArticle, parseWikiPage } from './ingester/ingester.js';
import { WikiManager } from './wiki/wiki-manager.js';
import { queryWiki } from './query/query-engine.js';
import { VALID_ERAS } from './schema/schema.js';
import { buildGraphFile } from './graph/build-graph.js';
import { findUnresolvedLinks } from './linker/link-resolver.js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { globSync } from 'glob';

const ROOT = process.cwd();
const rawStore = new RawStore(join(ROOT, 'raw'));
const wiki = new WikiManager(join(ROOT, 'wiki'));

const program = new Command();

program
  .name('vn-wiki')
  .description('Vietnam History LLM Wiki — Knowledge base from Vietnamese Wikipedia')
  .version('0.1.0');

program
  .command('ingest')
  .description('Fetch and compile Wikipedia articles into wiki pages')
  .argument('<era>', 'Era to ingest (e.g., prehistoric)')
  .option('--model <model>', 'Claude model to use', 'claude-sonnet-4-6')
  .option('--skip-existing', 'Skip articles already in wiki', false)
  .action(async (era: string, opts: { model: string; skipExisting: boolean }) => {
    if (!VALID_ERAS.includes(era as any)) {
      console.error(`Invalid era: ${era}\nAvailable eras: ${VALID_ERAS.join(', ')}`);
      process.exit(1);
    }

    const client = new Anthropic();
    const articles = getArticlesByEra(era as any);

    if (articles.length === 0) {
      console.error(`Era "${era}" is valid but has no articles yet.`);
      process.exit(1);
    }

    console.log(`Found ${articles.length} articles for era: ${era}\n`);

    for (let i = 0; i < articles.length; i++) {
      const entry = articles[i];
      console.log(`[${i + 1}/${articles.length}] ${entry.wikiTitle}`);

      try {
        const slug = entry.wikiTitle.toLowerCase().replace(/\s+/g, '-');
        const category = entry.type === 'dynasty' ? 'eras' : `${entry.type}s`;

        // Skip if wiki page already exists
        if (opts.skipExisting) {
          const existing = await wiki.loadPage(category, slug);
          if (existing) {
            console.log('  -> Skipped (already exists)');
            continue;
          }
        }

        // Fetch from Wikipedia
        if (await rawStore.exists(era, entry.title)) {
          console.log('  -> Raw: cached');
        } else {
          console.log('  -> Fetching from vi.wikipedia.org...');
          const article = await fetchArticle(entry.title);
          await rawStore.save(era, article);
          console.log('  -> Raw: saved');
        }

        // Load raw content
        const raw = await rawStore.load(era, entry.title);
        if (!raw) throw new Error('Failed to load raw article');

        // Ingest with LLM
        console.log('  -> Compiling with Claude...');
        const wikiPage = await ingestArticle(client, entry, raw.content, opts.model);

        // Save wiki page
        await wiki.savePage(category, slug, wikiPage);
        console.log(`  -> Wiki: saved -> wiki/${category}/${slug}.md`);
      } catch (err) {
        console.error(`  -> Error: ${err instanceof Error ? err.message : err}`);
      }

      console.log();
    }

    console.log('Done! Run `vn-wiki list` to see all pages.');
  });

program
  .command('query')
  .description('Ask a question about Vietnamese history')
  .argument('<question>', 'Your question in Vietnamese')
  .option('--model <model>', 'Claude model to use', 'claude-sonnet-4-6')
  .action(async (question: string, opts: { model: string }) => {
    const client = new Anthropic();
    console.log(`\nSearching wiki for: "${question}"\n`);
    const answer = await queryWiki(client, wiki, question, opts.model);
    console.log(answer);
  });

program
  .command('list')
  .description('List all wiki pages')
  .action(async () => {
    const pages = await wiki.listPages();
    if (pages.length === 0) {
      console.log('No wiki pages yet. Run `vn-wiki ingest prehistoric` to get started.');
      return;
    }
    console.log(`\n${pages.length} wiki pages:\n`);
    for (const page of pages) {
      console.log(`  [${page.era}] ${page.title} (${page.type}) -> ${page.path}`);
    }
  });

program
  .command('build-graph')
  .description('Generate interactive graph visualization of the wiki')
  .option('-o, --output <path>', 'Output HTML file path', 'dist/graph.html')
  .action(async (opts: { output: string }) => {
    const wikiDir = join(ROOT, 'wiki');
    const outputPath = join(ROOT, opts.output);
    console.log('Building graph...');
    const { nodeCount, edgeCount } = await buildGraphFile(wikiDir, outputPath);
    console.log(`Generated ${outputPath}`);
    console.log(`  ${nodeCount} nodes, ${edgeCount} edges`);
    console.log(`\nOpen in browser to explore.`);
  });

program
  .command('follow-links')
  .description('Discover and ingest articles referenced by existing wiki pages')
  .option('--depth <n>', 'How many rounds of link following', '1')
  .option('--model <model>', 'Claude model to use', 'claude-sonnet-4-6')
  .option('--dry-run', 'Show what would be fetched without ingesting', false)
  .action(async (opts: { depth: string; model: string; dryRun: boolean }) => {
    const client = new Anthropic();
    const wikiDir = join(ROOT, 'wiki');
    const depth = parseInt(opts.depth, 10);

    for (let round = 1; round <= depth; round++) {
      console.log(`\n--- Round ${round}/${depth} ---\n`);

      // Read all current wiki pages
      const files = globSync('**/*.md', { cwd: wikiDir });
      const pages: Array<{ path: string; raw: string }> = [];
      for (const file of files) {
        const raw = await readFile(join(wikiDir, file), 'utf-8');
        pages.push({ path: file, raw });
      }

      // Find unresolved links
      const unresolved = findUnresolvedLinks(pages);
      if (unresolved.length === 0) {
        console.log('No unresolved links found. Wiki is complete!');
        break;
      }

      console.log(`Found ${unresolved.length} unresolved links:`);
      unresolved.forEach(l => console.log(`  - ${l}`));

      if (opts.dryRun) {
        console.log('\n(dry run — skipping ingestion)');
        continue;
      }

      console.log();

      let ingested = 0;
      for (let i = 0; i < unresolved.length; i++) {
        const linkTitle = unresolved[i];
        const wikiTitle = linkTitle.replace(/\s+/g, '_');
        console.log(`[${i + 1}/${unresolved.length}] ${linkTitle}`);

        try {
          // Fetch from Wikipedia
          if (await rawStore.exists('discovered', wikiTitle)) {
            console.log('  -> Raw: cached');
          } else {
            console.log('  -> Fetching from vi.wikipedia.org...');
            const article = await fetchArticle(wikiTitle);
            await rawStore.save('discovered', article);
            console.log('  -> Raw: saved');
          }

          // Load raw content
          const raw = await rawStore.load('discovered', wikiTitle);
          if (!raw) throw new Error('Failed to load raw article');

          // Ingest with LLM (auto-classify type/era)
          console.log('  -> Compiling with Claude...');
          const wikiPage = await ingestDiscoveredArticle(client, wikiTitle, raw.content, opts.model);

          // Parse the generated page to determine category
          const parsed = parseWikiPage(wikiPage);
          const type = parsed.frontmatter.type || 'concept';
          const slug = linkTitle.toLowerCase().replace(/\s+/g, '-');
          const category = type === 'dynasty' ? 'eras' : `${type}s`;

          await wiki.savePage(category, slug, wikiPage);
          console.log(`  -> Wiki: saved -> wiki/${category}/${slug}.md (${type}, ${parsed.frontmatter.era})`);
          ingested++;
        } catch (err) {
          console.error(`  -> Error: ${err instanceof Error ? err.message : err}`);
        }

        console.log();
      }

      console.log(`Round ${round} complete: ${ingested}/${unresolved.length} articles ingested.`);
    }

    console.log('\nDone! Run `vn-wiki build-graph` to update the visualization.');
  });

program.parse();
