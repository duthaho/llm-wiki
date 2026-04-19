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

  it('should reject invalid type', () => {
    const fm = { title: 'Test', type: 'invalid', era: 'prehistoric', tags: [], sources: [] };
    const result = validateFrontmatter(fm as any);
    expect(result.valid).toBe(false);
  });
});
