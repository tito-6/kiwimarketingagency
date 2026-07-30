import { PageLayout } from "@/components/layout/PageLayout";
import { BottomCTA } from "@/components/services/BottomCTA";
import { Breadcrumbs } from "@/components/services/Breadcrumbs";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceScope } from "@/components/services/ServiceScope";
import type { ServiceCategory, ServiceChild } from "@/data/service-pages";
import { CONTACT_HREF, SITE_ORIGIN } from "@/data/service-pages";
import Link from "next/link";

type Props = {
  category: ServiceCategory;
  service: ServiceChild;
};

export function ServiceDetailPageView({ category, service }: Props) {
  const related = category.services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description[0] ?? service.title,
    provider: {
      "@type": "Organization",
      name: "Kiwi Marketing Agency",
      url: SITE_ORIGIN,
    },
    areaServed: "TR",
    url: `${SITE_ORIGIN}${service.url}`,
  };

  return (
    <PageLayout>
      <main>
        <Breadcrumbs
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: category.h1, href: category.url },
            { label: service.title },
          ]}
        />
        <ServiceHero
          eyebrow={category.h1}
          h1={service.title}
          intro={service.description}
          primaryCta={category.cta.primary}
          secondaryCta={category.cta.secondary}
          flushTop
        />
        {service.cardTags ? (
          <div className="mx-auto max-w-[1440px] px-4 pt-10 sm:px-6 md:px-10">
            <p className="text-xs uppercase tracking-[0.16em] text-neutral-900/40">
              {service.cardTags}
            </p>
          </div>
        ) : null}
        <div className="pt-6">
          <ServiceScope scope={service.scope} />
        </div>

        <section className="py-14 md:py-16">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={category.url}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-900/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900 transition-colors hover:border-kiwi-400 hover:text-kiwi-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2"
              >
                {category.h1}
              </Link>
              <Link
                href={CONTACT_HREF}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-kiwi-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900 transition-colors hover:bg-kiwi-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2"
              >
                {category.cta.primary}
              </Link>
            </div>

            {related.length > 0 ? (
              <div className="mt-12">
                <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
                  İlgili Hizmetler
                </h2>
                <ul className="mt-6 grid gap-3 md:grid-cols-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.url}
                        className="block border border-neutral-900/10 p-5 transition-colors hover:border-kiwi-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2"
                      >
                        <span className="text-lg font-light text-neutral-900">
                          {item.title}
                        </span>
                        <span className="mt-2 block text-xs uppercase tracking-[0.14em] text-neutral-900/40">
                          {item.cardTags}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        <BottomCTA
          title={category.cta.title}
          paragraphs={category.cta.paragraphs}
          primary={category.cta.primary}
          secondary={category.cta.secondary}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </main>
    </PageLayout>
  );
}
