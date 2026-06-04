"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CharacterSplitProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

// Splits text into individual characters and reveals them one by one with a
// staggered slide-up. Each character sits in its own overflow-hidden box so the
// "rising from below" effect is clipped per letter (and never clips neighbours).
export function CharacterSplit({
  text,
  className,
  delay = 0,
  stagger = 0.03,
}: CharacterSplitProps) {
  const chars = text.split("");

  return (
    <span className={cn("inline-flex overflow-hidden", className)} aria-label={text}>
      {chars.map((char, i) => (
        <span key={`${char}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -80 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block", transformOrigin: "bottom" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
