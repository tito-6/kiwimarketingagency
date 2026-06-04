"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AnimatedOrbs } from "@/components/ui/AnimatedOrbs";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export function IletisimMotionShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <AnimatedOrbs />
      <GrainOverlay />
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}
