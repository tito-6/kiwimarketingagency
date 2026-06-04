"use client";

import { services } from "@/data/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.6]);

  return (
    <motion.article
      ref={ref}
      style={{ scale, opacity }}
      className="sticky top-24 mb-8 rounded-3xl border border-white/10 bg-[#222] p-8 md:p-12 lg:top-32"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-sm text-white/30">{service.id}</span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
          {service.count}
        </span>
      </div>

      <h3 className="mt-8 text-3xl font-light text-white md:text-5xl">
        {service.title}
      </h3>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50">
        {service.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
        <span className="text-8xl font-bold text-white/5 md:text-9xl">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className="py-32 md:py-48">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
            / HİZMETLER
          </p>
          <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,4.5rem)] font-light leading-tight tracking-tight text-white">
            Geleceğe hazır dijital hizmetler,{" "}
            <span className="text-white/40">strateji ile güçlendirilmiş.</span>
          </h2>
        </FadeIn>

        <div className="relative mt-20">
          <p className="mb-4 text-right font-mono text-sm text-white/20">
            {services.length} hizmet
          </p>
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
