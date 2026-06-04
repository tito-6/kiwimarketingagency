"use client";

import type { BlogPost } from "@/data/blog";
import { blogPosts } from "@/data/blog";
import {
  getAdjacentPosts,
  getArticleContent,
  getSecondaryImage,
} from "@/data/blog-content";
import { BlogArticleContent } from "@/components/blog/BlogArticleContent";
import { BlogArticleNav } from "@/components/blog/BlogArticleNav";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { ReadingRing } from "@/components/blog/ui/ReadingRing";
import { CharacterSplit } from "@/components/ui/CharacterSplit";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function BlogArticle({ post }: { post: BlogPost }) {
  const containerRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [activeSection, setActiveSection] = useState("giris");

  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);

  const blocks = getArticleContent(post);
  const headings = blocks.filter((b) => b.type === "h2");
  const { prev, next } = getAdjacentPosts(post.slug);
  const secondaryImage = getSecondaryImage(post);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    headings.forEach((h) => {
      if (h.type !== "h2") return;
      const el = document.getElementById(h.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(h.id);
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [headings]);

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: post.accent }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <article ref={containerRef}>
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
          style={{ scaleX, backgroundColor: post.accent }}
        />

        <header className="relative min-h-[100vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ scale: heroScale, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image src={post.image} alt="" fill priority className="object-cover" sizes="100vw" />
            </motion.div>
            <div className={`absolute inset-0 bg-gradient-to-b ${post.gradient} via-[#1a1a1a]/50 to-[#1a1a1a]`} />
          </motion.div>

          <motion.div
            style={{ y: titleY }}
            className="relative z-10 mx-auto flex min-h-[100vh] max-w-[1440px] flex-col justify-end px-6 pb-24 pt-32 md:px-10"
          >
            <ClipReveal direction="left">
              <Link
                href="/blog"
                data-cursor="pointer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs uppercase tracking-wider text-white/50 backdrop-blur-md transition-colors hover:text-white"
              >
                ← Journal
              </Link>
            </ClipReveal>

            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10 inline-flex w-fit rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider backdrop-blur-md"
              style={{ borderColor: `${post.accent}50`, color: post.accent }}
            >
              {post.category}
            </motion.span>

            <h1 className="mt-8 max-w-4xl text-[clamp(2rem,6vw,4.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              <CharacterSplit text={post.title} delay={0.4} stagger={0.025} />
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex flex-wrap items-center gap-8 text-sm text-white/40"
            >
              <span>{post.author}</span>
              <span>{post.date}</span>
              <span>{post.readTime} okuma</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />
            </motion.div>
          </motion.div>
        </header>

        <div className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-10">
          <div className="grid gap-16 lg:grid-cols-[260px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                <ReadingRing accent={post.accent} containerRef={containerRef} />

                <nav>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">İçindekiler</p>
                  <ul className="mt-4 space-y-2">
                    {headings.map((h) =>
                      h.type === "h2" ? (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className={`block py-1 text-sm transition-colors ${
                              activeSection === h.id
                                ? "font-medium"
                                : "text-white/35 hover:text-white/70"
                            }`}
                            style={activeSection === h.id ? { color: post.accent } : {}}
                          >
                            {h.text}
                          </a>
                        </li>
                      ) : null
                    )}
                  </ul>
                </nav>

                <div className="rounded-2xl border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-white/30">Paylaş</p>
                  <div className="mt-3 flex gap-2">
                    {["X", "in", "↗"].map((icon) => (
                      <motion.button
                        key={icon}
                        type="button"
                        whileHover={{ scale: 1.1, borderColor: post.accent }}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs text-white/50"
                      >
                        {icon}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="max-w-3xl lg:max-w-none">
              <BlogArticleContent blocks={blocks} post={post} />

              <ClipReveal direction="center" className="mt-20">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src={secondaryImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                </div>
              </ClipReveal>
            </div>
          </div>
        </div>

        <section className="border-t border-white/10 py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
            <TextReveal text="İlgili yazılar" className="text-3xl font-light text-white" />
            <RelatedGrid currentSlug={post.slug} accent={post.accent} />
            <div className="mt-12 text-center">
              <MagneticButton href="/blog" variant="outline">
                Tüm Yazılar
              </MagneticButton>
            </div>
          </div>
        </section>

        <BlogArticleNav prev={prev} next={next} />
      </article>
    </>
  );
}

function RelatedGrid({ currentSlug, accent }: { currentSlug: string; accent: string }) {
  const related = blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {related.map((p, i) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 50, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.7 }}
          style={{ perspective: 1000 }}
        >
          <Link
            href={`/blog/${p.slug}`}
            data-cursor="pointer"
            className="group block overflow-hidden rounded-2xl border border-white/10"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={p.image}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="400px"
              />
              <motion.div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `linear-gradient(to top, ${accent}40, transparent)` }}
              />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-wider" style={{ color: p.accent }}>
                {p.category}
              </p>
              <h3 className="mt-2 font-medium text-white group-hover:text-kiwi-400">{p.title}</h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
