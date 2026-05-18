"use client";

import { useEffect, useLayoutEffect } from "react";
import { getLenis } from "./SmoothScroll";

const SCROLL_Y_KEY = "lorven:home-scroll-y";
const SCROLL_H_KEY = "lorven:home-scroll-h";

export default function ClientEffects() {
  // useLayoutEffect runs synchronously after React commits the DOM but BEFORE
  // the browser paints. Restoring scroll here eliminates the "flash of hero"
  // the user reported — when the page's full scrollHeight is already there
  // (cached RSC), the very first paint after back-navigation shows the saved
  // position. When it isn't (heavy scroll-pinned sections like ProcessSection
  // and ProductsScrollSection mount async), the retry loop in useEffect picks
  // up the slack once height is sufficient.
  useLayoutEffect(() => {
    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const savedScrollY = sessionStorage.getItem(SCROLL_Y_KEY);
    if (!savedScrollY) return;
    const targetY = parseInt(savedScrollY, 10);
    if (Number.isNaN(targetY) || targetY <= 0) return;

    // CRITICAL: must be synchronous. ProcessSection has a sibling
    // useLayoutEffect that checks getBoundingClientRect().bottom — if it
    // sees rect.bottom <= 0 (user past the section), it takes the no-
    // compensation collapse path. If we let Lenis handle this, lenis.scrollTo
    // with immediate:true still defers the native scrollTo to its next raf,
    // meaning scrollY is still 0 when ProcessSection's check fires, the
    // section stays expanded, and its post-paint IO useEffect then collapses
    // it WITH compensation (delta ≈ -3000 to -8000), dropping the user mid-
    // products section. Native window.scrollTo is synchronous and bypasses
    // this race entirely.
    window.scrollTo(0, targetY);
    // Now sync Lenis's internal state to the new position so its raf loop
    // doesn't lerp us back to wherever it thinks we should be.
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetY, { immediate: true, force: true });
    }
  }, []);

  useEffect(() => {
    // Continuously save BOTH scroll position AND document height to
    // sessionStorage, debounced. Saving the height is the key fix for the
    // "lands on products section instead of footer" bug: on restore we wait
    // until the page has grown back to this height before scrolling, so
    // lenis.scrollTo(target) doesn't clamp to a still-mounting scrollHeight.
    let scrollSaveTimer: number | null = null;
    const persistScrollState = () => {
      if (window.location.pathname !== "/") return;
      sessionStorage.setItem(SCROLL_Y_KEY, String(Math.round(window.scrollY)));
      sessionStorage.setItem(
        SCROLL_H_KEY,
        String(Math.round(document.documentElement.scrollHeight)),
      );
    };
    const onScrollSave = () => {
      if (scrollSaveTimer !== null) window.clearTimeout(scrollSaveTimer);
      scrollSaveTimer = window.setTimeout(persistScrollState, 80);
    };
    window.addEventListener("scroll", onScrollSave, { passive: true });
    window.addEventListener("beforeunload", persistScrollState);

    const savedScrollY = sessionStorage.getItem(SCROLL_Y_KEY);
    const savedScrollH = sessionStorage.getItem(SCROLL_H_KEY);
    let restoreFrameId: number | null = null;
    if (savedScrollY) {
      const targetY = parseInt(savedScrollY, 10);
      const requiredHeight = savedScrollH ? parseInt(savedScrollH, 10) : 0;
      if (!Number.isNaN(targetY) && targetY > 0) {
        // Retry each frame for up to ~6s. The page's scrollHeight grows as
        // ZoomParallax / ProcessSection / ProductsScrollSection / footer
        // mount their scroll-pinned heights via useEffect — meaning the
        // page's max scrollable Y is well under targetY for the first several
        // hundred ms. Each frame we check:
        //   1. Has scrollHeight grown to the height we saved at exit?
        //   2. If yes, scrollTo(target) — Lenis can now reach it without
        //      clamping. Verify via lenis.scroll (more accurate than
        //      window.scrollY which can lag a frame behind Lenis's internal
        //      target).
        //   3. If no, skip the scroll attempt but keep the loop alive so we
        //      retry next frame as the page continues to grow.
        // Repeated scrollTo calls also keep Lenis's scroll event firing,
        // which resets SectionSnap's 200ms idle timer, preventing the
        // proximity-magnet from snapping the user mid-restore.
        let attempts = 0;
        const maxAttempts = 360; // ~6s at 60fps
        const tolerance = 4;

        const tryScroll = () => {
          attempts += 1;
          const docHeight = document.documentElement.scrollHeight;
          // Wait for page to grow to (at least) the height it had at exit.
          // Use a 50px slack to handle minor measurement differences.
          const heightReady =
            requiredHeight <= 0 || docHeight >= requiredHeight - 50;

          if (heightReady) {
            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo(targetY, { immediate: true, force: true });
            } else {
              window.scrollTo({ top: targetY, behavior: "auto" });
            }
            // Check via Lenis's own scroll position when available — it
            // reflects the immediate scrollTo result, while window.scrollY
            // can be a frame behind.
            const lenisInst = getLenis();
            const currentY =
              lenisInst &&
              typeof (lenisInst as unknown as { scroll: number }).scroll === "number"
                ? (lenisInst as unknown as { scroll: number }).scroll
                : window.scrollY;
            if (Math.abs(currentY - targetY) <= tolerance) {
              restoreFrameId = null;
              return;
            }
          }

          if (attempts < maxAttempts) {
            restoreFrameId = requestAnimationFrame(tryScroll);
          } else {
            restoreFrameId = null;
          }
        };

        restoreFrameId = requestAnimationFrame(tryScroll);
      }
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        }
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const field = document.querySelector(".particle-field") as HTMLElement | null;
    if (field && !field.dataset.ready) {
      field.dataset.ready = "true";
      for (let i = 0; i < 36; i += 1) {
        const dot = document.createElement("i");
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 6}s`;
        field.appendChild(dot);
      }
    }


    const timeNode = document.getElementById("time");
    function tick() {
      if (!timeNode) return;
      timeNode.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Amsterdam",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
    }

    tick();
    const timer = window.setInterval(tick, 1000);

    return () => {
      revealObserver.disconnect();
      window.clearInterval(timer);
      if (restoreFrameId !== null) {
        cancelAnimationFrame(restoreFrameId);
      }
      window.removeEventListener("scroll", onScrollSave);
      window.removeEventListener("beforeunload", persistScrollState);
      if (scrollSaveTimer !== null) window.clearTimeout(scrollSaveTimer);
    };
  }, []);

  return null;
}
