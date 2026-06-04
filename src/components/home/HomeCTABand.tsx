"use client";

import { site } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export function HomeCTABand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <motion.div
        style={{ scale }}
        className="mx-auto max-w-[1440px] px-4 sm:px-4 sm:px-6 md:px-10"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-kiwi-400/10 via-[#141414] to-[#1a1a1a] p-6 sm:rounded-[2.5rem] sm:p-10 md:p-20">
          <motion.div
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-kiwi-400/20 blur-[100px]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <TextReveal
                text="Projenizi konuşmaya hazır mısınız?"
                className="text-[clamp(2rem,5vw,4rem)] font-light leading-tight text-white"
              />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-6 text-white/45"
              >
                Ücretsiz keşif görüşmesi — 30 dakikada net yol haritası.
              </motion.p>
            </div>

            <div className="flex flex-col items-start gap-6 lg:items-end">
              <Link
                href={`tel:${site.phoneTel}`}
                data-cursor="pointer"
                className="group"
              >
                <motion.span
                  className="block text-[clamp(1.75rem,4vw,3rem)] font-light text-white"
                  whileHover={{ x: 8, color: "#a9cb18" }}
                >
                  {site.phone}
                </motion.span>
                <span className="text-xs uppercase tracking-wider text-white/35 group-hover:text-kiwi-400">
                  Hemen ara →
                </span>
              </Link>
              <MagneticButton href="/iletisim">İletişim Sayfası</MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
