import type { Metadata } from 'next';
import type { ReactNode, ReactElement } from 'react';
import { ScrollEffects } from '@/components/scroll-effects';
import { VietnameseMotif } from '@/components/vietnamese-motif';
import { WatercolorLotus } from '@/components/watercolor-lotus';
import './globals.css';

export const metadata: Metadata = {
  icons: { icon: '/images/portrait.jpg' },
  title: { default: 'Đảng của giai cấp công nhân và của dân tộc Việt Nam', template: '%s | Dấu ấn' },
  description: 'Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam: bản chất và vai trò lãnh đạo “người cầm lái”.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): ReactElement {
  return <html lang="vi" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main">Đến nội dung chính</a><div className="heritage-underlay" aria-hidden="true"><VietnameseMotif kind="drum" className="heritage-drum-background" /><WatercolorLotus className="heritage-watercolor-background" /></div><ScrollEffects />{children}</body></html>;
}
