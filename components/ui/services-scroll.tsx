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
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80&auto=format&fit=crop',
    alt: 'Vintage typewriter — scriptwriting',
  },
  {
    title: 'Story Visualization',
    body: 'Visualize scenes instantly — our AI-powered tools convert concepts into storyboards, sketches, and creative frames before production begins.',
    image:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80&auto=format&fit=crop',
    alt: 'Hand-drawn film storyboard panels',
  },
  {
    title: 'Production Workflows',
    body: 'Streamline creative workflows from initial concept through execution, enabling smooth team collaboration across production stages.',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80&auto=format&fit=crop',
    alt: 'Film crew on set with cinema camera',
  },
  {
    title: 'AI Story Engine',
    body: 'Turn raw ideas into unforgettable stories with our intelligent story engine that accelerates story development and content creation at scale.',
    image:
      'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=1600&q=80&auto=format&fit=crop',
    alt: 'Open book with light streaming out',
  },
  {
    title: 'Film Pitch & Decks',
    body: 'Create compelling film pitches and presentations that communicate vision, emotion, and market potential to stakeholders in minutes.',
    image:
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&q=80&auto=format&fit=crop',
    alt: 'Cinema projector beam in a dark theater',
  },
];

const PARALLAX_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80&auto=format&fit=crop',
    alt: 'Film set',
  },
  {
    src: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1600&q=80&auto=format&fit=crop',
    alt: 'Film reel',
  },
  {
    src: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&q=80&auto=format&fit=crop',
    alt: 'Cinema projector',
  },
  {
    src: 'https://images.unsplash.com/photo-1500021804447-2ca2eaaaabeb?w=1600&q=80&auto=format&fit=crop',
    alt: 'Camera operator',
  },
  {
    src: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1600&q=80&auto=format&fit=crop',
    alt: 'Lighting rig',
  },
  {
    src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80&auto=format&fit=crop',
    alt: 'Storyboard',
  },
  {
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80&auto=format&fit=crop',
    alt: 'Editing suite',
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
          {PARALLAX_IMAGES.slice(0, 4).map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="aspect-square w-full object-cover rounded-lg"
            />
          ))}
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
