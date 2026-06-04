"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AnimatedOrbs } from "@/components/ui/AnimatedOrbs";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { PageLoader } from "@/components/ui/PageLoader";

export function HomeMotionShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <PageLoader />
      <AnimatedOrbs />
      <GrainOverlay />
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}
