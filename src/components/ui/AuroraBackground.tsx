"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-1/2 top-0 h-[80%] w-full rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(ellipse, rgba(169,203,24,0.4) 0%, transparent 70%)" }}
        animate={{ x: ["-10%", "10%", "-10%"], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[60%] w-[80%] rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(ellipse, rgba(52,211,153,0.35) 0%, transparent 70%)" }}
        animate={{ x: [0, -40, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]">
        <motion.path
          d="M0,200 Q400,100 800,200 T1600,200"
          fill="none"
          stroke="#a9cb18"
          strokeWidth="1"
          animate={{
            d: [
              "M0,200 Q400,100 800,200 T1600,200",
              "M0,220 Q400,180 800,120 T1600,220",
              "M0,200 Q400,100 800,200 T1600,200",
            ],
          }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
      </svg>
    </div>
  );
}
