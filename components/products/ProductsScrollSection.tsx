"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Product = {
  id: string;
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  Visual: React.FC;
};

const PRODUCTS: Product[] = [
  {
    id: "cine-sketch",
    eyebrow: "Storyboards",
    title: "Cine Sketch",
    tagline: "AI-Powered Story Sketches",
    body: "Visualize scenes instantly — converts concepts into storyboards and creative frames before filming begins.",
    Visual: SketchVisual,
  },
  {
    id: "cine-scribe",
    eyebrow: "Scripts",
    title: "Cine Scribe",
    tagline: "Intelligent Script Writing",
    body: "Turn ideas into structured scripts using intelligent AI tools with engaging dialogue and cinematic depth.",
    Visual: ScribeVisual,
  },
  {
    id: "pitch-craft",
    eyebrow: "Decks",
    title: "Pitch Craft",
    tagline: "Film Pitches & Decks",
    body: "Create compelling film pitches and presentations that convey vision, emotion, and market appeal in minutes.",
    Visual: PitchVisual,
  },
  {
    id: "cine-flow",
    eyebrow: "Workflows",
    title: "Cine Flow",
    tagline: "End-to-End Production",
    body: "Streamline creative workflows from initial concept through execution, enabling team collaboration and momentum.",
    Visual: FlowVisual,
  },
];

export function ProductsScrollSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inSection, setInSection] = useState(false);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const container = containerRef.current;
      if (!container) return;

      const scenes = gsap.utils.toArray<HTMLElement>(
        ".product-stack-scene",
        container,
      );

      // Track which scene is currently "on top" (most recently stuck)
      scenes.forEach((scene, i) => {
        ScrollTrigger.create({
          trigger: scene,
          start: "top top",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i);
          },
        });
      });

      // Track whether the user is anywhere inside the products section,
      // so the floating dot indicator only shows while it's relevant.
      ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        end: "bottom top",
        onToggle: (self) => setInSection(self.isActive),
      });

      // Subtle fade/scale on outgoing scenes as the next one covers them —
      // gives the LTX-style "previous card recedes" feel.
      scenes.forEach((scene, i) => {
        if (i === scenes.length - 1) return;
        const inner = scene.querySelector(".product-stack-inner");
        if (!inner) return;
        gsap.to(inner, {
          scale: 0.94,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: scenes[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      className="section products-stack-wrap"
      id="products"
      ref={containerRef}
    >
      <ProductProgressDots
        count={PRODUCTS.length}
        activeIndex={activeIndex}
        visible={inSection}
      />
      {PRODUCTS.map((p, i) => (
        <ProductScene
          key={p.id}
          product={p}
          index={i}
          total={PRODUCTS.length}
        />
      ))}
    </section>
  );
}

function ProductProgressDots({
  count,
  activeIndex,
  visible,
}: {
  count: number;
  activeIndex: number;
  visible: boolean;
}) {
  return (
    <div
      className={`product-progress-dots${visible ? " visible" : ""}`}
      role="tablist"
      aria-label="Product progress"
      aria-hidden={!visible}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={i === activeIndex ? "active" : ""}
          aria-current={i === activeIndex}
        />
      ))}
    </div>
  );
}

function ProductScene({
  product,
  index,
  total,
}: {
  product: Product;
  index: number;
  total: number;
}) {
  const { eyebrow, title, tagline, body, Visual } = product;
  return (
    <article
      className="product-stack-scene"
      style={{ zIndex: index + 1 }}
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${title}`}
    >
      <div className="product-stack-inner">
        <header className="product-stack-header">
          <span className="product-scene-eyebrow">
            {String(index + 1).padStart(2, "0")} · {eyebrow}
          </span>
          <span className="product-scene-count">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </header>
        <div className="product-stack-body">
          <div className="product-scene-copy">
            <h3>{title}</h3>
            <strong>{tagline}</strong>
            <p>{body}</p>
          </div>
          <div className="product-scene-visual">
            <Visual />
          </div>
        </div>
      </div>
    </article>
  );
}

function SketchVisual() {
  return (
    <div className="image-generator scene-mock">
      <div className="stars" />
      <button>generating <span>storyboard...</span></button>
      <div className="input-bar">
        <span>Sketch the opening scene...</span>
        <button>Sketch</button>
      </div>
    </div>
  );
}

function ScribeVisual() {
  return (
    <div className="chat-preview scene-mock">
      <div className="message-row">
        <svg className="chat-star" viewBox="0 0 100 100" width="28" height="28">
          <path
            d="M50 5 C52 38,62 48,95 50 C62 52,52 62,50 95 C48 62,38 52,5 50 C38 48,48 38,50 5Z"
            fill="#70befa"
          />
        </svg>
        <div>
          <strong>You</strong> <span>10:30 AM</span>
          <p>Open on a rainy Mumbai street, neon reflections on the pavement.</p>
        </div>
      </div>
      <div className="message-row">
        <svg className="chat-star" viewBox="0 0 100 100" width="28" height="28">
          <path
            d="M50 5 C52 38,62 48,95 50 C62 52,52 62,50 95 C48 62,38 52,5 50 C38 48,48 38,50 5Z"
            fill="#70befa"
          />
        </svg>
        <div>
          <strong>Cine Scribe</strong> <span>10:30 AM</span>
          <p>EXT. MUMBAI STREET — NIGHT. Rain hammers the neon-lit pavement as a figure emerges from the shadows...</p>
        </div>
      </div>
      <div className="input-bar">
        <span>Describe your next scene...</span>
        <button aria-label="Send">^</button>
      </div>
    </div>
  );
}

function PitchVisual() {
  return (
    <div className="pitch-deck scene-mock">
      <div className="slide slide-back" />
      <div className="slide slide-mid" />
      <div className="slide slide-front">
        <div className="slide-header">
          <span className="slide-dot" />
          <span className="slide-dot" />
          <span className="slide-dot" />
        </div>
        <p className="slide-title">Film Pitch</p>
        <div className="slide-bars">
          <span />
          <span />
          <span />
        </div>
        <p className="slide-label">Slide 1 of 12</p>
      </div>
    </div>
  );
}

function FlowVisual() {
  return (
    <div className="automation-orbit scene-mock">
      <span>*</span>
      <span>◇</span>
      <span>#</span>
      <span>◆</span>
      <div>
        <strong>100+</strong>
        <small>Automations</small>
      </div>
    </div>
  );
}
