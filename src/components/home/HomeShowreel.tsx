"use client";

import { ShowreelVideo } from "@/components/ui/ShowreelVideo";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useRef } from "react";

export function HomeShowreel() {
  const ref = useRef(null);

  return (
    <section ref={ref} className="overflow-hidden py-12 md:py-16">
      <div className="mx-auto mb-8 max-w-[1440px] px-4 sm:px-6 md:mb-10 md:px-10">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
            Showreel
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-light text-white">
            İşlerimizden bir kesit
          </h2>
        </ScrollReveal>
      </div>

      <ShowreelVideo />
    </section>
  );
}
