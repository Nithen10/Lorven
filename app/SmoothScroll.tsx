'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Intercept all in-page anchor clicks (navbar, footer, hero CTAs).
    // The browser's native anchor jump mutates window.scrollY directly, leaving
    // Lenis's targetScroll stale — Lenis then lerps the user back to where they
    // were, OR the Process section's collapse fires mid-scroll and compensation
    // races the lerp, producing intermittent wrong-section landings.
    //
    // We take full control: force Process to collapse first (so the layout is
    // final), then use lenis.scrollTo against the target element so Lenis owns
    // both the scroll motion and its internal target. No race, no desync.
    const onAnchorClick = (e: MouseEvent) => {
      // Respect modifier keys (open in new tab, etc.) and non-primary buttons.
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const targetEl = e.target;
      if (!(targetEl instanceof Element)) return;
      const link = targetEl.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      // Skip target="_blank" and downloads.
      if (link.target === '_blank' || link.hasAttribute('download')) return;

      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;

      let element: Element | null = null;
      try {
        element = document.querySelector(href);
      } catch {
        return;
      }
      if (!(element instanceof HTMLElement)) return;

      e.preventDefault();

      // Ask ProcessSection to collapse synchronously if it hasn't already.
      // ProcessSection's listener bails if already collapsed.
      window.dispatchEvent(new Event('force-process-collapse'));

      // Update the URL hash so the back button and shareable link still work.
      // Use replaceState (not pushState) to avoid filling history with hash entries.
      try {
        history.replaceState(null, '', href);
      } catch {
        // Some sandboxes throw — ignore.
      }

      // Three rAFs: first lets React process the queued state updates, second
      // lets React commit + browser do layout, third gives a safety frame for
      // any post-commit useLayoutEffect / GSAP refresh to settle. By this point
      // the target element's bounding rect reflects the post-collapse layout.
      //
      // We compute the target Y explicitly (instead of passing the element to
      // lenis.scrollTo) because Lenis's own resolution can lag window.scrollY
      // by a frame in edge cases — leading to a 1-frame undershoot that visually
      // reads as "section starts ~100px below the viewport top, cards cut at
      // bottom". Reading getBoundingClientRect here forces a synchronous layout
      // and gives us the freshest possible position.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!element) return;
            // Refresh GSAP ScrollTrigger so any triggers below Process re-anchor
            // to the now-collapsed positions. Otherwise scene-1's trigger (which
            // drives scene-0's scale/opacity scrub) is at its old offset and the
            // landing render of Cine Sketch flashes mid-animation.
            ScrollTrigger.refresh();
            const targetY = (element as HTMLElement).getBoundingClientRect().top + window.scrollY;
            if (lenisInstance) {
              lenisInstance.scrollTo(targetY, { force: true });
            } else {
              (element as HTMLElement).scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      });
    };
    document.addEventListener('click', onAnchorClick);

    // Cross-route scroll-restore: with history.scrollRestoration='manual'
    // (set by ClientEffects), the browser carries the previous page's scrollY
    // across route changes. So when the user clicks back from /login (scrollY=0)
    // or /careers (scrollY=~1500), the home page's first paint happens at that
    // carried-over scrollY — user sees hero or services section briefly before
    // ClientEffects' useLayoutEffect scrolls to the saved footer position.
    // Setting scroll here, in the popstate listener that fires BEFORE Next.js
    // renders the new route, eliminates that intermediate paint.
    const onPopState = () => {
      if (window.location.pathname !== '/') return;
      const saved = sessionStorage.getItem('lorven:home-scroll-y');
      if (!saved) return;
      const y = parseInt(saved, 10);
      if (Number.isNaN(y) || y <= 0) return;
      window.scrollTo(0, y);
      if (lenisInstance) {
        lenisInstance.scrollTo(y, { immediate: true, force: true });
      }
    };
    window.addEventListener('popstate', onPopState);

    return () => {
      lenis.off('scroll', onLenisScroll);
      gsap.ticker.remove(tickerCallback);
      document.removeEventListener('click', onAnchorClick);
      window.removeEventListener('popstate', onPopState);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
