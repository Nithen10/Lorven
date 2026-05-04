'use client';

import { useEffect, useRef, useState } from 'react';
import { getLenis } from '@/app/SmoothScroll';

type Service = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

interface AnimatedScrollProps {
  services: Service[];
}

const ANIM_MS = 1000;
const ENTER_THRESHOLD = 0.92;

export function AnimatedScroll({ services }: AnimatedScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const scrolling = useRef(false);
  const activeRef = useRef(false);
  const lockTimer = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const scrollDir = useRef<'down' | 'up'>('down');

  indexRef.current = index;
  const total = services.length;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    const node = sectionRef.current;
    if (!node) return;

    lastScrollY.current = window.scrollY;

    const trackScroll = () => {
      const y = window.scrollY;
      scrollDir.current = y >= lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = y;
    };

    const advance = (dir: 'up' | 'down') => {
      const cur = indexRef.current;
      if (dir === 'down' && cur < total - 1) setIndex(cur + 1);
      else if (dir === 'up' && cur > 0) setIndex(cur - 1);
      scrolling.current = true;
      if (lockTimer.current !== null) window.clearTimeout(lockTimer.current);
      lockTimer.current = window.setTimeout(() => {
        scrolling.current = false;
        lockTimer.current = null;
      }, ANIM_MS);
    };

    const activate = (entryDir: 'down' | 'up') => {
      if (activeRef.current) return;
      activeRef.current = true;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(node, { immediate: true, force: true });
        lenis.stop();
      } else {
        node.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
      setIndex(entryDir === 'down' ? 0 : total - 1);
    };

    const deactivate = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      scrolling.current = false;
      if (lockTimer.current !== null) {
        window.clearTimeout(lockTimer.current);
        lockTimer.current = null;
      }
      getLenis()?.start();
    };

    const releaseAndScroll = (deltaY: number) => {
      deactivate();
      const lenis = getLenis();
      const target = window.scrollY + deltaY * 3;
      if (lenis) {
        lenis.scrollTo(target, { duration: 0.5 });
      } else {
        window.scrollBy({ top: deltaY * 3, behavior: 'smooth' });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!activeRef.current) return;
      const cur = indexRef.current;
      if (cur === 0 && e.deltaY < 0) {
        e.preventDefault();
        releaseAndScroll(e.deltaY);
        return;
      }
      if (cur === total - 1 && e.deltaY > 0) {
        e.preventDefault();
        releaseAndScroll(e.deltaY);
        return;
      }
      e.preventDefault();
      if (scrolling.current) return;
      advance(e.deltaY > 0 ? 'down' : 'up');
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!activeRef.current) return;
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      const cur = indexRef.current;
      if (cur === 0 && e.key === 'ArrowUp') {
        e.preventDefault();
        releaseAndScroll(-100);
        return;
      }
      if (cur === total - 1 && e.key === 'ArrowDown') {
        e.preventDefault();
        releaseAndScroll(100);
        return;
      }
      e.preventDefault();
      if (scrolling.current) return;
      advance(e.key === 'ArrowDown' ? 'down' : 'up');
    };

    const handleVisibility = () => {
      if (document.hidden) {
        scrolling.current = false;
        if (lockTimer.current !== null) {
          window.clearTimeout(lockTimer.current);
          lockTimer.current = null;
        }
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= ENTER_THRESHOLD) {
            if (!activeRef.current) activate(scrollDir.current);
          } else if (!entry.isIntersecting) {
            if (activeRef.current) deactivate();
          }
        }
      },
      { threshold: [0, ENTER_THRESHOLD, 1] }
    );

    io.observe(node);
    window.addEventListener('scroll', trackScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKey);
    document.addEventListener('visibilitychange', handleVisibility);

    services.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (lockTimer.current !== null) window.clearTimeout(lockTimer.current);
      getLenis()?.start();
    };
  }, [total, services]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      aria-label="Services"
    >
      {services.map((service, i) => {
        const isActive = i === index;
        const imageLeft = i % 2 === 0;
        const imageTransform = isActive ? 'translateY(0)' : 'translateY(100%)';
        const contentTransform = isActive ? 'translateY(0)' : 'translateY(-100%)';
        const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

        return (
          <div key={i} className="absolute inset-0">
            <div
              className={`absolute top-0 ${imageLeft ? 'left-0' : 'left-1/2'} w-1/2 h-full will-change-transform`}
              style={{ transform: imageTransform, transition: `transform ${ANIM_MS}ms ${easing}` }}
              aria-hidden={!isActive}
            >
              <img
                src={service.image}
                alt={service.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading={i < 2 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
            <div
              className={`absolute top-0 ${imageLeft ? 'left-1/2' : 'left-0'} w-1/2 h-full flex items-center will-change-transform`}
              style={{ transform: contentTransform, transition: `transform ${ANIM_MS}ms ${easing}` }}
              aria-hidden={!isActive}
            >
              <div className="px-10 md:px-16 max-w-prose">
                <span className="text-xs tracking-[0.18em] uppercase text-[#70befa]">
                  {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-4xl md:text-5xl font-medium leading-[1.05] text-white">
                  {service.title}
                </h3>
                <p className="mt-6 text-base md:text-lg leading-relaxed text-[#9c9c9c]">
                  {service.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2" aria-hidden="true">
        {services.map((_, i) => (
          <span
            key={i}
            className={`block w-1 rounded-full transition-all duration-500 ${i === index ? 'h-8 bg-[#70befa]' : 'h-4 bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
}
