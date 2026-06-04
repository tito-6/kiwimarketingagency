"use client";

import type { BlogPost } from "@/data/blog";
import type { ContentBlock } from "@/data/blog-content";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { motion } from "framer-motion";
import Image from "next/image";

export function BlogArticleContent({
  blocks,
  post,
}: {
  blocks: ContentBlock[];
  post: BlogPost;
}) {
  return (
    <div className="space-y-12">
      {blocks.map((block, i) => (
        <BlockRenderer key={`${block.type}-${i}`} block={block} post={post} index={i} />
      ))}
    </div>
  );
}

function BlockRenderer({
  block,
  post,
  index,
}: {
  block: ContentBlock;
  post: BlogPost;
  index: number;
}) {
  switch (block.type) {
    case "lead":
      return (
        <ClipReveal delay={index * 0.05}>
          <p className="text-2xl font-light leading-relaxed text-white/75 md:text-3xl md:leading-snug">
            {block.text}
          </p>
        </ClipReveal>
      );

    case "h2":
      return (
        <ClipReveal direction="left" delay={0.05}>
          <h2 id={block.id} className="scroll-mt-32 pt-8">
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: post.accent }}>
              {block.id}
            </span>
            <span className="mt-2 block text-3xl font-medium text-white md:text-4xl">{block.text}</span>
            <motion.div
              className="mt-4 h-px max-w-xs"
              style={{ background: `linear-gradient(90deg, ${post.accent}, transparent)` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </h2>
        </ClipReveal>
      );

    case "p":
      return (
        <motion.p
          className="text-lg leading-[1.85] text-white/55"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {block.text}
        </motion.p>
      );

    case "quote":
      return (
        <ClipReveal direction="center">
          <blockquote
            className="relative my-8 overflow-hidden rounded-3xl border p-10 md:p-14"
            style={{ borderColor: `${post.accent}30`, background: `${post.accent}08` }}
          >
            <motion.span
              className="absolute -left-2 -top-4 font-serif text-8xl leading-none opacity-20"
              style={{ color: post.accent }}
            >
              &ldquo;
            </motion.span>
            <p className="relative text-xl font-light italic leading-relaxed text-white/85 md:text-2xl">
              {block.text}
            </p>
            {block.author && (
              <footer className="relative mt-6 text-sm text-white/40">— {block.author}</footer>
            )}
          </blockquote>
        </ClipReveal>
      );

    case "image":
      return (
        <ClipReveal direction="center">
          <figure className="group relative -mx-6 overflow-hidden rounded-3xl md:-mx-0">
            <div className="relative aspect-[21/9] min-h-[240px]">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={block.src} alt="" fill className="object-cover" sizes="100vw" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            {block.caption && (
              <figcaption className="mt-3 text-center text-xs text-white/35">{block.caption}</figcaption>
            )}
          </figure>
        </ClipReveal>
      );

    case "list":
      return (
        <motion.ul
          className="space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {block.items.map((item) => (
            <motion.li
              key={item}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
              className="flex gap-4 text-lg text-white/55"
            >
              <span style={{ color: post.accent }}>→</span>
              {item}
            </motion.li>
          ))}
        </motion.ul>
      );

    case "stats":
      return (
        <div className="grid gap-4 sm:grid-cols-3">
          {block.items.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center"
            >
              <p className="text-3xl font-light" style={{ color: post.accent }}>
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
