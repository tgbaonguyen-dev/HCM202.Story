import type { ArchiveImage } from '@/lib/content';
import { museum, museumInterior, portrait, stiltHouse, declaration, dongKhe } from '@/lib/content';
import { courseDocument } from '@/lib/course-document';

export type TopicSection = Readonly<{
  number: string;
  title: string;
  text: string;
}>;

export type Topic = Readonly<{
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  italicTitle: string;
  lead: string;
  statement: string;
  keywords: ReadonlyArray<string>;
  sections: ReadonlyArray<TopicSection>;
  sourceMarkdown: string;
  image: ArchiveImage;
  accent: string;
  surface: string;
  nextSlug: string;
}>;

export const topics: ReadonlyArray<Topic> = [
  {
    slug: 'tinh-tat-yeu', index: '01', eyebrow: 'TÍNH TẤT YẾU CỦA VAI TRÒ LÃNH ĐẠO', title: 'Người cầm lái', italicTitle: 'của cách mạng',
    lead: 'Vì vậy sự ra đời và vai trò lãnh đạo của Đảng, theo Hồ Chí Minh, không phải là một lựa chọn mà là tất yếu lịch sử.',
    statement: 'Đảng có vững, cách mệnh mới thành công, cũng như người cầm lái có vững thuyền mới chạy.',
    keywords: ['Mác – Lênin', 'Phong trào công nhân', 'Phong trào yêu nước', 'Người cầm lái'], image: stiltHouse, accent: '#8e302c', surface: '#eee8da', nextSlug: 'ban-chat-giai-cap',
    sections: [
      { number: '01A', title: 'Hình ảnh người cầm lái', text: 'Con thuyền là dân tộc Việt Nam đang tìm đường giải phóng; người cầm lái là Đảng.' },
      { number: '01B', title: 'Cơ sở lý luận', text: 'Đảng Cộng sản = chủ nghĩa Mác – Lênin + phong trào công nhân; Hồ Chí Minh bổ sung phong trào yêu nước.' },
      { number: '01C', title: 'Yếu tố yêu nước', text: 'Việt Nam là xứ thuộc địa nửa phong kiến; mâu thuẫn dân tộc là mâu thuẫn cơ bản.' },
    ],
    sourceMarkdown: courseDocument.introductionAndInevitability,
  },
  {
    slug: 'ban-chat-giai-cap', index: '02', eyebrow: 'BẢN CHẤT GIAI CẤP GẮN VỚI TÍNH DÂN TỘC', title: 'Bản chất giai cấp', italicTitle: 'gắn với dân tộc',
    lead: 'Đảng mang bản chất giai cấp công nhân nhưng đồng thời là “Đảng của dân tộc Việt Nam”. Đây là nền tảng cho vai trò lãnh đạo của Đảng.',
    statement: 'Đảng Lao động Việt Nam là Đảng của giai cấp công nhân và nhân dân lao động, cho nên nó phải là Đảng của dân tộc Việt Nam.',
    keywords: ['Giai cấp công nhân', 'Nhân dân lao động', 'Toàn dân tộc', 'Độc lập, tự do'], image: portrait, accent: '#496052', surface: '#e4e7dc', nextSlug: 'ba-vai-tro',
    sections: [
      { number: '02A', title: 'Bản chất giai cấp công nhân', text: 'Lập trường tư tưởng vững vàng, lấy chủ nghĩa Mác – Lênin làm nền tảng.' },
      { number: '02B', title: 'Tính dân tộc, tính nhân dân', text: 'Đại diện cho lợi ích của nhân dân lao động và toàn dân tộc, không chỉ riêng một giai cấp.' },
      { number: '02C', title: 'Thống nhất biện chứng', text: 'Hai phương diện không đối lập mà hòa quyện chặt chẽ trong thực tiễn cách mạng.' },
    ],
    sourceMarkdown: courseDocument.classAndNation,
  },
  {
    slug: 'ba-vai-tro', index: '03', eyebrow: 'BA VAI TRÒ LÃNH ĐẠO CỦA ĐẢNG', title: 'Ba vai trò', italicTitle: 'lãnh đạo của Đảng',
    lead: 'Từ nhận định “Đảng như người cầm lái”, Đảng giữ ba vai trò: hoạch định đường lối, tập hợp và tổ chức quần chúng, liên minh quốc tế.',
    statement: 'Đường lối đúng → Tổ chức hành động → Lực lượng tiên phong → Sức mạnh chính trị của quần chúng.',
    keywords: ['Đường lối', 'Quần chúng', 'Tiên phong', 'Quốc tế'], image: museum, accent: '#9a4d33', surface: '#eee3d4', nextSlug: 'dao-duc-van-minh',
    sections: [
      { number: '03A', title: 'Hoạch định đường lối', text: 'Đề ra cương lĩnh, chiến lược, sách lược phù hợp với thực tiễn từng giai đoạn cách mạng.' },
      { number: '03B', title: 'Tổ chức quần chúng', text: 'Giáo dục, giác ngộ, tổ chức quần chúng đấu tranh.' },
      { number: '03C', title: 'Đoàn kết quốc tế', text: 'Gắn cách mạng Việt Nam với phong trào cách mạng thế giới.' },
    ],
    sourceMarkdown: courseDocument.leadershipRoles,
  },
  {
    slug: 'dao-duc-van-minh', index: '04', eyebrow: 'ĐẢNG PHẢI LÀ ĐẠO ĐỨC, LÀ VĂN MINH', title: 'Đảng là đạo đức,', italicTitle: 'là văn minh',
    lead: 'Đây là yêu cầu đối với một Đảng giữ vai trò lãnh đạo và cầm quyền.',
    statement: 'Đảng muốn giữ được vai trò “người cầm lái” thì không chỉ cần đường lối đúng, mà bản thân tổ chức và con người trong Đảng cũng phải đủ năng lực, đạo đức và uy tín.',
    keywords: ['Phụng sự Tổ quốc', 'Phục vụ nhân dân', 'Đức và tài', 'Dân chủ, kỷ luật'], image: declaration, accent: '#7d3030', surface: '#e9e4d8', nextSlug: 'xay-dung-chinh-don',
    sections: [
      { number: '04A', title: 'Đảng là đạo đức', text: 'Mục tiêu hoạt động phải hướng tới phụng sự Tổ quốc, phục vụ nhân dân.' },
      { number: '04B', title: 'Đảng là văn minh', text: 'Có nền tảng lý luận khoa học và cách mạng.' },
      { number: '04C', title: 'Đủ năng lực và uy tín', text: 'Có đội ngũ cán bộ, đảng viên đủ đức và tài; giữ mối liên hệ mật thiết với nhân dân.' },
    ],
    sourceMarkdown: courseDocument.ethicsAndCivilization,
  },
  {
    slug: 'xay-dung-chinh-don', index: '05', eyebrow: 'XÂY DỰNG VÀ CHỈNH ĐỐN ĐẢNG', title: 'Xây dựng', italicTitle: 'và chỉnh đốn',
    lead: 'Hồ Chí Minh coi xây dựng, chỉnh đốn Đảng là công việc phải tiến hành thường xuyên, không phải chỉ khi xuất hiện vấn đề.',
    statement: 'Có quyền lực → xuất hiện nguy cơ tha hóa → cần tự kiểm tra và chỉnh đốn → giữ được năng lực và uy tín lãnh đạo.',
    keywords: ['Tự đổi mới', 'Tự phê bình', 'Kỷ luật', 'Đoàn kết'], image: museumInterior, accent: '#576552', surface: '#e0e5db', nextSlug: 'con-nguoi-va-van-dung',
    sections: [
      { number: '05A', title: 'Tự đổi mới', text: 'Đảng phải liên tục nâng cao năng lực lãnh đạo và sức chiến đấu để đáp ứng yêu cầu mới.' },
      { number: '05B', title: 'Ngăn ngừa sự tha hóa', text: 'Cần cơ chế để kiểm tra, phát hiện và sửa chữa khuyết điểm.' },
      { number: '05C', title: 'Giữ niềm tin của nhân dân', text: 'Dám nhìn nhận khuyết điểm; có khả năng tự sửa chữa và hoàn thiện.' },
    ],
    sourceMarkdown: courseDocument.constructionAndRectification,
  },
  {
    slug: 'con-nguoi-va-van-dung', index: '06', eyebrow: 'CON NGƯỜI VÀ VẬN DỤNG HIỆN NAY', title: 'Con người', italicTitle: 'là yếu tố quyết định',
    lead: 'Một đường lối đúng muốn đi vào thực tế phải thông qua đội ngũ cán bộ.',
    statement: 'Vai trò “người cầm lái” của Đảng là tất yếu lịch sử, bắt nguồn từ sự kết hợp sáng tạo ba yếu tố: Mác – Lênin, phong trào công nhân và phong trào yêu nước.',
    keywords: ['Đức – “hồng”', 'Tài – “chuyên”', 'Chỉnh đốn Đảng', 'Sinh viên'], image: dongKhe, accent: '#8e302c', surface: '#eee8da', nextSlug: 'tinh-tat-yeu',
    sections: [
      { number: '06A', title: 'Cán bộ là cái gốc', text: 'Cán bộ cần bảo đảm hai mặt: Đức – “hồng” và Tài – “chuyên”.' },
      { number: '06B', title: 'Vận dụng hiện nay', text: 'Ba việc để Đảng tiếp tục là người cầm lái vững vàng.' },
      { number: '06C', title: 'Đối với sinh viên', text: 'Học tập tư tưởng Hồ Chí Minh, rèn luyện đạo đức, phấn đấu trở thành đảng viên hoặc là người tích cực ủng hộ Đảng.' },
    ],
    sourceMarkdown: courseDocument.peopleApplicationAndConclusion,
  },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}
