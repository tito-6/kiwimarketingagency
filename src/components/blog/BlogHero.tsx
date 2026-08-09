"use client";

import { blogPage, featuredPost } from "@/data/blog";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";
import Link from "next/link";

export function BlogHero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12">
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-kiwi-400">
          {blogPage.label}
        </p>

        <h1 className="mt-5 max-w-5xl sm:mt-6">
          <span className="block break-words text-[clamp(1.85rem,7vw,5rem)] font-light leading-[1.08] text-neutral-900">
            {blogPage.title}
          </span>
          <span className="mt-1 block break-words text-[clamp(1.85rem,7vw,5rem)] font-bold leading-[1.08] tracking-tighter text-kiwi-400">
            {blogPage.titleAccent}
          </span>
        </h1>

        <p className="mt-5 max-w-lg text-base text-neutral-900/45 sm:mt-6 sm:text-lg">
          {blogPage.description}
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-8 max-w-[1440px] px-4 sm:mt-10 sm:px-6 md:px-10">
        <Link
          href={`/blog/${featuredPost.slug}`}
          data-cursor="pointer"
          className="group relative block overflow-hidden rounded-2xl border border-neutral-900/10 sm:rounded-3xl"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-[360px]">
              <Image
                src={featuredPost.image}
                alt=""
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${featuredPost.gradient} mix-blend-multiply`}
              />
            </div>

            <div className="relative flex flex-col justify-center bg-neutral-50 p-6 sm:p-10 md:p-12">
              <div
                className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-widest"
                style={{
                  borderColor: `${featuredPost.accent}60`,
                  color: featuredPost.accent,
                }}
              >
                <span className="h-2 w-2 rounded-full bg-current" />
                Editörün Seçimi
              </div>

              <h2 className="mt-5 text-xl font-medium leading-snug text-neutral-900 transition-colors group-hover:text-kiwi-400 sm:text-2xl md:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-sm text-neutral-900/45 sm:text-base">
                {featuredPost.excerpt}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-neutral-900/10 pt-5">
                <span className="text-xs text-neutral-900/35">
                  {featuredPost.category} · {featuredPost.readTime}
                </span>
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full border text-lg"
                  style={{
                    borderColor: featuredPost.accent,
                    color: featuredPost.accent,
                  }}
                >
                  ↗
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-8 flex justify-center">
          <MagneticButton href="/blog#journal" variant="outline">
            Tüm Yazılar
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
