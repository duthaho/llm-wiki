import { describe, it, expect } from 'vitest';
import { extractGraphData, resolveNodeId } from './build-graph.js';

describe('resolveNodeId', () => {
  it('should convert a wiki title to a node id', () => {
    expect(resolveNodeId('Hùng Vương')).toBe('hùng-vương');
    expect(resolveNodeId('Văn hóa Đông Sơn')).toBe('văn-hóa-đông-sơn');
  });
});

describe('extractGraphData', () => {
  it('should extract nodes and edges from wiki pages', () => {
    const pages = [
      {
        path: 'persons/hung-vuong.md',
        raw: `---
title: Hùng Vương
type: person
era: prehistoric
tags: [vua]
sources: []
---

Hùng Vương là vua của [[Văn Lang]].

## Liên quan
- [[Âu Lạc]]
`,
      },
      {
        path: 'eras/van-lang.md',
        raw: `---
title: Văn Lang
type: dynasty
era: prehistoric
tags: []
sources: []
---

Văn Lang là quốc gia do [[Hùng Vương]] lập nên.
`,
      },
    ];

    const data = extractGraphData(pages);

    // Nodes
    expect(data.nodes).toHaveLength(2);
    expect(data.nodes[0].id).toBe('hùng-vương');
    expect(data.nodes[0].title).toBe('Hùng Vương');
    expect(data.nodes[0].type).toBe('person');

    // Edges — only resolved links (Âu Lạc has no page, so dropped)
    const edgeKeys = data.edges.map(e => `${e.source}->${e.target}`);
    expect(edgeKeys).toContain('hùng-vương->văn-lang');
    expect(edgeKeys).toContain('văn-lang->hùng-vương');
    expect(edgeKeys).not.toContain('hùng-vương->âu-lạc');

    // Pages (rendered HTML)
    expect(data.pages['hùng-vương']).toContain('Hùng Vương là vua');
  });

  it('should deduplicate edges', () => {
    const pages = [
      {
        path: 'persons/a.md',
        raw: `---\ntitle: A\ntype: person\nera: prehistoric\ntags: []\nsources: []\n---\n[[B]] and [[B]] again`,
      },
      {
        path: 'persons/b.md',
        raw: `---\ntitle: B\ntype: person\nera: prehistoric\ntags: []\nsources: []\n---\n[[A]]`,
      },
    ];

    const data = extractGraphData(pages);
    const edgesFromA = data.edges.filter(e => e.source === 'a' && e.target === 'b');
    expect(edgesFromA).toHaveLength(1);
  });
});
