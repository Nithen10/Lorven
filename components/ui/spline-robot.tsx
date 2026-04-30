"use client";

import Spline from "@splinetool/react-spline";

export function SplineRobot() {
  const handleLoad = (app: any) => {
    try { app.setBackgroundColor?.("transparent"); } catch {}
    try {
      const s: any = app.scene || app._scene;
      if (s) s.background = null;
    } catch {}
  };

  return (
    <Spline
      scene="/scene.splinecode"
      onLoad={handleLoad}
    />
  );
}
