"use client";

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
      className={`group relative inline-block overflow-hidden h-5 flex items-center text-sm`}
      data-nav-href={href}
    >
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className={isActive ? "text-white" : "text-gray-300"}>
          {children}
        </span>
        <span className="text-white">{children}</span>
      </div>
    </a>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const [activeSection, setActiveSection] = useState("");
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { threshold: [0.18, 0.35, 0.55], rootMargin: "-18% 0px -56% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinksData = [
    { label: "services", href: "#services" },
    { label: "products", href: "#products" },
    { label: "process", href: "#process" },
    { label: "team", href: "#team" },
    { label: "pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "contact", href: "#contact" },
  ];

  return (
    <>
      <a
        href="#home"
        aria-label="Lorven AI Studio home"
        className="fixed top-4 left-6 z-30"
      >
        <img
          src="/logo-new.png"
          alt="Lorven"
          style={{ width: 140, height: 44, objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </a>

      <header
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20
                     flex flex-col items-center
                     pl-6 pr-6 py-3 backdrop-blur-sm
                     ${headerShapeClass}
                     border border-[#333] bg-[#1f1f1f57]
                     w-[calc(100%-2rem)] sm:w-auto
                     transition-[border-radius] duration-0 ease-in-out`}
      >
        <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
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
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
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
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                     ${isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${activeSection === link.href ? "text-white" : "text-gray-300"} hover:text-white transition-colors w-full text-center`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
    </>
  );
}
