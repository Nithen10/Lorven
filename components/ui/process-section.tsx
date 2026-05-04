'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import { Noise } from './background-noise';

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
    title: 'DISCOVER',
    body: 'We meet with your team to learn your storytelling vision and map where AI — across scripts, storyboards, pitches, and workflows — can accelerate your pipeline.',
    icon: <DiscoverIcon />,
  },
  {
    title: 'DESIGN',
    body: 'We architect an end-to-end AI system bringing scripting, scene visualization, pitch decks, and production workflows together — tailored to your creative direction.',
    icon: <DesignIcon />,
  },
  {
    title: 'BUILD',
    body: 'Our team develops and integrates the full toolkit — from script generation and visual frames to pitch craft and workflow automation — built around your process.',
    icon: <BuildIcon />,
  },
  {
    title: 'LAUNCH',
    body: 'We deploy the suite, train your team, and continuously refine every tool so your production pipeline keeps accelerating release after release.',
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
  const base = 'absolute w-7 h-7 border-white/45 pointer-events-none';
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
}

function ProcessCard({ step, index, total, progress, range }: ProcessCardProps) {
  const opacityRaw = useTransform(progress, range, [0, 1]);
  const yRaw = useTransform(progress, range, [120, 0]);
  const scaleRaw = useTransform(progress, range, [0.92, 1]);
  const opacity = useSpring(opacityRaw, SPRING);
  const y = useSpring(yRaw, SPRING);
  const scale = useSpring(scaleRaw, SPRING);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative w-full aspect-[4/5]"
    >
      <CornerBrackets />
      <div className="absolute inset-5 rounded-2xl border border-white/[0.08] px-6 lg:px-8 py-8 flex flex-col items-center text-center bg-[linear-gradient(180deg,rgba(13,13,13,0.92),rgba(10,10,10,0.85))] backdrop-blur-[2px] shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
        <div className="w-full flex items-center justify-end text-[10px] tracking-[0.28em] uppercase">
          <span className="text-[#70befa]/70 font-semibold">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center text-white/60">
          {step.icon}
        </div>
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-wide uppercase text-white">
            {step.title}
          </h3>
          <p className="text-sm lg:text-base leading-relaxed text-[#9c9c9c] max-w-[28ch]">
            {step.body}
          </p>
        </div>
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

  return (
    <section ref={ref} id="process" className="relative h-[450vh]">
      <div className="sticky top-0 h-screen w-screen overflow-hidden z-10 flex flex-col items-center justify-center">
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
              left: '-18vw',
              bottom: '12vh',
              width: '64vw',
              height: '50vh',
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
          <Noise patternRefreshInterval={2} patternAlpha={14} />
        </div>

        <div className="relative text-center max-w-5xl px-5 md:px-10">
          <span className="text-xs md:text-sm tracking-[0.32em] uppercase text-[#70befa] font-semibold">
            How it works
          </span>
          <h2 className="mt-5 text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-white leading-[0.95] tracking-tight">
            From Script to Screen
          </h2>
          <p className="mt-6 text-xs md:text-sm tracking-[0.24em] uppercase text-[#9c9c9c]">
            Crafting your AI-powered storytelling pipeline
          </p>
        </div>

        <div className="relative mt-12 lg:mt-16 w-full px-6 md:px-10 lg:px-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STEPS.map((step, i) => (
            <ProcessCard
              key={step.title}
              step={step}
              index={i}
              total={STEPS.length}
              progress={scrollYProgress}
              range={RANGES[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
