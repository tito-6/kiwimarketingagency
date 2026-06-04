"use client";

import { images } from "@/data/images";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const positions = [
  { className: "right-[6%] top-[15%] w-48 md:w-64 rotate-6 z-10", delay: 0.5, speed: 1 },
  { className: "right-[20%] top-[38%] w-40 md:w-52 -rotate-6 z-20", delay: 0.8, speed: 1.3 },
  { className: "right-[4%] bottom-[18%] w-44 md:w-56 rotate-12 z-10", delay: 1, speed: 0.9 },
];

// Decorative photo cards that drift on the right side of the hero with a
// parallax + idle-float motion. They live behind the headline (the hero text
// is raised above them) and are hidden on small screens to keep things calm.
export function FloatingImages() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 hidden lg:block">
      <motion.div style={{ y: parallaxY }} className="absolute inset-0">
        {images.hero.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.7, y: 80, rotate: positions[i].className.includes("rotate") ? 20 : -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: positions[i].delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`absolute overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/60 ${positions[i].className}`}
          >
            <motion.div
              animate={{ y: [0, -15 * positions[i].speed, 0] }}
              transition={{ repeat: Infinity, duration: 4 + i * 0.5, ease: "easeInOut" }}
              className="relative aspect-[3/4] w-full"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="280px" priority={i === 0} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-kiwi-400/5" />
              <motion.div
                className="absolute inset-0 border border-kiwi-400/0"
                animate={{ borderColor: ["rgba(169,203,24,0)", "rgba(169,203,24,0.3)", "rgba(169,203,24,0)"] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
