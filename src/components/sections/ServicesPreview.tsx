"use client";

import { services } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitLine } from "@/components/ui/SplitLine";
import { TextReveal } from "@/components/ui/TextReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function ServicesPreview() {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({ container: scrollRef });
  const barWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="services" ref={sectionRef} className="overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
            / HİZMETLER
          </p>
        </ScrollReveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <TextReveal
            text="Geleceğe hazır dijital hizmetler"
            className="max-w-2xl text-[clamp(2rem,5vw,4rem)] font-light leading-tight text-white"
          />
          <MagneticButton href="/hizmetler" variant="outline">
            Tüm Hizmetler
          </MagneticButton>
        </div>
        <SplitLine className="mt-10" />

        <div
          ref={scrollRef}
          className="mt-16 flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
        >
          {services.map((service, i) => (
            <TiltCard key={service.id} className="w-[88vw] shrink-0 snap-center sm:w-[440px]">
              <Link
                href={`/hizmetler#${service.slug}`}
                data-cursor="pointer"
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-white/10"
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="440px"
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent"
                  whileHover={{ opacity: 0.85 }}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <motion.span
                    className="inline-flex w-fit rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-xs text-white/60 backdrop-blur-sm"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {service.id}
                  </motion.span>
                  <div>
                    <motion.span
                      className="block text-8xl font-bold leading-none text-white/[0.06]"
                      initial={{ x: 60, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.8 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    <h3 className="mt-2 text-2xl font-light text-white transition-colors group-hover:text-kiwi-400">
                      {service.title}
                    </h3>
                    <motion.p
                      className="mt-2 line-clamp-2 text-sm text-white/50"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {service.description}
                    </motion.p>
                    <motion.span
                      className="mt-4 inline-flex items-center gap-2 overflow-hidden text-sm text-kiwi-400"
                      initial={{ width: 0 }}
                      whileHover={{ width: "auto" }}
                    >
                      <span className="whitespace-nowrap">Detayları gör →</span>
                    </motion.span>
                  </div>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>

        <div className="mt-4 h-px w-full overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full bg-kiwi-400" style={{ width: barWidth }} />
        </div>
      </div>
    </section>
  );
}
