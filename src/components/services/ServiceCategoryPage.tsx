import { PageLayout } from "@/components/layout/PageLayout";
import { BottomCTA } from "@/components/services/BottomCTA";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { SEOContent } from "@/components/services/SEOContent";
import { ServiceCards } from "@/components/services/ServiceCards";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceOverview } from "@/components/services/ServiceOverview";
import { WhyKiwi } from "@/components/services/WhyKiwi";
import type { ServiceCategory } from "@/data/service-pages";
import { SITE_ORIGIN } from "@/data/service-pages";

type Props = {
  category: ServiceCategory;
};

export function ServiceCategoryPageView({ category }: Props) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_ORIGIN}${category.url}#service`,
    name: category.h1,
    description: category.metaDescription,
    serviceType: category.h1,
    provider: {
      "@type": "Organization",
      name: "Kiwi Marketing Agency",
      url: SITE_ORIGIN,
      telephone: "+905326305713",
    },
    areaServed: [
      { "@type": "City", name: "İstanbul" },
      { "@type": "AdministrativeArea", name: "Anadolu Yakası" },
      { "@type": "AdministrativeArea", name: "Kadıköy" },
      { "@type": "AdministrativeArea", name: "Ataşehir" },
      { "@type": "AdministrativeArea", name: "Maltepe" },
      { "@type": "Country", name: "Türkiye" },
    ],
    url: `${SITE_ORIGIN}${category.url}`,
    inLanguage: "tr-TR",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "TRY",
      url: `${SITE_ORIGIN}/iletisim`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_ORIGIN },
      {
        "@type": "ListItem",
        position: 2,
        name: category.h1,
        item: `${SITE_ORIGIN}${category.url}`,
      },
    ],
  };

  return (
    <PageLayout>
      <main>
        <ServiceHero
          h1={category.h1}
          intro={category.intro}
          primaryCta={category.cta.primary}
          secondaryCta={category.cta.secondary}
        />
        <ServiceOverview
          title={category.servicesIntro.title}
          paragraphs={category.servicesIntro.paragraphs}
        />
        <ServiceCards services={category.services} />
        <ProcessSteps
          title={category.process.title}
          intro={category.process.intro}
          steps={category.process.steps}
        />
        <WhyKiwi items={category.why.items} />
        <BottomCTA
          title={category.cta.title}
          paragraphs={category.cta.paragraphs}
          primary={category.cta.primary}
          secondary={category.cta.secondary}
        />
        <SEOContent
          title={category.seoContent.title}
          paragraphs={category.seoContent.paragraphs}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
      </main>
    </PageLayout>
  );
}
