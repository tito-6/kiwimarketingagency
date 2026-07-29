"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AnimatedOrbs } from "@/components/ui/AnimatedOrbs";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { PageLoader } from "@/components/ui/PageLoader";
import { useLiteMotion } from "@/lib/motion";

export function HomeMotionShell({ children }: { children: React.ReactNode }) {
  const lite = useLiteMotion();

  if (lite) {
    // Zero chrome on Safari/iOS — no Lenis, loader, orbs, grain, or cursor.
    return <>{children}</>;
  }

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
