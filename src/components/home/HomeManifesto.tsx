"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = [
  "Kreatif bakış açısı.",
  "Performans odaklı yaklaşım.",
  "Sürdürülebilir büyüme.",
];

export function HomeManifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-12 md:py-16">
      <motion.div
        style={{ x }}
        className="pointer-events-none absolute inset-0 flex items-center"
      >
        <span
          className="whitespace-nowrap font-bold uppercase tracking-tighter text-neutral-900/[0.03]"
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.55"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 16 : -16, 0]);

  return (
    <motion.h2
      ref={ref}
      style={{ opacity, x }}
      className={`break-words border-b border-neutral-900/10 py-4 text-[clamp(1.75rem,8vw,7rem)] font-bold leading-[1.05] tracking-tighter sm:py-5 md:py-6 ${
        index === 1 ? "text-kiwi-400" : "text-neutral-900"
      }`}
    >
      {text}
    </motion.h2>
  );
}
