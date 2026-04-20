import { describe, it, expect } from 'vitest';
import { findUnresolvedLinks } from './link-resolver.js';

describe('findUnresolvedLinks', () => {
  it('should find links from Liên quan section that have no matching wiki page', () => {
    const pages = [
      {
        path: 'persons/hung-vuong.md',
        raw: `---\ntitle: Hùng Vương\ntype: person\nera: prehistoric\ntags: []\nsources: []\n---\n\nBody text about history.\n\n## Liên quan\n\n- [[Văn Lang]]\n- [[Triệu Đà]]\n- [[Mỵ Châu]]`,
      },
      {
        path: 'eras/van-lang.md',
        raw: `---\ntitle: Văn Lang\ntype: dynasty\nera: prehistoric\ntags: []\nsources: []\n---\n\nContent.\n\n## Liên quan\n\n- [[Hùng Vương]]`,
      },
    ];

    const unresolved = findUnresolvedLinks(pages);
    expect(unresolved).toContain('Triệu Đà');
    expect(unresolved).toContain('Mỵ Châu');
    expect(unresolved).not.toContain('Văn Lang');
    expect(unresolved).not.toContain('Hùng Vương');
  });

  it('should ignore links outside Liên quan section', () => {
    const pages = [
      {
        path: 'a.md',
        raw: `---\ntitle: A\ntype: person\nera: prehistoric\ntags: []\nsources: []\n---\n\n[[BodyLink]] in body.\n\n## Liên quan\n\n- [[RelatedLink]]`,
      },
    ];
    const unresolved = findUnresolvedLinks(pages);
    expect(unresolved).toContain('RelatedLink');
    expect(unresolved).not.toContain('BodyLink');
  });

  it('should deduplicate links', () => {
    const pages = [
      {
        path: 'a.md',
        raw: `---\ntitle: A\ntype: person\nera: prehistoric\ntags: []\nsources: []\n---\n\n## Liên quan\n\n- [[Missing]]\n- [[Missing]]`,
      },
    ];
    const unresolved = findUnresolvedLinks(pages);
    expect(unresolved.filter(l => l === 'Missing')).toHaveLength(1);
  });
});
