import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { CSSProperties, ReactElement } from 'react';
import { ArchivePhoto } from '@/components/archive-photo';
import { RouteTransition } from '@/components/route-transition';
import { VietnameseMotif } from '@/components/vietnamese-motif';
import type { Topic } from '@/lib/topics';
import { topics } from '@/lib/topics';

type TopicStyle = CSSProperties & Readonly<{
  '--topic-accent': string;
  '--topic-surface': string;
}>;

export function TopicPage({ topic, nextTopic }: { topic: Topic; nextTopic: Topic }): ReactElement {
  const style: TopicStyle = { '--topic-accent': topic.accent, '--topic-surface': topic.surface };

  return (
    <RouteTransition transitionKey={topic.slug}><div className="topic-page" style={style}>
      <header className="topic-header">
        <Link className="brand" href="/" transitionTypes={['nav-back']} aria-label="Dấu ấn — Trang chủ">DẤU ẤN<span className="brand-sub">HỒ CHÍ MINH</span></Link>
        <nav aria-label="Điều hướng chuyên đề"><Link href="/#noi-dung" transitionTypes={['nav-back']}>Tổng quan</Link><Link href="/#chuyen-de" transitionTypes={['nav-back']}>Chuyên đề</Link><Link href="/#tu-lieu" transitionTypes={['nav-back']}>Tư liệu</Link></nav>
        <span className="topic-header-index">{topic.index} / {topics.length.toString().padStart(2, '0')}</span>
      </header>

      <main id="main" className="topic-main">
        <section className="topic-hero" aria-labelledby="topic-heading">
          <div className="topic-hero-copy">
            <div className="eyebrow">{topic.eyebrow}</div>
            <h1 id="topic-heading"><span>{topic.title}</span><em>{topic.italicTitle}</em></h1>
            <p>{topic.lead}</p>
            <a className="topic-scroll" href="#noi-dung-chinh">Đọc chuyên đề</a>
          </div>
          <div className="topic-image-stage">
            <ArchivePhoto photo={topic.image} className="topic-hero-photo" priority={true} />
          </div>
          <div className="topic-hero-meta"><span>HCM202 / DẤU ẤN</span><span>CUỘN ĐỂ KHÁM PHÁ</span></div>
        </section>

        <section id="noi-dung-chinh" className="topic-document">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{topic.sourceMarkdown}</ReactMarkdown>
        </section>

        <section id="chuyen-de" className="topic-directory">
          <VietnameseMotif kind="dragon" className="motif-topic-directory-dragon" />
          <div className="topic-directory-heading" data-reveal><div className="eyebrow">MỤC LỤC CHUYÊN ĐỀ</div><h2>Nội dung Chương IV<br /><em>Sáu chuyên đề</em></h2></div>
          <div className="topic-directory-list">
            {topics.map((item) => <Link key={item.slug} className={item.slug === topic.slug ? 'is-current' : undefined} href={`/chuyen-de/${item.slug}`} transitionTypes={['topic-swap']}><span>{item.index}</span><strong>{item.eyebrow}</strong></Link>)}
          </div>
        </section>

        <section className="topic-next" style={{ '--next-surface': nextTopic.surface, '--next-accent': nextTopic.accent } as CSSProperties}>
          <span className="micro">TIẾP THEO · {nextTopic.index}</span>
          <Link id="next-topic" href={`/chuyen-de/${nextTopic.slug}`} transitionTypes={['topic-forward']}><span>{nextTopic.title}<br /><em>{nextTopic.italicTitle}</em></span></Link>
        </section>
      </main>

      <footer className="topic-footer"><Link href="/" transitionTypes={['nav-back']} className="footer-logo">DẤU ẤN</Link><span>Chương IV · Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam</span><a href="#main">Về đầu trang</a></footer>
    </div></RouteTransition>
  );
}
