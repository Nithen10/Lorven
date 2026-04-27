"use client";

import { ArrowRight } from "lucide-react";

interface HoverRevealButtonProps {
  label?: string;
  size?: "sm" | "md";
}

export function HoverRevealButton({ label = "Our Work", size = "sm" }: HoverRevealButtonProps) {
  const sizing = size === "md" ? "p-2 w-36" : "p-1.5 w-25";
  return (
    <div
      className={`group relative cursor-pointer ${sizing} rounded-full overflow-hidden text-white text-center font-semibold`}
      style={{ boxShadow: "0 2px 16px rgba(0, 0, 0, 0.15)" }}
    >
      {/* Glass layers */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: "blur(16px) saturate(1.8)",
          WebkitBackdropFilter: "blur(16px) saturate(1.8)",
          borderRadius: "inherit",
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(255, 255, 255, 0.06)", borderRadius: "inherit" }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          boxShadow:
            "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.15), inset 1px 0 1px 0 rgba(255, 255, 255, 0.2), inset -1px 0 1px 0 rgba(255, 255, 255, 0.2)",
          borderRadius: "inherit",
        }}
      />
      <div
        className="absolute inset-0 z-[3]"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "inherit",
          pointerEvents: "none",
        }}
      />
      <span className="relative z-[5] translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block text-sm">
        {label}
      </span>
      <div className="flex gap-2 text-white bg-[#70befa] z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:rounded-none">
        <span className="text-sm">{label}</span>
        <ArrowRight size={16} />
      </div>
    </div>
  );
}
