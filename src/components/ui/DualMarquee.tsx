"use client";

import { marqueeItems } from "@/data/content";

function MarqueeRow({
  reverse = false,
  speed = 40,
}: {
  reverse?: boolean;
  speed?: number;
}) {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="flex overflow-hidden">
      <div
        className="flex w-max gap-16 whitespace-nowrap py-3"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-16 text-[clamp(1.5rem,4vw,3rem)] font-bold uppercase tracking-tighter text-white/[0.07]"
          >
            {item}
            <span className="text-kiwi-400/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function DualMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-4">
      <MarqueeRow speed={35} />
      <MarqueeRow reverse speed={28} />
    </section>
  );
}
