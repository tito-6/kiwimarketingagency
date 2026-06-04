"use client";

import { whyChoose } from "@/data/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitLine } from "@/components/ui/SplitLine";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function StatCard({ stat, statLabel }: { stat: string; statLabel: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mt-6 overflow-hidden">
      <motion.p
        className="text-5xl font-light text-kiwi-400 md:text-6xl"
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {stat}
      </motion.p>
      <motion.p
        className="mt-1 text-xs uppercase tracking-wider text-white/40"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        {statLabel}
      </motion.p>
    </div>
  );
}

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-32 md:py-48">
      <motion.div
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-kiwi-400/5 blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ScrollReveal blur>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            {whyChoose.label}
          </p>
          <TextReveal
            text={whyChoose.title}
            className="mt-6 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-light leading-tight text-white"
          />
        </ScrollReveal>
        <SplitLine className="mt-12" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-kiwi-400/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              />
              <motion.div
                className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-kiwi-400/10 blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 + i }}
              />
              <h3 className="relative text-lg font-medium text-white">{item.title}</h3>
              <p className="relative mt-4 text-sm leading-relaxed text-white/50">
                {item.description}
              </p>
              <StatCard stat={item.stat} statLabel={item.statLabel} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
