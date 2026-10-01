'use client';

import { useEffect, useRef, useState, type ReactElement } from 'react';

type JourneyStep = Readonly<{
  id: string;
  selector: string;
  code: string;
  label: string;
  progress: number;
  advanceViewport: number;
}>;

type JourneyState = Readonly<{
  activeIndex: number;
  traveling: boolean;
}>;

const journeySteps: ReadonlyArray<JourneyStep> = [
  { id: 'dau-an', selector: '#stage-heritage', code: '01A', label: 'Đảng của giai cấp công nhân và của dân tộc Việt Nam', progress: 0.72, advanceViewport: 0 },
  { id: 'loi-mo-dau', selector: '#gioi-thieu', code: '01B', label: 'Hình ảnh người cầm lái', progress: 0.58, advanceViewport: 0 },
  { id: 'ban-do', selector: '#noi-dung', code: '02A', label: 'Cơ sở lý luận', progress: 0, advanceViewport: 0 },
  { id: 'khoi-nguon', selector: '#stage-chapter-01', code: '02B', label: 'Quy luật của Lênin', progress: 0, advanceViewport: 0.18 },
  { id: 'hanh-trinh', selector: '#stage-chapter-02', code: '02C', label: 'Sáng tạo của Hồ Chí Minh', progress: 0, advanceViewport: 0.18 },
  { id: 'tiep-noi', selector: '#stage-chapter-03', code: '02D', label: 'Vai trò là tất yếu', progress: 0, advanceViewport: 0.18 },
  { id: 'con-nguoi', selector: '#coi-nguon', code: '03', label: 'Bản chất giai cấp và tính dân tộc', progress: 0.08, advanceViewport: 0 },
  { id: 'he-gia-tri', selector: '#hanh-trinh-tu-tuong', code: '04', label: 'Ba vai trò lãnh đạo', progress: 0, advanceViewport: 0 },
  { id: 'chuyen-de-tinh-tat-yeu', selector: '#document-tinh-tat-yeu', code: '05A', label: 'Chuyên đề Tính tất yếu', progress: 0, advanceViewport: 0 },
  { id: 'chuyen-de-ban-chat', selector: '#document-ban-chat-giai-cap', code: '05B', label: 'Chuyên đề Bản chất giai cấp', progress: 0, advanceViewport: 0 },
  { id: 'chuyen-de-vai-tro', selector: '#document-ba-vai-tro', code: '05C', label: 'Chuyên đề Ba vai trò', progress: 0, advanceViewport: 0 },
  { id: 'chuyen-de-dao-duc', selector: '#document-dao-duc-van-minh', code: '05D', label: 'Chuyên đề Đạo đức và văn minh', progress: 0, advanceViewport: 0 },
  { id: 'chuyen-de-xay-dung', selector: '#document-xay-dung-chinh-don', code: '05E', label: 'Chuyên đề Xây dựng và chỉnh đốn', progress: 0, advanceViewport: 0 },
  { id: 'chuyen-de-con-nguoi', selector: '#document-con-nguoi-va-van-dung', code: '05F', label: 'Chuyên đề Con người và vận dụng', progress: 0, advanceViewport: 0 },
  { id: 'hom-nay', selector: '#gia-tri', code: '06', label: 'Vận dụng hiện nay', progress: 0.64, advanceViewport: 0 },
  { id: 'tu-lieu', selector: '#tu-lieu', code: '07', label: 'Kết luận', progress: 0, advanceViewport: 0 },
];

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function getDocumentTop(element: HTMLElement): number {
  let top: number = 0;
  let current: HTMLElement | null = element;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent instanceof HTMLElement ? current.offsetParent : null;
  }
  return top;
}

function getStepTarget(step: JourneyStep, viewportHeight: number): number {
  const element: HTMLElement | null = document.querySelector(step.selector);
  if (!element) throw new Error(`Journey step ${step.code} requires ${step.selector}.`);
  const headerOffset: number = Math.min(96, viewportHeight * 0.12);
  const scrollRange: number = Math.max(0, element.offsetHeight - viewportHeight * 0.82);
  const target: number = getDocumentTop(element) + scrollRange * step.progress + viewportHeight * step.advanceViewport - headerOffset;
  const maximum: number = document.documentElement.scrollHeight - viewportHeight;
  return Math.min(maximum, Math.max(0, target));
}

/** Scrubs every scene and provides guided travel through all intermediate frames. */
export function EditorialMotion(): ReactElement {
  const [paused, setPaused] = useState<boolean>(false);
  const [journey, setJourney] = useState<JourneyState>({ activeIndex: -1, traveling: false });
  const travelEndRef = useRef<(() => void) | null>(null);
  const travelTimeoutRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(-1);
  const travelingRef = useRef<boolean>(false);
  const stepPositionsRef = useRef<ReadonlyArray<number>>([]);

  const cancelTravel = (): void => {
    if (travelEndRef.current) window.removeEventListener('scrollend', travelEndRef.current);
    travelEndRef.current = null;
    window.clearTimeout(travelTimeoutRef.current);
    travelTimeoutRef.current = 0;
    document.documentElement.classList.remove('guided-scrolling');
    if (travelingRef.current) {
      window.scrollTo({ top: window.scrollY, behavior: 'instant' });
      travelingRef.current = false;
      setJourney((current) => ({ ...current, traveling: false }));
    }
  };

  const travelTo = (index: number): void => {
    cancelTravel();
    const destination: number = index === -1 ? 0 : getStepTarget(journeySteps[index], window.innerHeight);
    const origin: number = window.scrollY;
    const distance: number = destination - origin;
    const reduced: boolean = paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || Math.abs(distance) < 2) {
      window.scrollTo({ top: destination, behavior: 'instant' });
      document.documentElement.classList.remove('guided-scrolling');
      activeIndexRef.current = index;
      setJourney({ activeIndex: index, traveling: false });
      return;
    }

    document.documentElement.classList.add('guided-scrolling');
    travelingRef.current = true;
    setJourney((current) => ({ ...current, traveling: true }));

    const finishTravel = (): void => {
      if (!travelingRef.current) return;
      if (travelEndRef.current) window.removeEventListener('scrollend', travelEndRef.current);
      travelEndRef.current = null;
      window.clearTimeout(travelTimeoutRef.current);
      travelTimeoutRef.current = 0;
      window.scrollTo({ top: destination, behavior: 'instant' });
      travelingRef.current = false;
      document.documentElement.classList.remove('guided-scrolling');
      activeIndexRef.current = index;
      setJourney({ activeIndex: index, traveling: false });
      const hash: string = index === -1 ? '#dau-trang' : `#${journeySteps[index].id}`;
      window.history.replaceState(null, '', hash);
    };
    travelEndRef.current = finishTravel;
    window.addEventListener('scrollend', finishTravel, { once: true });
    travelTimeoutRef.current = window.setTimeout(finishTravel, 1800);
    window.scrollTo({ top: destination, behavior: 'smooth' });
  };

  const travelNext = (): void => {
    if (journey.traveling) return;
    const nextIndex: number = journey.activeIndex >= journeySteps.length - 1 ? -1 : journey.activeIndex + 1;
    travelTo(nextIndex);
  };

  useEffect(() => {
    const root: HTMLElement | null = document.querySelector('.editorial');
    if (!root) throw new Error('EditorialMotion requires the .editorial page container.');

    const media: MediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scenes: HTMLElement[] = Array.from(root.querySelectorAll('[data-scene]'));
    const words: HTMLElement[] = Array.from(root.querySelectorAll('[data-reading-word]'));
    const cards: HTMLElement[] = Array.from(root.querySelectorAll('[data-stack-card]'));
    let frame: number = 0;
    let previousTurn: number = Number.NaN;

    const measureSteps = (): void => {
      const routeIsLeaving: boolean = !root.isConnected || journeySteps.some((step) => !root.querySelector(step.selector));
      if (routeIsLeaving) return;
      stepPositionsRef.current = journeySteps.map((step) => getStepTarget(step, window.innerHeight));
    };
    const update = (): void => {
      if (!root.isConnected) {
        frame = 0;
        return;
      }
      const reduced: boolean = paused || media.matches;
      const height: number = window.innerHeight;
      const sceneBounds: DOMRect[] = scenes.map((scene) => scene.getBoundingClientRect());
      const cardBounds: DOMRect[] = cards.map((card) => card.getBoundingClientRect());
      root.classList.toggle('motion-ready', !reduced);
      root.classList.toggle('motion-paused', reduced);
      root.classList.toggle('has-scrolled', window.scrollY > 100);
      root.classList.toggle('is-guided-travel', travelingRef.current);
      const turn: number = reduced ? 0 : window.scrollY * 0.045;
      if (Number.isNaN(previousTurn) || Math.abs(turn - previousTurn) >= 0.75) {
        root.style.setProperty('--turn', `${turn}deg`);
        previousTurn = turn;
      }

      scenes.forEach((scene, index) => {
        const bounds: DOMRect = sceneBounds[index];
        const nearViewport: boolean = bounds.bottom >= -height * 0.35 && bounds.top <= height * 1.35;
        scene.classList.toggle('is-scene-near', nearViewport);
        if (!nearViewport) return;
        const progress: number = clamp((height * 0.78 - bounds.top) / (bounds.height + height * 0.12));
        const pinned: number = clamp((100 - bounds.top) / Math.max(1, bounds.height - height * 0.82));
        scene.style.setProperty('--scene', String(reduced ? 1 : progress));
        scene.style.setProperty('--pinned', String(reduced ? 1 : pinned));
        if (scene.dataset.scene === 'reading') {
          const reading: number = clamp((height * 0.25 - bounds.top) / (bounds.height - height * 0.7));
          words.forEach((word, wordIndex) => {
            word.style.setProperty('--word-fill', `${(reduced ? 1 : clamp(reading * (words.length + 2) - wordIndex)) * 100}%`);
          });
        }
      });
      cards.forEach((card, index) => {
        const bounds: DOMRect = cardBounds[index];
        if (bounds.bottom < -height * 0.35 || bounds.top > height * 1.35) return;
        const next: DOMRect | undefined = cardBounds[index + 1];
        const covered: number = next ? clamp((height * 0.75 - next.top) / (height * 0.5)) : 0;
        card.style.setProperty('--covered', String(reduced ? 0 : covered));
      });
      if (!travelingRef.current) {
        const active: number = stepPositionsRef.current.reduce((latest, position, index) => window.scrollY + height * 0.22 >= position ? index : latest, -1);
        if (active !== activeIndexRef.current) {
          activeIndexRef.current = active;
          setJourney({ activeIndex: active, traveling: false });
        }
      }
      frame = 0;
    };
    const schedule = (): void => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };
    const measureAndSchedule = (): void => {
      measureSteps();
      schedule();
    };
    const interruptTravel = (): void => {
      if (travelingRef.current) cancelTravel();
    };
    const interruptWithKeyboard = (event: KeyboardEvent): void => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) interruptTravel();
    };
    const resizeObserver: ResizeObserver = new ResizeObserver(measureAndSchedule);
    resizeObserver.observe(root);
    measureSteps();
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measureAndSchedule);
    window.addEventListener('wheel', interruptTravel, { passive: true });
    window.addEventListener('touchstart', interruptTravel, { passive: true });
    window.addEventListener('keydown', interruptWithKeyboard);
    media.addEventListener('change', measureAndSchedule);
    return () => {
      window.cancelAnimationFrame(frame);
      if (travelEndRef.current) window.removeEventListener('scrollend', travelEndRef.current);
      window.clearTimeout(travelTimeoutRef.current);
      document.documentElement.classList.remove('guided-scrolling');
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measureAndSchedule);
      window.removeEventListener('wheel', interruptTravel);
      window.removeEventListener('touchstart', interruptTravel);
      window.removeEventListener('keydown', interruptWithKeyboard);
      media.removeEventListener('change', measureAndSchedule);
      root.classList.remove('motion-ready', 'motion-paused', 'has-scrolled', 'is-guided-travel');
    };
  }, [paused]);

  const nextIndex: number = journey.activeIndex >= journeySteps.length - 1 ? -1 : journey.activeIndex + 1;
  const nextStep: JourneyStep | null = nextIndex === -1 ? null : journeySteps[nextIndex];
  const progress: number = journey.activeIndex < 0 ? 0 : (journey.activeIndex + 1) / journeySteps.length;

  return (
    <>
      <span className={`journey-wash${journey.traveling ? ' is-active' : ''}`} aria-hidden="true" />
      <nav className="chapter-rail" aria-label="Đi đến chặng nội dung">
        {journeySteps.map((step, index) => (
          <button id={`rail-${step.id}`} key={step.id} type="button" aria-label={`Đi đến ${step.label}`} aria-current={journey.activeIndex === index ? 'step' : undefined} onClick={() => travelTo(index)}>
            <span className="rail-label">{step.label}</span><span className="rail-number">{step.code}</span><i />
          </button>
        ))}
      </nav>
      <div className={`journey-control${journey.traveling ? ' is-traveling' : ''}`} aria-live="polite">
        <div className="journey-status">
          <span className="journey-count">{journey.activeIndex < 0 ? '00' : String(journey.activeIndex + 1).padStart(2, '0')} / {journeySteps.length}</span>
          <span className="journey-progress" aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></span>
          <span className="journey-caption">{journey.traveling ? 'Đang chuyển cảnh…' : nextStep ? `Tiếp theo · ${nextStep.code} ${nextStep.label}` : 'Đã đi hết hành trình'}</span>
        </div>
        <button id="journey-next" className="journey-next" type="button" disabled={journey.traveling} onClick={travelNext}>
          <span>{journey.traveling ? 'ĐANG ĐI' : nextStep ? journey.activeIndex < 0 ? 'BẮT ĐẦU' : 'TIẾP THEO' : 'VỀ ĐẦU'}</span>
        </button>
      </div>
      <button id="motion-toggle" className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? 'Khôi phục hiệu ứng' : 'Giảm chuyển động'}
      </button>
    </>
  );
}
