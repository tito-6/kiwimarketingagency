"use client";

import Lenis from "lenis";
import { isLiteMotionClient } from "@/lib/motion";
import { useEffect } from "react";

// Lenis smooth scrolling. Disabled for Safari/iOS/reduced-motion — Lenis +
// scroll-linked Framer transforms is a common Safari jank source.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isLiteMotionClient()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    function onFrame(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(onFrame);
    }
    raf = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
