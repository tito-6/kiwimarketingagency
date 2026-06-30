"use client";

import { iletisimPage } from "@/data/iletisim";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function IletisimProcess() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  return (
    <section ref={ref} className="border-t border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <TextReveal
          text="Sonraki adımlar"
          className="text-3xl font-light text-white md:text-4xl"
        />

        <div className="relative mt-16">
          <div className="absolute left-[19px] top-0 hidden h-full w-px bg-white/10 md:block">
            <motion.div className="w-full bg-kiwi-400" style={{ height: lineHeight }} />
          </div>

          <div className="space-y-12 md:space-y-16">
            {iletisimPage.steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="relative flex gap-8 md:gap-12"
              >
                <motion.div
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-kiwi-400/50 bg-[#1a1a1a] font-mono text-sm text-kiwi-400"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {step.num}
                </motion.div>
                <div>
                  <h3 className="text-xl font-medium text-white md:text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-lg text-white/45">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
