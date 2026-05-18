'use client';

import { useEffect } from 'react';
import type Lenis from 'lenis';
import { getLenis } from './SmoothScroll';

export default function SectionSnap() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis = getLenis();
    let attached = false;
    let stopTimer: number | null = null;
    let velocity = 0;
    let targets: number[] = [];
    let pollId: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const computeTargets = () => {
      const main = document.querySelector('main');
      if (!main) return [];
      // Include nested <section>s too — AnimatedScroll renders its own <section>
      // inside the outer #services wrapper, and that inner boundary is what we
      // need to snap to between ZoomParallax and the services slider.
      const els = main.querySelectorAll<HTMLElement>('section, [id]');
      const ys: number[] = [];
      els.forEach((el) => {
        const y = Math.round(el.getBoundingClientRect().top + window.scrollY);
        if (y >= 0 && !ys.includes(y)) ys.push(y);
      });
      return ys.sort((a, b) => a - b);
    };

    const refresh = () => {
      targets = computeTargets();
    };

    const trySnap = () => {
      if (!lenis) return;
      // While AnimatedScroll holds the wheel-lock, lenis.isStopped is true. Bail.
      if (lenis.isStopped) return;
      if (Math.abs(velocity) > 0.005) return;

      const y = window.scrollY;
      const vh = window.innerHeight;
      // Gentle proximity magnet — only snaps when user is clearly settled
      // close to a section boundary. Larger thresholds fight active scroll.
      const threshold = vh * 0.12;

      let best: number | null = null;
      let bestDist = Infinity;
      for (const t of targets) {
        const d = Math.abs(t - y);
        if (d < bestDist) {
          bestDist = d;
          best = t;
        }
      }

      if (best !== null && bestDist > 1 && bestDist <= threshold) {
        lenis.scrollTo(best, { duration: 0.6, easing: easeOutCubic });
      }
    };

    const onScroll = (l: Lenis) => {
      velocity = l.velocity;
      if (stopTimer !== null) window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(trySnap, 200);
    };

    const attach = () => {
      if (attached || !lenis) return;
      attached = true;
      lenis.on('scroll', onScroll);
    };

    const detach = () => {
      if (!attached || !lenis) return;
      attached = false;
      lenis.off('scroll', onScroll);
    };

    // Lenis is created in a sibling client component effect; it may not exist yet on first run.
    if (lenis) {
      attach();
    } else {
      pollId = window.setInterval(() => {
        lenis = getLenis();
        if (lenis) {
          attach();
          if (pollId !== null) {
            window.clearInterval(pollId);
            pollId = null;
          }
        }
      }, 50);
    }

    refresh();
    // ResizeObserver on <body> fires once per layout settle instead of
    // firing on every pixel of a window-drag. Also catches layout-shift
    // refresh triggers (images loading, fonts swapping) that window 'resize'
    // misses entirely.
    let refreshRafId: number | null = null;
    const scheduleRefresh = () => {
      if (refreshRafId !== null) return;
      refreshRafId = window.requestAnimationFrame(() => {
        refreshRafId = null;
        refresh();
      });
    };
    const ro = new ResizeObserver(scheduleRefresh);
    ro.observe(document.body);
    const settle = window.setTimeout(refresh, 600);

    return () => {
      detach();
      ro.disconnect();
      if (refreshRafId !== null) {
        window.cancelAnimationFrame(refreshRafId);
        refreshRafId = null;
      }
      window.clearTimeout(settle);
      if (stopTimer !== null) window.clearTimeout(stopTimer);
      if (pollId !== null) window.clearInterval(pollId);
    };
  }, []);

  return null;
}
