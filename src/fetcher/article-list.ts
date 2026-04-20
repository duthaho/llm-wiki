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
    { title: 'Việt_Nam_thời_tiền_sử', wikiTitle: 'Việt Nam thời tiền sử', type: 'era', era: 'prehistoric', tags: ['tổng quan', 'khảo cổ'] },
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
  'chinese-domination': [
    // Overview eras
    { title: 'Bắc_thuộc', wikiTitle: 'Bắc thuộc', type: 'era', era: 'chinese-domination', tags: ['tổng quan', 'bắc thuộc'] },
    { title: 'Thời_kỳ_Bắc_thuộc_lần_thứ_nhất', wikiTitle: 'Thời kỳ Bắc thuộc lần thứ nhất', type: 'era', era: 'chinese-domination', tags: ['bắc thuộc', '111 TCN-40'] },
    { title: 'Thời_kỳ_Bắc_thuộc_lần_thứ_hai', wikiTitle: 'Thời kỳ Bắc thuộc lần thứ hai', type: 'era', era: 'chinese-domination', tags: ['bắc thuộc', '43-544'] },
    { title: 'Thời_kỳ_Bắc_thuộc_lần_thứ_ba', wikiTitle: 'Thời kỳ Bắc thuộc lần thứ ba', type: 'era', era: 'chinese-domination', tags: ['bắc thuộc', '602-905'] },
    // Pre-domination kingdom
    { title: 'Nam_Việt', wikiTitle: 'Nam Việt', type: 'concept', era: 'chinese-domination', tags: ['vương quốc', 'Triệu Đà', '204 TCN'] },
    { title: 'Nhà_Triệu', wikiTitle: 'Nhà Triệu', type: 'dynasty', era: 'chinese-domination', tags: ['triều đại', 'Nam Việt', '204-111 TCN'] },
    { title: 'Triệu_Vũ_Vương', wikiTitle: 'Triệu Vũ Vương', type: 'person', era: 'chinese-domination', tags: ['vua', 'Triệu Đà', 'Nam Việt'] },
    // Resistance figures
    { title: 'Hai_Bà_Trưng', wikiTitle: 'Hai Bà Trưng', type: 'person', era: 'chinese-domination', tags: ['khởi nghĩa', 'nữ anh hùng', '40'] },
    { title: 'Khởi_nghĩa_Hai_Bà_Trưng', wikiTitle: 'Khởi nghĩa Hai Bà Trưng', type: 'event', era: 'chinese-domination', tags: ['khởi nghĩa', 'Hai Bà Trưng', '40-43'] },
    { title: 'Tô_Định', wikiTitle: 'Tô Định', type: 'person', era: 'chinese-domination', tags: ['thái thú', 'Hán', 'Hai Bà Trưng'] },
    { title: 'Bà_Triệu', wikiTitle: 'Bà Triệu', type: 'person', era: 'chinese-domination', tags: ['khởi nghĩa', 'nữ anh hùng', '248'] },
    { title: 'Lý_Nam_Đế', wikiTitle: 'Lý Nam Đế', type: 'person', era: 'chinese-domination', tags: ['vua', 'Vạn Xuân', 'Lý Bí'] },
    { title: 'Triệu_Việt_Vương', wikiTitle: 'Triệu Việt Vương', type: 'person', era: 'chinese-domination', tags: ['vua', 'Vạn Xuân', 'kháng chiến'] },
    { title: 'Mai_Hắc_Đế', wikiTitle: 'Mai Hắc Đế', type: 'person', era: 'chinese-domination', tags: ['khởi nghĩa', 'Mai Thúc Loan', '722'] },
    { title: 'Phùng_Hưng', wikiTitle: 'Phùng Hưng', type: 'person', era: 'chinese-domination', tags: ['khởi nghĩa', 'Bố Cái Đại Vương', '791'] },
    // Independence
    { title: 'Ngô_Quyền', wikiTitle: 'Ngô Quyền', type: 'person', era: 'chinese-domination', tags: ['vua', 'độc lập', '938'] },
    { title: 'Trận_Bạch_Đằng_(938)', wikiTitle: 'Trận Bạch Đằng (938)', type: 'event', era: 'chinese-domination', tags: ['trận đánh', 'Bạch Đằng', 'độc lập'] },
    // Dynasties and states
    { title: 'Nhà_Tiền_Lý', wikiTitle: 'Nhà Tiền Lý', type: 'dynasty', era: 'chinese-domination', tags: ['triều đại', 'Vạn Xuân', '544-602'] },
    { title: 'Vạn_Xuân', wikiTitle: 'Vạn Xuân', type: 'concept', era: 'chinese-domination', tags: ['quốc gia', 'độc lập', 'Lý Nam Đế'] },
    // Administrative and cultural
    { title: 'Sĩ_Nhiếp', wikiTitle: 'Sĩ Nhiếp', type: 'person', era: 'chinese-domination', tags: ['thái thú', 'văn hóa', 'giáo dục'] },
    { title: 'Giao_Chỉ', wikiTitle: 'Giao Chỉ', type: 'place', era: 'chinese-domination', tags: ['hành chính', 'địa danh', 'Hán'] },
    { title: 'Giao_Châu', wikiTitle: 'Giao Châu', type: 'place', era: 'chinese-domination', tags: ['hành chính', 'địa danh', 'Đường'] },
  ],
};

export function getArticlesByEra(era: Era): ArticleEntry[] {
  return ARTICLES[era] ?? [];
}

export function getAllArticles(): ArticleEntry[] {
  return Object.values(ARTICLES).flat();
}
