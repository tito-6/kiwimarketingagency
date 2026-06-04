"use client";

import { projects } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function PinnedProjects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["2%", `-${(projects.items.length - 1) * 72}%`]
  );
  const labelOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  return (
    <>
      {/* Mobile: horizontal snap scroll */}
      <section className="overflow-hidden py-20 md:hidden">
        <div className="px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-kiwi-400">{projects.label}</p>
          <TextReveal
            text={projects.title}
            className="mt-4 text-[clamp(1.75rem,5vw,2.5rem)] font-light text-white"
          />
          <div className="mt-6">
            <MagneticButton href="/projeler" variant="outline">
              Tüm Projeler
            </MagneticButton>
          </div>
        </div>
        <div className="mt-10 flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide sm:gap-6 sm:px-6">
          {projects.items.map((project, i) => (
            <div key={project.title} className="w-[min(88vw,360px)] shrink-0 snap-center">
              <ProjectCard project={project} index={i} mobile />
            </div>
          ))}
        </div>
      </section>

      {/* Desktop: pinned horizontal scroll */}
      <section ref={containerRef} className="relative hidden h-[280vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-6 px-4 sm:px-6 md:px-10">
            <div>
              <motion.p
                style={{ opacity: labelOpacity }}
                className="text-xs uppercase tracking-[0.3em] text-kiwi-400"
              >
                {projects.label}
              </motion.p>
              <TextReveal
                text={projects.title}
                className="mt-4 text-[clamp(2rem,5vw,4rem)] font-light text-white"
              />
            </div>
            <MagneticButton href="/projeler" variant="outline">
              Tüm Projeler
            </MagneticButton>
          </div>

          <motion.div style={{ x }} className="mt-14 flex gap-8 px-6 md:gap-10 md:px-10">
            {projects.items.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>

          <div className="mx-auto mt-12 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-kiwi-400"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({
  project,
  index,
  mobile = false,
}: {
  project: (typeof projects.items)[0];
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.6, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: "-20%" }}
      transition={{ duration: 0.5 }}
      className={
        mobile
          ? "relative h-[52vh] min-h-[280px] w-full"
          : "relative h-[58vh] w-[88vw] shrink-0 md:w-[65vw] lg:w-[50vw]"
      }
    >
      <Link
        href="/projeler"
        data-cursor="pointer"
        className="group relative block h-full overflow-hidden rounded-3xl border border-white/10"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes={mobile ? "88vw" : "65vw"}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-multiply opacity-50`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-12">
          <span className="font-mono text-sm text-white/40">
            {String(index + 1).padStart(2, "0")} — {String(projects.items.length).padStart(2, "0")}
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-kiwi-400">
              {project.category} · {project.year}
            </p>
            <h3 className="mt-2 text-2xl font-light text-white sm:text-4xl md:text-6xl">{project.title}</h3>
            <span className="mt-3 inline-block text-sm text-white/70 md:mt-4 md:translate-y-4 md:opacity-0 md:transition-all md:group-hover:translate-y-0 md:group-hover:opacity-100">
              Projeyi incele →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
