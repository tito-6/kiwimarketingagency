"use client";

import { faqs } from "@/data/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-32 md:py-48">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
            {faqs.label}
          </p>
          <TextReveal
            text={faqs.title}
            className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-light text-white"
          />
        </ScrollReveal>

        <div className="mt-16">
          {faqs.items.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.06 }}
              className="border-b border-white/10"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                data-cursor="pointer"
                className="flex w-full items-start justify-between gap-4 py-7 text-left"
              >
                <span className="text-lg font-medium text-white md:text-xl">{item.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  className={cn(
                    "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg",
                    open === i
                      ? "border-kiwi-400 text-kiwi-400"
                      : "border-white/20 text-white/50"
                  )}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 max-w-3xl text-white/50">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
