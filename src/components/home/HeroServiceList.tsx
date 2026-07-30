"use client";

import { heroServices } from "@/data/service-pages";
import { useLiteMotion } from "@/lib/motion";
import { motion } from "framer-motion";

export function HeroServiceList() {
  const lite = useLiteMotion();

  return (
    <aside
      aria-label="Hizmet alanları"
      className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[38%] max-w-md items-center pr-10 lg:flex xl:pr-16"
    >
      <ul className="flex w-full flex-col gap-1 border-l border-white/15 pl-8">
        {heroServices.map((label, i) =>
          lite ? (
            <li
              key={label}
              className="py-2 text-[clamp(1.1rem,1.6vw,1.65rem)] font-light leading-tight tracking-tight text-white/80"
            >
              {label}
            </li>
          ) : (
            <motion.li
              key={label}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.9 + i * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group py-2 text-[clamp(1.1rem,1.6vw,1.65rem)] font-light leading-tight tracking-tight text-white/75 transition-colors motion-safe:hover:text-kiwi-400"
            >
              <span className="inline-flex items-baseline gap-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-kiwi-400/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
              </span>
            </motion.li>
          )
        )}
      </ul>
    </aside>
  );
}
