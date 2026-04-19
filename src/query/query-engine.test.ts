import { describe, it, expect } from 'vitest';
import { buildQueryPrompt } from './query-engine.js';

describe('buildQueryPrompt', () => {
  it('should include question and wiki context', () => {
    const question = 'Hùng Vương là ai?';
    const context = [
      { title: 'Hùng Vương', content: 'Hùng Vương là danh hiệu của các vị vua.', path: 'people/hung-vuong.md' },
    ];
    const prompt = buildQueryPrompt(question, context);

    expect(prompt).toContain('Hùng Vương là ai?');
    expect(prompt).toContain('Hùng Vương là danh hiệu');
    expect(prompt).toContain('people/hung-vuong.md');
  });
});
