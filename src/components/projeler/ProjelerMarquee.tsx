"use client";

import { projectItems } from "@/data/projects";

export function ProjelerMarquee() {
  const labels = projectItems.flatMap((p) => [
    p.title,
    p.category,
    p.year,
  ]);
  const row = [...labels, ...labels];

  return (
    <div className="overflow-hidden border-y border-white/10 py-6">
      <div
        className="flex w-max gap-16 whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-[clamp(1.25rem,3vw,2.5rem)] font-bold uppercase tracking-tighter text-white/[0.06]"
          >
            {item}
            <span className="mx-8 text-kiwi-400/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
