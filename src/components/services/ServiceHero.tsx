import Link from "next/link";
import { CONTACT_HREF } from "@/data/service-pages";

type Props = {
  eyebrow?: string;
  h1: string;
  intro: string[];
  primaryCta?: string;
  secondaryCta?: string;
  flushTop?: boolean;
};

export function ServiceHero({
  eyebrow = "Kiwi Marketing Agency",
  h1,
  intro,
  primaryCta = "İletişime Geçin",
  secondaryCta,
  flushTop = false,
}: Props) {
  return (
    <section
      className={
        flushTop
          ? "relative overflow-hidden bg-neutral-950 pb-16 pt-8 text-white md:pb-24 md:pt-10"
          : "relative overflow-hidden bg-neutral-950 pb-16 pt-28 text-white md:pb-24 md:pt-36"
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(169,203,24,0.16),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1.05] tracking-tight">
          {h1}
        </h1>
        <div className="mt-8 max-w-3xl space-y-4 text-base font-light leading-relaxed text-white/60 md:text-lg">
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={CONTACT_HREF}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-kiwi-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900 transition-colors hover:bg-kiwi-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            {primaryCta}
          </Link>
          {secondaryCta ? (
            <Link
              href={CONTACT_HREF}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-kiwi-400 hover:text-kiwi-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              {secondaryCta}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
