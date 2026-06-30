"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
  blur?: boolean;
  direction?: "up" | "down" | "left" | "right";
};

const directionMap = {
  up: { y: 80, x: 0 },
  down: { y: -80, x: 0 },
  left: { y: 0, x: 80 },
  right: { y: 0, x: -80 },
};

export function ScrollReveal({
  children,
  className,
  scale = true,
  blur = false,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "start 0.35"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleVal = useTransform(scrollYProgress, [0, 1], scale ? [0.88, 1] : [1, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [directionMap[direction].y, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [directionMap[direction].x, 0]
  );
  const blurVal = useTransform(scrollYProgress, [0, 1], blur ? [6, 0] : [0, 0]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale: scaleVal, y, x, filter }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });

  return (
    <motion.div ref={ref} className={className} style={{ opacity: scrollYProgress }}>
      {children}
    </motion.div>
  );
}
