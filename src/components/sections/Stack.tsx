"use client";

import { stack } from "@/data/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";

function ToolRow({ tools, reverse = false }: { tools: string[]; reverse?: boolean }) {
  const doubled = [...tools, ...tools];

  return (
    <div className="flex overflow-hidden py-2">
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: reverse ? 25 : 20, ease: "linear" }}
      >
        {doubled.map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white/60"
          >
            {tool}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Stack() {
  const row1 = stack.tools.slice(0, 5);
  const row2 = stack.tools.slice(5);

  return (
    <section className="overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
            {stack.label}
          </p>
          <TextReveal
            text={stack.title}
            className="mt-6 text-[clamp(2rem,5vw,4rem)] font-light text-white"
          />
        </ScrollReveal>

        <div className="mt-16 space-y-2">
          <ToolRow tools={row1} />
          <ToolRow tools={row2} reverse />
          <ToolRow tools={stack.tools} />
        </div>
      </div>
    </section>
  );
}
