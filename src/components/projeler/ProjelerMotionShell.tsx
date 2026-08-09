"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AnimatedOrbs } from "@/components/ui/AnimatedOrbs";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useLiteMotion } from "@/lib/motion";

export function ProjelerMotionShell({ children }: { children: React.ReactNode }) {
  const lite = useLiteMotion();

  if (lite) return <>{children}</>;

  return (
    <SmoothScroll>
      <AnimatedOrbs />
      <GrainOverlay />
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}
