import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { CSSProperties, ReactElement } from 'react';
import { Header } from '@/components/header';
import { ArchivePhoto } from '@/components/archive-photo';
import { EditorialMotion } from '@/components/editorial-motion';
import { RouteTransition } from '@/components/route-transition';
import { VietnameseMotif } from '@/components/vietnamese-motif';
import { dragonMotif, drumMotif, mausoleum, portrait } from '@/lib/content';
import { topics } from '@/lib/topics';
import './editorial.css';
import './chuyen-de/topics.css';

const reading: string = 'Đảng có vững, cách mệnh mới thành công, cũng như người cầm lái có vững thuyền mới chạy.';
const chapters: ReadonlyArray<Readonly<{ number: string; title: string; label: string; text: string; href: string; word: string }>> = [
  { number: '01', title: 'Quy luật của Lênin', label: 'BƯỚC 1 / QUY LUẬT CHUNG', text: 'Đảng Cộng sản = chủ nghĩa Mác – Lênin + phong trào công nhân, quy luật chung ở các nước tư bản phát triển.', href: '/chuyen-de/tinh-tat-yeu', word: 'Cơ sở' },
  { number: '02', title: 'Sáng tạo của Hồ Chí Minh', label: 'BƯỚC 2 / PHÙ HỢP VIỆT NAM', text: 'Bổ sung yếu tố thứ ba là phong trào yêu nước, cho phù hợp xã hội thuộc địa, nửa phong kiến.', href: '/chuyen-de/tinh-tat-yeu', word: 'Sáng tạo' },
  { number: '03', title: 'Vai trò là tất yếu', label: 'BƯỚC 3 / KẾT LUẬN', text: 'Lực lượng đông đảo cần một “người cầm lái” mới thành thắng lợi, nên vai trò của Đảng là tất yếu.', href: '/chuyen-de/tinh-tat-yeu', word: 'Kết luận' },
];

export default function Home(): ReactElement {
  return (
    <RouteTransition transitionKey="home"><div className="editorial" id="dau-trang">
      <EditorialMotion />
      <Header current="editorial" />
      <main id="main">
        <section className="editorial-hero" aria-labelledby="hero-heading">
          <VietnameseMotif kind="dragon" className="motif-home-hero-dragon" />
          <div className="hero-topline"><span>CHƯƠNG IV · TƯ TƯỞNG HỒ CHÍ MINH</span><span>BẢN CHẤT VÀ VAI TRÒ LÃNH ĐẠO</span></div>
          <div className="editorial-title">
            <h1 id="hero-heading" className="course-title"><span className="title-mask"><span>Đảng của giai cấp công nhân</span></span><span className="title-mask"><em>và của dân tộc Việt Nam</em></span></h1>
            <div className="hero-aside"><p>Đảng như<br />“người cầm lái”.</p><span className="micro">ĐƯỜNG KÁCH MỆNH · 1927</span></div>
          </div>
          <div id="stage-heritage" className="hero-stage" data-scene="hero">
            <div className="hero-cinema">
              <div className="hero-photo-wrap">
                <ArchivePhoto photo={mausoleum} className="hero-photo" priority={true} />
                <a id="explore" href="#gioi-thieu" className="round-link" aria-label="Cuộn xuống phần giới thiệu">KHÁM PHÁ</a>
                <div className="photo-label">HÀ NỘI, VIỆT NAM<span>21°02′ N · 105°50′ E</span></div>
                <div className="cinema-message" aria-hidden="true"><span>HÌNH ẢNH TRUNG TÂM</span><p>Người<br /><em>cầm lái</em></p></div>
                <span className="cinema-counter" aria-hidden="true">CHƯƠNG IV / 01</span>
              </div>
              <div className="hero-bottom"><span>BẢN CHẤT · VAI TRÒ · ĐIỀU KIỆN</span><span>01 — 07</span></div>
            </div>
          </div>
        </section>

        <section id="gioi-thieu" className="reading-section" data-scene="reading">
          <div className="reading-sticky">
            <div className="reading-meta"><div className="eyebrow">I / HÌNH ẢNH NGƯỜI CẦM LÁI</div><span className="micro">NGUYỄN ÁI QUỐC · ĐƯỜNG KÁCH MỆNH</span></div>
            <div className="reading-body"><h2 className="reading-text">{reading.split(' ').map((word, index) => <span key={`${word}-${index}`} data-reading-word>{word}{' '}</span>)}</h2><div className="reading-foot"><span className="reading-rule" /><p>Nguyễn Ái Quốc, Đường Kách Mệnh, 1927<br />Giáo trình 2019, tr.69; Hồ Chí Minh Toàn tập, 2011, t.2, tr.289</p><span className="reading-page">I / VII</span></div></div>
          </div>
        </section>

        <section id="noi-dung" className="chapter-experience" data-scene="chapters">
          <div className="chapter-introduction"><div className="eyebrow">II / TÍNH TẤT YẾU CỦA VAI TRÒ LÃNH ĐẠO</div><h2>Cơ sở<br /><em>lý luận</em></h2><p>Ba bước<br />Một kết luận lịch sử</p><span className="micro">TIẾP TỤC ĐỂ XEM TỪNG BƯỚC</span></div>
          <div className="chapter-stack">
            {chapters.map((chapter, index) => (
              <article id={`stage-chapter-${chapter.number}`} className="stack-sheet" key={chapter.number} data-stack-card style={{ '--card-index': index } as CSSProperties}>
                <div className="sheet-top"><span>CHƯƠNG {chapter.number}</span><span>{chapter.label}</span></div>
                <div className="sheet-art" aria-hidden="true"><span className="sheet-number">{chapter.number}</span></div>
                <div className="sheet-copy"><span className="sheet-kicker">{chapter.word}</span><h3>{chapter.title}</h3><p>{chapter.text}</p></div>
                <Link id={`open-chapter-${chapter.number}`} href={chapter.href} transitionTypes={['topic-forward']} className="sheet-link"><span>Khám phá chương</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section id="coi-nguon" className="portrait-experience" data-scene="portrait">
          <div className="portrait-backdrop" aria-hidden="true">Đảng của dân tộc</div>
          <div className="portrait-frame"><span className="archive-mark">TƯ LIỆU / C. 1946</span><ArchivePhoto photo={portrait} className="portrait-photo" priority={false} /><span className="portrait-corner corner-one" /><span className="portrait-corner corner-two" /></div>
          <div className="portrait-copy" data-reveal><div className="eyebrow">III / BẢN CHẤT GIAI CẤP GẮN VỚI TÍNH DÂN TỘC</div><h2>Bản chất công nhân<br /><em>Đảng của dân tộc</em></h2><span className="fine-rule" /><p>Đảng mang bản chất giai cấp công nhân nhưng đồng thời là “Đảng của dân tộc Việt Nam”. Đây là nền tảng cho vai trò lãnh đạo của Đảng.</p><a id="to-journey" className="text-link" href="#hanh-trinh-tu-tuong">Ba vai trò lãnh đạo</a></div>
        </section>

        <section id="hanh-trinh-tu-tuong" className="journey-bridge" data-scene="bridge">
          <div className="eyebrow" data-reveal>IV / BA VAI TRÒ LÃNH ĐẠO CỦA ĐẢNG</div><div className="bridge-line" aria-hidden="true"><span /></div>
          <div className="bridge-stops">
            <div data-reveal>
              <div className="bridge-image"><img src="/images/declaration.jpg" alt="Hoạch định đường lối" /></div>
              <span className="micro">01</span>
              <h3>Hoạch định đường lối</h3>
              <p>Đề ra cương lĩnh, chiến lược, sách lược phù hợp với thực tiễn từng giai đoạn cách mạng.</p>
            </div>
            <div data-reveal>
              <div className="bridge-image"><img src="/images/dong-khe.jpg" alt="Tổ chức quần chúng" /></div>
              <span className="micro">02</span>
              <h3>Tổ chức quần chúng</h3>
              <p>Giáo dục, giác ngộ, tổ chức quần chúng đấu tranh.</p>
            </div>
            <div data-reveal>
              <div className="bridge-image"><img src="/images/museum.jpg" alt="Đoàn kết quốc tế" /></div>
              <span className="micro">03</span>
              <h3>Đoàn kết quốc tế</h3>
              <p>Gắn cách mạng Việt Nam với phong trào cách mạng thế giới.</p>
            </div>
          </div>
        </section>


        <div id="chuyen-de" className="home-topic-journey" aria-label="Sáu chặng chuyên đề">
          {topics.map((topic) => (
            <section
              key={topic.slug}
              id={`stage-library-${topic.slug}`}
              style={{ '--stage-accent': topic.accent, '--stage-surface': topic.surface, '--topic-accent': topic.accent, '--topic-surface': topic.surface, background: 'color-mix(in srgb, var(--stage-surface) 55%, transparent)', borderTop: '1px solid color-mix(in srgb, var(--stage-accent) 20%, transparent)' } as CSSProperties}
            >
              <div
                className="home-topic-stage"
                data-scene="topic-stage"
                style={{ borderTop: 'none', background: 'transparent', minHeight: 'auto', overflow: 'visible', paddingBottom: '60px' }}
              >
                <div className="home-topic-visual">
                  <ArchivePhoto photo={topic.image} className="home-topic-photo" priority={false} />
                </div>
                <div className="home-topic-stage-copy">
                  <div className="eyebrow">{topic.index} / {topic.eyebrow}</div>
                  <h2>{topic.title}<br /><em>{topic.italicTitle}</em></h2>
                  <p>{topic.lead}</p>
                </div>
                <div className="home-topic-sections">
                  {topic.sections.map((section, index) => (
                    <article key={section.number}>
                      <span>{section.number}</span>
                      <div><small>MẠCH {String(index + 1).padStart(2, '0')}</small><h3>{section.title}</h3><p>{section.text}</p></div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="topic-document" style={{ padding: '0 5% 80px', maxWidth: 'none', color: 'var(--ink)' }}>
                <div className="topic-document-inner">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{topic.sourceMarkdown}</ReactMarkdown>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section id="gia-tri" className="closing-stage" data-scene="closing">
          <div className="closing-sticky"><div className="closing-disc" aria-hidden="true" /><div className="closing-content"><div className="eyebrow">VI / VẬN DỤNG TRONG GIAI ĐOẠN HIỆN NAY</div><h2>Tiếp tục là<br /><em>người cầm lái</em></h2><ul className="closing-list"><li>Đề ra đường lối, chủ trương đúng đắn trên nền tảng chủ nghĩa Mác – Lênin vận dụng sáng tạo cùng tư tưởng Hồ Chí Minh.</li><li>Tổ chức thực hiện thật tốt đường lối, chủ trương đã đề ra.</li><li>Chú trọng chỉnh đốn Đảng, như liên hệ “lò nóng lên rồi thì củi tươi vào cũng phải cháy”.</li></ul><h3 className="closing-subheading">Đối với sinh viên</h3><ul className="closing-list student-list"><li><strong>Là đảng viên:</strong> phải gương mẫu trong học tập, rèn luyện và các hoạt động tập thể, để Đảng được nhìn thấy qua hành động của từng đảng viên trẻ.</li><li><strong>Chưa là đảng viên:</strong> học tập tư tưởng Hồ Chí Minh, rèn luyện đạo đức, phấn đấu trở thành đảng viên hoặc là người tích cực ủng hộ Đảng.</li></ul><p className="closing-conclusion">Vai trò “người cầm lái” của Đảng là tất yếu lịch sử, bắt nguồn từ sự kết hợp sáng tạo ba yếu tố: Mác – Lênin, phong trào công nhân và phong trào yêu nước. Nhưng vai trò đó chỉ được giữ vững khi Đảng thật sự trong sạch, vững mạnh.</p></div></div>
        </section>

        <section id="tu-lieu" className="sources section-space" data-reveal>
          <div className="eyebrow">TƯ LIỆU THAM KHẢO</div>
          <h2>Tài liệu <em>&amp; Hình ảnh</em></h2>
          <div className="source-links" style={{ gridTemplateColumns: '1fr', gap: '8px' }}>
            <a style={{ pointerEvents: 'none' }}><span><strong>Tài liệu /</strong> Giáo trình học phần Tư tưởng Hồ Chí Minh (bản 2019), Chương IV, mục I, tr.69–75; Slide HCM202 Session 13–17 và Slot 05 (FPT University)</span></a>
            <a href="https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_Mausoleum_in_Hanoi.jpg" target="_blank" rel="noreferrer"><span>Ảnh / Lăng Chủ tịch Hồ Chí Minh (Christophe95)</span></a>
            <a href="https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_1946.jpg" target="_blank" rel="noreferrer"><span>Ảnh / Chân dung Hồ Chí Minh, khoảng 1946</span></a>
            <a href="https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_in_Dong_Khe,_1950.jpg" target="_blank" rel="noreferrer"><span>Ảnh / Chủ tịch Hồ Chí Minh tại mặt trận Đông Khê năm 1950</span></a>
            <a href="https://commons.wikimedia.org/wiki/File:Ho-chi-Minh_with_children_(10).jpg" target="_blank" rel="noreferrer"><span>Ảnh / Chủ tịch Hồ Chí Minh cùng các cháu thiếu nhi</span></a>
            <a href="https://commons.wikimedia.org/wiki/Category:Vietnamese_Declaration_of_Independence" target="_blank" rel="noreferrer"><span>Ảnh / Chủ tịch Hồ Chí Minh và Đại tướng Võ Nguyên Giáp năm 1945</span></a>
            <a href="https://commons.wikimedia.org/wiki/File:Vietnam_Ho_Chi_Minh_(seated,_r)_with_Ton_Duc_Thang_(seated,_l)_and_other_senior_members_of_the_Viet_Minh,_liberated_zone,_northern_Vietnam,_1948._Standing_4th_from_left,_Vo_Nguyen_Giap,_hero_of_Dien_Bien_Phu.jpg" target="_blank" rel="noreferrer"><span>Ảnh / Chủ tịch Hồ Chí Minh và các thành viên Chính phủ Kháng chiến (1948)</span></a>
            <a href="https://commons.wikimedia.org/wiki/File:Dai_hoi_Dang_lan_thu_II.jpg" target="_blank" rel="noreferrer"><span>Ảnh / Đại hội đại biểu toàn quốc lần thứ II của Đảng (1951)</span></a>
            <a href="https://commons.wikimedia.org/wiki/File:Comrade_Nguyen_Ai_Quoc_at_the_age_of_30_in_France.jpg" target="_blank" rel="noreferrer"><span>Ảnh / Nguyễn Ái Quốc tại Pháp (1920)</span></a>
            <a href={drumMotif.source} target="_blank" rel="noreferrer"><span>Họa tiết / Mặt trống đồng Ngọc Lũ · {drumMotif.author}</span></a>
            <a href={dragonMotif.source} target="_blank" rel="noreferrer"><span>Họa tiết / Rồng Việt · {dragonMotif.author}</span></a>
          </div>
        </section>
      </main>
      <footer className="editorial-footer"><div className="footer-top"><span>CHƯƠNG IV · TƯ TƯỞNG HỒ CHÍ MINH VỀ ĐẢNG CỘNG SẢN VIỆT NAM</span><a id="back-top" href="#dau-trang">Trở về điểm bắt đầu</a></div><Link href="/" className="footer-wordmark" aria-label="Dấu ấn — Trang chủ">DẤU ẤN</Link><div className="footer-bottom"><span>BẢN CHẤT VÀ VAI TRÒ LÃNH ĐẠO</span><span>NGƯỜI CẦM LÁI</span></div></footer>
    </div></RouteTransition>
  );
}
