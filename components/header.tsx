import Link from 'next/link';
import type { ReactElement } from 'react';

export function Header({ current }: { current: 'editorial' | 'journey' }): ReactElement {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Dấu ấn — Trang chủ">DẤU ẤN<span className="brand-sub">HỒ CHÍ MINH</span></Link>
      <nav className="main-nav" aria-label="Điều hướng chính">
        <a href="#gioi-thieu">Giới thiệu</a><a href="#noi-dung">Khám phá</a><a href="#tu-lieu">Tư liệu</a>
      </nav>
      {current === 'editorial' ? <a id="header-explore" className="header-explore" href="#noi-dung">Khám phá môn học</a> : <div className="template-switch" aria-label="Chọn trang mẫu">
        <Link id="sample-one" href="/">Mẫu 01</Link>
        <Link id="sample-two" href="/hanh-trinh" aria-current="page">Mẫu 02</Link>
      </div>}
    </header>
  );
}
