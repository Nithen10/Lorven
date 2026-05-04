'use client';

import { useEffect, useState } from 'react';
import { ZoomParallax } from './zoom-parallax';
import { AnimatedScroll } from './animated-scroll';

type Service = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    title: 'AI Script Writing',
    body: 'Transform your ideas into structured, compelling scripts using our intelligent AI tools with engaging dialogue and cinematic depth.',
    image: '/img9.webp',
    alt: 'img9',
  },
  {
    title: 'Story Visualization',
    body: 'Visualize scenes instantly — our AI-powered tools convert concepts into storyboards, sketches, and creative frames before production begins.',
    image: '/img10.webp',
    alt: 'img10',
  },
  {
    title: 'Production Workflows',
    body: 'Streamline creative workflows from initial concept through execution, enabling smooth team collaboration across production stages.',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80&auto=format&fit=crop',
    alt: 'Film crew on set with cinema camera',
  },
  {
    title: 'Film Pitch & Decks',
    body: 'Create compelling film pitches and presentations that communicate vision, emotion, and market potential to stakeholders in minutes.',
    image: '/img11.webp',
    alt: 'img11',
  },
];

const PARALLAX_IMAGES = [
  {
    src: '/img6.webp',
    alt: 'img6',
  },
  {
    src: '/img4.webp',
    alt: 'img4',
  },
  {
    src: '/parallax-center.mp4',
    alt: 'Cinema projector',
  },
  {
    src: '/img3.png',
    alt: 'img3',
  },
  {
    src: '/img7.webp',
    alt: 'img7',
  },
  {
    src: '/img8.webp',
    alt: 'img8',
  },
  {
    src: '/img5.webp',
    alt: 'img5',
  },
  {
    src: '/parallax-center.webp',
    alt: 'Shades of Mumbai poster',
  },
];

export function ServicesScroll() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reduced) {
    return (
      <section
        id="services"
        className="relative max-w-[1360px] mx-auto px-5 md:px-10 py-[140px]"
      >
        <h2 className="section-title">What we do</h2>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {PARALLAX_IMAGES.slice(0, 4).map((img) =>
            img.src.endsWith('.mp4') ? (
              <video
                key={img.src}
                src={img.src}
                muted
                playsInline
                preload="metadata"
                className="aspect-square w-full object-cover rounded-lg"
              />
            ) : (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="aspect-square w-full object-cover rounded-lg"
              />
            ),
          )}
        </div>
        <div className="mt-20 flex flex-col gap-20">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              <img
                src={s.image}
                alt={s.alt}
                className="aspect-[3/4] w-full object-cover rounded-2xl border border-white/10"
              />
              <div>
                <span className="text-xs tracking-[0.18em] uppercase text-[#70befa]">
                  {String(i + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-4xl md:text-5xl font-medium leading-[1.05] text-white">
                  {s.title}
                </h3>
                <p className="mt-6 text-base md:text-lg leading-relaxed text-[#9c9c9c] max-w-prose">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="relative">
      <div className="max-w-[1360px] mx-auto px-5 md:px-10 pt-[140px]">
        <h2 className="section-title">What we do</h2>
      </div>

      <div className="md:hidden max-w-[1360px] mx-auto px-5 pb-[140px] mt-12 flex flex-col gap-16">
        {SERVICES.map((s, i) => (
          <div key={s.title}>
            <img
              src={s.image}
              alt={s.alt}
              className="aspect-[3/4] w-full object-cover rounded-2xl border border-white/10"
              loading="lazy"
            />
            <span className="mt-6 block text-xs tracking-[0.18em] uppercase text-[#70befa]">
              {String(i + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-3xl font-medium leading-[1.05] text-white">
              {s.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#9c9c9c]">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <ZoomParallax images={PARALLAX_IMAGES} />
        <AnimatedScroll services={SERVICES} />
      </div>
    </section>
  );
}
