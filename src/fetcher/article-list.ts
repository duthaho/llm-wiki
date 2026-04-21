import type { Era, WikiPageType } from '../schema/schema.js';

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
  'ngo-dinh': [
    // Nhà Ngô (939–965)
    { title: 'Nhà_Ngô', wikiTitle: 'Nhà Ngô', type: 'dynasty', era: 'ngo-dinh', tags: ['triều đại', '939-965'] },
    { title: 'Dương_Tam_Kha', wikiTitle: 'Dương Tam Kha', type: 'person', era: 'ngo-dinh', tags: ['quyền thần', 'Nhà Ngô'] },
    { title: 'Ngô_Xương_Ngập', wikiTitle: 'Ngô Xương Ngập', type: 'person', era: 'ngo-dinh', tags: ['vua', 'Hậu Ngô'] },
    { title: 'Ngô_Xương_Văn', wikiTitle: 'Ngô Xương Văn', type: 'person', era: 'ngo-dinh', tags: ['vua', 'Hậu Ngô'] },
    // Loạn 12 sứ quân
    { title: 'Loạn_12_sứ_quân', wikiTitle: 'Loạn 12 sứ quân', type: 'event', era: 'ngo-dinh', tags: ['nội chiến', 'sứ quân', '966-968'] },
    // Nhà Đinh (968–980)
    { title: 'Nhà_Đinh', wikiTitle: 'Nhà Đinh', type: 'dynasty', era: 'ngo-dinh', tags: ['triều đại', '968-980'] },
    { title: 'Đinh_Bộ_Lĩnh', wikiTitle: 'Đinh Bộ Lĩnh', type: 'person', era: 'ngo-dinh', tags: ['vua', 'Đinh Tiên Hoàng', 'thống nhất'] },
    { title: 'Đại_Cồ_Việt', wikiTitle: 'Đại Cồ Việt', type: 'concept', era: 'ngo-dinh', tags: ['quốc hiệu', 'Đinh', 'Tiền Lê'] },
    { title: 'Hoa_Lư', wikiTitle: 'Hoa Lư', type: 'place', era: 'ngo-dinh', tags: ['kinh đô', 'Đinh', 'Tiền Lê', 'Ninh Bình'] },
    // Nhà Tiền Lê (980–1009)
    { title: 'Nhà_Tiền_Lê', wikiTitle: 'Nhà Tiền Lê', type: 'dynasty', era: 'ngo-dinh', tags: ['triều đại', '980-1009'] },
    { title: 'Lê_Đại_Hành', wikiTitle: 'Lê Đại Hành', type: 'person', era: 'ngo-dinh', tags: ['vua', 'chống Tống', '980'] },
    { title: 'Chiến_tranh_Tống–Việt_lần_thứ_nhất', wikiTitle: 'Chiến tranh Tống–Việt lần thứ nhất', type: 'event', era: 'ngo-dinh', tags: ['trận đánh', 'chống Tống', '981'] },
    { title: 'Lê_Long_Đĩnh', wikiTitle: 'Lê Long Đĩnh', type: 'person', era: 'ngo-dinh', tags: ['vua', 'Lê Ngọa Triều'] },
  ],
  'ly-dynasty': [
    // Dynasty overview
    { title: 'Nhà_Lý', wikiTitle: 'Nhà Lý', type: 'dynasty', era: 'ly-dynasty', tags: ['triều đại', '1009-1225'] },
    // Rulers
    { title: 'Lý_Thái_Tổ', wikiTitle: 'Lý Thái Tổ', type: 'person', era: 'ly-dynasty', tags: ['vua', 'Lý Công Uẩn', 'sáng lập'] },
    { title: 'Lý_Thái_Tông', wikiTitle: 'Lý Thái Tông', type: 'person', era: 'ly-dynasty', tags: ['vua', 'mở rộng'] },
    { title: 'Lý_Thánh_Tông', wikiTitle: 'Lý Thánh Tông', type: 'person', era: 'ly-dynasty', tags: ['vua', 'Đại Việt'] },
    { title: 'Lý_Nhân_Tông', wikiTitle: 'Lý Nhân Tông', type: 'person', era: 'ly-dynasty', tags: ['vua', 'thịnh trị', 'chống Tống'] },
    // Key events
    { title: 'Chiếu_dời_đô', wikiTitle: 'Chiếu dời đô', type: 'event', era: 'ly-dynasty', tags: ['chiếu chỉ', 'dời đô', '1010'] },
    { title: 'Thăng_Long', wikiTitle: 'Thăng Long', type: 'place', era: 'ly-dynasty', tags: ['kinh đô', 'Hà Nội', '1010'] },
    { title: 'Trận_Như_Nguyệt', wikiTitle: 'Trận Như Nguyệt', type: 'event', era: 'ly-dynasty', tags: ['trận đánh', 'chống Tống', '1077'] },
    // Key figures
    { title: 'Lý_Thường_Kiệt', wikiTitle: 'Lý Thường Kiệt', type: 'person', era: 'ly-dynasty', tags: ['tướng', 'Nam quốc sơn hà', 'chống Tống'] },
    { title: 'Ỷ_Lan', wikiTitle: 'Ỷ Lan', type: 'person', era: 'ly-dynasty', tags: ['thái hậu', 'nhiếp chính'] },
    // Culture & religion
    { title: 'Văn_Miếu_–_Quốc_Tử_Giám', wikiTitle: 'Văn Miếu – Quốc Tử Giám', type: 'place', era: 'ly-dynasty', tags: ['giáo dục', 'Nho giáo', '1070'] },
    { title: 'Phật_giáo_Việt_Nam', wikiTitle: 'Phật giáo Việt Nam', type: 'concept', era: 'ly-dynasty', tags: ['tôn giáo', 'Phật giáo', 'quốc giáo'] },
    { title: 'Chùa_Một_Cột', wikiTitle: 'Chùa Một Cột', type: 'place', era: 'ly-dynasty', tags: ['kiến trúc', 'Phật giáo', 'Hà Nội'] },
    { title: 'Nam_quốc_sơn_hà', wikiTitle: 'Nam quốc sơn hà', type: 'concept', era: 'ly-dynasty', tags: ['thơ', 'tuyên ngôn', 'độc lập'] },
  ],
  'tran-dynasty': [
    // Dynasty overview
    { title: 'Nhà_Trần', wikiTitle: 'Nhà Trần', type: 'dynasty', era: 'tran-dynasty', tags: ['triều đại', '1226-1400'] },
    // Rulers
    { title: 'Trần_Thái_Tông', wikiTitle: 'Trần Thái Tông', type: 'person', era: 'tran-dynasty', tags: ['vua', 'sáng lập'] },
    { title: 'Trần_Nhân_Tông', wikiTitle: 'Trần Nhân Tông', type: 'person', era: 'tran-dynasty', tags: ['vua', 'chống Nguyên', 'Phật giáo', 'Trúc Lâm'] },
    // Military
    { title: 'Trần_Hưng_Đạo', wikiTitle: 'Trần Hưng Đạo', type: 'person', era: 'tran-dynasty', tags: ['tướng', 'Quốc công', 'chống Nguyên'] },
    { title: 'Kháng_chiến_chống_Nguyên_Mông', wikiTitle: 'Kháng chiến chống Nguyên Mông', type: 'event', era: 'tran-dynasty', tags: ['chiến tranh', 'Mông Cổ', '1258-1288'] },
    { title: 'Trận_Bạch_Đằng_(1288)', wikiTitle: 'Trận Bạch Đằng (1288)', type: 'event', era: 'tran-dynasty', tags: ['trận đánh', 'chống Nguyên', 'cọc gỗ'] },
    { title: 'Hịch_tướng_sĩ', wikiTitle: 'Hịch tướng sĩ', type: 'concept', era: 'tran-dynasty', tags: ['văn học', 'Trần Hưng Đạo', 'hịch'] },
    { title: 'Trần_Quốc_Toản', wikiTitle: 'Trần Quốc Toản', type: 'person', era: 'tran-dynasty', tags: ['tướng trẻ', 'chống Nguyên'] },
    // Culture
    { title: 'Chữ_Nôm', wikiTitle: 'Chữ Nôm', type: 'concept', era: 'tran-dynasty', tags: ['chữ viết', 'văn hóa', 'ngôn ngữ'] },
    { title: 'Thiền_phái_Trúc_Lâm', wikiTitle: 'Thiền phái Trúc Lâm', type: 'concept', era: 'tran-dynasty', tags: ['Phật giáo', 'thiền', 'Trần Nhân Tông'] },
    { title: 'Đại_Việt_sử_ký', wikiTitle: 'Đại Việt sử ký', type: 'concept', era: 'tran-dynasty', tags: ['sử học', 'Lê Văn Hưu'] },
    // Late Trần
    { title: 'Trần_Nghệ_Tông', wikiTitle: 'Trần Nghệ Tông', type: 'person', era: 'tran-dynasty', tags: ['vua', 'suy vong'] },
    { title: 'Chiêm_Thành', wikiTitle: 'Chiêm Thành', type: 'concept', era: 'tran-dynasty', tags: ['vương quốc', 'Champa', 'nam tiến'] },
  ],
  'ho-dynasty': [
    // Hồ dynasty (1400–1407)
    { title: 'Nhà_Hồ', wikiTitle: 'Nhà Hồ', type: 'dynasty', era: 'ho-dynasty', tags: ['triều đại', '1400-1407'] },
    { title: 'Hồ_Quý_Ly', wikiTitle: 'Hồ Quý Ly', type: 'person', era: 'ho-dynasty', tags: ['vua', 'cải cách', 'soán ngôi'] },
    { title: 'Hồ_Hán_Thương', wikiTitle: 'Hồ Hán Thương', type: 'person', era: 'ho-dynasty', tags: ['vua', 'Nhà Hồ'] },
    { title: 'Thành_nhà_Hồ', wikiTitle: 'Thành nhà Hồ', type: 'place', era: 'ho-dynasty', tags: ['kinh đô', 'Thanh Hóa', 'di sản UNESCO'] },
    // Fourth Chinese domination (1407–1427)
    { title: 'Thời_thuộc_Minh', wikiTitle: 'Thời thuộc Minh', type: 'era', era: 'ho-dynasty', tags: ['bắc thuộc', 'Minh', '1407-1427'] },
    { title: 'Khởi_nghĩa_Lam_Sơn', wikiTitle: 'Khởi nghĩa Lam Sơn', type: 'event', era: 'ho-dynasty', tags: ['khởi nghĩa', 'Lê Lợi', '1418-1427'] },
  ],
  'le-dynasty': [
    // Lê sơ — Early Lê (1428–1527)
    { title: 'Nhà_Hậu_Lê', wikiTitle: 'Nhà Hậu Lê', type: 'dynasty', era: 'le-dynasty', tags: ['triều đại', '1428-1789'] },
    { title: 'Lê_Thái_Tổ', wikiTitle: 'Lê Thái Tổ', type: 'person', era: 'le-dynasty', tags: ['vua', 'Lê Lợi', 'sáng lập'] },
    { title: 'Nguyễn_Trãi', wikiTitle: 'Nguyễn Trãi', type: 'person', era: 'le-dynasty', tags: ['quân sư', 'văn thần', 'Bình Ngô đại cáo'] },
    { title: 'Bình_Ngô_đại_cáo', wikiTitle: 'Bình Ngô đại cáo', type: 'concept', era: 'le-dynasty', tags: ['văn học', 'tuyên ngôn', 'Nguyễn Trãi'] },
    { title: 'Lê_Thánh_Tông', wikiTitle: 'Lê Thánh Tông', type: 'person', era: 'le-dynasty', tags: ['vua', 'thịnh trị', 'Hồng Đức'] },
    { title: 'Luật_Hồng_Đức', wikiTitle: 'Luật Hồng Đức', type: 'concept', era: 'le-dynasty', tags: ['luật pháp', 'Lê Thánh Tông', 'bộ luật'] },
    { title: 'Đại_Việt_sử_ký_toàn_thư', wikiTitle: 'Đại Việt sử ký toàn thư', type: 'concept', era: 'le-dynasty', tags: ['sử học', 'biên niên', 'Ngô Sĩ Liên'] },
    // Lê trung hưng — Later Lê (1533–1789)
    { title: 'Nhà_Lê_trung_hưng', wikiTitle: 'Nhà Lê trung hưng', type: 'era', era: 'le-dynasty', tags: ['triều đại', '1533-1789'] },
    { title: 'Chúa_Trịnh', wikiTitle: 'Chúa Trịnh', type: 'dynasty', era: 'le-dynasty', tags: ['chúa', 'Đàng Ngoài', '1545-1787'] },
    { title: 'Chúa_Nguyễn', wikiTitle: 'Chúa Nguyễn', type: 'dynasty', era: 'le-dynasty', tags: ['chúa', 'Đàng Trong', '1558-1777'] },
    { title: 'Trịnh–Nguyễn_phân_tranh', wikiTitle: 'Trịnh–Nguyễn phân tranh', type: 'event', era: 'le-dynasty', tags: ['nội chiến', 'phân chia', '1627-1672'] },
    { title: 'Nguyễn_Hoàng', wikiTitle: 'Nguyễn Hoàng', type: 'person', era: 'le-dynasty', tags: ['chúa Nguyễn', 'Đàng Trong', 'khai phá'] },
    // Tây Sơn (1771–1802)
    { title: 'Nhà_Tây_Sơn', wikiTitle: 'Nhà Tây Sơn', type: 'dynasty', era: 'le-dynasty', tags: ['triều đại', '1778-1802'] },
    { title: 'Nguyễn_Huệ', wikiTitle: 'Nguyễn Huệ', type: 'person', era: 'le-dynasty', tags: ['vua', 'Quang Trung', 'Tây Sơn'] },
    { title: 'Trận_Ngọc_Hồi_–_Đống_Đa', wikiTitle: 'Trận Ngọc Hồi – Đống Đa', type: 'event', era: 'le-dynasty', tags: ['trận đánh', 'chống Thanh', '1789'] },
    { title: 'Nguyễn_Nhạc', wikiTitle: 'Nguyễn Nhạc', type: 'person', era: 'le-dynasty', tags: ['vua', 'Tây Sơn', 'khởi nghĩa'] },
  ],
  'mac-dynasty': [
    { title: 'Nhà_Mạc', wikiTitle: 'Nhà Mạc', type: 'dynasty', era: 'mac-dynasty', tags: ['triều đại', '1527-1592'] },
    { title: 'Mạc_Đăng_Dung', wikiTitle: 'Mạc Đăng Dung', type: 'person', era: 'mac-dynasty', tags: ['vua', 'soán ngôi', 'sáng lập'] },
    { title: 'Mạc_Đăng_Doanh', wikiTitle: 'Mạc Đăng Doanh', type: 'person', era: 'mac-dynasty', tags: ['vua', 'thịnh trị'] },
    { title: 'Chiến_tranh_Lê–Mạc', wikiTitle: 'Chiến tranh Lê–Mạc', type: 'event', era: 'mac-dynasty', tags: ['nội chiến', 'Nam-Bắc triều', '1533-1592'] },
    { title: 'Mạc_Kính_Cung', wikiTitle: 'Mạc Kính Cung', type: 'person', era: 'mac-dynasty', tags: ['vua', 'Cao Bằng', '1593-1625'] },
  ],
  'nguyen-dynasty': [
    // Dynasty overview
    { title: 'Nhà_Nguyễn', wikiTitle: 'Nhà Nguyễn', type: 'dynasty', era: 'nguyen-dynasty', tags: ['triều đại', '1802-1945'] },
    // Rulers
    { title: 'Gia_Long', wikiTitle: 'Gia Long', type: 'person', era: 'nguyen-dynasty', tags: ['vua', 'Nguyễn Ánh', 'sáng lập'] },
    { title: 'Minh_Mạng', wikiTitle: 'Minh Mạng', type: 'person', era: 'nguyen-dynasty', tags: ['vua', 'cải cách', 'trung ương tập quyền'] },
    { title: 'Thiệu_Trị', wikiTitle: 'Thiệu Trị', type: 'person', era: 'nguyen-dynasty', tags: ['vua', 'bảo thủ'] },
    { title: 'Tự_Đức', wikiTitle: 'Tự Đức', type: 'person', era: 'nguyen-dynasty', tags: ['vua', 'Pháp xâm lược'] },
    // Places & culture
    { title: 'Kinh_thành_Huế', wikiTitle: 'Kinh thành Huế', type: 'place', era: 'nguyen-dynasty', tags: ['kinh đô', 'Huế', 'di sản UNESCO'] },
    { title: 'Quốc_sử_quán_(triều_Nguyễn)', wikiTitle: 'Quốc sử quán triều Nguyễn', type: 'concept', era: 'nguyen-dynasty', tags: ['sử học', 'biên soạn'] },
    { title: 'Đại_Nam_thực_lục', wikiTitle: 'Đại Nam thực lục', type: 'concept', era: 'nguyen-dynasty', tags: ['sử học', 'biên niên', 'Nhà Nguyễn'] },
    // Territory & administration
    { title: 'Nam_tiến', wikiTitle: 'Nam tiến', type: 'concept', era: 'nguyen-dynasty', tags: ['mở rộng', 'lãnh thổ', 'phương Nam'] },
    { title: 'Lăng_tẩm_Huế', wikiTitle: 'Lăng tẩm Huế', type: 'place', era: 'nguyen-dynasty', tags: ['kiến trúc', 'Huế', 'di sản'] },
    // Key events
    { title: 'Phong_trào_Cần_Vương', wikiTitle: 'Phong trào Cần Vương', type: 'event', era: 'nguyen-dynasty', tags: ['kháng Pháp', '1885-1896'] },
    { title: 'Trương_Định', wikiTitle: 'Trương Định', type: 'person', era: 'nguyen-dynasty', tags: ['kháng Pháp', 'Nam Kỳ', 'bình tây'] },
  ],
  'french-colonization': [
    // Era overview & colonial structure
    { title: 'Pháp_thuộc', wikiTitle: 'Pháp thuộc', type: 'era', era: 'french-colonization', tags: ['thuộc địa', '1858-1945'] },
    { title: 'Liên_bang_Đông_Dương', wikiTitle: 'Liên bang Đông Dương', type: 'concept', era: 'french-colonization', tags: ['hành chính', 'thuộc địa Pháp'] },
    { title: 'Hòa_ước_Giáp_Thân_(1884)', wikiTitle: 'Hòa ước Giáp Thân (1884)', type: 'event', era: 'french-colonization', tags: ['Patenôtre', 'bảo hộ', 'hiệp ước'] },
    // Late Nguyễn emperors under French rule
    { title: 'Hàm_Nghi', wikiTitle: 'Hàm Nghi', type: 'person', era: 'french-colonization', tags: ['vua', 'lưu vong', 'Cần Vương'] },
    { title: 'Bảo_Đại', wikiTitle: 'Bảo Đại', type: 'person', era: 'french-colonization', tags: ['vua', 'cuối cùng', 'thoái vị'] },
    // Armed resistance (late 19c – early 20c)
    { title: 'Phan_Đình_Phùng', wikiTitle: 'Phan Đình Phùng', type: 'person', era: 'french-colonization', tags: ['Cần Vương', 'Hương Khê', 'kháng Pháp'] },
    { title: 'Hoàng_Hoa_Thám', wikiTitle: 'Hoàng Hoa Thám', type: 'person', era: 'french-colonization', tags: ['Đề Thám', 'Yên Thế', 'kháng Pháp'] },
    // Early-20c reform & revolutionary movements
    { title: 'Phan_Bội_Châu', wikiTitle: 'Phan Bội Châu', type: 'person', era: 'french-colonization', tags: ['cách mạng', 'Đông Du', 'nhà nho'] },
    { title: 'Phan_Châu_Trinh', wikiTitle: 'Phan Châu Trinh', type: 'person', era: 'french-colonization', tags: ['canh tân', 'Duy Tân', 'nhà nho'] },
    { title: 'Phong_trào_Đông_Du', wikiTitle: 'Phong trào Đông Du', type: 'event', era: 'french-colonization', tags: ['Phan Bội Châu', 'du học Nhật', '1905-1909'] },
    { title: 'Đông_Kinh_Nghĩa_Thục', wikiTitle: 'Đông Kinh Nghĩa Thục', type: 'concept', era: 'french-colonization', tags: ['giáo dục', 'canh tân', '1907'] },
    // Nationalist & communist organizations
    { title: 'Việt_Nam_Quốc_dân_Đảng', wikiTitle: 'Việt Nam Quốc dân Đảng', type: 'concept', era: 'french-colonization', tags: ['đảng phái', 'dân tộc chủ nghĩa'] },
    { title: 'Nguyễn_Thái_Học', wikiTitle: 'Nguyễn Thái Học', type: 'person', era: 'french-colonization', tags: ['VNQDĐ', 'Yên Bái', 'liệt sĩ'] },
    { title: 'Khởi_nghĩa_Yên_Bái', wikiTitle: 'Khởi nghĩa Yên Bái', type: 'event', era: 'french-colonization', tags: ['VNQDĐ', '1930', 'khởi nghĩa'] },
    { title: 'Hồ_Chí_Minh', wikiTitle: 'Hồ Chí Minh', type: 'person', era: 'french-colonization', tags: ['Nguyễn Ái Quốc', 'cách mạng', 'lãnh tụ'] },
    { title: 'Đảng_Cộng_sản_Việt_Nam', wikiTitle: 'Đảng Cộng sản Việt Nam', type: 'concept', era: 'french-colonization', tags: ['đảng phái', 'thành lập 1930'] },
    { title: 'Xô_viết_Nghệ_Tĩnh', wikiTitle: 'Xô viết Nghệ Tĩnh', type: 'event', era: 'french-colonization', tags: ['khởi nghĩa', 'Nghệ An', 'Hà Tĩnh', '1930-1931'] },
    { title: 'Việt_Minh', wikiTitle: 'Việt Minh', type: 'concept', era: 'french-colonization', tags: ['mặt trận', '1941', 'giải phóng dân tộc'] },
    // End of colonial era (1945)
    { title: 'Nhật_đảo_chính_Pháp', wikiTitle: 'Nhật đảo chính Pháp', type: 'event', era: 'french-colonization', tags: ['9/3/1945', 'Nhật Bản', 'Đông Dương'] },
    { title: 'Nạn_đói_năm_Ất_Dậu,_1944–1945', wikiTitle: 'Nạn đói năm Ất Dậu, 1944–1945', type: 'event', era: 'french-colonization', tags: ['nạn đói', 'Bắc Kỳ', '2 triệu người'] },
    { title: 'Cách_mạng_Tháng_Tám', wikiTitle: 'Cách mạng Tháng Tám', type: 'event', era: 'french-colonization', tags: ['1945', 'khởi nghĩa', 'Việt Minh'] },
    { title: 'Tuyên_ngôn_độc_lập_(Việt_Nam_Dân_chủ_Cộng_hòa)', wikiTitle: 'Tuyên ngôn độc lập (Việt Nam Dân chủ Cộng hòa)', type: 'event', era: 'french-colonization', tags: ['2/9/1945', 'Hồ Chí Minh', 'khai sinh'] },
  ],
  'independence-wars': [
    // First Indochina War (1945-1954)
    { title: 'Chiến_tranh_Đông_Dương', wikiTitle: 'Chiến tranh Đông Dương', type: 'event', era: 'independence-wars', tags: ['kháng chiến', 'chống Pháp', '1946-1954'] },
    { title: 'Việt_Nam_Dân_chủ_Cộng_hòa', wikiTitle: 'Việt Nam Dân chủ Cộng hòa', type: 'concept', era: 'independence-wars', tags: ['nhà nước', 'miền Bắc', '1945-1976'] },
    { title: 'Toàn_quốc_kháng_chiến', wikiTitle: 'Toàn quốc kháng chiến', type: 'event', era: 'independence-wars', tags: ['19/12/1946', 'Hà Nội', 'khởi đầu kháng Pháp'] },
    { title: 'Chiến_dịch_Biên_giới', wikiTitle: 'Chiến dịch Biên giới', type: 'event', era: 'independence-wars', tags: ['1950', 'Việt Bắc', 'chiến dịch'] },
    { title: 'Chiến_dịch_Điện_Biên_Phủ', wikiTitle: 'Chiến dịch Điện Biên Phủ', type: 'event', era: 'independence-wars', tags: ['1954', 'quyết định', 'chấn động địa cầu'] },
    { title: 'Võ_Nguyên_Giáp', wikiTitle: 'Võ Nguyên Giáp', type: 'person', era: 'independence-wars', tags: ['đại tướng', 'Điện Biên Phủ', 'quân sự'] },
    { title: 'Hiệp_định_Genève,_1954', wikiTitle: 'Hiệp định Genève, 1954', type: 'event', era: 'independence-wars', tags: ['1954', 'chia đôi', 'hiệp định'] },
    // Partition (1954-1960)
    { title: 'Việt_Nam_Cộng_hòa', wikiTitle: 'Việt Nam Cộng hòa', type: 'concept', era: 'independence-wars', tags: ['nhà nước', 'miền Nam', '1955-1975'] },
    { title: 'Ngô_Đình_Diệm', wikiTitle: 'Ngô Đình Diệm', type: 'person', era: 'independence-wars', tags: ['tổng thống', 'VNCH', 'bị ám sát'] },
    { title: 'Tập_kết_ra_Bắc', wikiTitle: 'Tập kết ra Bắc', type: 'event', era: 'independence-wars', tags: ['1954', 'di cư', 'Hiệp định Genève'] },
    { title: 'Vĩ_tuyến_17_Bắc', wikiTitle: 'Vĩ tuyến 17 Bắc', type: 'place', era: 'independence-wars', tags: ['giới tuyến', 'chia cắt', 'Bến Hải'] },
    // Vietnam War (1955-1973)
    { title: 'Chiến_tranh_Việt_Nam', wikiTitle: 'Chiến tranh Việt Nam', type: 'event', era: 'independence-wars', tags: ['1955-1975', 'chống Mỹ', 'nội chiến'] },
    { title: 'Mặt_trận_Dân_tộc_Giải_phóng_miền_Nam_Việt_Nam', wikiTitle: 'Mặt trận Dân tộc Giải phóng miền Nam Việt Nam', type: 'concept', era: 'independence-wars', tags: ['Việt Cộng', '1960', 'mặt trận'] },
    { title: 'Đường_Trường_Sơn', wikiTitle: 'Đường Trường Sơn', type: 'place', era: 'independence-wars', tags: ['hậu cần', 'đường mòn Hồ Chí Minh', 'tiếp vận'] },
    { title: 'Sự_kiện_Vịnh_Bắc_Bộ', wikiTitle: 'Sự kiện Vịnh Bắc Bộ', type: 'event', era: 'independence-wars', tags: ['1964', 'Mỹ leo thang', 'cớ chiến tranh'] },
    { title: 'Sự_kiện_Tết_Mậu_Thân', wikiTitle: 'Sự kiện Tết Mậu Thân', type: 'event', era: 'independence-wars', tags: ['1968', 'tổng tiến công', 'Sài Gòn'] },
    // Leaders of the period
    { title: 'Lê_Duẩn', wikiTitle: 'Lê Duẩn', type: 'person', era: 'independence-wars', tags: ['tổng bí thư', 'ĐCSVN', 'lãnh đạo'] },
    { title: 'Phạm_Văn_Đồng', wikiTitle: 'Phạm Văn Đồng', type: 'person', era: 'independence-wars', tags: ['thủ tướng', 'VNDCCH', 'lãnh đạo'] },
    { title: 'Trường_Chinh', wikiTitle: 'Trường Chinh', type: 'person', era: 'independence-wars', tags: ['tổng bí thư', 'lý luận', 'ĐCSVN'] },
    { title: 'Lê_Đức_Thọ', wikiTitle: 'Lê Đức Thọ', type: 'person', era: 'independence-wars', tags: ['Hiệp định Paris', 'đàm phán', 'Nobel'] },
    { title: 'Nguyễn_Văn_Thiệu', wikiTitle: 'Nguyễn Văn Thiệu', type: 'person', era: 'independence-wars', tags: ['tổng thống', 'VNCH', '1967-1975'] },
    // Endgame (1972-1975)
    { title: 'Chiến_dịch_Linebacker_II', wikiTitle: 'Chiến dịch Linebacker II', type: 'event', era: 'independence-wars', tags: ['12/1972', 'Điện Biên Phủ trên không', 'B-52'] },
    { title: 'Hiệp_định_Paris_1973', wikiTitle: 'Hiệp định Paris 1973', type: 'event', era: 'independence-wars', tags: ['1973', 'hòa bình', 'Mỹ rút quân'] },
    { title: 'Chiến_dịch_Hồ_Chí_Minh', wikiTitle: 'Chiến dịch Hồ Chí Minh', type: 'event', era: 'independence-wars', tags: ['1975', 'giải phóng', 'Sài Gòn'] },
    { title: 'Sự_kiện_30_tháng_4_năm_1975', wikiTitle: 'Sự kiện 30 tháng 4 năm 1975', type: 'event', era: 'independence-wars', tags: ['30/4/1975', 'thống nhất', 'kết thúc chiến tranh'] },
  ],
  'reunification-doi-moi': [
    // Reunification & post-war struggles (1975-1986)
    { title: 'Thống_nhất_Việt_Nam', wikiTitle: 'Thống nhất Việt Nam', type: 'event', era: 'reunification-doi-moi', tags: ['1976', 'tổng tuyển cử', 'Bắc Nam'] },
    { title: 'Thời_bao_cấp', wikiTitle: 'Thời bao cấp', type: 'concept', era: 'reunification-doi-moi', tags: ['kinh tế kế hoạch', '1976-1986', 'tem phiếu'] },
    // Đổi Mới reform (1986)
    { title: 'Đổi_Mới', wikiTitle: 'Đổi Mới', type: 'concept', era: 'reunification-doi-moi', tags: ['1986', 'cải cách', 'kinh tế thị trường'] },
    { title: 'Nguyễn_Văn_Linh', wikiTitle: 'Nguyễn Văn Linh', type: 'person', era: 'reunification-doi-moi', tags: ['tổng bí thư', 'Đổi Mới', 'khởi xướng'] },
    { title: 'Võ_Văn_Kiệt', wikiTitle: 'Võ Văn Kiệt', type: 'person', era: 'reunification-doi-moi', tags: ['thủ tướng', 'cải cách', 'đường dây 500kV'] },
    { title: 'Đỗ_Mười', wikiTitle: 'Đỗ Mười', type: 'person', era: 'reunification-doi-moi', tags: ['tổng bí thư', 'Đổi Mới', 'lãnh đạo'] },
    { title: 'Lê_Khả_Phiêu', wikiTitle: 'Lê Khả Phiêu', type: 'person', era: 'reunification-doi-moi', tags: ['tổng bí thư', '1997-2001'] },
    { title: 'Nông_Đức_Mạnh', wikiTitle: 'Nông Đức Mạnh', type: 'person', era: 'reunification-doi-moi', tags: ['tổng bí thư', '2001-2011'] },
    { title: 'Nguyễn_Phú_Trọng', wikiTitle: 'Nguyễn Phú Trọng', type: 'person', era: 'reunification-doi-moi', tags: ['tổng bí thư', 'đốt lò', 'lâu năm'] },
  ],
};

export function getArticlesByEra(era: Era): ArticleEntry[] {
  return ARTICLES[era] ?? [];
}

export function getAllArticles(): ArticleEntry[] {
  return Object.values(ARTICLES).flat();
}
