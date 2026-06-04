"use client";

import { projectItems } from "@/data/projects";
import { TextReveal } from "@/components/ui/TextReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

function ArchiveRow({
  project,
  index,
}: {
  project: (typeof projectItems)[0];
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageX = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 80 : -80, index % 2 === 0 ? -40 : 40]
  );
  const textX = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -40 : 40, 0]
  );

  const isEven = index % 2 === 0;

  return (
    <article ref={ref} id={project.slug} className="border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        <motion.div
          style={{ x: isEven ? imageX : textX }}
          className={isEven ? "order-1" : "order-1 md:order-2"}
        >
          <TiltCard>
            <Link
              href={`#${project.slug}`}
              data-cursor="pointer"
              className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-white/10"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 mix-blend-multiply`} />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                whileHover={{ scale: 1.05 }}
              >
                <span
                  className="rounded-full border px-6 py-3 text-sm uppercase tracking-wider backdrop-blur-md"
                  style={{ borderColor: project.accent, color: project.accent }}
                >
                  Detay →
                </span>
              </motion.div>
            </Link>
          </TiltCard>
        </motion.div>

        <motion.div
          style={{ x: isEven ? textX : imageX }}
          className={isEven ? "order-2" : "order-2 md:order-1"}
        >
          <span className="font-mono text-sm text-kiwi-400/60">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-3xl font-light text-white md:text-5xl">{project.title}</h3>
          <p className="mt-2 text-sm uppercase tracking-wider text-white/40">
            {project.category} · {project.year}
          </p>
          <p className="mt-6 leading-relaxed text-white/50">{project.description}</p>
          <div className="mt-8 flex flex-wrap gap-6">
            {project.results.map((r) => (
              <div key={r.label}>
                <p className="text-xl font-light" style={{ color: project.accent }}>
                  {r.value}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-white/35">{r.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </article>
  );
}

export function ProjectArchive() {
  return (
    <section className="pb-32">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10">
        <TextReveal
          text="Tüm projeler arşivi"
          className="text-[clamp(2rem,5vw,3.5rem)] font-light text-white"
        />
        <p className="mt-4 max-w-lg text-white/45">
          Her iş, ölçülebilir sonuçlarla tamamlanan özenli bir sürecin ürünü.
        </p>
      </div>
      {projectItems.map((project, i) => (
        <ArchiveRow key={project.slug} project={project} index={i} />
      ))}
    </section>
  );
}
