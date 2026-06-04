"use client";

import { contact, site } from "@/data/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";
import Link from "next/link";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 py-32 md:py-40">
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(169,203,24,0.08), transparent)",
            "radial-gradient(ellipse 60% 40% at 30% 80%, rgba(169,203,24,0.15), transparent)",
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(169,203,24,0.08), transparent)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 8 }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 text-center md:px-10">
        <ScrollReveal blur>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
            {contact.label}
          </p>
          <TextReveal
            text="Hazır mısınız?"
            className="mt-6 justify-center text-[clamp(2.5rem,6vw,5rem)] font-light text-white"
          />
        </ScrollReveal>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-lg text-white/45"
        >
          {contact.subtitle} — {contact.response}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <Link
            href={`tel:${site.phoneTel}`}
            data-cursor="pointer"
            className="group inline-block"
          >
            <motion.span
              className="text-[clamp(1.5rem,4vw,2.5rem)] font-light text-white"
              whileHover={{ scale: 1.02, color: "#a9cb18" }}
            >
              {site.phone}
            </motion.span>
          </Link>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/iletisim">İletişim Sayfası</MagneticButton>
          <MagneticButton href={`https://wa.me/905326305713`} variant="outline">
            WhatsApp
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
