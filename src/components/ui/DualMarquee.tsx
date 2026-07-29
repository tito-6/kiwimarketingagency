"use client";

import { marqueeItems } from "@/data/content";
import { useLiteMotion } from "@/lib/motion";

function MarqueeRow({
  reverse = false,
  speed = 40,
  paused = false,
}: {
  reverse?: boolean;
  speed?: number;
  paused?: boolean;
}) {
  const items = paused
    ? marqueeItems
    : [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="flex overflow-hidden">
      <div
        className="flex w-max gap-10 whitespace-nowrap py-3 sm:gap-16"
        style={
          paused
            ? undefined
            : {
                animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
              }
        }
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-[clamp(1.25rem,4vw,3rem)] font-bold uppercase tracking-tighter text-neutral-900/[0.12] sm:gap-16"
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
  const lite = useLiteMotion();

  return (
    <section className="relative overflow-hidden border-y border-neutral-900/10 py-3 sm:py-4">
      <MarqueeRow speed={55} paused={lite} />
      {!lite && <MarqueeRow reverse speed={65} />}
    </section>
  );
}
