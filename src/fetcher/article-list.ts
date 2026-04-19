import type { WikiPageType, Era } from '../schema/schema.js';

export interface ArticleEntry {
  title: string;
  wikiTitle: string;
  type: WikiPageType;
  era: Era;
  tags: string[];
}

const ARTICLES: Record<string, ArticleEntry[]> = {
  prehistoric: [
    { title: 'Thời_tiền_sử_Việt_Nam', wikiTitle: 'Thời tiền sử Việt Nam', type: 'era', era: 'prehistoric', tags: ['tổng quan', 'khảo cổ'] },
    { title: 'Hùng_Vương', wikiTitle: 'Hùng Vương', type: 'person', era: 'prehistoric', tags: ['vua', 'truyền thuyết'] },
    { title: 'Văn_Lang', wikiTitle: 'Văn Lang', type: 'dynasty', era: 'prehistoric', tags: ['quốc gia', 'thời đại đồ đồng'] },
    { title: 'Âu_Lạc', wikiTitle: 'Âu Lạc', type: 'dynasty', era: 'prehistoric', tags: ['quốc gia', 'An Dương Vương'] },
    { title: 'An_Dương_Vương', wikiTitle: 'An Dương Vương', type: 'person', era: 'prehistoric', tags: ['vua', 'Âu Lạc'] },
    { title: 'Lạc_Long_Quân', wikiTitle: 'Lạc Long Quân', type: 'person', era: 'prehistoric', tags: ['truyền thuyết', 'nguồn gốc'] },
    { title: 'Âu_Cơ', wikiTitle: 'Âu Cơ', type: 'person', era: 'prehistoric', tags: ['truyền thuyết', 'nguồn gốc'] },
    { title: 'Trống_đồng_Đông_Sơn', wikiTitle: 'Trống đồng Đông Sơn', type: 'concept', era: 'prehistoric', tags: ['văn hóa', 'khảo cổ', 'đồ đồng'] },
    { title: 'Văn_hóa_Đông_Sơn', wikiTitle: 'Văn hóa Đông Sơn', type: 'concept', era: 'prehistoric', tags: ['văn hóa', 'khảo cổ'] },
    { title: 'Văn_hóa_Sa_Huỳnh', wikiTitle: 'Văn hóa Sa Huỳnh', type: 'concept', era: 'prehistoric', tags: ['văn hóa', 'khảo cổ', 'miền Trung'] },
    { title: 'Văn_hóa_Đồng_Nai', wikiTitle: 'Văn hóa Đồng Nai', type: 'concept', era: 'prehistoric', tags: ['văn hóa', 'khảo cổ', 'miền Nam'] },
    { title: 'Văn_hóa_Hòa_Bình', wikiTitle: 'Văn hóa Hòa Bình', type: 'concept', era: 'prehistoric', tags: ['văn hóa', 'đồ đá'] },
    { title: 'Văn_hóa_Phùng_Nguyên', wikiTitle: 'Văn hóa Phùng Nguyên', type: 'concept', era: 'prehistoric', tags: ['văn hóa', 'đồ đồng'] },
    { title: 'Cổ_Loa', wikiTitle: 'Cổ Loa', type: 'place', era: 'prehistoric', tags: ['thành cổ', 'Âu Lạc', 'kinh đô'] },
    { title: 'Sơn_Tinh_Thủy_Tinh', wikiTitle: 'Sơn Tinh Thủy Tinh', type: 'event', era: 'prehistoric', tags: ['truyền thuyết', 'thần thoại'] },
    { title: 'Thánh_Gióng', wikiTitle: 'Thánh Gióng', type: 'person', era: 'prehistoric', tags: ['truyền thuyết', 'tứ bất tử'] },
  ],
};

export function getArticlesByEra(era: Era): ArticleEntry[] {
  return ARTICLES[era] ?? [];
}

export function getAllArticles(): ArticleEntry[] {
  return Object.values(ARTICLES).flat();
}
