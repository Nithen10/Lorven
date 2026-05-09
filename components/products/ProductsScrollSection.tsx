"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HoverRevealButton } from "@/components/ui/button-5";

gsap.registerPlugin(ScrollTrigger);

const TILE_COUNT = 3;

type Product = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

const PRODUCTS: Product[] = [
  {
    id: "cine-sketch",
    eyebrow: "Storyboards",
    title: "Cine Sketch",
    body: "Auto-generate shot sketches for each scene with visuals informed by script tone, character emotion, and plot relevance. Adjust camera angles, positions, and framing, review characters and emotional beats within every sketch, and download complete shot templates with character, location, and camera metadata. Regenerate or customize any shot to match your creative vision.",
    cta: "Start Now",
  },
  {
    id: "cine-scribe",
    eyebrow: "Scripts",
    title: "Cine Scribe",
    body: "A drafting tool for screenwriters. Hand it a logline, get a beat sheet. Hand it a beat, get a scene. You stay in charge of the rewrite. It just clears the blank page for you.",
    cta: "Coming Soon",
  },
  {
    id: "pitch-craft",
    eyebrow: "Decks",
    title: "Pitch Craft",
    body: "Pitch decks for film and TV. Drop in your script plus a few reference images; it pulls comp titles, builds a mood board, and writes the logline and synopsis. The first draft takes an evening.",
    cta: "Coming Soon",
  },
  {
    id: "cine-flow",
    eyebrow: "Workflows",
    title: "Cine Flow",
    body: "A shared workspace for the production. Scripts, shot lists, schedules, and review notes. All linked, all versioned, all in sync. Your producer stops being the messenger between five different tools.",
    cta: "Coming Soon",
  },
];

export function ProductsScrollSection() {
  const containerRef = useRef<HTMLElement>(null);

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

function ProductScene({
  product,
  index,
  total,
}: {
  product: Product;
  index: number;
  total: number;
}) {
  const { eyebrow, title, body, cta } = product;
  return (
    <article
      className="product-stack-scene"
      style={{ zIndex: index + 1 }}
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${title}`}
    >
      <div className="product-stack-inner">
        <header className="product-stack-header">
          <span className="product-scene-eyebrow">{eyebrow}</span>
          <span className="product-scene-count">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </header>
        <div className="product-stack-headline">
          <h3>{title}</h3>
          <div className="product-stack-meta">
            <p>{body}</p>
            <HoverRevealButton label={cta} size="md" />
          </div>
        </div>
        <div className="product-stack-gallery" aria-hidden="true">
          {Array.from({ length: TILE_COUNT }).map((_, i) => {
            if (index === 0 && i === 0) {
              return <HoverVideoTile key={i} src="/video1.mp4" />;
            }
            if (index === 0 && i === 2) {
              return <HoverVideoTile key={i} src="/video2.mp4" />;
            }
            return (
              <div key={i} className="product-stack-tile">
                {index === 0 && i === 1 && (
                  <img
                    src="/img12.webp"
                    alt="Cine Sketch reference"
                    className="product-stack-tile-img"
                    loading="lazy"
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function HoverVideoTile({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <div
      className="product-stack-tile"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <video
        ref={videoRef}
        src={src}
        className="product-stack-tile-video"
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
