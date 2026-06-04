"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 35 });
  const springY = useSpring(y, { stiffness: 500, damping: 35 });
  const ringX = useSpring(x, { stiffness: 150, damping: 25 });
  const ringY = useSpring(y, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarse) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor='pointer']")
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[200] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kiwi-400 mix-blend-difference"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[199] -translate-x-1/2 -translate-y-1/2 rounded-full border border-kiwi-400/50"
        style={{
          x: ringX,
          y: ringY,
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
