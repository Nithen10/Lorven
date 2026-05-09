"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLOT_X = [0, 358, 682, 906];
const SLOT_Z = [-1000, -934, -731, -423];
const SLOT_ROT_Y = [0, 21, 43, 65];

const SLOT_SKEW_MAG = [0, 0, 0, 0];
const SLOT_SCALE_X = [1, 1, 1, 1];
const SLOT_SCALE_Y = [1, 1, 1, 1];
const SLOT_RADIUS = [16, 16, 16, 16];
const SLOT_OPACITY = [1, 1, 1, 1];
const SLOT_BRIGHT = [1, 1, 1, 1];
const SLOT_BLUR = [0, 0, 0, 0];

const CARD_W = 345;
const CARD_H = 490;

const SLIDE_MS = 2000;
const VISIBLE = 7;

const IMAGES = [
  "https://images.unsplash.com/photo-1667986292516-f27450ae75a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1588336443962-49d88df004a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1773067752202-3ec4e1570bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1767958465025-75c050ab10c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1771515220841-2dfbfe80e9e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1765489638717-f6059db71ed5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://picsum.photos/seed/cyber-a/400/640",
  "https://picsum.photos/seed/cyber-b/400/640",
  "https://picsum.photos/seed/cyber-c/400/640",
  "https://picsum.photos/seed/cyber-d/400/640",
  "https://picsum.photos/seed/cyber-e/400/640",
];

const POOL_SIZE = IMAGES.length;

const FALLBACK_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

function CardImg({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  return (
    <img
      src={errored ? FALLBACK_SRC : src}
      alt={alt}
      onError={() => setErrored(true)}
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}

export function CylinderCarousel() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      if (id === undefined) {
        id = setInterval(() => setStep((s) => s + 1), SLIDE_MS);
      }
    };

    const stop = () => {
      if (id !== undefined) {
        clearInterval(id);
        id = undefined;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const visibleCards: { birth: number; slot: number; imgIdx: number }[] = [];
  for (let s = 0; s < VISIBLE; s++) {
    const birth = step - (VISIBLE - 1) + s;
    const slot = s - 3;
    const imgIdx = ((birth % POOL_SIZE) + POOL_SIZE) % POOL_SIZE;
    visibleCards.push({ birth, slot, imgIdx });
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1400px",
        perspectiveOrigin: "center center",
        overflow: "visible",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 900,
          height: 400,
          transform: "translate(-50%, -50%) translateZ(-500px)",
          background:
            "radial-gradient(ellipse at center, rgba(160, 255, 110, 0.28) 0%, rgba(160, 255, 110, 0.10) 30%, transparent 65%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
        <div
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <AnimatePresence initial={false}>
          {visibleCards.map(({ birth, slot, imgIdx }) => {
            const ao = Math.abs(slot);
            const sg = Math.sign(slot);
            const x = sg * SLOT_X[ao];
            const z = SLOT_Z[ao];
            const ry = -sg * SLOT_ROT_Y[ao];
            const scaleX = SLOT_SCALE_X[ao];
            const scaleY = SLOT_SCALE_Y[ao];
            const skewY = -sg * SLOT_SKEW_MAG[ao];
            const op = SLOT_OPACITY[ao];
            const radius = SLOT_RADIUS[ao];
            const filter = `brightness(${SLOT_BRIGHT[ao]}) blur(${SLOT_BLUR[ao]}px)`;

            return (
              <motion.div
                key={birth}
                style={{
                  position: "absolute",
                  transformStyle: "preserve-3d",
                  zIndex: 53 - ao,
                  filter,
                }}
                initial={{ opacity: 0, x, z, rotateY: ry, scaleX, scaleY, skewY }}
                animate={{ opacity: op, x, z, rotateY: ry, scaleX, scaleY, skewY }}
                exit={{ opacity: 0 }}
                transition={{ duration: SLIDE_MS / 1000, ease: "easeInOut" }}
              >
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "#171717",
                    boxShadow: "0 18px 44px rgba(0,0,0,0.55)",
                    border: "1px solid rgba(64, 64, 64, 0.4)",
                    width: CARD_W,
                    height: CARD_H,
                    borderRadius: radius,
                  }}
                >
                  <CardImg src={IMAGES[imgIdx]} alt={`Gallery ${imgIdx + 1}`} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
