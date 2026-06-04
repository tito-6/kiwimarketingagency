"use client";

import { iletisimPage } from "@/data/iletisim";
import { site } from "@/data/content";
import { CharacterSplit } from "@/components/ui/CharacterSplit";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";
import Link from "next/link";

function AnimatedPhone() {
  const digits = site.phone.split("");

  return (
    <Link
      href={`tel:${site.phoneTel}`}
      data-cursor="pointer"
      className="group mt-10 inline-block"
    >
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        {digits.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial={{ opacity: 0, y: 40, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: 0.8 + i * 0.04,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8, color: "#a9cb18" }}
            className="inline-block text-[clamp(1.5rem,4vw,2.75rem)] font-light text-white"
            style={{ transformOrigin: "bottom" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
      <motion.span
        className="mt-3 block text-xs uppercase tracking-[0.25em] text-white/35 group-hover:text-kiwi-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Hemen ara →
      </motion.span>
    </Link>
  );
}

export function IletisimHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-kiwi-400/15 blur-[120px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="absolute -right-20 top-20 font-bold text-white/[0.02]"
          style={{ fontSize: "clamp(6rem, 20vw, 14rem)" }}
          animate={{ rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 15 }}
        >
          24H
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ClipReveal direction="left">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-kiwi-400">
            {iletisimPage.label}
          </p>
        </ClipReveal>

        <h1 className="mt-8 max-w-4xl">
          <span className="block text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.95] tracking-tighter text-white">
            <CharacterSplit text={iletisimPage.title} delay={0.2} stagger={0.05} />
          </span>
          <span className="mt-2 block text-[clamp(2rem,6vw,5rem)] font-light text-white/25">
            <CharacterSplit text={iletisimPage.titleAccent} delay={0.55} stagger={0.04} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 max-w-xl text-lg text-white/45"
        >
          {iletisimPage.description}
        </motion.p>

        <AnimatedPhone />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <MagneticButton href="#form">Formu Doldur</MagneticButton>
          <MagneticButton href={`https://wa.me/905326305713`} variant="outline">
            WhatsApp
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
