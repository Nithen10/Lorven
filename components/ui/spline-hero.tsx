"use client";

import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";

export function SplineHero() {
  const super8Ref = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (app: any) => {
    try { app.setBackgroundColor?.("transparent"); } catch {}
    try {
      const s: any = app.scene || app._scene;
      if (s) s.background = null;
    } catch {}

    const hidePatterns = [
      "nizo",
      "oberheim",
      "robert",
      "1968",
      "braun",
      "frankfurt",
      "movie camera",
      "text",
      "title",
      "subtitle",
      "label",
      "description",
      "caption",
    ];

    const hideIfMatch = (obj: any) => {
      if (!obj) return;
      const name = String(obj.name || "").toLowerCase();
      if (name && hidePatterns.some((p) => name.includes(p))) {
        obj.visible = false;
        return;
      }
      if (obj.isMesh && obj.geometry) {
        const geomType = String(obj.geometry.type || "").toLowerCase();
        if (geomType.includes("text")) obj.visible = false;
      }
    };

    const scene: any = app.scene || app._scene;
    try {
      scene?.traverse?.(hideIfMatch);
    } catch {}

    super8Ref.current = app.findObjectByName?.("Super8") ?? null;
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded || !super8Ref.current) return;
    const heroEl = document.querySelector<HTMLElement>(".hero-3d");
    if (!heroEl) return;

    let targetRotation = super8Ref.current.rotation?.y ?? 0;
    let currentRotation = targetRotation;
    let rafId: number | null = null;

    const ease = 0.08;

    const animate = () => {
      const diff = targetRotation - currentRotation;
      currentRotation += diff * ease;

      if (super8Ref.current?.rotation) {
        super8Ref.current.rotation.y = currentRotation;
      }

      if (Math.abs(diff) > 0.0001) {
        rafId = requestAnimationFrame(animate);
      } else {
        currentRotation = targetRotation;
        rafId = null;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRotation += e.deltaY * 0.005;
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    heroEl.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      heroEl.removeEventListener("wheel", onWheel);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [loaded]);

  return (
    <Spline
      scene="/scene.splinecode"
      onLoad={handleLoad}
    />
  );
}
