import { describe, it, expect } from 'vitest';
import { validateFrontmatter, WikiPageType, Era } from './schema.js';

describe('validateFrontmatter', () => {
  it('should accept valid person frontmatter', () => {
    const fm = {
      title: 'Hùng Vương',
      type: 'person' as WikiPageType,
      era: 'prehistoric' as Era,
      tags: ['leader', 'mythology'],
      sources: ['https://vi.wikipedia.org/wiki/Hùng_Vương'],
    };
    expect(validateFrontmatter(fm)).toEqual({ valid: true, errors: [] });
  });

  it('should reject frontmatter missing title', () => {
    const fm = { type: 'person', era: 'prehistoric', tags: [], sources: [] };
    const result = validateFrontmatter(fm as any);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('title is required');
  });

  it('should accept valid ho-dynasty frontmatter', () => {
    const fm = {
      title: 'Hồ Quý Ly',
      type: 'person' as WikiPageType,
      era: 'ho-dynasty' as Era,
      tags: ['vua', 'cải cách'],
      sources: ['https://vi.wikipedia.org/wiki/Hồ_Quý_Ly'],
    };
    expect(validateFrontmatter(fm)).toEqual({ valid: true, errors: [] });
  });

  it('should accept valid mac-dynasty frontmatter', () => {
    const fm = {
      title: 'Mạc Đăng Dung',
      type: 'person' as WikiPageType,
      era: 'mac-dynasty' as Era,
      tags: ['vua', 'sáng lập'],
      sources: ['https://vi.wikipedia.org/wiki/Mạc_Đăng_Dung'],
    };
    expect(validateFrontmatter(fm)).toEqual({ valid: true, errors: [] });
  });

  it('should reject invalid type', () => {
    const fm = { title: 'Test', type: 'invalid', era: 'prehistoric', tags: [], sources: [] };
    const result = validateFrontmatter(fm as any);
    expect(result.valid).toBe(false);
  });
});
