'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { ZoomParallax } from './zoom-parallax';

type Service = {
  title: string;
  body: string;
  features: string[];
  image: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    title: 'AI Script Writing',
    body: 'Transform your ideas into structured, compelling scripts using our intelligent AI tools with engaging dialogue and cinematic depth.',
    features: [
      'Genre-aware story structure',
      'Industry-standard formatting',
      'Dialogue with character voice',
      'Iterate scenes in seconds',
    ],
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80&auto=format&fit=crop',
    alt: 'Vintage typewriter — scriptwriting',
  },
  {
    title: 'Story Visualization',
    body: 'Visualize scenes instantly — our AI-powered tools convert concepts into storyboards, sketches, and creative frames before production begins.',
    features: [
      'Storyboards generated in minutes',
      'Scene-by-scene visual frames',
      'Style-consistent across shots',
      'Director-ready board exports',
    ],
    image:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80&auto=format&fit=crop',
    alt: 'Hand-drawn film storyboard panels',
  },
  {
    title: 'Production Workflows',
    body: 'Streamline creative workflows from initial concept through execution, enabling smooth team collaboration across production stages.',
    features: [
      'Concept-to-call-sheet pipeline',
      'Real-time team collaboration',
      'Asset and version tracking',
      'Cross-department handoffs',
    ],
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80&auto=format&fit=crop',
    alt: 'Film crew on set with cinema camera',
  },
  {
    title: 'AI Story Engine',
    body: 'Turn raw ideas into unforgettable stories with our intelligent story engine that accelerates story development and content creation at scale.',
    features: [
      'Premise to outline in one click',
      'Beat-by-beat narrative engine',
      'Genre and tone calibration',
      'Generate variations on demand',
    ],
    image:
      'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=1600&q=80&auto=format&fit=crop',
    alt: 'Open book with light streaming out',
  },
  {
    title: 'Film Pitch & Decks',
    body: 'Create compelling film pitches and presentations that communicate vision, emotion, and market potential to stakeholders in minutes.',
    features: [
      'Vision-driven slide design',
      'Emotional logline crafting',
      'Market and comp positioning',
      'Investor-ready in minutes',
    ],
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

const PANEL_VH = 60;

function ServicePanels() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const indexMV = useTransform(scrollYProgress, [0, 1], [0, SERVICES.length]);

  useMotionValueEvent(indexMV, 'change', (v) => {
    const next = Math.min(SERVICES.length - 1, Math.max(0, Math.floor(v)));
    setActive((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    SERVICES.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  const current = SERVICES[active];

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${SERVICES.length * PANEL_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="grid grid-cols-2 w-full h-full">
          <div className="relative h-full overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.alt}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </div>
          <div className="flex flex-col justify-center pl-12 pr-20 lg:pl-20 lg:pr-24 relative">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.title}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
                  },
                  exit: {
                    opacity: 0,
                    x: -20,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="relative"
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, scale: 1.12 },
                    visible: {
                      opacity: 0.07,
                      scale: 1,
                      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  aria-hidden="true"
                  className="absolute -top-16 right-0 select-none pointer-events-none leading-none font-medium text-[#70befa] text-[200px] md:text-[260px] lg:text-[320px] -z-10"
                  style={{
                    fontFamily: '"Inter Tight", Inter, sans-serif',
                    letterSpacing: '-0.05em',
                  }}
                >
                  {String(active + 1).padStart(2, '0')}
                </motion.span>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="flex items-center gap-3"
                >
                  <span className="h-px w-10 bg-[#70befa]" />
                  <span className="text-xs tracking-[0.22em] uppercase text-[#70befa]">
                    {String(active + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                  </span>
                </motion.div>

                <motion.h3
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="mt-5 text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-transparent bg-clip-text"
                  style={{
                    fontFamily: '"Inter Tight", Inter, sans-serif',
                    backgroundImage: 'linear-gradient(90deg, #ffffff 20%, #70befa 92%)',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  {current.title}
                </motion.h3>

                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="mt-7 text-base md:text-lg leading-relaxed text-[#9c9c9c] max-w-prose"
                >
                  {current.body}
                </motion.p>

                <motion.ul
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.09, delayChildren: 0.1 },
                    },
                  }}
                  className="mt-10 space-y-4 max-w-prose"
                >
                  {current.features.map((f) => (
                    <motion.li
                      key={f}
                      variants={{
                        hidden: { opacity: 0, x: -16 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      className="flex items-start gap-4 text-[#dff3ff] text-base md:text-lg"
                    >
                      <motion.span
                        variants={{
                          hidden: { scaleX: 0 },
                          visible: {
                            scaleX: 1,
                            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                          },
                        }}
                        className="mt-[14px] h-px w-6 bg-[#70befa] origin-left flex-shrink-0"
                      />
                      <span>{f}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 h-48 w-px bg-white/10">
          <motion.div
            className="absolute inset-0 bg-[#70befa] origin-top"
            style={{ scaleY: scrollYProgress }}
          />
        </div>
      </div>
    </div>
  );
}

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
        <ServicePanels />
      </div>
    </section>
  );
}
