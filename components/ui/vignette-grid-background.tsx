import { cn } from "@/lib/utils";

interface GridVignetteBackgroundProps {
  size?: number;
  x?: number;
  y?: number;
  horizontalVignetteSize?: number;
  verticalVignetteSize?: number;
  intensity?: number;
}

export function GridVignetteBackground({
  className,
  size = 48,
  x = 50,
  y = 50,
  horizontalVignetteSize = 100,
  verticalVignetteSize = 100,
  intensity = 0,
}: React.ComponentProps<"div"> & GridVignetteBackgroundProps) {
  return (
    <div
      className={cn("fixed inset-0 z-[-1]", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.07), transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07), transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
        maskImage: `radial-gradient(ellipse ${horizontalVignetteSize}% ${verticalVignetteSize}% at ${x}% ${y}%, black ${
          100 - intensity
        }%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(ellipse ${horizontalVignetteSize}% ${verticalVignetteSize}% at ${x}% ${y}%, black ${
          100 - intensity
        }%, transparent 100%)`,
      }}
    />
  );
}
