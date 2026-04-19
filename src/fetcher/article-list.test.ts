import { describe, it, expect } from 'vitest';
import { getArticlesByEra, type ArticleEntry } from './article-list.js';

describe('getArticlesByEra', () => {
  it('should return articles for prehistoric era', () => {
    const articles = getArticlesByEra('prehistoric');
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty('title');
    expect(articles[0]).toHaveProperty('type');
    expect(articles[0]).toHaveProperty('era', 'prehistoric');
  });

  it('should return empty array for unknown era', () => {
    const articles = getArticlesByEra('unknown' as any);
    expect(articles).toEqual([]);
  });
});
