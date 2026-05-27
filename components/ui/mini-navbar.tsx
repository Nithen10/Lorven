"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const AnimatedNavLink = ({
  href,
  children,
  isActive,
  onMouseEnter,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onMouseEnter?: () => void;
}) => {
  return (
    <a
      href={href}
      onMouseEnter={onMouseEnter}
      className={`group relative inline-block overflow-hidden h-5 flex items-center text-sm font-semibold tracking-[0.12em] uppercase`}
      data-nav-href={href}
    >
      <div className="flex flex-col">
        <span className={isActive ? "text-white" : "text-gray-300"}>
          {children}
        </span>
      </div>
    </a>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const [activeSection, setActiveSection] = useState("");
  const [hoveredHref, setHoveredHref] = useState("");
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, visible: false });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass("rounded-xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full");
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    const sections = [
      ...document.querySelectorAll("main section[id]"),
    ] as HTMLElement[];
    if (sections.length === 0) return;

    let rafId = 0;
    let current = "";

    // Continuously pick the active section from live geometry. The active
    // section is the last one (in document order) whose top edge has scrolled
    // above a reference line at 30% of the viewport. Height-independent and
    // works regardless of scroll mechanism (Lenis, native), observers, or
    // sticky/pinned children — getBoundingClientRect always reflects reality.
    const tick = () => {
      const refY = window.innerHeight * 0.3;
      let activeId = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= refY) {
          activeId = section.id;
        }
      }
      const next = activeId ? `#${activeId}` : "";
      if (next !== current) {
        current = next;
        setActiveSection(next);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const target = hoveredHref || activeSection;
    let rafId: number | null = null;

    const measure = () => {
      rafId = null;
      const nav = navRef.current;
      if (!nav) return;
      if (!target) {
        setIndicator((p) => ({ ...p, visible: false }));
        return;
      }
      const link = nav.querySelector<HTMLElement>(`[data-nav-href="${target}"]`);
      if (!link) {
        setIndicator((p) => ({ ...p, visible: false }));
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const PAD_X = 12;
      const PAD_Y = 6;
      setIndicator({
        left: linkRect.left - navRect.left - PAD_X,
        top: linkRect.top - navRect.top - PAD_Y,
        width: linkRect.width + 2 * PAD_X,
        height: linkRect.height + 2 * PAD_Y,
        visible: true,
      });
    };

    const scheduleMeasure = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [hoveredHref, activeSection]);

  const navLinksData = [
    { label: "services", href: "#services" },
    { label: "process", href: "#process" },
    { label: "products", href: "#products" },
    { label: "team", href: "#team" },
    { label: "FAQ", href: "#faq" },
    { label: "contact", href: "#contact" },
  ];

  return (
    <>
      <Link
        href="/"
        aria-label="Lorven AI Studio home"
        className="fixed left-3 top-1 sm:top-2 md:top-3 lg:top-4 z-30 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu"
        style={{ transform: 'translate3d(0, var(--strip-offset, 0px), 0)' }}
      >
        <img
          src="/logo-new.png"
          alt="Lorven"
          className="block w-[100px] h-[32px] sm:w-[120px] sm:h-[38px] md:w-[150px] md:h-[48px] lg:w-[170px] lg:h-[54px] object-cover object-center"
        />
      </Link>

      <div
        className="fixed right-4 sm:right-6 -top-0.5 sm:top-4 md:top-6 z-30 flex items-center gap-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu"
        style={{ transform: 'translate3d(0, var(--strip-offset, 0px), 0)' }}
      >
        <Link
          href="/login"
          aria-label="Log in"
          className="group relative hidden sm:inline-block overflow-hidden h-7 text-base font-semibold tracking-[0.12em] uppercase"
        >
          <div className="flex flex-col transition-transform duration-[400ms] ease-out group-hover:-translate-y-1/2">
            <span className="h-7 flex items-center text-white/75">LOG-IN</span>
            <span className="h-7 flex items-center text-white">LOG-IN</span>
          </div>
        </Link>
        <button
          type="button"
          className="sm:hidden flex items-center justify-center w-11 h-11 -mr-2 text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-drawer"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <header
        className={`fixed left-1/2 top-4 sm:top-6 z-20
                     hidden sm:flex sm:flex-col items-center
                     px-3 py-2 sm:pl-8 sm:pr-8 sm:py-4
                     ${headerShapeClass}
                     w-auto max-w-[calc(100%-1rem)]
                     transition-[border-radius,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu
                     overflow-hidden`}
        style={{
          transform: 'translate3d(-50%, var(--strip-offset, 0px), 0)',
          boxShadow: "0 2px 16px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Layer 1: Backdrop blur — heavy frosted glass */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backdropFilter: "blur(16px) saturate(1.8)",
            WebkitBackdropFilter: "blur(16px) saturate(1.8)",
            borderRadius: "inherit",
          }}
        />
        {/* Layer 2: Tinted glass fill — more opaque for frosted look */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "rgba(255, 255, 255, 0.06)",
            borderRadius: "inherit",
          }}
        />
        {/* Layer 4: Inner edge highlights — glass rim light */}
        <div
          className="absolute inset-0 z-[3]"
          style={{
            boxShadow:
              "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.15), inset 1px 0 1px 0 rgba(255, 255, 255, 0.2), inset -1px 0 1px 0 rgba(255, 255, 255, 0.2)",
            borderRadius: "inherit",
          }}
        />
        {/* Layer 5: Border */}
        <div
          className="absolute inset-0 z-[4]"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        />
        <div className="relative z-10 flex items-center justify-between w-full gap-x-6 sm:gap-x-8">

        <nav ref={navRef} onMouseLeave={() => setHoveredHref("")} className="relative hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {/* Sliding glass indicator */}
          <div
            className="absolute rounded-full overflow-hidden pointer-events-none"
            style={{
              left: `${indicator.left}px`,
              top: `${indicator.top}px`,
              width: `${indicator.width}px`,
              height: `${indicator.height}px`,
              opacity: indicator.visible ? 1 : 0,
              transition:
                "left 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(255, 255, 255, 0.12)", borderRadius: "inherit" }}
            />
            <div
              className="absolute inset-0"
              style={{
                boxShadow:
                  "inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 1px 0 rgba(255, 255, 255, 0.15), inset -1px 0 1px 0 rgba(255, 255, 255, 0.15)",
                borderRadius: "inherit",
              }}
            />
            <div
              className="absolute inset-0"
              style={{ border: "1px solid rgba(255, 255, 255, 0.25)", borderRadius: "inherit" }}
            />
          </div>
          {navLinksData.map((link) => (
            <AnimatedNavLink
              key={link.href}
              href={link.href}
              isActive={activeSection === link.href}
              onMouseEnter={() => setHoveredHref(link.href)}
            >
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

      </div>
    </header>

      <div
        className={`sm:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={`sm:hidden fixed right-0 top-0 z-40 h-svh w-[78vw] max-w-xs flex flex-col
                     transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu
                     ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          background: "rgba(15, 15, 15, 0.92)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "-2px 0 24px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex justify-end p-3">
          <button
            type="button"
            className="flex items-center justify-center w-11 h-11 text-gray-300 hover:text-white transition-colors focus:outline-none"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-stretch px-6 pt-2">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${activeSection === link.href ? "text-white" : "text-gray-300"} hover:text-white transition-colors w-full py-3 min-h-11 flex items-center text-sm font-semibold tracking-[0.12em] uppercase`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 px-6 py-6">
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="inline-block text-white text-base font-semibold tracking-[0.12em] uppercase"
          >
            LOG-IN
          </Link>
        </div>
      </aside>
    </>
  );
}
