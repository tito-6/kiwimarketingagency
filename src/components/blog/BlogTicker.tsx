"use client";

import { blogPosts } from "@/data/blog";

export function BlogTicker() {
  const items = blogPosts.flatMap((p) => [p.category, p.title.split(" ")[0], p.readTime]);
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#141414]/80 py-4 backdrop-blur-sm">
      <div className="flex w-max gap-10" style={{ animation: "marquee 70s linear infinite" }}>
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-sm font-medium uppercase tracking-[0.25em] text-white/40"
          >
            {item}
            <span className="text-kiwi-400/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
