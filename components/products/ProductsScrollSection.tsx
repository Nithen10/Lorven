"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    body: "Visualize scenes instantly — converts concepts into storyboards and creative frames before filming begins.",
    cta: "Start Now",
  },
  {
    id: "cine-scribe",
    eyebrow: "Scripts",
    title: "Cine Scribe",
    body: "Turn ideas into structured scripts using intelligent AI tools with engaging dialogue and cinematic depth.",
    cta: "Coming Soon",
  },
  {
    id: "pitch-craft",
    eyebrow: "Decks",
    title: "Pitch Craft",
    body: "Create compelling film pitches and presentations that convey vision, emotion, and market appeal in minutes.",
    cta: "Coming Soon",
  },
  {
    id: "cine-flow",
    eyebrow: "Workflows",
    title: "Cine Flow",
    body: "Streamline creative workflows from initial concept through execution, enabling team collaboration and momentum.",
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
            <button className="product-stack-cta" type="button">
              {cta}
            </button>
          </div>
        </div>
        <div className="product-stack-gallery" aria-hidden="true">
          <div className="product-stack-tile" />
          <div className="product-stack-tile" />
          <div className="product-stack-tile" />
          <div className="product-stack-tile" />
        </div>
      </div>
    </article>
  );
}
