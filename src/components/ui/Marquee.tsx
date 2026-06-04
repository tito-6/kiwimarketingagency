"use client";

import { marqueeItems } from "@/data/content";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-white/10 py-5">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 text-sm font-medium uppercase tracking-[0.2em] text-white/50"
          >
            {item}
            <span className="text-kiwi-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
