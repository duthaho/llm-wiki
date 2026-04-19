# Wiki Schema Rules

## Page Types
- `person` — Historical figures (kings, generals, scholars)
- `event` — Battles, treaties, revolts, reforms
- `era` — Time periods (Prehistoric, Ly Dynasty, etc.)
- `place` — Geographical locations significant to history
- `concept` — Cultural, political, or economic concepts
- `dynasty` — Ruling dynasties

## Frontmatter Fields
- `title` (required): Display name in Vietnamese
- `type` (required): One of the page types above
- `era` (required): Which historical era this belongs to
- `tags` (required): Array of topic tags
- `sources` (required): Array of source Wikipedia URLs

## Content Structure
Each page MUST contain:
1. `## Tóm tắt` — 2-3 sentence summary
2. `## Bối cảnh lịch sử` — Historical context
3. `## Nội dung chính` — Main content (varies by type)
4. `## Liên quan` — Related wiki links using [[wikilinks]]

## Wikilinks
Use `[[Page Title]]` to link between pages. The linker resolves
these to relative file paths during the lint phase.
