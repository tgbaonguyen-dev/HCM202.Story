import type { Metadata } from 'next';
import type { ReactNode, ReactElement } from 'react';
import { Be_Vietnam_Pro, Playfair_Display } from 'next/font/google';
import { ScrollEffects } from '@/components/scroll-effects';
import { VietnameseMotif } from '@/components/vietnamese-motif';
import { WatercolorLotus } from '@/components/watercolor-lotus';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  icons: { icon: '/images/portrait.jpg' },
  title: { default: 'HCM202', template: '%s | HCM202' },
  description: 'Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam: bản chất và vai trò lãnh đạo “người cầm lái”.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): ReactElement {
  return <html lang="vi" data-scroll-behavior="smooth" className={`${beVietnamPro.variable} ${playfairDisplay.variable}`}><body><a className="skip-link" href="#main">Đến nội dung chính</a><div className="heritage-underlay" aria-hidden="true"><VietnameseMotif kind="drum" className="heritage-drum-background" /><WatercolorLotus className="heritage-watercolor-background" /></div><ScrollEffects />{children}</body></html>;
}
