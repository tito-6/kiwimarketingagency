"use client";

import { about } from "@/data/content";
import { images } from "@/data/images";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitLine } from "@/components/ui/SplitLine";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section id="about" ref={ref} className="relative py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ScrollReveal blur>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
            {about.label}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <TextReveal
              text={about.title}
              className="text-[clamp(2rem,5vw,4rem)] font-light leading-tight tracking-tight text-white"
            />
            <SplitLine className="mt-10" />
            <ScrollReveal className="mt-10 space-y-6">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base font-light leading-relaxed text-white/50 md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </ScrollReveal>
          </div>

          <motion.div
            style={{ scale: imageScale, rotate: imageRotate }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
          >
            <Image
              src={images.hero[1]}
              alt="Kiwi Agency"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
            <motion.div
              className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <p className="text-3xl font-light text-kiwi-400">100+</p>
              <p className="text-sm text-white/50">tamamlanan proje</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
