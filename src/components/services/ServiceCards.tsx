import type { ServiceChild } from "@/data/service-pages";
import Link from "next/link";

type Props = {
  services: ServiceChild[];
};

export function ServiceCards({ services }: Props) {
  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={service.url}
                className="group flex h-full flex-col border border-neutral-900/10 bg-white p-6 transition-colors hover:border-kiwi-400/50 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2 md:p-8"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-900/40">
                  {service.cardTags}
                </p>
                <h3 className="mt-4 text-xl font-light tracking-tight text-neutral-900 transition-colors group-hover:text-kiwi-500 md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-neutral-900/55 md:text-base">
                  {service.description[0]}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-900">
                  Detay
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
