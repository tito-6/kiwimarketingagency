"use client";

import type { BlogPost } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";

export function BlogArticleNav({
  prev,
  next,
}: {
  prev: BlogPost | null;
  next: BlogPost | null;
}) {
  return (
    <section className="border-t border-neutral-900/10">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
        {prev ? (
          <NavCard post={prev} direction="prev" />
        ) : (
          <div className="hidden md:block" />
        )}
        {next ? <NavCard post={next} direction="next" /> : null}
      </div>
    </section>
  );
}

function NavCard({
  post,
  direction,
}: {
  post: BlogPost;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/blog/${post.slug}`}
      data-cursor="pointer"
      className={`group relative flex min-h-[140px] min-w-0 flex-col justify-end overflow-hidden border-neutral-900/10 p-6 sm:min-h-[160px] sm:p-8 md:p-10 ${
        isNext
          ? "border-t md:border-l md:border-t-0 md:items-end md:text-right"
          : "border-b md:border-b-0 md:border-r"
      }`}
    >
      <div className="absolute inset-0">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover opacity-20 transition-opacity group-hover:opacity-35"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative min-w-0">
        <span
          className="text-xs uppercase tracking-[0.25em]"
          style={{ color: post.accent }}
        >
          {isNext ? "Sonraki" : "Önceki"}
        </span>
        <h3 className="mt-2 line-clamp-2 text-lg font-medium text-white sm:text-xl">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}
