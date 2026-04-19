# Vietnam History LLM Wiki

A CLI tool that builds an LLM-powered knowledge base about Vietnam's history. It ingests Vietnamese Wikipedia articles, compiles them into structured and interlinked markdown wiki pages via the Claude API, and generates an interactive D3.js graph visualization for exploration.

<!-- ![Graph visualization screenshot](https://duthaho.github.io/llm-wiki/) -->

## Features

- **Wikipedia ingestion** -- Fetch articles from vi.wikipedia.org and compile them into structured markdown wiki pages using Claude
- **Link following** -- Automatically discover and ingest articles referenced by existing pages, expanding the knowledge graph
- **Natural language queries** -- Ask questions about Vietnamese history and get answers grounded in wiki content
- **Interactive graph** -- D3.js radial graph with search, type filtering, click-to-explore navigation, and a side panel with rendered content
- **GitHub Pages deployment** -- Automated workflow publishes the graph viewer on every wiki update

## Quick Start

### Prerequisites

- Node.js 22+
- An [Anthropic API key](https://console.anthropic.com/)

### Install

```bash
git clone https://github.com/duthaho/llm-wiki.git
cd llm-wiki
npm install
```

### Set up your API key

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

### Ingest your first era

```bash
npx tsx src/cli.ts ingest prehistoric
```

### Explore

```bash
npx tsx src/cli.ts list
npx tsx src/cli.ts query "Hùng Vương là ai?"
npx tsx src/cli.ts build-graph
```

Open `dist/graph.html` in a browser to explore the knowledge graph.

## CLI Commands

| Command | Description |
|---------|-------------|
| `vn-wiki ingest <era>` | Fetch Wikipedia articles for an era and compile into wiki pages |
| `vn-wiki follow-links --depth N` | Discover and ingest articles referenced by existing pages |
| `vn-wiki query "<question>"` | Ask a question about Vietnamese history |
| `vn-wiki list` | List all wiki pages |
| `vn-wiki build-graph` | Generate interactive graph visualization (`dist/graph.html`) |

### Common options

| Option | Commands | Description |
|--------|----------|-------------|
| `--model <model>` | `ingest`, `query`, `follow-links` | Claude model to use (default: `claude-sonnet-4-6`) |
| `--skip-existing` | `ingest` | Skip articles that already have wiki pages |
| `--dry-run` | `follow-links` | Show what would be fetched without ingesting |
| `-o, --output <path>` | `build-graph` | Output HTML file path (default: `dist/graph.html`) |

## Architecture

```
vi.wikipedia.org
       |
       v
  +-----------+     +------------------+     +------------------+
  | Fetcher   | --> | Raw Store        | --> | Ingester (Claude) |
  | wiki-api  |     | raw/<era>/*.json |     | LLM compilation   |
  +-----------+     +------------------+     +------------------+
                                                     |
                                                     v
                                              +-------------+
                                              | Wiki Pages  |
                                              | wiki/**/*.md|
                                              +------+------+
                                                     |
                           +----------------+--------+--------+
                           |                |                  |
                           v                v                  v
                     +-----------+   +-------------+   +----------------+
                     | Query     |   | Link        |   | Graph Builder  |
                     | Engine    |   | Resolver    |   | D3.js viewer   |
                     +-----------+   +-------------+   +----------------+
```

This follows the [LLM Wiki pattern](https://github.com/karpathy/llm-wiki): raw source articles are compiled by an LLM into structured markdown with YAML frontmatter, then queried and visualized downstream.

### Wiki page structure

Each wiki page is a markdown file with YAML frontmatter:

```yaml
---
title: Hùng Vương
type: person        # person | event | era | place | concept | dynasty
era: prehistoric    # see era list below
tags: [vua, truyền thuyết]
sources: [https://vi.wikipedia.org/wiki/Hùng_Vương]
---
```

Pages are stored under `wiki/` organized by type: `persons/`, `events/`, `eras/`, `places/`, `concepts/`.

## Era Coverage

| Era | Status | Articles |
|-----|--------|----------|
| Prehistoric & Hung Kings | Done | 16 articles, 15 wiki pages |
| Chinese domination | Planned | -- |
| Independent dynasties (Ngo - Nguyen) | Planned | -- |
| French colonization | Planned | -- |
| Independence & wars | Planned | -- |
| Reunification & Doi Moi | Planned | -- |

Valid era identifiers: `prehistoric`, `chinese-domination`, `ngo-dinh`, `ly-dynasty`, `tran-dynasty`, `le-dynasty`, `nguyen-dynasty`, `french-colonization`, `independence-wars`, `reunification-doi-moi`

## Development

```bash
npm run build          # Compile TypeScript
npm run dev -- <cmd>   # Run CLI in development (e.g., npm run dev -- list)
npm test               # Run tests (Vitest)
npm run test:watch     # Run tests in watch mode
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new eras, running tests, and submitting pull requests.

## License

[MIT](LICENSE) -- Copyright 2026 duthaho

## Built With

- [Anthropic Claude API](https://docs.anthropic.com/) -- LLM compilation and query answering
- [Commander.js](https://github.com/tj/commander.js) -- CLI framework
- [D3.js](https://d3js.org/) -- Graph visualization
- [gray-matter](https://github.com/jonschlinkert/gray-matter) -- YAML frontmatter parsing
- [marked](https://github.com/markedjs/marked) -- Markdown rendering
- [Vitest](https://vitest.dev/) -- Testing framework
