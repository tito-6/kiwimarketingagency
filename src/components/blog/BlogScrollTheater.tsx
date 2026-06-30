"use client";

import { blogPosts } from "@/data/blog";
import type { BlogPost } from "@/data/blog";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { BlogMobileTheaterNav } from "./BlogMobileTheaterNav";

export function BlogScrollTheater() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  useMotionValueEvent(smooth, "change", (v) => {
    const i = Math.min(Math.floor(v * blogPosts.length), blogPosts.length - 1);
    setActive((prev) => (prev !== i ? i : prev));
  });

  const post = blogPosts[active];

  const scrollTo = useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.offsetTop + (el.offsetHeight / blogPosts.length) * index;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${blogPosts.length * 45}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.span
            className="select-none font-bold text-white/[0.02]"
            style={{ fontSize: "clamp(6rem, 20vw, 18rem)" }}
            animate={{ x: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 12 }}
          >
            JOURNAL
          </motion.span>
        </div>

        <AnimatePresence mode="wait">
          <TheaterSlide key={post.slug} post={post} index={active} />
        </AnimatePresence>

        <div className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
          {blogPosts.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => scrollTo(i)}
              data-cursor="pointer"
              className="group flex items-center gap-3 text-left"
            >
              <motion.div
                animate={{
                  width: active === i ? 32 : 8,
                  backgroundColor: active === i ? p.accent : "rgba(255,255,255,0.2)",
                }}
                className="h-1 rounded-full"
              />
              <motion.span
                animate={{ opacity: active === i ? 1 : 0, x: active === i ? 0 : -8 }}
                className="whitespace-nowrap text-xs text-white/60"
              >
                {p.title.slice(0, 28)}…
              </motion.span>
            </button>
          ))}
        </div>

        <BlogMobileTheaterNav active={active} onSelect={scrollTo} />

        <div className="absolute bottom-10 left-4 right-4 z-30 flex flex-col gap-4 sm:left-6 sm:right-6 sm:flex-row sm:items-end sm:justify-between md:left-12 md:right-12 lg:bottom-10">
          <div>
            <TextReveal
              text="Okuma modu"
              className="text-sm uppercase tracking-[0.3em] text-white/30"
            />
            <p className="mt-1 font-mono text-xs text-white/40">
              {String(active + 1).padStart(2, "0")} / {String(blogPosts.length).padStart(2, "0")}
            </p>
          </div>
          <MagneticButton href={`/blog/${post.slug}`}>Yazıyı Oku</MagneticButton>
        </div>

        <div className="absolute bottom-10 left-1/2 z-30 hidden -translate-x-1/2 md:flex">
          <motion.div
            className="h-1 w-48 overflow-hidden rounded-full bg-white/10"
            style={{ width: 192 }}
          >
            <motion.div
              className="h-full bg-kiwi-400"
              style={{ scaleX: smooth, transformOrigin: "left" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TheaterSlide({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0"
    >
      <motion.div
        initial={{ scale: 1.2, clipPath: "inset(0% 100% 0% 0%)" }}
        animate={{ scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
        exit={{ scale: 1.05, clipPath: "inset(0% 0% 0% 100%)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image src={post.image} alt="" fill className="object-cover" sizes="100vw" priority />
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} mix-blend-multiply opacity-60`} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/70 to-[#1a1a1a]/40" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-center px-4 pb-28 pt-20 sm:px-6 md:px-20 md:pb-0 md:pt-0 lg:pl-72">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm"
          style={{ color: post.accent }}
        >
          {String(index + 1).padStart(2, "0")} — {post.category}
        </motion.span>

        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl text-[clamp(2rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white"
        >
          {post.title}
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-white/50"
        >
          {post.excerpt}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex gap-6 text-sm text-white/35"
        >
          <span>{post.readTime}</span>
          <span>{post.date}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
