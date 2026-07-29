"use client";

import { projects } from "@/data/content";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import Image from "next/image";

export function Projects() {
  return (
    <section id="projects" className="py-32 md:py-48">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
            {projects.label}
          </p>
          <h2 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-light leading-tight text-neutral-900">
            {projects.title}
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2">
          {projects.items.map((project, i) => (
            <StaggerItem key={project.title}>
              <TiltCard>
                <motion.a
                  href="#"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-900/10"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-multiply`}
                  />
                  <div className="absolute inset-0 bg-white/50 transition-colors group-hover:bg-white/30" />
                  <div className="relative flex h-full flex-col justify-between p-8">
                    <span className="text-xs uppercase tracking-wider text-neutral-900/70">
                      {project.category} · {project.year}
                    </span>
                    <div>
                      <motion.h3
                        className="text-3xl font-light text-neutral-900 md:text-4xl"
                        initial={{ x: 0 }}
                        whileHover={{ x: 8 }}
                      >
                        {project.title}
                      </motion.h3>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm text-kiwi-400 opacity-0 transition-opacity group-hover:opacity-100">
                        Projeyi incele →
                      </span>
                    </div>
                  </div>
                </motion.a>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
