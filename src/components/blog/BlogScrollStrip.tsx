"use client";

import { blogPosts } from "@/data/blog";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function BlogScrollStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-10%", "-35%"]);

  const row1 = blogPosts.slice(0, 5);
  const row2 = [...blogPosts].reverse().slice(0, 5);

  return (
    <section ref={ref} className="overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ClipReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-kiwi-400">Hızlı keşif</p>
          <h2 className="mt-4 text-3xl font-light text-white md:text-5xl">
            Kaydır, oku, ilham al.
          </h2>
        </ClipReveal>
      </div>

      <motion.div style={{ x: x1 }} className="mt-14 flex gap-5 px-6">
        {[...row1, ...row1].map((post, i) => (
          <StripCard key={`a-${post.slug}-${i}`} post={post} tall={i % 2 === 0} />
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className="mt-5 flex gap-5 px-6">
        {[...row2, ...row2].map((post, i) => (
          <StripCard key={`b-${post.slug}-${i}`} post={post} tall={i % 2 !== 0} />
        ))}
      </motion.div>
    </section>
  );
}

function StripCard({
  post,
  tall,
}: {
  post: (typeof blogPosts)[0];
  tall: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-cursor="pointer"
      className={`group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 ${
        tall ? "h-[300px] w-[min(75vw,260px)] sm:h-[380px]" : "h-[260px] w-[min(70vw,220px)] sm:h-[300px]"
      }`}
    >
      <Image
        src={post.image}
        alt=""
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="260px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${post.accent}30, transparent)` }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <motion.span
          className="text-[10px] uppercase tracking-wider"
          style={{ color: post.accent }}
          layout
        >
          {post.category}
        </motion.span>
        <p className="mt-2 line-clamp-3 text-sm font-medium leading-snug text-white">{post.title}</p>
        <motion.span
          className="mt-3 inline-block text-xs text-white/40"
          initial={{ x: 0 }}
          whileHover={{ x: 6 }}
        >
          Oku →
        </motion.span>
      </div>
    </Link>
  );
}
