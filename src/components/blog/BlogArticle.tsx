"use client";

import type { BlogPost } from "@/data/blog";
import {
  getAdjacentPosts,
  getArticleContent,
  getRelatedPosts,
  getSecondaryImage,
} from "@/data/blog-content";
import { BlogArticleContent } from "@/components/blog/BlogArticleContent";
import { BlogArticleNav } from "@/components/blog/BlogArticleNav";
import { ReadingRing } from "@/components/blog/ui/ReadingRing";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLiteMotion } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function BlogArticle({ post }: { post: BlogPost }) {
  const containerRef = useRef<HTMLElement>(null);
  const lite = useLiteMotion();
  const [activeSection, setActiveSection] = useState("");

  const blocks = getArticleContent(post);
  const headings = blocks.filter((b) => b.type === "h2");
  const { prev, next } = getAdjacentPosts(post.slug);
  const secondaryImage = getSecondaryImage(post);

  useEffect(() => {
    if (lite || headings.length === 0) return;
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
  }, [headings, lite]);

  return (
    <article ref={containerRef}>
      <header className="relative overflow-hidden bg-white pt-24 pb-8 sm:pt-28 sm:pb-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(169,203,24,0.1),transparent_55%)]"
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
          <Link
            href="/blog"
            data-cursor="pointer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-900/15 bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wider text-neutral-900/60 transition-colors hover:border-kiwi-400 hover:text-kiwi-500"
          >
            ← Journal
          </Link>

          <span
            className="mt-6 inline-flex w-fit rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider sm:mt-8"
            style={{ borderColor: `${post.accent}50`, color: post.accent }}
          >
            {post.category}
          </span>

          <h1 className="mt-5 max-w-4xl break-words text-[clamp(1.75rem,7.5vw,4.25rem)] font-bold leading-[1.1] tracking-tight text-neutral-900 sm:mt-6">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-900/50 sm:mt-6 sm:gap-x-6 sm:text-sm">
            <span>{post.author}</span>
            <span>{post.date}</span>
            <span>{post.readTime} okuma</span>
          </div>

          <div className="relative mt-8 aspect-[16/9] max-h-[420px] overflow-hidden rounded-2xl border border-neutral-900/10 sm:mt-10 sm:rounded-3xl">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </div>
        </div>
      </header>

      <div className="relative mx-auto min-w-0 max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          {!lite && (
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                <ReadingRing accent={post.accent} containerRef={containerRef} />

                <nav>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-900/30">
                    İçindekiler
                  </p>
                  <ul className="mt-4 space-y-2">
                    {headings.map((h) =>
                      h.type === "h2" ? (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className={`block py-1 text-sm transition-colors ${
                              activeSection === h.id
                                ? "font-medium"
                                : "text-neutral-900/35 hover:text-neutral-900/70"
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
              </div>
            </aside>
          )}

          <div className="min-w-0 max-w-3xl lg:max-w-none">
            <BlogArticleContent blocks={blocks} post={post} />

            <div className="relative mt-12 aspect-[16/10] max-h-[360px] overflow-hidden rounded-2xl border border-neutral-900/10 sm:mt-16 sm:rounded-3xl">
              <Image
                src={secondaryImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-neutral-900/10 py-14 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
          <h2 className="text-2xl font-light text-neutral-900 sm:text-3xl">İlgili yazılar</h2>
          <RelatedGrid post={post} />
          <div className="mt-10 text-center">
            <MagneticButton href="/blog" variant="outline">
              Tüm Yazılar
            </MagneticButton>
          </div>
        </div>
      </section>

      <BlogArticleNav prev={prev} next={next} />
    </article>
  );
}

function RelatedGrid({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post, 3);

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-3">
      {related.map((p) => (
        <Link
          key={p.slug}
          href={`/blog/${p.slug}`}
          data-cursor="pointer"
          className="group block overflow-hidden rounded-2xl border border-neutral-900/10"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={p.image}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
              loading="lazy"
            />
          </div>
          <div className="p-5">
            <p className="text-xs uppercase tracking-wider" style={{ color: p.accent }}>
              {p.category}
            </p>
            <h3 className="mt-2 font-medium text-neutral-900 group-hover:text-kiwi-400">
              {p.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
