"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";

export function ProjelerCTA() {
  return (
    <section className="relative overflow-hidden py-32 md:py-40">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(169,203,24,0.12), transparent)",
            "radial-gradient(ellipse 60% 40% at 30% 80%, rgba(169,203,24,0.18), transparent)",
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(169,203,24,0.12), transparent)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 text-center md:px-10">
        <TextReveal
          text="Sıradaki proje sizin mi?"
          className="justify-center text-[clamp(2rem,6vw,5rem)] font-light text-white"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-lg text-white/50"
        >
          Markanızı dijitalde öne çıkaracak bir sonraki başarı hikayesini birlikte yazalım.
        </motion.p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/#contact">Proje Başlat</MagneticButton>
          <MagneticButton href="/hizmetler" variant="outline">
            Hizmetlerimiz
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
