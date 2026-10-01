'use client';

import { useEffect, type ReactElement } from 'react';
import { usePathname } from 'next/navigation';

/** Adds progressive scroll effects while leaving content readable without JavaScript. */
export function ScrollEffects(): ReactElement {
  const pathname: string = usePathname();

  useEffect(() => {
    const reducedMotion: MediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll('[data-reveal]');
    const progressBar: HTMLElement | null = document.querySelector('.reading-progress');
    const heroPhoto: HTMLElement | null = document.querySelector('.hero-photo, .cinema-photo, .topic-hero-photo');
    const livingSurface: HTMLElement | null = document.querySelector('.living-surface');
    const observer: IntersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => {
      if (!reducedMotion.matches) element.classList.add('will-reveal');
      observer.observe(element);
    });
    let frame: number = 0;
    const updateScroll = (): void => {
      const scrollable: number = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar) progressBar.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
      if (heroPhoto) heroPhoto.style.setProperty('--hero-offset', `${reducedMotion.matches ? 0 : Math.min(window.scrollY * 0.16, 160)}px`);
      if (livingSurface) livingSurface.style.setProperty('--alive-scroll', `${reducedMotion.matches ? 0 : window.scrollY * 0.025}px`);
      frame = 0;
    };
    const onScroll = (): void => {
      if (frame === 0) frame = window.requestAnimationFrame(updateScroll);
    };
    const onMotionChange = (): void => {
      elements.forEach((element) => element.classList.remove('will-reveal'));
      updateScroll();
    };
    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    reducedMotion.addEventListener('change', onMotionChange);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reducedMotion.removeEventListener('change', onMotionChange);
      elements.forEach((element) => element.classList.remove('will-reveal'));
    };
  }, [pathname]);

  return <><div className="reading-progress" aria-hidden="true" /><div key={pathname} className="living-surface" aria-hidden="true"><span className="living-aurora" /><span className="living-grain" /></div></>;
}
