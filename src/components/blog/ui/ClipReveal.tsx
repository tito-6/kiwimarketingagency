"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ClipRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "center";
  delay?: number;
};

const clipMap = {
  up: {
    hidden: "inset(100% 0% 0% 0%)",
    visible: "inset(0% 0% 0% 0%)",
  },
  down: {
    hidden: "inset(0% 0% 100% 0%)",
    visible: "inset(0% 0% 0% 0%)",
  },
  left: {
    hidden: "inset(0% 100% 0% 0%)",
    visible: "inset(0% 0% 0% 0%)",
  },
  right: {
    hidden: "inset(0% 0% 0% 100%)",
    visible: "inset(0% 0% 0% 0%)",
  },
  center: {
    hidden: "inset(50% 50% 50% 50%)",
    visible: "inset(0% 0% 0% 0%)",
  },
};

export function ClipReveal({
  children,
  className,
  direction = "up",
  delay = 0,
}: ClipRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const clip = clipMap[direction];

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: clip.hidden }}
      animate={isInView ? { clipPath: clip.visible } : { clipPath: clip.hidden }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
