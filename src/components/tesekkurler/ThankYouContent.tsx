"use client";

import { useLanguage } from "@/context/LanguageContext";
import { site } from "@/data/content";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export function ThankYouContent() {
  const { lang, t } = useLanguage();
  const thank = t.thankYouPage;

  useEffect(() => {
    // Fire direct thank you pageview event in dataLayer if not already present
    if (typeof window !== "undefined") {
      const w = window as Window & { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "thankyou_page_view",
        page_path: "/tesekkurler",
      });
    }
  }, []);

  return (
    <section className="relative min-h-[85vh] overflow-hidden py-24 md:py-32">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-kiwi-400/10 blur-[120px]" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-gradient-to-br from-white/80 via-white/40 to-white/20 p-8 shadow-2xl backdrop-blur-2xl md:p-16">
          <div className="mx-auto max-w-3xl text-center">
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-kiwi-400 text-4xl text-neutral-900 shadow-[0_0_50px_rgba(169,203,24,0.45)]"
            >
              ✓
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-kiwi-400/30 bg-kiwi-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-900"
            >
              <span className="h-2 w-2 rounded-full bg-kiwi-400 animate-pulse" />
              {thank.badge}
            </motion.div>

            {/* Title */}
            <div className="mt-6">
              <TextReveal
                text={thank.title}
                className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-tight text-neutral-900"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-xl font-medium text-neutral-800"
            >
              {thank.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg"
            >
              {thank.description}
            </motion.p>

            {/* Process / What happens next */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-14 border-t border-neutral-900/10 pt-12 text-left"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-neutral-900">
                  {thank.timeframeTitle}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{thank.timeframeSub}</p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {thank.steps.map((step, idx) => (
                  <div
                    key={step.num}
                    className="relative rounded-2xl border border-neutral-900/5 bg-white/60 p-6 backdrop-blur-md transition-transform hover:-translate-y-1"
                  >
                    <span className="text-xs font-bold tracking-widest text-kiwi-500">
                      {step.num}
                    </span>
                    <h4 className="mt-2 text-lg font-semibold text-neutral-900">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-14 flex flex-wrap items-center justify-center gap-4 border-t border-neutral-900/10 pt-10"
            >
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 active:scale-95"
              >
                {thank.backToHome}
              </Link>
              <Link
                href="/hizmetler"
                className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-900/20 bg-white/80 px-8 text-sm font-semibold uppercase tracking-wider text-neutral-900 transition-colors hover:border-kiwi-400 hover:text-kiwi-500"
              >
                {thank.exploreServices}
              </Link>
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-kiwi-400 bg-kiwi-400/10 px-8 text-sm font-semibold uppercase tracking-wider text-neutral-900 transition-colors hover:bg-kiwi-400"
              >
                📞 {thank.callUs}
              </a>
              <a
                href={`https://wa.me/${site.phoneTel.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
              >
                💬 {thank.whatsapp}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
