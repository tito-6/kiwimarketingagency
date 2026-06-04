"use client";

import { blogPosts } from "@/data/blog";
import { motion } from "framer-motion";

export function BlogMobileTheaterNav({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 gap-2 rounded-full border border-white/15 bg-[#1a1a1a]/90 p-2 backdrop-blur-xl lg:hidden safe-bottom">
      {blogPosts.map((p, i) => (
        <motion.button
          key={p.slug}
          type="button"
          onClick={() => onSelect(i)}
          animate={{ width: active === i ? 32 : 8 }}
          className={`h-2 shrink-0 rounded-full ${active === i ? "bg-kiwi-400" : "bg-white/25"}`}
          aria-label={p.title}
        />
      ))}
    </div>
  );
}
