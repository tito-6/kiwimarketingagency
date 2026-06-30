"use client";

import { services } from "@/data/content";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function ServiceDetail() {
  return (
    <div className="space-y-0">
      {services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}

function ServiceBlock({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isEven = index % 2 === 0;

  return (
    <article
      id={service.slug}
      ref={ref}
      className="relative border-t border-white/10 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        <div className={cn("flex flex-col justify-center overflow-hidden", !isEven && "md:order-2")}>
          <motion.span
            initial={{ opacity: 0, x: isEven ? -48 : 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "block font-mono text-[clamp(4rem,12vw,10rem)] font-bold leading-none text-white/[0.04]",
              isEven ? "translate-x-6 md:translate-x-10" : "translate-x-0"
            )}
          >
            {service.id}
          </motion.span>

          <TextReveal
            text={service.title}
            className="mt-4 text-4xl font-light text-white md:text-5xl"
            delay={0.1}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-white/50"
          >
            {service.longDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 transition-colors hover:border-kiwi-400/50 hover:text-white"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <Link
            href="/#contact"
            className="group mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-wider text-kiwi-400"
          >
            Teklif Al
            <motion.span
              className="inline-block"
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
        </div>

        <div className={cn(!isEven && "md:order-1")}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
          >
            <ParallaxImage
              src={service.image}
              alt={service.title}
              className="absolute inset-0 h-full"
              speed={0.2}
            />
            <div className="absolute inset-0 z-10 flex items-end p-8">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                <span className="text-3xl font-light text-kiwi-400">{service.count}</span>
                <p className="text-xs text-white/50">alt kategori</p>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 z-[5] bg-kiwi-400/0 transition-colors duration-500 group-hover:bg-kiwi-400/10"
            />
          </motion.div>
        </div>
      </div>
    </article>
  );
}
