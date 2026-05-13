"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HoverRevealButton } from "@/components/ui/button-5";
import { getLenis } from "@/app/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const TILE_COUNT = 4;

// Cine Sketch tile artwork in display order (left → right).
const CINE_SKETCH_TILE_IMAGES = [
  "/img17.webp",
  "/img18.webp",
  "/img19.webp",
  "/img20.webp",
] as const;

// Step labels paired with each tile — the four-step Cine Sketch flow.
const CINE_SKETCH_TILE_LABELS = [
  "Upload your script",
  "AI breaks it down",
  "Generate the magic",
  "Your storyboard, ready",
] as const;

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

  // Mark off-stage scenes as `inert` so keyboard tabbing skips their buttons.
  // Without this, focus can land on a "Start Now" / "Coming Soon" button hidden
  // behind the currently-on-top scene, which triggers the browser's
  // scrollIntoView and fights Lenis (same desync category as the original
  // CineSketch→PitchCraft bug).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = containerRef.current;
    if (!container) return;
    const scenes = Array.from(
      container.querySelectorAll<HTMLElement>(".product-stack-scene"),
    );
    if (scenes.length === 0) return;

    const update = () => {
      const sectionTop = container.getBoundingClientRect().top + window.scrollY;
      const vh = window.innerHeight;
      // Each scene occupies one viewport of scroll. Active = how many viewports
      // past the section's top we are. Clamp to the last scene.
      const raw = Math.floor((window.scrollY - sectionTop) / vh);
      const active = Math.max(0, Math.min(scenes.length - 1, raw));
      scenes.forEach((scene, i) => {
        if (i === active) {
          scene.removeAttribute("inert");
          scene.classList.add("is-active");
        } else {
          scene.setAttribute("inert", "");
          scene.classList.remove("is-active");
        }
      });
    };

    update();
    window.addEventListener("resize", update);
    const lenis = getLenis();
    let detach: (() => void) | null = null;
    if (lenis) {
      lenis.on("scroll", update);
      detach = () => lenis.off("scroll", update);
    } else {
      window.addEventListener("scroll", update, { passive: true });
      detach = () => window.removeEventListener("scroll", update);
    }
    return () => {
      window.removeEventListener("resize", update);
      detach?.();
      // Don't leave any scene inert or marked active if the component unmounts mid-stack.
      scenes.forEach((scene) => {
        scene.removeAttribute("inert");
        scene.classList.remove("is-active");
      });
    };
  }, []);

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
      data-product-id={product.id}
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
          {product.id === "cine-sketch" ? (
            <div className="product-stack-title-wrap">
              <h3>{title}</h3>
              <img
                src="/cine-sketch-logo.png"
                alt=""
                aria-hidden="true"
                className="product-stack-title-logo"
                draggable={false}
              />
            </div>
          ) : (
            <h3>{title}</h3>
          )}
          <div className="product-stack-meta">
            <p>{body}</p>
            <HoverRevealButton label={cta} size="md" />
          </div>
        </div>
        <div className="product-stack-gallery" aria-hidden="true">
          {Array.from({ length: TILE_COUNT }).map((_, i) => (
            <div key={i} className="product-stack-tile">
              {product.id === "cine-sketch" && (
                <>
                  <img
                    src={CINE_SKETCH_TILE_IMAGES[i]}
                    alt=""
                    className="product-stack-tile-img"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="product-stack-tile-label">
                    <span className="product-stack-tile-label-line" aria-hidden="true" />
                    <div className="product-stack-tile-label-text">
                      <span className="product-stack-tile-step">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="product-stack-tile-title">
                        {CINE_SKETCH_TILE_LABELS[i]}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

