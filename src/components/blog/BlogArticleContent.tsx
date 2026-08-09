"use client";

import type { BlogPost } from "@/data/blog";
import type { ContentBlock } from "@/data/blog-content";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { RichText } from "@/components/blog/RichText";
import { useLiteMotion } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";

export function BlogArticleContent({
  blocks,
  post,
}: {
  blocks: ContentBlock[];
  post: BlogPost;
}) {
  const lite = useLiteMotion();

  return (
    <div className="min-w-0 space-y-8 sm:space-y-12">
      {blocks.map((block, i) => (
        <BlockRenderer
          key={`${block.type}-${i}`}
          block={block}
          post={post}
          index={i}
          lite={lite}
        />
      ))}
    </div>
  );
}

function BlockRenderer({
  block,
  post,
  index,
  lite,
}: {
  block: ContentBlock;
  post: BlogPost;
  index: number;
  lite: boolean;
}) {
  switch (block.type) {
    case "lead":
      return (
        <ClipReveal delay={index * 0.05}>
          <p className="text-xl font-light leading-relaxed break-words text-neutral-900/75 sm:text-2xl md:text-3xl md:leading-snug">
            <RichText text={block.text} />
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
            <span className="mt-2 block break-words text-2xl font-medium text-neutral-900 sm:text-3xl md:text-4xl">{block.text}</span>
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
      if (lite) {
        return (
          <p className="text-lg leading-[1.85] text-neutral-900/55">
            <RichText text={block.text} />
          </p>
        );
      }
      return (
        <motion.p
          className="text-lg leading-[1.85] text-neutral-900/55"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <RichText text={block.text} />
        </motion.p>
      );

    case "quote":
      return (
        <ClipReveal direction="center">
          <blockquote
            className="relative my-6 overflow-hidden rounded-2xl border p-6 sm:my-8 sm:rounded-3xl sm:p-10 md:p-14"
            style={{ borderColor: `${post.accent}30`, background: `${post.accent}08` }}
          >
            <motion.span
              className="absolute -left-2 -top-4 font-serif text-8xl leading-none opacity-20"
              style={{ color: post.accent }}
            >
              &ldquo;
            </motion.span>
            <p className="relative text-xl font-light italic leading-relaxed text-neutral-900/85 md:text-2xl">
              <RichText text={block.text} />
            </p>
            {block.author && (
              <footer className="relative mt-6 text-sm text-neutral-900/40">— {block.author}</footer>
            )}
          </blockquote>
        </ClipReveal>
      );

    case "image":
      return (
        <ClipReveal direction="center">
          <figure className="group relative -mx-4 overflow-hidden rounded-2xl sm:-mx-0 sm:rounded-3xl">
            <div className="relative aspect-[16/10] min-h-[180px] sm:aspect-[21/9] sm:min-h-[240px]">
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
              <figcaption className="mt-3 text-center text-xs text-neutral-900/35">{block.caption}</figcaption>
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
              className="flex gap-3 text-base break-words text-neutral-900/55 sm:gap-4 sm:text-lg"
            >
              <span style={{ color: post.accent }}>→</span>
              <span>
                <RichText text={item} />
              </span>
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
              className="rounded-2xl border border-neutral-900/10 bg-neutral-900/[0.02] p-6 text-center"
            >
              <p className="text-3xl font-light" style={{ color: post.accent }}>
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-900/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
