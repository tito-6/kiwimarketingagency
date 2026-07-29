"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CharacterSplitProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

// Splits text into characters with a staggered reveal, wrapping by word so
// long titles stay inside the viewport on mobile.
export function CharacterSplit({
  text,
  className,
  delay = 0,
  stagger = 0.03,
}: CharacterSplitProps) {
  const tokens = text.split(/(\s+)/);
  let charIndex = 0;

  return (
    <span className={cn("inline", className)} aria-label={text}>
      {tokens.map((token, ti) => {
        if (/^\s+$/.test(token)) {
          return <span key={`sp-${ti}`}>{" "}</span>;
        }

        const start = charIndex;
        charIndex += token.length;

        return (
          <span
            key={`w-${ti}`}
            className="inline-flex max-w-full overflow-hidden whitespace-nowrap align-baseline"
          >
            {token.split("").map((char, i) => (
              <span key={`${char}-${start + i}`} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotateX: -80 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: delay + (start + i) * stagger,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: "inline-block", transformOrigin: "bottom" }}
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
