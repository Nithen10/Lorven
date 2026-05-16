'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '@/app/SmoothScroll';
import { Noise } from './background-noise';

// useLayoutEffect on the client, useEffect on the server — avoids the SSR warning
// while keeping pre-paint timing where it matters.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Step = {
  title: string;
  body: string;
  icon: ReactNode;
};

const DiscoverIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m21 21-5.5-5.5" />
    <path d="M10.5 7v3.5h3.5" />
  </svg>
);

const DesignIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 19 4 21l2-8 11-11 6 6Z" />
    <path d="m14 6 4 4" />
    <path d="M9 16h6" />
  </svg>
);

const BuildIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m8 17-5-5 5-5" />
    <path d="m16 7 5 5-5 5" />
    <path d="m14 4-4 16" />
  </svg>
);

const LaunchIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.85-.85 1-2.15.34-3.16a2 2 0 0 0-3.18-.34Z" />
    <path d="M15 12c4.5-4.5 5-10 5-10s-5.5.5-10 5c-2 2-3.5 4.5-4 7l2 2c2.5-.5 5-2 7-4Z" />
    <path d="M9 12H5l3-3h3" />
    <path d="M12 15v4l3-3v-3" />
    <circle cx="15" cy="9" r="1" />
  </svg>
);

const STEPS: Step[] = [
  {
    title: 'UPLOAD',
    body: 'Bring whatever you already have. A logline, a screenplay, a scene description, a production plan, or a pitch concept. Rough notes are fine too. The more context you share, the closer the first version feels to your voice.',
    icon: <DiscoverIcon />,
  },
  {
    title: 'GENERATE',
    body: 'Lorven turns what you brought in into a real first version. A screenplay draft, storyboard frames, a connected workflow, or a pitch-ready deck. You start from something you can actually shape, not a blank page.',
    icon: <DesignIcon />,
  },
  {
    title: 'REFINE',
    body: 'Shape the draft the way you want it. Adjust the tone, retake a frame, restructure a scene, swap references, or rewire a workflow step. Changes happen quickly, so your team stays in flow.',
    icon: <BuildIcon />,
  },
  {
    title: 'DELIVER',
    body: 'Take the finished work into the next stage. Production, review, or the pitch room. It arrives polished, ready to use, and fits the way your studio already works.',
    icon: <LaunchIcon />,
  },
];

const RANGES: Array<[number, number]> = [
  [0.06, 0.22],
  [0.28, 0.44],
  [0.50, 0.66],
  [0.72, 0.88],
];

const SPRING = { stiffness: 90, damping: 26, mass: 0.6 };

function CornerBrackets() {
  const base = 'absolute w-5 h-5 sm:w-7 sm:h-7 border-white/45 pointer-events-none';
  return (
    <>
      <span className={`${base} top-0 left-0 border-l-2 border-t-2`} />
      <span className={`${base} top-0 right-0 border-r-2 border-t-2`} />
      <span className={`${base} bottom-0 left-0 border-l-2 border-b-2`} />
      <span className={`${base} bottom-0 right-0 border-r-2 border-b-2`} />
    </>
  );
}

interface ProcessCardProps {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  locked: boolean;
}

function ProcessCard({ step, index, total, progress, range, locked }: ProcessCardProps) {
  const opacityRaw = useTransform(progress, range, [0, 1]);
  const yRaw = useTransform(progress, range, [120, 0]);
  const scaleRaw = useTransform(progress, range, [0.92, 1]);
  const opacity = useSpring(opacityRaw, SPRING);
  const y = useSpring(yRaw, SPRING);
  const scale = useSpring(scaleRaw, SPRING);

  const motionStyle =
    index === 0 || locked ? { opacity: 1, y: 0, scale: 1 } : { opacity, y, scale };

  return (
    <motion.div
      style={motionStyle}
      className="relative w-full max-w-sm mx-auto sm:max-w-none sm:mx-0 aspect-[4/5] xl:max-[2559px]:aspect-[2/3]!"
    >
      <CornerBrackets />
      <div className="absolute inset-5 rounded-2xl border border-white/[0.08] px-4 sm:px-6 md:px-7 lg:px-8 py-8 flex flex-col items-center text-center bg-[linear-gradient(180deg,rgba(13,13,13,0.92),rgba(10,10,10,0.85))] backdrop-blur-[2px] shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
        <div className="w-full flex items-center justify-end text-[10px] tracking-[0.28em] uppercase">
          <span className="text-[#70befa]/70 font-semibold">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <div className="mt-8 md:mt-10 lg:mt-12 xl:max-[2559px]:mt-6! h-12 md:h-14 lg:h-16 xl:max-[2559px]:h-12! flex items-center justify-center text-white/60">
          {step.icon}
        </div>
        <h3 className="mt-auto text-3xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl xl:max-[2559px]:text-2xl! min-[2560px]:text-6xl min-[3200px]:text-7xl font-semibold tracking-wide uppercase text-white">
          {step.title}
        </h3>
        <p
          className="mt-3 md:mt-4 text-[14px] sm:text-[13px] md:text-sm lg:text-[13px] xl:text-sm 2xl:text-[15px] 3xl:text-base xl:max-[2559px]:text-[12px]! min-[2560px]:text-lg min-[3200px]:text-xl leading-relaxed tracking-[0.015em] text-white/85 max-w-[28ch] min-h-32 md:min-h-36 lg:min-h-40 2xl:min-h-44 3xl:min-h-52 xl:max-[2559px]:min-h-28! min-[2560px]:min-h-60"
          style={{ fontFamily: '"Neue Montreal", "Inter", sans-serif', fontWeight: 400 }}
        >
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const [hasFullyRevealed, setHasFullyRevealed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const initialMountCollapseRef = useRef(false);

  // Below md (<768px) the pinned-narrative is replaced with a normal vertical
  // flow — section auto-heights and each card renders in its final visible
  // state. Saves a 300vh scroll budget and avoids the sticky-pin glitches on
  // small browsers / Android URL-bar dance.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // If the user landed past this section on initial mount (browser scroll
  // restoration after a reload, or a hash anchor like #faq / #contact), collapse
  // synchronously *without* the scroll-compensation that the natural scroll-through
  // path uses. The browser-restored scrollY was saved on a previous visit when
  // Process was already collapsed — i.e., it's already in the post-collapse
  // coordinate space. Compensating would push the user ~200vh backward and dump
  // them inside the Products stack (visually around CineFlow).
  useIsoLayoutEffect(() => {
    const sectionEl = ref.current;
    if (!sectionEl) return;

    const rect = sectionEl.getBoundingClientRect();
    if (rect.bottom > 0) return;

    initialMountCollapseRef.current = true;
    setHasFullyRevealed(true);
    setIsCollapsed(true);
  }, []);

  // Runs after the collapse re-render commits but before paint. The layout has
  // shrunk by ~200vh. If we got here via a hash anchor, the browser scrolled to
  // the anchor's pre-collapse offset — that target may now be past the document
  // end (clamped) or simply pointing at the wrong content. Re-resolve it against
  // the collapsed layout. For non-hash reloads the browser-preserved scrollY is
  // already correct, so no scroll change is needed.
  useIsoLayoutEffect(() => {
    if (!isCollapsed || !initialMountCollapseRef.current) return;
    initialMountCollapseRef.current = false;

    if (window.location.hash) {
      try {
        const target = document.querySelector(window.location.hash);
        if (target instanceof HTMLElement) {
          const targetY = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, targetY);
        }
      } catch {
        // Invalid CSS selector in hash, ignore.
      }
    }

    ScrollTrigger.refresh();
  }, [isCollapsed]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.9 && !hasFullyRevealed) {
      setHasFullyRevealed(true);
    }
  });

  // Lets the global anchor-click handler (in SmoothScroll) collapse Process
  // synchronously *before* the navigation scroll begins, so the target offset
  // is computed against the final layout. We don't run scroll compensation
  // here — the click handler will do the actual scroll itself. The existing
  // IntersectionObserver useEffect will bail because isCollapsed is true.
  useEffect(() => {
    const onForceCollapse = () => {
      if (isCollapsed) return;
      setHasFullyRevealed(true);
      setIsCollapsed(true);
    };
    window.addEventListener('force-process-collapse', onForceCollapse);
    return () => window.removeEventListener('force-process-collapse', onForceCollapse);
  }, [isCollapsed]);

  useEffect(() => {
    if (!hasFullyRevealed || isCollapsed) return;
    const sectionEl = ref.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) return;
        const isBelow = entry.boundingClientRect.bottom <= 0;
        const oldHeight = sectionEl.offsetHeight;

        setIsCollapsed(true);

        if (isBelow) {
          requestAnimationFrame(() => {
            const newHeight = sectionEl.offsetHeight;
            const delta = newHeight - oldHeight;
            const lenis = getLenis();
            const target = window.scrollY + delta;
            if (lenis) {
              // Route through Lenis so its targetScroll stays in sync with the
              // post-collapse actualScroll. Otherwise the next wheel-notch lerps
              // from the stale pre-collapse target and skips ~200vh of Products.
              lenis.scrollTo(target, { immediate: true, force: true, lock: true });
              ScrollTrigger.refresh();
            } else {
              window.scrollBy(0, delta);
            }
          });
        }
        observer.disconnect();
      },
      { threshold: 0 },
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [hasFullyRevealed, isCollapsed]);

  return (
    <section
      ref={ref}
      id="process"
      className={`relative ${
        isMobile ? '' : isCollapsed ? 'h-svh' : 'h-[300vh]'
      }`}
    >
      <div
        className={`${
          isMobile
            ? 'relative w-full overflow-hidden py-20'
            : 'sticky top-0 h-svh w-screen overflow-hidden'
        } z-10 flex flex-col items-center justify-center`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background:
              'radial-gradient(50% 24% at 50% 0%, rgba(112, 190, 250, 0.16), rgba(10, 10, 10, 0) 78%), #0a0a0a',
          }}
        >
          <div
            className="absolute"
            style={{
              left: '-12vw',
              bottom: '8%',
              width: 'min(64vw, 900px)',
              height: 'min(50vh, 480px)',
              filter: 'blur(8px)',
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(80, 176, 250, 0.13), rgba(10, 10, 10, 0) 72%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              maskImage:
                'radial-gradient(ellipse 100% 100% at 50% 50%, black 70%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 100% 100% at 50% 50%, black 70%, transparent 100%)',
            }}
          />
          <Noise patternRefreshInterval={3} patternAlpha={6} />
        </div>

        <div className="relative text-center max-w-5xl px-5 md:px-10">
          <span className="text-xs md:text-sm tracking-[0.32em] uppercase text-[#70befa] font-semibold">
            How it works
          </span>
          <h2
            className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[0.95] tracking-tight"
            style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(90deg, #fff 20%, #70befa 92%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            From Script to<br /> Screen
          </h2>
          <p className="mt-4 md:mt-5 text-[10px] md:text-xs tracking-[0.24em] uppercase text-[#9c9c9c]">
            One workflow. Every Lorven product follows it.
          </p>
        </div>

        <div className="relative mt-8 md:mt-10 lg:mt-12 w-full px-4 sm:px-6 md:px-10 lg:px-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
          {STEPS.map((step, i) => (
            <ProcessCard
              key={step.title}
              step={step}
              index={i}
              total={STEPS.length}
              progress={scrollYProgress}
              range={RANGES[i]}
              locked={hasFullyRevealed || isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
