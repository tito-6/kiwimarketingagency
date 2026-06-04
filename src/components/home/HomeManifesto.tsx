"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = [
  "Veri odaklı.",
  "İnsan merkezli.",
  "Ölçülebilir büyüme.",
];

export function HomeManifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-48">
      <motion.div
        style={{ x }}
        className="pointer-events-none absolute inset-0 flex items-center"
      >
        <span
          className="whitespace-nowrap font-bold uppercase tracking-tighter text-white/[0.02]"
          style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
        >
          KIWI AGENCY · DIGITAL · CREATIVE ·
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        {lines.map((line, i) => (
          <ManifestoLine key={line} text={line} index={i} />
        ))}
      </div>
    </section>
  );
}

function ManifestoLine({ text, index }: { text: string; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.2"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 80 : -80, 0]);

  return (
    <motion.h2
      ref={ref}
      style={{ opacity, x }}
      className={`border-b border-white/10 py-8 text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tighter ${
        index === 1 ? "text-kiwi-400" : "text-white"
      }`}
    >
      {text}
    </motion.h2>
  );
}
