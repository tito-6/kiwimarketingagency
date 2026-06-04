"use client";

import { images } from "@/data/images";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const shots = [
  images.hero[0],
  images.services.creative,
  images.projects[0],
  images.services.marketing,
  images.projects[1],
  images.hero[2],
];

export function HomeShowreel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="overflow-hidden py-20">
      <motion.div style={{ y }} className="flex gap-4 px-4 md:gap-6 md:px-10">
        {shots.map((src, i) => (
          <motion.div
            key={src}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 0.98, rotate: i % 2 === 0 ? -1 : 1 }}
            className="relative h-[45vh] min-h-[240px] min-w-[min(85vw,320px)] shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:min-w-[70vw] sm:rounded-3xl sm:h-[50vh] md:min-w-[40vw]"
          >
            <Image src={src} alt="" fill className="object-cover" sizes="70vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent" />
            <motion.span
              className="absolute bottom-6 left-6 font-mono text-6xl font-bold text-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
