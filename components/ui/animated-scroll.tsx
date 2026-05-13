'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type Lenis from 'lenis';
import { getLenis } from '@/app/SmoothScroll';
import { ServiceStepsAccordion } from './service-steps-accordion';

type Service = {
  title: string;
  body: string;
  tags: string[];
  steps: { title: string; body: string }[];
  image: string;
  alt: string;
};

interface AnimatedScrollProps {
  services: Service[];
}

const T = 0.05;
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const getServiceProgress = (index: number, total: number) =>
  total <= 1 ? 0 : index / (total - 1);

const getServiceBoundary = (index: number, total: number) => {
  const current = getServiceProgress(index, total);
  const next = getServiceProgress(index + 1, total);
  return (current + next) / 2;
};

interface ServiceFrameProps {
  service: Service;
  index: number;
  isActive: boolean;
  total: number;
  progress: MotionValue<number>;
}

function ServiceFrame({ service, index, isActive, total, progress }: ServiceFrameProps) {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const enterBoundary = isFirst ? 0 : getServiceBoundary(index - 1, total);
  const exitBoundary = isLast ? 1 : getServiceBoundary(index, total);

  const imageInputs = [
    clamp01(enterBoundary - T / 2),
    clamp01(enterBoundary + T / 2),
    clamp01(exitBoundary - T / 2),
    clamp01(exitBoundary + T / 2),
  ];

  const imageOuts = [isFirst ? 0 : 100, 0, 0, isLast ? 0 : 100];
  const contentOuts = [isFirst ? 0 : -100, 0, 0, isLast ? 0 : -100];

  const imageRaw = useTransform(progress, imageInputs, imageOuts);
  const contentRaw = useTransform(progress, imageInputs, contentOuts);
  const imageTransform = useTransform(imageRaw, (v) => `translateY(${v}%)`);
  const contentTransform = useTransform(contentRaw, (v) => `translateY(${v}%)`);
  const imageLeft = index % 2 === 0;

  const serviceNumber = String(index + 1).padStart(2, '0');
  const contentTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };
  const beamTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <motion.div
        className={`absolute top-0 ${imageLeft ? 'left-0' : 'left-1/2'} w-1/2 h-full will-change-transform`}
        style={{ transform: imageTransform }}
      >
        <img
          src={service.image}
          alt={service.alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading={index < 2 ? 'eager' : 'lazy'}
          draggable={false}
        />
      </motion.div>
      <motion.div
        className={`absolute top-0 ${imageLeft ? 'left-1/2' : 'left-0'} w-1/2 h-full will-change-transform`}
        style={{ transform: contentTransform }}
      >
        <div className="relative h-full w-full overflow-hidden px-10 md:px-14 lg:px-16 py-[10vh]">
          <motion.div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-[8vh] ${imageLeft ? 'left-6 right-0' : 'left-0 right-6'}`}
            initial={false}
            animate={{
              opacity: isActive ? 0.75 : 0,
              x: isActive ? 0 : imageLeft ? -24 : 24,
            }}
            transition={beamTransition}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(68% 58% at 50% 34%, rgba(112, 190, 250, 0.14), rgba(112, 190, 250, 0.06) 42%, rgba(10, 10, 10, 0) 78%)',
              }}
            />
            <div
              className="absolute inset-x-[12%] top-[16%] h-[1px]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(112, 190, 250, 0), rgba(112, 190, 250, 0.35), rgba(255,255,255,0.12), rgba(112, 190, 250, 0))',
              }}
            />
          </motion.div>

          <motion.div
            aria-hidden="true"
            className={`pointer-events-none absolute top-[14vh] text-[11rem] md:text-[13rem] lg:text-[15rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.055] ${imageLeft ? 'right-[-1.5rem]' : 'left-[-1.75rem]'
              }`}
            initial={false}
            animate={{
              opacity: isActive ? 0.1 : 0,
              y: isActive ? 0 : 40,
            }}
            transition={beamTransition}
          >
            {serviceNumber}
          </motion.div>

          <div className="relative flex flex-col h-full justify-center">
            <motion.div
              className="max-w-[37rem] relative top-[-3vh]"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 18,
              }}
              transition={contentTransition}
            >
              <span className="block text-xs tracking-[0.22em] uppercase text-[#70befa]">
                {serviceNumber} / {String(total).padStart(2, '0')}
              </span>
            </motion.div>

            <div className="relative mt-10">
              <motion.h3
                className="whitespace-nowrap font-medium leading-[1.05] tracking-[-0.04em] pb-[0.05em] relative top-[-3vh]"
                style={{
                  fontFamily: '"Inter Tight", "Inter", sans-serif',
                  fontSize: 'clamp(1.75rem, 2.6vw, 3.75rem)',
                }}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 28,
                }}
                transition={contentTransition}
              >
                <span className="services-title-gradient">{service.title}</span>
              </motion.h3>
              <motion.div
                aria-hidden="true"
                className="mt-6 h-px max-w-[37rem] origin-left"
                initial={false}
                animate={{ scaleX: isActive ? 1 : 0.15, opacity: isActive ? 1 : 0 }}
                transition={contentTransition}
                style={{
                  background:
                    'linear-gradient(90deg, rgba(112, 190, 250, 0.5), rgba(255,255,255,0.12) 42%, rgba(255,255,255,0.04) 75%, rgba(255,255,255,0))',
                }}
              />
              <motion.p
                className="mt-8 max-w-[52rem] uppercase text-[#d4d4d4]"
                initial={false}
                animate={{
                  opacity: isActive ? 0.92 : 0,
                  y: isActive ? 0 : 34,
                }}
                transition={{ ...contentTransition, delay: isActive ? 0.04 : 0 }}
                style={{
                  fontFamily: '"Inter Tight", "Inter", sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(0.95rem, 1.05vw, 1.2rem)',
                  lineHeight: 1.32,
                  letterSpacing: '0.005em',
                  textAlign: 'justify',
                  textIndent: '6em',
                }}
              >
                {service.body}
              </motion.p>
            </div>

            <motion.div
              className="relative mt-6 max-w-[36rem]"
              initial={false}
              animate={{
                opacity: isActive ? 0.96 : 0,
                y: isActive ? 0 : 22,
              }}
              transition={{ ...contentTransition, delay: isActive ? 0.08 : 0 }}
            >
              <div className="flex flex-wrap gap-2.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-white/82 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 max-w-[34rem]">
                <ServiceStepsAccordion steps={service.steps} />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function AnimatedScroll({ services }: AnimatedScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const total = services.length;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const activeIndex = useTransform(scrollYProgress, (p) =>
    Math.min(total - 1, Math.max(0, Math.round(p * (total - 1)))),
  );
  const [active, setActive] = useState(0);
  useMotionValueEvent(activeIndex, 'change', (v) => setActive(v));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis = getLenis();
    let attachedToLenis = false;
    let pollId: number | null = null;
    let settleTimer: number | null = null;
    let velocity = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const clearSettleTimer = () => {
      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
        settleTimer = null;
      }
    };

    const getScrollMetrics = () => {
      const el = ref.current;
      if (!el) return null;

      const start = el.getBoundingClientRect().top + window.scrollY;
      const scrollRange = Math.max(1, el.offsetHeight - window.innerHeight);
      const end = start + scrollRange;

      return { start, scrollRange, end };
    };

    const snapToNearestService = () => {
      if (Math.abs(velocity) > 0.01) return;

      const metrics = getScrollMetrics();
      if (!metrics) return;

      const { start, scrollRange, end } = metrics;
      const y = window.scrollY;

      if (y < start || y > end) return;

      const targets = services.map((_, i) => {
        const progress = total <= 1 ? 0 : i / (total - 1);
        return start + progress * scrollRange;
      });

      const nearest = targets.reduce((best, target) =>
        Math.abs(target - y) < Math.abs(best - y) ? target : best,
      );
      const distance = Math.abs(nearest - y);

      if (distance <= 2 || distance > window.innerHeight * 0.45) return;

      if (lenis) {
        lenis.scrollTo(nearest, { duration: 0.55, easing: easeOutCubic });
      } else {
        window.scrollTo({ top: nearest, behavior: 'smooth' });
      }
    };

    const scheduleSnap = () => {
      clearSettleTimer();
      settleTimer = window.setTimeout(snapToNearestService, 180);
    };

    const onLenisScroll = (l: Lenis) => {
      velocity = l.velocity;
      scheduleSnap();
    };

    const onNativeScroll = () => {
      velocity = 0;
      scheduleSnap();
    };

    const attachLenis = () => {
      if (!lenis || attachedToLenis) return false;
      attachedToLenis = true;
      lenis.on('scroll', onLenisScroll);
      return true;
    };

    if (!attachLenis()) {
      window.addEventListener('scroll', onNativeScroll, { passive: true });
      pollId = window.setInterval(() => {
        const nextLenis = getLenis();
        if (!nextLenis) return;

        window.removeEventListener('scroll', onNativeScroll);
        lenis = nextLenis;
        attachLenis();
        if (pollId !== null) {
          window.clearInterval(pollId);
          pollId = null;
        }
      }, 50);
    }

    return () => {
      clearSettleTimer();
      window.removeEventListener('scroll', onNativeScroll);
      if (attachedToLenis && lenis) {
        lenis.off('scroll', onLenisScroll);
      }
      if (pollId !== null) {
        window.clearInterval(pollId);
      }
    };
  }, [services, total]);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${total * 100}vh` }}
      aria-label="Services"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {services.map((service, i) => (
          <ServiceFrame
            key={service.title}
            service={service}
            isActive={i === active}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
