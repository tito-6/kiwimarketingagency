"use client";

import { hizmetlerPage } from "@/data/content";
import { images } from "@/data/images";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function HizmetlerHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[85svh] overflow-hidden pt-24 pb-16 sm:min-h-[90vh] sm:pt-32 sm:pb-20"
    >
      <div className="absolute inset-0">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={images.services.marketing}
            alt=""
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-[#1a1a1a]/90 to-[#1a1a1a]" />
      </div>

      <motion.div style={{ opacity }} className="relative mx-auto max-w-[1440px] px-4 sm:px-4 sm:px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400"
        >
          {hizmetlerPage.subtitle}
        </motion.p>

        <TextReveal
          text={hizmetlerPage.headline}
          className="mt-8 text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tighter text-white"
          as="h1"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-[clamp(1.5rem,4vw,3.5rem)] font-light text-white/30"
        >
          {hizmetlerPage.headlineAccent}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 max-w-2xl text-lg text-white/50"
        >
          {hizmetlerPage.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10"
        >
          <MagneticButton href="/#contact" variant="primary">
            Proje Başlat
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-20 h-px origin-left bg-gradient-to-r from-kiwi-400/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
