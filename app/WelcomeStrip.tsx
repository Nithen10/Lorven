'use client';

import { useEffect, useState } from 'react';

export default function WelcomeStrip() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 0.6);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--strip-offset', visible ? '32px' : '0px');
  }, [visible]);

  return (
    <a
      href="#contact"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed top-0 left-0 right-0 z-40 h-8 bg-[#70befa] flex items-center justify-center gap-2 text-white text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#5fb5f8] transition-[transform,opacity,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <span>WELCOME TO LORVEN AI STUDIO</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}
