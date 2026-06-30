"use client";

import { blogCategories, blogPosts, type BlogPost } from "@/data/blog";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

const bentoSpans = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
];

export function BlogJournal() {
  const [active, setActive] = useState<string>("Tümü");

  const filtered = useMemo(
    () =>
      active === "Tümü"
        ? blogPosts.filter((p) => !p.featured)
        : blogPosts.filter((p) => !p.featured && p.category === active),
    [active]
  );

  return (
    <section id="journal" className="py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ClipReveal>
          <TextReveal
            text="Tüm yazılar"
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter text-white"
          />
        </ClipReveal>

        <LayoutGroup>
          <div className="mt-10 flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                data-cursor="pointer"
                className="relative overflow-hidden rounded-full px-5 py-2.5 text-xs uppercase tracking-wider"
              >
                {active === cat && (
                  <motion.span
                    layoutId="blog-filter-pill-v2"
                    className="absolute inset-0 rounded-full bg-kiwi-400"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active === cat ? "font-semibold text-[#1a1a1a]" : "text-white/50 hover:text-white"
                  }`}
                >
                  {cat}
                </span>
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="mt-14 grid auto-rows-[minmax(300px,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <BlogCard key={post.slug} post={post} span={bentoSpans[i % bentoSpans.length]} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-20 text-center text-white/40"
            >
              Bu kategoride henüz yazı yok.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function BlogCard({
  post,
  span,
  index,
}: {
  post: BlogPost;
  span: string;
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  function onMove(e: React.MouseEvent) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.88, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotateX: -5 }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${span}`}
      style={{ perspective: 1200 }}
    >
      <Link
        ref={cardRef}
        href={`/blog/${post.slug}`}
        data-cursor="pointer"
        onMouseMove={onMove}
        onMouseLeave={() => setSpot({ x: 50, y: 50 })}
        className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, ${post.accent}18, transparent 40%)`,
          }}
        />

        <div className="relative flex-1 overflow-hidden">
          <ClipReveal direction="center" className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.14 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={post.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
            </motion.div>
          </ClipReveal>
          <div className={`absolute inset-0 bg-gradient-to-t ${post.gradient} via-[#1a1a1a]/60 to-[#1a1a1a]/90`} />

          <motion.div
            className="absolute left-5 top-5 z-20"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur-md"
              style={{ borderColor: `${post.accent}50`, color: post.accent }}
            >
              {post.category}
            </span>
          </motion.div>

          <motion.div
            className="absolute right-5 top-5 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl backdrop-blur-md"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 45, scale: 1.15, borderColor: post.accent }}
          >
            ↗
          </motion.div>
        </div>

        <div className="relative z-20 p-6">
          <div className="flex gap-3 text-[10px] uppercase tracking-wider text-white/35">
            <time>{post.date}</time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h3 className="mt-3 text-xl font-medium leading-snug text-white md:text-2xl">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/40">{post.excerpt}</p>

          <motion.div
            className="mt-5 h-0.5 origin-left bg-kiwi-400"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.45 }}
          />
        </div>
      </Link>
    </motion.article>
  );
}
