"use client";

import type { BlogPost } from "@/data/blog";
import type { ContentBlock } from "@/data/blog-content";
import { RichText } from "@/components/blog/RichText";
import Image from "next/image";

export function BlogArticleContent({
  blocks,
  post,
}: {
  blocks: ContentBlock[];
  post: BlogPost;
}) {
  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      {blocks.map((block, i) => (
        <BlockRenderer key={`${block.type}-${i}`} block={block} post={post} />
      ))}
    </div>
  );
}

function BlockRenderer({
  block,
  post,
}: {
  block: ContentBlock;
  post: BlogPost;
}) {
  switch (block.type) {
    case "lead":
      return (
        <p className="text-xl font-light leading-relaxed break-words text-neutral-900/75 sm:text-2xl md:leading-snug">
          <RichText text={block.text} />
        </p>
      );

    case "h2":
      return (
        <h2 id={block.id} className="scroll-mt-28 pt-4">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: post.accent }}
          >
            {block.id}
          </span>
          <span className="mt-2 block break-words text-2xl font-medium text-neutral-900 sm:text-3xl md:text-4xl">
            {block.text}
          </span>
          <div
            className="mt-4 h-px max-w-xs"
            style={{ background: `linear-gradient(90deg, ${post.accent}, transparent)` }}
          />
        </h2>
      );

    case "p":
      return (
        <p className="text-lg leading-[1.75] text-neutral-900/55">
          <RichText text={block.text} />
        </p>
      );

    case "quote":
      return (
        <blockquote
          className="relative my-4 overflow-hidden rounded-2xl border p-6 sm:my-6 sm:rounded-3xl sm:p-10"
          style={{ borderColor: `${post.accent}30`, background: `${post.accent}08` }}
        >
          <p className="relative text-xl font-light italic leading-relaxed text-neutral-900/85 md:text-2xl">
            <RichText text={block.text} />
          </p>
          {block.author && (
            <footer className="relative mt-4 text-sm text-neutral-900/40">— {block.author}</footer>
          )}
        </blockquote>
      );

    case "image":
      return (
        <figure className="group relative -mx-4 overflow-hidden rounded-2xl sm:-mx-0 sm:rounded-3xl">
          <div className="relative aspect-[16/10] max-h-[320px]">
            <Image src={block.src} alt="" fill className="object-cover" sizes="100vw" loading="lazy" />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-xs text-neutral-900/35">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list":
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base break-words text-neutral-900/55 sm:gap-4 sm:text-lg"
            >
              <span style={{ color: post.accent }}>→</span>
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "stats":
      return (
        <div className="grid gap-4 sm:grid-cols-3">
          {block.items.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-neutral-900/10 bg-neutral-900/[0.02] p-6 text-center"
            >
              <p className="text-3xl font-light" style={{ color: post.accent }}>
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-900/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
