"use client";

import { hizmetlerPage } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";

export function HizmetlerHero() {
  return (
    <section className="relative min-h-[70svh] overflow-hidden bg-white pt-28 pb-16 sm:min-h-[75vh] sm:pt-32 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(169,203,24,0.12),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400"
        >
          {hizmetlerPage.subtitle}
        </motion.p>

        <TextReveal
          text={hizmetlerPage.headline}
          className="mt-8 break-words text-[clamp(2rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tighter text-neutral-900"
          as="h1"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 break-words text-[clamp(1.25rem,4vw,2.75rem)] font-light text-neutral-900/35"
        >
          {hizmetlerPage.headlineAccent}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 max-w-2xl text-base text-neutral-900/55 sm:mt-10 sm:text-lg"
        >
          {hizmetlerPage.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10"
        >
          <MagneticButton href="/iletisim" variant="primary">
            Proje Başlat
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-16 h-px origin-left bg-gradient-to-r from-kiwi-400/50 to-transparent sm:mt-20"
        />
      </div>
    </section>
  );
}
