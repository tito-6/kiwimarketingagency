"use client";

import { services } from "@/data/content";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function ServicesBento() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[220px]">
          {services.map((service, i) => {
            const spans =
              i === 0
                ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
                : i === 2
                  ? "col-span-2 md:col-span-2"
                  : "col-span-1";

            return (
              <TiltCard key={service.id} className={spans}>
                <Link
                  href={`#${service.slug}`}
                  className="relative block h-full overflow-hidden rounded-3xl border border-white/10"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6"
                    whileHover={{ paddingBottom: "2rem" }}
                  >
                    <span className="font-mono text-xs text-kiwi-400">{service.id}</span>
                    <h3 className="mt-1 text-lg font-medium text-white md:text-xl">
                      {service.title}
                    </h3>
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      className="mt-2 line-clamp-2 text-xs text-white/60"
                    >
                      {service.description}
                    </motion.p>
                  </motion.div>
                </Link>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
