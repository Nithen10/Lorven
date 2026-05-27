"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, useState, type CSSProperties } from "react";

type Variant = "lights" | "camera" | "intelligence";

interface ShutterTextProps {
  text: string;
  variant: Variant;
}

const SLICE_COLORS: Record<Variant, { outer: string; middle: string }> = {
  lights: { outer: "#70befa", middle: "#70befa" },
  camera: { outer: "#70befa", middle: "#ffffff" },
  intelligence: { outer: "#ffffff", middle: "#ffffff" },
};

const mainVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.055 + 0.42, duration: 1.1 },
  }),
};

const topVariants: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: (i: number) => ({
    x: "100%",
    opacity: [0, 1, 0],
    transition: { duration: 1.0, delay: i * 0.055, ease: "easeInOut" },
  }),
};

const middleVariants: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: (i: number) => ({
    x: "-100%",
    opacity: [0, 1, 0],
    transition: { duration: 1.0, delay: i * 0.055 + 0.14, ease: "easeInOut" },
  }),
};

const bottomVariants: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: (i: number) => ({
    x: "100%",
    opacity: [0, 1, 0],
    transition: { duration: 1.0, delay: i * 0.055 + 0.28, ease: "easeInOut" },
  }),
};

const cellStyle: CSSProperties = {
  position: "relative",
  display: "inline-block",
  overflow: "hidden",
};

const sliceStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

export default function ShutterText({ text, variant }: ShutterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [replayKey, setReplayKey] = useState(0);
  const shouldShow = inView || replayKey > 0;

  const characters = text.split("");
  const n = characters.length;
  const slice = SLICE_COLORS[variant];

  const mainColor = (i: number): CSSProperties => {
    if (variant === "camera") {
      return {
        backgroundImage: "linear-gradient(90deg, #fff 20%, #9ec5ff 92%)",
        backgroundSize: `${n * 100}% 100%`,
        backgroundPositionX: n > 1 ? `${(i / (n - 1)) * 100}%` : "0%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      };
    }
    return { color: variant === "intelligence" ? "#70befa" : "#ffffff" };
  };

  if (reduceMotion) {
    return (
      <span ref={ref} style={{ display: "flex" }} aria-label={text}>
        <span aria-hidden="true" style={{ display: "flex" }}>
          {characters.map((char, i) => (
            <span key={i} style={cellStyle}>
              <span style={{ display: "block", ...mainColor(i) }}>
                {char === " " ? " " : char}
              </span>
            </span>
          ))}
        </span>
      </span>
    );
  }

  return (
    <span
      ref={ref}
      onMouseEnter={() => setReplayKey((k) => k + 1)}
      style={{ display: "flex", pointerEvents: "auto", userSelect: "none" }}
      aria-label={text}
    >
      <span key={replayKey} aria-hidden="true" style={{ display: "flex" }}>
        {characters.map((char, i) => {
          const glyph = char === " " ? " " : char;
          const animate = shouldShow ? "visible" : "hidden";
          return (
            <span key={i} style={cellStyle}>
              <motion.span
                custom={i}
                variants={mainVariants}
                initial="hidden"
                animate={animate}
                style={{ display: "block", ...mainColor(i) }}
              >
                {glyph}
              </motion.span>
              <motion.span
                custom={i}
                variants={topVariants}
                initial="hidden"
                animate={animate}
                style={{
                  ...sliceStyle,
                  color: slice.outer,
                  clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                }}
              >
                {glyph}
              </motion.span>
              <motion.span
                custom={i}
                variants={middleVariants}
                initial="hidden"
                animate={animate}
                style={{
                  ...sliceStyle,
                  color: slice.middle,
                  clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                }}
              >
                {glyph}
              </motion.span>
              <motion.span
                custom={i}
                variants={bottomVariants}
                initial="hidden"
                animate={animate}
                style={{
                  ...sliceStyle,
                  color: slice.outer,
                  clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                }}
              >
                {glyph}
              </motion.span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
