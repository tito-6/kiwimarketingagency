"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";

export function HizmetlerCTA() {
  return (
    <section className="relative overflow-hidden py-32">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, rgba(169,203,24,0.08) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 50%, rgba(169,203,24,0.12) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 50%, rgba(169,203,24,0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <div className="relative mx-auto max-w-[1440px] px-6 text-center md:px-10">
        <TextReveal
          text="Projenizi birlikte büyütelim."
          className="text-[clamp(2rem,6vw,5rem)] font-light text-white justify-center"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-xl text-white/50"
        >
          24 saat içinde yanıt veriyoruz. Keşif görüşmesi ücretsiz.
        </motion.p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/#contact">İletişime Geç</MagneticButton>
          <MagneticButton href="/" variant="outline">
            Anasayfa
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
