"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";

export function BlogCTA() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 text-center md:px-10">
        <TextReveal
          text="Okumak yetmez — uygulayalım."
          className="justify-center text-[clamp(2rem,5vw,4rem)] font-light text-white"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-md text-white/45"
        >
          Stratejinizi bir sonraki seviyeye taşımak için Kiwi ile tanışın.
        </motion.p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/#contact">İletişime Geç</MagneticButton>
          <MagneticButton href="/hizmetler" variant="outline">
            Hizmetler
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
