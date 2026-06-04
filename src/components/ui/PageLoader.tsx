"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

// Full-screen intro overlay shown on first paint: brand logo, a fake loading
// counter, then it slides up out of the way. Skipped for reduced-motion users.
export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setCount((c) => Math.min(c + Math.floor(Math.random() * 12) + 3, 100));
    }, 40);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setCount(100);
      setTimeout(() => setLoading(false), 600);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Logo className="h-9 w-auto text-kiwi-400 sm:h-11" />
          </motion.div>
          <motion.p
            className="mt-8 font-mono text-sm tracking-[0.4em] text-white/50"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            YÜKLENİYOR
          </motion.p>
          <div className="mt-6 h-px w-48 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-kiwi-400"
              style={{ width: `${count}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <motion.span
            className="mt-3 font-mono text-xs text-kiwi-400"
            key={count}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {count}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
