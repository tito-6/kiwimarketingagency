"use client";

import type { BlogPost } from "@/data/blog";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { motion } from "framer-motion";
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
    <section className="border-t border-white/10">
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

function NavCard({ post, direction }: { post: BlogPost; direction: "prev" | "next" }) {
  const isNext = direction === "next";

  return (
    <ClipReveal direction={isNext ? "right" : "left"}>
      <Link
        href={`/blog/${post.slug}`}
        data-cursor="pointer"
        className={`group relative flex min-h-[200px] flex-col justify-end overflow-hidden border-white/10 p-8 md:min-h-[280px] md:p-12 ${
          isNext ? "border-l md:items-end md:text-right" : "border-r"
        }`}
      >
        <div className="absolute inset-0">
          <Image src={post.image} alt="" fill className="object-cover opacity-20 transition-opacity group-hover:opacity-40" sizes="50vw" />
          <div className={`absolute inset-0 bg-gradient-to-${isNext ? "l" : "r"} from-[#1a1a1a] via-[#1a1a1a]/90 to-transparent`} />
        </div>

        <div className="relative">
          <motion.span
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: post.accent }}
            whileHover={{ x: isNext ? 6 : -6 }}
          >
            {isNext ? "Sonraki yazı →" : "← Önceki yazı"}
          </motion.span>
          <h3 className="mt-3 max-w-sm text-xl font-medium text-white transition-colors group-hover:text-kiwi-400 md:text-2xl">
            {post.title}
          </h3>
        </div>
      </Link>
    </ClipReveal>
  );
}
