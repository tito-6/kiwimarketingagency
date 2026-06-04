"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export function ReadingRing({
  accent,
  containerRef,
}: {
  accent: string;
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const circumference = 2 * Math.PI * 20;
  const offset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);
  const [pct, setPct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPct(Math.round(v * 100));
  });

  return (
    <div className="relative h-12 w-12 shrink-0">
      <svg className="-rotate-90" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-mono text-[9px]"
        style={{ color: accent }}
      >
        {pct}
      </span>
    </div>
  );
}
