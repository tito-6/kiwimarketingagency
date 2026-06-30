"use client";

import { hero, site } from "@/data/content";
import { CharacterSplit } from "@/components/ui/CharacterSplit";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { FloatingImages } from "@/components/ui/FloatingImages";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MouseParallax } from "@/components/ui/MouseParallax";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Landing hero. As the user scrolls the whole block drifts down and fades
// (`y`/`opacity`/`scale`) while the headline keeps a slightly slower parallax
// (`titleY`) for depth. The text is anchored left and layered above the
// floating photos on the right.
export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 3]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-24 sm:min-h-[110vh] sm:pb-20 sm:pt-28 md:pb-24 md:pt-32"
    >
      <AuroraBackground />

      <MouseParallax strength={14} className="absolute inset-0">
        <FloatingImages />
      </MouseParallax>

      <RotatingBadge />

      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ rotate }}
      >
        <motion.span
          className="select-none font-bold uppercase tracking-tighter text-white/[0.02]"
          style={{ fontSize: "clamp(8rem, 28vw, 22rem)" }}
          animate={{ x: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          KIWI
        </motion.span>
      </motion.div>

      {/* z-30 keeps the copy above the floating cards; mr-auto pins it to the
          left edge so there's no dead space beside the headline. */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-30 mr-auto w-full min-w-0 max-w-[1440px] px-4 sm:px-6 md:max-w-[62%] md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-xs font-medium uppercase text-kiwi-400"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.div style={{ y: titleY }} className="mt-8">
          <h1 className="text-[clamp(2.75rem,14vw,15rem)] font-bold leading-[0.88] tracking-tighter sm:leading-[0.82]">
            <span className="block text-white">
              <CharacterSplit text={hero.title} delay={0.25} stagger={0.05} />
            </span>
            <motion.span
              className="mt-1 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <CharacterSplit
                text="AGENCY"
                delay={1.1}
                stagger={0.05}
                className="text-kiwi-400/90"
              />
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px max-w-lg origin-left bg-gradient-to-r from-kiwi-400 via-white/30 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="mt-8 flex flex-col gap-8 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between"
        >
          <p className="max-w-lg text-base font-light leading-relaxed text-white/55 sm:text-lg md:text-xl">
            {hero.description}
          </p>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:items-end">
            <motion.div
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md"
              animate={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(169,203,24,0.3)", "rgba(255,255,255,0.1)"] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-kiwi-400"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span className="text-xs uppercase tracking-wider text-white/50">
                {hero.subtitle}
              </span>
            </motion.div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <MagneticButton href="/iletisim" className="w-full justify-center sm:w-auto">
                {hero.cta}
              </MagneticButton>
              <MagneticButton href="/projeler" variant="outline" className="w-full justify-center sm:w-auto">
                Projeler
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-20 flex items-center justify-between border-t border-white/10 pt-6 sm:mt-16"
        >
          <span className="text-xs text-white/25">{site.fullName}®</span>
          <motion.div className="flex items-center gap-2">
            <motion.span
              className="text-xs text-white/30"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Scroll
            </motion.span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-8 w-px bg-kiwi-400/60"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
