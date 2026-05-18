'use client';

import { useEffect, useState } from 'react';
import { ZoomParallax } from './zoom-parallax';
import { AnimatedScroll } from './animated-scroll';
import { ServiceStepsAccordion } from './service-steps-accordion';

type Service = {
  title: string;
  body: string;
  tags: string[];
  steps: { title: string; body: string }[];
  image: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    title: 'AI Script Writing',
    body: 'Start with a logline, treatment, character notes, or a rough idea. The system turns that into a structured screenplay draft with beats, scene flow, and dialogue you can review immediately. Share pages from earlier work and it can adapt the tone and rhythm so the draft feels closer to your voice from the first pass.',
    tags: ['Structured drafts', 'Dialogue passes', 'Voice adaptation'],
    steps: [
      { title: 'What do I need to provide to get started?', body: 'You can begin with a one-line concept, a treatment, character bios, or loose scene notes. The clearer your material is, the more accurately the draft reflects your story, but even early-stage ideas are enough to generate a usable first version.' },
      { title: 'What does the first screenplay draft include?', body: 'The first output can cover the core story structure, scene progression, and dialogue draft so you are not starting from a blank page. It is designed to give writers and development teams something practical to shape, refine, and rewrite right away.' },
      { title: 'How does it make the script sound more like me?', body: 'If you upload pages from previous scripts, the model studies your pacing, phrasing, and character voice. That helps the next draft feel more aligned with your creative style instead of sounding generic or over-automated.' },
    ],
    image: '/img9.webp',
    alt: 'img9',
  },
  {
    title: 'Story Visualization',
    body: 'Describe a scene in plain language and turn it into visual references your team can react to quickly. The system generates storyboard-style frames, mood imagery, and shot ideas that help directors, cinematographers, and producers align before the shoot. It makes early visual decision-making faster, clearer, and easier to revise.',
    tags: ['Storyboard frames', 'Visual direction', 'Shot exploration'],
    steps: [
      { title: 'What kind of scene information should I enter?', body: 'You can provide a short scene description, camera intention, emotional tone, location details, or visual references. Even a simple prompt is enough to begin, but adding atmosphere, blocking, or lighting direction helps the results feel more production-ready.' },
      { title: 'What visuals will I get back?', body: 'The output can include storyboard-like panels, mood frames, composition references, and alternate shot ideas. These visuals help the team discuss framing, tone, and scene coverage before time and budget are spent on set.' },
      { title: 'How quickly can I revise the look or camera plan?', body: 'You can update lens feel, lighting mood, time of day, framing, or character positioning without restarting the process. That makes it easier to compare options and lock creative choices while the whole team is still in alignment.' },
    ],
    image: '/img10.webp',
    alt: 'img10',
  },
  {
    title: 'Pitch Craft',
    body: 'Turn your script, treatment, or concept package into a presentation that is easier to pitch with confidence. The system assembles the story materials, visual references, and positioning elements investors and partners need to understand the project quickly. Your team starts from a polished first version and refines it for the room.',
    tags: ['Pitch structure', 'Mood boards', 'Synopsis support'],
    steps: [
      { title: 'What source material should I upload for the deck?', body: 'You can start with a script, treatment, logline, character notes, reference images, or a rough concept package. The more context you provide, the stronger the deck becomes, but even early materials are enough to generate a useful first presentation.' },
      { title: 'What does the generated pitch deck include?', body: 'The draft deck can include a sharpened logline, synopsis, visual mood direction, comparable titles, and audience-facing framing for the project. It is meant to give your team both a narrative structure and a visual starting point for the pitch.' },
      { title: 'How does it become ready for a real meeting?', body: 'Once the first version is generated, your team can edit the wording, swap visuals, and fine-tune the story emphasis for the intended buyer or financier. That final pass turns the deck into something presentation-ready without wasting days on formatting and blank slides.' },
    ],
    image: '/img11.webp',
    alt: 'Pitch Craft reference',
  },
  {
    title: 'Production Workflows',
    body: 'Production moves fast, and small version mismatches create expensive confusion. This workflow keeps scripts, schedules, shot lists, notes, and approvals connected so updates move across the pipeline instead of getting lost between tools. The result is a clearer operating view and fewer last-minute surprises on set.',
    tags: ['Pipeline sync', 'Version control', 'Risk visibility'],
    steps: [
      { title: 'How does this connect to the tools we already use?', body: 'The workflow is built to sit around your existing production stack rather than replace it. Tools such as script platforms, scheduling systems, review spaces, and team workspaces can be connected so information stays linked across departments.' },
      { title: 'What happens when one part of the production plan changes?', body: 'When a script page, schedule item, or review note is updated, the connected workflow can reflect that change across related documents and teams. This reduces manual follow-up and helps everyone work from the same current version.' },
      { title: 'How does it prevent production mistakes before they escalate?', body: 'The system highlights stale files, missing approvals, broken dependencies, and version conflicts before they hit the floor. That gives producers and coordinators time to fix issues early instead of discovering them during prep or on shoot day.' },
    ],
    image: '/img16.webp',
    alt: 'img16',
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
    src: '/img3.webp',
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
                loading="lazy"
                decoding="async"
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
                loading="lazy"
                decoding="async"
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
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-white/80 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ServiceStepsAccordion steps={s.steps} />
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
              decoding="async"
            />
            <span className="mt-6 block text-xs tracking-[0.18em] uppercase text-[#70befa]">
              {String(i + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-3xl font-medium leading-[1.05] text-white">
              {s.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#9c9c9c]">{s.body}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold tracking-[0.04em] text-white/80 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ServiceStepsAccordion steps={s.steps} />
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
