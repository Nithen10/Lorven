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
  "/carousel/newimage4.webp",
  "/carousel/newimage7.webp",
  "/carousel/newimage2.webp",
  "/carousel/newimage1.webp",
  "/carousel/newimage5.webp",
  "/carousel/newimage9.webp",
  "/carousel/newimage3.webp",
  "/carousel/newimage6.webp",
  "/carousel/newvideo1.mp4",
];

const POOL_SIZE = IMAGES.length;

const FALLBACK_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

function CardMedia({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  const isVideo = /\.(mp4|webm|mov)$/i.test(src);

  if (isVideo && !errored) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={() => setErrored(true)}
        aria-label={alt}
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
  // Initial step of 2 places the video (imgIdx=9, last in the IMAGES array)
  // in the center slot on first paint / reload. After SLIDE_MS the carousel
  // continues its normal rotation; the video then drifts toward the left.
  // Math: center slot uses s=3, birth = step - (VISIBLE - 1) + s = step - 3.
  //       imgIdx = ((birth % POOL_SIZE) + POOL_SIZE) % POOL_SIZE.
  //       With step=2 → birth=-1 → imgIdx=9 (video). ✓
  const [step, setStep] = useState(2);

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
                  <CardMedia src={IMAGES[imgIdx]} alt={`Gallery ${imgIdx + 1}`} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
