import { CONTACT_HREF } from "@/data/service-pages";
import Link from "next/link";

type Props = {
  title: string;
  paragraphs: string[];
  primary: string;
  secondary: string;
};

export function BottomCTA({ title, paragraphs, primary, secondary }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="border border-neutral-900/10 bg-neutral-50 px-6 py-12 md:px-12 md:py-16">
          <h2 className="max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-tight text-neutral-900">
            {title}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base font-light leading-relaxed text-neutral-900/60 md:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={CONTACT_HREF}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-kiwi-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900 transition-colors hover:bg-kiwi-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2"
            >
              {primary}
            </Link>
            <Link
              href={CONTACT_HREF}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-900/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900 transition-colors hover:border-kiwi-400 hover:text-kiwi-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2"
            >
              {secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
