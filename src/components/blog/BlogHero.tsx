"use client";

import { blogPage, blogPosts, featuredPost } from "@/data/blog";
import { CharacterSplit } from "@/components/ui/CharacterSplit";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MouseParallax } from "@/components/ui/MouseParallax";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function BlogHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={ref} className="relative min-h-[88vh] overflow-hidden pt-28 pb-12">
      <motion.div
        style={{ rotate: bgRotate }}
        className="pointer-events-none absolute -right-[20%] top-[10%] select-none font-bold leading-none text-white/[0.025]"
      >
        <span style={{ fontSize: "clamp(12rem, 35vw, 28rem)" }}>BLOG</span>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute -left-[10%] bottom-[20%] select-none font-bold text-white/[0.02]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
      >
        {blogPosts.length}
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ClipReveal direction="left">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-kiwi-400">
            {blogPage.label}
          </p>
        </ClipReveal>

        <h1 className="mt-8 max-w-5xl">
          <span className="block text-[clamp(2.5rem,8vw,6rem)] font-light leading-[1] text-white">
            <CharacterSplit text={blogPage.title} delay={0.15} stagger={0.04} />
          </span>
          <span className="mt-2 block text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1] tracking-tighter">
            <span className="bg-gradient-to-r from-kiwi-400/80 to-white/20 bg-clip-text text-transparent">
              <CharacterSplit text={blogPage.titleAccent} delay={0.5} stagger={0.05} />
            </span>
          </span>
        </h1>

        <ClipReveal delay={0.3}>
          <p className="mt-8 max-w-lg text-lg text-white/45">{blogPage.description}</p>
        </ClipReveal>
      </motion.div>

      <div className="relative z-10 mx-auto mt-14 max-w-[1440px] px-6 md:mt-20 md:px-10">
        <MouseParallax strength={8}>
          <ClipReveal direction="center" delay={0.2}>
            <Link
              href={`/blog/${featuredPost.slug}`}
              data-cursor="pointer"
              className="group relative block overflow-hidden rounded-3xl border border-white/10"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[320px] lg:min-h-[480px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={featuredPost.image}
                      alt=""
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuredPost.gradient} mix-blend-multiply`} />
                  <motion.div
                    className="absolute inset-0 bg-kiwi-400/0 transition-colors duration-700 group-hover:bg-kiwi-400/10"
                  />
                </div>

                <div className="relative flex flex-col justify-center bg-[#111] p-8 md:p-14">
                  <motion.div
                    animate={{
                      boxShadow: [
                        `0 0 0px ${featuredPost.accent}00`,
                        `0 0 40px ${featuredPost.accent}25`,
                        `0 0 0px ${featuredPost.accent}00`,
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-widest"
                    style={{ borderColor: `${featuredPost.accent}60`, color: featuredPost.accent }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="h-2 w-2 rounded-full bg-current"
                    />
                    Editörün Seçimi
                  </motion.div>

                  <h2 className="mt-6 text-2xl font-medium leading-snug text-white transition-colors group-hover:text-kiwi-400 md:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-white/45">{featuredPost.excerpt}</p>

                  <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="text-xs text-white/35">
                      {featuredPost.category} · {featuredPost.readTime}
                    </span>
                    <motion.span
                      className="flex h-14 w-14 items-center justify-center rounded-full border text-xl"
                      style={{ borderColor: featuredPost.accent, color: featuredPost.accent }}
                      whileHover={{ rotate: 45, scale: 1.1 }}
                    >
                      ↗
                    </motion.span>
                  </div>
                </div>
              </div>
            </Link>
          </ClipReveal>
        </MouseParallax>

        <div className="mt-10 flex justify-center gap-4">
          <MagneticButton href="#theater">Okuma Modu</MagneticButton>
          <MagneticButton href="/blog#journal" variant="outline">
            Tüm Yazılar
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
