"use client";

import { motion } from "framer-motion";

const orbs = [
  { className: "left-[10%] top-[20%] h-[500px] w-[500px] bg-kiwi-400/15", duration: 18 },
  { className: "right-[5%] top-[40%] h-[400px] w-[400px] bg-emerald-500/10", duration: 22 },
  { className: "left-[40%] bottom-[10%] h-[350px] w-[350px] bg-lime-400/8", duration: 15 },
];

export function AnimatedOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[100px] ${orb.className}`}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
