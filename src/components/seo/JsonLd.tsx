import { site } from "@/data/content";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    name: site.fullName,
    description:
      "Dijital pazarlama, kreatif tasarım, sosyal medya yönetimi, web yazılım ve SEO hizmetleri.",
    url: "https://kiwimarketingagency.com",
    logo: "https://kiwimarketingagency.com/og-image.png",
    email: site.email,
    telephone: site.phone,
    areaServed: "TR",
    knowsLanguage: "tr",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
