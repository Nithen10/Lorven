"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const AnimatedNavLink = ({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) => {
  return (
    <a
      href={href}
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
    const sections = [
      ...document.querySelectorAll("main section[id]"),
    ] as HTMLElement[];
    if (sections.length === 0) return;

    const ratios = new Map<string, number>();
    sections.forEach((s) => ratios.set(s.id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });
        let bestId = "";
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        setActiveSection(bestRatio > 0 ? `#${bestId}` : "");
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        rootMargin: "-18% 0px -56% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      if (!nav) return;
      if (!activeSection) {
        setIndicator((p) => ({ ...p, visible: false }));
        return;
      }
      const link = nav.querySelector<HTMLElement>(`[data-nav-href="${activeSection}"]`);
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
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeSection]);

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
        className="fixed left-3 top-3 sm:top-4 md:top-5 z-30 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu"
        style={{ transform: 'translate3d(0, var(--strip-offset, 32px), 0)' }}
      >
        <img
          src="/logo-new.png"
          alt="Lorven"
          className="block w-[100px] h-[32px] sm:w-[120px] sm:h-[38px] md:w-[150px] md:h-[48px] lg:w-[170px] lg:h-[54px] object-cover object-center"
        />
      </Link>

      <div
        className="fixed right-6 top-6 z-30 hidden sm:flex items-center gap-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu"
        style={{ transform: 'translate3d(0, var(--strip-offset, 32px), 0)' }}
      >
        <Link
          href="/login"
          aria-label="Log in"
          className="group relative inline-block overflow-hidden h-7 text-base font-semibold tracking-[0.12em] uppercase"
        >
          <div className="flex flex-col transition-transform duration-[400ms] ease-out group-hover:-translate-y-1/2">
            <span className="h-7 flex items-center text-white/75">LOG-IN</span>
            <span className="h-7 flex items-center text-white">LOG-IN</span>
          </div>
        </Link>
      </div>

      <header
        className={`fixed left-1/2 top-4 sm:top-6 z-20
                     flex flex-col items-center
                     px-3 py-2 sm:pl-8 sm:pr-8 sm:py-4
                     ${headerShapeClass}
                     w-auto max-w-[calc(100%-1rem)]
                     transition-[border-radius,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu
                     overflow-hidden`}
        style={{
          transform: 'translate3d(-50%, var(--strip-offset, 32px), 0)',
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

        <nav ref={navRef} className="relative hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
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
            >
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <button
          className="sm:hidden flex items-center justify-center w-11 h-11 -mr-2 text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
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

      <div
        className={`relative z-10 sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-y-auto overflow-x-hidden
                     ${isOpen ? "max-h-[80svh] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-stretch w-full text-base">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${activeSection === link.href ? "text-white" : "text-gray-300"} hover:text-white transition-colors w-full text-center py-3 min-h-11 flex items-center justify-center`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            className="text-gray-300 hover:text-white transition-colors w-full text-center py-3 min-h-11 flex items-center justify-center font-semibold tracking-[0.12em] uppercase border-t border-white/10 mt-2"
            onClick={() => setIsOpen(false)}
          >
            Log-In
          </Link>
        </nav>
      </div>
    </header>
    </>
  );
}
