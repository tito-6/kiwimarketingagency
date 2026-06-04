"use client";

import { hizmetlerPage } from "@/data/content";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ProcessTimeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-32 md:py-48">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <TextReveal
          text="Nasıl çalışıyoruz?"
          className="text-[clamp(2rem,5vw,4rem)] font-light text-white"
        />

        <div className="relative mt-20">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-white/10 md:left-1/2 md:block md:-translate-x-px">
            <motion.div
              className="w-full bg-kiwi-400"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {hizmetlerPage.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative grid gap-8 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className={`${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <span className="font-mono text-5xl font-bold text-kiwi-400/30">
                    {step.step}
                  </span>
                  <h3 className="mt-2 text-2xl font-medium text-white md:text-3xl">
                    {step.title}
                  </h3>
                </div>
                <div className={`flex items-center ${i % 2 === 1 ? "md:justify-end" : ""}`}>
                  <p className="max-w-md text-white/50">{step.desc}</p>
                </div>
                <motion.div
                  className="absolute left-4 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-kiwi-400 md:left-1/2 md:block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                  style={{ top: "50%" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
