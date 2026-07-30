"use client";

import { homeSolutions } from "@/data/service-pages";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useId, useState } from "react";

export function SolutionsSection() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(homeSolutions[0]?.id ?? null);

  return (
    <section id="solutions" className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
            / HİZMETLER
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.75rem)] font-light leading-tight text-neutral-900">
            Çözümlerimiz
          </h2>
        </ScrollReveal>

        <ul className="mt-12 divide-y divide-neutral-900/10 border-y border-neutral-900/10 md:mt-16">
          {homeSolutions.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `${baseId}-panel-${item.id}`;
            const buttonId = `${baseId}-btn-${item.id}`;

            return (
              <li key={item.id}>
                <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className={cn(
                        "flex w-full items-center justify-between gap-4 py-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2 md:py-8",
                        isOpen ? "text-neutral-900" : "text-neutral-900/70 hover:text-neutral-900"
                      )}
                    >
                      <span className="flex min-w-0 items-baseline gap-4 sm:gap-6">
                        <span className="font-mono text-xs tracking-[0.2em] text-kiwi-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[clamp(1.35rem,3vw,2.25rem)] font-light tracking-tight">
                          {item.title}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-900/15 text-lg transition-transform duration-300",
                          isOpen && "rotate-45 border-kiwi-400 bg-kiwi-400 text-neutral-900"
                        )}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className={cn(
                      "pb-6 md:flex md:flex-col md:justify-center md:py-8",
                      !isOpen && "md:hidden"
                    )}
                  >
                    {isOpen && (
                      <div className="space-y-5 md:pl-4">
                        <p className="text-base font-light leading-relaxed text-neutral-900/60 md:text-lg">
                          {item.description}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {item.cardTags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-neutral-900/10 px-3 py-1 text-xs uppercase tracking-wider text-neutral-900/50"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={item.href}
                          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-900 transition-colors hover:text-kiwi-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2"
                        >
                          İncele
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
