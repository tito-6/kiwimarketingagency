"use client";

import { projelerPage } from "@/data/projects";
import { projectItems } from "@/data/projects";
import { CharacterSplit } from "@/components/ui/CharacterSplit";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ProjelerHero() {
  const ref = useRef(null);
  const [preview, setPreview] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  useEffect(() => {
    const t = setInterval(() => {
      setPreview((p) => (p + 1) % projectItems.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const current = projectItems[preview];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[82svh] flex-col justify-end overflow-hidden pb-14 pt-28"
    >
      <div className="absolute inset-0">
        {projectItems.map((p, i) => (
          <motion.div
            key={p.slug}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: preview === i ? 0.35 : 0, scale: preview === i ? 1 : 1.08 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={p.image} alt="" fill className="object-cover" priority={i === 0} sizes="100vw" />
            <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} mix-blend-multiply`} />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-[#1a1a1a]/85 to-[#1a1a1a]" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-10"
      >
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-medium uppercase tracking-[0.35em] text-kiwi-400"
            >
              {projelerPage.label}
            </motion.p>
            <h1 className="mt-6 text-[clamp(3.5rem,12vw,9rem)] font-bold leading-[0.9] tracking-tighter">
              <span className="block text-white">
                <CharacterSplit text={projelerPage.title} delay={0.2} stagger={0.05} />
              </span>
              <span className="mt-1 block text-white/25">
                <CharacterSplit text={projelerPage.titleAccent} delay={0.55} stagger={0.06} />
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="text-right"
          >
            <p className="font-mono text-6xl font-light text-kiwi-400 md:text-8xl">
              {String(projectItems.length).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">seçili proje</p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 max-w-xl text-lg font-light text-white/50"
        >
          {projelerPage.description}
        </motion.p>

        <motion.div
          key={current.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8"
        >
          <div>
            <p className="text-xs uppercase tracking-wider text-white/35">Önizleme</p>
            <p className="mt-1 text-xl text-white">{current.title}</p>
            <p className="text-sm text-white/45">
              {current.category} · {current.year}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            {projectItems.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPreview(i)}
                className={`h-1 rounded-full transition-all ${
                  preview === i ? "w-10 bg-kiwi-400" : "w-4 bg-white/20"
                }`}
                aria-label={`Proje ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10"
        >
          <MagneticButton href="#showcase" variant="outline">
            Keşfet
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-14 w-px bg-gradient-to-b from-transparent via-kiwi-400/50 to-transparent" />
      </motion.div>
    </section>
  );
}
