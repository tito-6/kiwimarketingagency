"use client";

import { testimonials } from "@/data/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const item = testimonials.items[active];
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 300, damping: 30 });

  function goNext() {
    setActive((a) => (a + 1) % testimonials.items.length);
  }
  function goPrev() {
    setActive((a) => (a - 1 + testimonials.items.length) % testimonials.items.length);
  }

  return (
    <section className="relative overflow-hidden border-y border-white/10 py-16 md:py-20">
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-full w-1/2"
        style={{
          background: "radial-gradient(ellipse at left, rgba(169,203,24,0.06), transparent 70%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-4 sm:px-6 md:px-10">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            {testimonials.label}
          </p>
          <TextReveal
            text={testimonials.title}
            className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-white"
          />
        </ScrollReveal>

        <motion.div
          className="mt-12 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          style={{ x: springX }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) goNext();
            else if (info.offset.x > 80) goPrev();
            dragX.set(0);
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 80, filter: "blur(12px)", rotateY: -8 }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)", rotateY: 0 }}
              exit={{ opacity: 0, x: -80, filter: "blur(12px)", rotateY: 8 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 1200 }}
              className="max-w-4xl"
            >
              <blockquote className="text-xl font-light leading-relaxed text-white sm:text-2xl md:text-4xl lg:text-5xl">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="mt-12 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="font-medium text-white">{item.author}</p>
                  <p className="text-sm text-white/50">
                    {item.role}, {item.company}
                  </p>
                </div>
                <div className="text-right">
                  <motion.p
                    className="text-5xl font-light text-kiwi-400 md:text-6xl"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {item.stat}
                  </motion.p>
                  <p className="text-xs uppercase tracking-wider text-white/40">
                    {item.statLabel}
                  </p>
                </div>
              </footer>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-12 bg-kiwi-400" : "w-6 bg-white/20"
                }`}
                aria-label={`Referans ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={goPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white"
            >
              ←
            </motion.button>
            <motion.button
              type="button"
              onClick={goNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white"
            >
              →
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
