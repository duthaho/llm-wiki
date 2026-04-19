# Contributing

Thank you for your interest in contributing to the Vietnam History LLM Wiki.

## Adding a New Era

1. Open `src/fetcher/article-list.ts` and add entries to the `ARTICLES` record under the era key. Each entry needs a `title` (Wikipedia URL slug), `wikiTitle`, `type`, `era`, and `tags`.

2. The era identifier must be one of the values defined in `src/schema/schema.ts` under `VALID_ERAS`:

   ```
   prehistoric, chinese-domination, ngo-dinh, ly-dynasty,
   tran-dynasty, le-dynasty, nguyen-dynasty,
   french-colonization, independence-wars, reunification-doi-moi
   ```

3. Run ingestion:

   ```bash
   npx tsx src/cli.ts ingest <era>
   ```

4. Verify the generated wiki pages look correct, then rebuild the graph:

   ```bash
   npx tsx src/cli.ts build-graph
   ```

## Running Tests

```bash
npm test              # Run all tests once
npm run test:watch    # Run tests in watch mode
```

All tests must pass before submitting a pull request.

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add chinese-domination era articles
fix: handle missing Wikipedia redirects
docs: update era coverage table
test: add link-resolver edge cases
refactor: extract shared frontmatter builder
```

## Pull Request Process

1. Fork the repository and create a branch from `main`.
2. Make your changes and ensure all tests pass (`npm test`).
3. Update the era coverage table in `README.md` if you added a new era.
4. Open a pull request with a clear description of what changed and why.
