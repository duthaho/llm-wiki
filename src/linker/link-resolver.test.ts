import { describe, it, expect } from 'vitest';
import { findUnresolvedLinks } from './link-resolver.js';

describe('findUnresolvedLinks', () => {
  it('should find links that have no matching wiki page', () => {
    const pages = [
      {
        path: 'persons/hung-vuong.md',
        raw: `---\ntitle: Hùng Vương\ntype: person\nera: prehistoric\ntags: []\nsources: []\n---\n\nLinked to [[Văn Lang]] and [[Triệu Đà]] and [[Mỵ Châu]].`,
      },
      {
        path: 'eras/van-lang.md',
        raw: `---\ntitle: Văn Lang\ntype: dynasty\nera: prehistoric\ntags: []\nsources: []\n---\n\nContent about [[Hùng Vương]].`,
      },
    ];

    const unresolved = findUnresolvedLinks(pages);
    expect(unresolved).toContain('Triệu Đà');
    expect(unresolved).toContain('Mỵ Châu');
    expect(unresolved).not.toContain('Văn Lang');
    expect(unresolved).not.toContain('Hùng Vương');
  });

  it('should deduplicate links', () => {
    const pages = [
      {
        path: 'a.md',
        raw: `---\ntitle: A\ntype: person\nera: prehistoric\ntags: []\nsources: []\n---\n[[Missing]] and [[Missing]] again.`,
      },
    ];
    const unresolved = findUnresolvedLinks(pages);
    expect(unresolved.filter(l => l === 'Missing')).toHaveLength(1);
  });
});
