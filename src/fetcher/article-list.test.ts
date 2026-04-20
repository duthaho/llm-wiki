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

  it('should return articles for ngo-dinh era', () => {
    const articles = getArticlesByEra('ngo-dinh');
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty('era', 'ngo-dinh');
  });

  it('should return articles for ly-dynasty era', () => {
    const articles = getArticlesByEra('ly-dynasty');
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty('era', 'ly-dynasty');
  });

  it('should return articles for tran-dynasty era', () => {
    const articles = getArticlesByEra('tran-dynasty');
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty('era', 'tran-dynasty');
  });

  it('should return articles for ho-dynasty era', () => {
    const articles = getArticlesByEra('ho-dynasty');
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty('era', 'ho-dynasty');
  });

  it('should return articles for le-dynasty era', () => {
    const articles = getArticlesByEra('le-dynasty');
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty('era', 'le-dynasty');
  });

  it('should return articles for mac-dynasty era', () => {
    const articles = getArticlesByEra('mac-dynasty');
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty('era', 'mac-dynasty');
  });

  it('should return articles for nguyen-dynasty era', () => {
    const articles = getArticlesByEra('nguyen-dynasty');
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty('era', 'nguyen-dynasty');
  });

  it('should return empty array for unknown era', () => {
    const articles = getArticlesByEra('unknown' as any);
    expect(articles).toEqual([]);
  });
});
