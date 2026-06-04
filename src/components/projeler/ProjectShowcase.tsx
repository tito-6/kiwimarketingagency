"use client";

import { projectItems, type ProjectItem } from "@/data/projects";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { MobileProjectNav } from "./MobileProjectNav";

export function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToProject = useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const sectionTop = el.offsetTop;
    const sectionHeight = el.offsetHeight;
    const target =
      sectionTop + (sectionHeight / projectItems.length) * index + 2;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const index = Math.min(
      Math.floor(v * projectItems.length),
      projectItems.length - 1
    );
    setActive((prev) => (prev !== index ? index : prev));
  });

  const project = projectItems[active];

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative"
      style={{ height: `${projectItems.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative flex h-full">
          <ProjectIndexNav active={active} onSelect={scrollToProject} progress={smoothProgress} />

          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <ProjectSlide key={project.slug} project={project} index={active} />
            </AnimatePresence>

            <ProgressRail progress={smoothProgress} count={projectItems.length} active={active} />
          </div>
        </div>
      </div>

      <MobileProjectNav active={active} onSelect={scrollToProject} />
    </section>
  );
}

function ProjectIndexNav({
  active,
  onSelect,
  progress,
}: {
  active: number;
  onSelect: (i: number) => void;
  progress: ReturnType<typeof useSpring>;
}) {
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <nav className="relative z-30 hidden w-56 shrink-0 flex-col justify-center border-r border-white/10 bg-[#1a1a1a]/60 px-6 backdrop-blur-xl lg:flex">
      <p className="mb-8 text-[10px] uppercase tracking-[0.35em] text-white/30">Index</p>
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-px bg-white/10">
          <motion.div className="w-full bg-kiwi-400" style={{ height: lineHeight }} />
        </div>
        <ul className="space-y-1 pl-4">
          {projectItems.map((p, i) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                data-cursor="pointer"
                className="group flex w-full items-center gap-3 py-3 text-left"
              >
                <motion.span
                  animate={{
                    scale: active === i ? 1 : 0,
                    opacity: active === i ? 1 : 0,
                  }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-kiwi-400"
                />
                <span
                  className={`font-mono text-xs transition-colors ${
                    active === i ? "text-kiwi-400" : "text-white/25 group-hover:text-white/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`truncate text-sm transition-colors ${
                    active === i ? "text-white" : "text-white/35 group-hover:text-white/70"
                  }`}
                >
                  {p.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function ProjectSlide({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0"
    >
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        exit={{ scale: 1.05 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-multiply opacity-70`} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/30" />
      </motion.div>

      <motion.span
        className="pointer-events-none absolute -right-8 top-1/4 select-none font-bold text-white/[0.03]"
        style={{ fontSize: "clamp(8rem, 25vw, 22rem)", lineHeight: 0.85 }}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <div className="relative z-10 flex h-full flex-col justify-between p-6 pb-28 md:p-12 md:pb-16 lg:pl-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span
            className="rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider backdrop-blur-md"
            style={{ borderColor: `${project.accent}40`, color: project.accent }}
          >
            {project.category}
          </span>
          <span className="text-xs text-white/40">{project.year}</span>
          <span className="text-xs text-white/30">· {project.client}</span>
        </motion.div>

        <div className="max-w-3xl">
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.92] tracking-tighter text-white"
          >
            {project.title}
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-6 md:gap-10"
          >
            {project.results.map((r) => (
              <div key={r.label}>
                <p className="text-2xl font-light md:text-3xl" style={{ color: project.accent }}>
                  {r.value}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-white/40">{r.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {project.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/60 backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10"
          >
            <MagneticButton href="/#contact" variant="primary">
              Benzer Proje Başlat
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ProgressRail({
  progress,
  count,
  active,
}: {
  progress: ReturnType<typeof useSpring>;
  count: number;
  active: number;
}) {
  return (
    <div className="absolute bottom-8 left-6 right-6 z-20 flex items-center gap-4 md:left-12 md:right-12">
      <span className="font-mono text-xs text-white/40">
        {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </span>
      <div className="h-px flex-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-kiwi-400"
          style={{ scaleX: progress, transformOrigin: "left" }}
        />
      </div>
      <div className="hidden gap-2 sm:flex">
        {projectItems.map((p, i) => (
          <motion.div
            key={p.slug}
            animate={{
              width: active === i ? 48 : 24,
              opacity: active === i ? 1 : 0.35,
            }}
            className="relative h-8 w-12 shrink-0 overflow-hidden rounded-md border border-white/15"
          >
            <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
