"use client";

import { images } from "@/data/images";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const cols = [
  { src: images.hero[0], span: "col-span-2 row-span-2", speed: 0.15 },
  { src: images.services.creative, span: "col-span-1 row-span-1", speed: -0.1 },
  { src: images.services.web, span: "col-span-1 row-span-1", speed: 0.12 },
  { src: images.projects[0], span: "col-span-2 row-span-1", speed: -0.08 },
];

function ShowcaseImage({
  src,
  span,
  speed,
}: {
  src: string;
  span: string;
  speed: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 80, speed * -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 ${span}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <motion.div
        className="absolute inset-0 bg-kiwi-400/0 transition-colors duration-500 group-hover:bg-kiwi-400/10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}

export function ImageShowcase() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ScrollReveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-kiwi-400">Önizleme</p>
          <TextReveal
            text="Çalışmalarımızdan kareler"
            className="mt-4 justify-center text-3xl font-light text-white md:text-5xl"
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[200px] md:gap-4">
          {cols.map((item) => (
            <ShowcaseImage key={item.src} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
