"use client";

import { projelerPage } from "@/data/projects";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center"
    >
      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-kiwi-400/10 blur-3xl"
        animate={isInView ? { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.p
        className="relative text-4xl font-light text-kiwi-400 md:text-5xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
      >
        {value}
      </motion.p>
      <p className="relative mt-2 text-xs uppercase tracking-[0.2em] text-white/40">{label}</p>
    </motion.div>
  );
}

export function ProjelerStats() {
  return (
    <section id="stats" className="border-y border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="mb-16 text-center">
          <TextReveal
            text="Rakamlarla Kiwi"
            className="justify-center text-3xl font-light text-white md:text-4xl"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {projelerPage.stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
