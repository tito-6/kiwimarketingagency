"use client";

import { projects } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function PinnedProjects() {
  return (
    <section className="overflow-hidden border-t border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-kiwi-400">{projects.label}</p>
            <TextReveal
              text={projects.title}
              className="mt-4 text-[clamp(1.75rem,5vw,3.5rem)] font-light text-white"
            />
          </div>
          <MagneticButton href="/projeler#stats" variant="outline">
            Tüm Projeler
          </MagneticButton>
        </div>
      </div>

      <div className="mt-10 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide sm:gap-6 sm:px-6 md:mt-12 md:px-10">
        {projects.items.map((project, i) => (
          <div
            key={project.title}
            className="w-[min(88vw,360px)] shrink-0 snap-center md:w-[min(42vw,520px)]"
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects.items)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.6, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="relative h-[52vh] min-h-[280px] w-full md:h-[48vh] md:min-h-[320px]"
    >
      <Link
        href="/projeler#stats"
        data-cursor="pointer"
        className="group relative block h-full overflow-hidden rounded-3xl border border-white/10"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 88vw, 42vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-multiply opacity-50`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10">
          <span className="font-mono text-sm text-white/40">
            {String(index + 1).padStart(2, "0")} — {String(projects.items.length).padStart(2, "0")}
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-kiwi-400">
              {project.category} · {project.year}
            </p>
            <h3 className="mt-2 text-2xl font-light text-white sm:text-3xl md:text-4xl">{project.title}</h3>
            <span className="mt-3 inline-block text-sm text-white/70 md:translate-y-2 md:opacity-0 md:transition-all md:group-hover:translate-y-0 md:group-hover:opacity-100">
              Projeyi incele →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
