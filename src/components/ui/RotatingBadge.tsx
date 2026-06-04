"use client";

import { motion } from "framer-motion";

const text = "DIGITAL · CREATIVE · STRATEGY · GROWTH · ";

export function RotatingBadge() {
  return (
    <motion.div
      className="absolute right-6 top-1/2 hidden h-32 w-32 -translate-y-1/2 xl:block 2xl:right-16"
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ delay: 1.4, duration: 1 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="relative h-full w-full"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text className="fill-white/30 text-[8.5px] uppercase tracking-[0.35em]">
            <textPath href="#circlePath">{text + text}</textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-kiwi-400" />
        </div>
      </motion.div>
    </motion.div>
  );
}
