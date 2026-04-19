import { describe, it, expect } from 'vitest';
import { buildApiUrl, parseWikiResponse } from './wiki-api.js';

describe('buildApiUrl', () => {
  it('should build correct REST API URL for a Vietnamese Wikipedia article', () => {
    const url = buildApiUrl('Hùng_Vương');
    expect(url).toBe('https://vi.wikipedia.org/api/rest_v1/page/html/H%C3%B9ng_V%C6%B0%C6%A1ng');
  });
});

describe('parseWikiResponse', () => {
  it('should extract plain text from HTML content', () => {
    const html = '<p>Hùng Vương là danh hiệu.</p><table><tr><td>data</td></tr></table>';
    const result = parseWikiResponse(html);
    expect(result).toContain('Hùng Vương là danh hiệu');
    expect(result).not.toContain('<p>');
    expect(result).not.toContain('<table>');
  });
});
