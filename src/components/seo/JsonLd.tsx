import { site } from "@/data/content";
import { SITE_ORIGIN } from "@/data/service-pages";

const ORG_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const LOCAL_ID = `${SITE_ORIGIN}/#localbusiness`;

const areaDistricts = [
  "Kadıköy",
  "Ataşehir",
  "Üsküdar",
  "Maltepe",
  "Kartal",
  "Pendik",
  "Caddebostan",
  "Bağdat Caddesi",
  "Suadiye",
  "Göztepe",
  "Anadolu Yakası",
  "İstanbul",
  "İzmir",
  "Alsancak",
  "Karşıyaka",
  "Bostanlı",
];

/**
 * Sitewide structured data graph — Organization + LocalBusiness + WebSite
 * tuned for İstanbul Anadolu Yakası digital marketing agency queries.
 */
export function JsonLd() {
  const graph = [
    {
      "@type": ["Organization", "ProfessionalService", "MarketingAgency"],
      "@id": ORG_ID,
      name: "Kiwi Marketing Agency",
      alternateName: ["Kiwi Agency", "Kiwi Marketing", site.fullName],
      url: SITE_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}/og-image.png`,
        width: 1200,
        height: 630,
      },
      image: `${SITE_ORIGIN}/og-image.png`,
      description:
        "İstanbul Anadolu Yakası merkezli dijital pazarlama ajansı. Sosyal medya yönetimi, Google Ads, Meta Ads, SEO–GEO, kreatif tasarım, prodüksiyon ve web yazılım hizmetleri.",
      email: site.email,
      telephone: site.phoneTel,
      foundingDate: "2020",
      priceRange: "$$",
      currenciesAccepted: "TRY",
      paymentAccepted: "Bank Transfer, Credit Card",
      knowsLanguage: ["tr", "en"],
      slogan: "Strateji, kreatif ve performans tek çatı altında",
      sameAs: [site.social.instagram, site.social.linkedin].filter(Boolean),
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: site.phoneTel,
          contactType: "sales",
          areaServed: "TR",
          availableLanguage: ["Turkish", "English"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "İstanbul",
        addressRegion: "İstanbul",
        addressCountry: "TR",
        streetAddress: "Anadolu Yakası",
      },
      areaServed: areaDistricts.map((name) => ({
        "@type": "Place",
        name,
      })),
      knowsAbout: [
        "Dijital pazarlama",
        "Sosyal medya yönetimi",
        "Google Ads",
        "Meta Ads",
        "SEO",
        "GEO",
        "Kreatif tasarım",
        "Video prodüksiyon",
        "Web yazılım",
        "İstanbul Anadolu Yakası dijital pazarlama",
        "Kadıköy sosyal medya ajansı",
        "Ataşehir dijital pazarlama",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Kiwi Hizmetleri",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Dijital Pazarlama",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads Reklam Yönetimi", url: `${SITE_ORIGIN}/dijital-pazarlama-ajansi/google-ads-reklam-yonetimi` } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta Reklam Yönetimi", url: `${SITE_ORIGIN}/dijital-pazarlama-ajansi/meta-reklam-yonetimi` } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & GEO Hizmetleri", url: `${SITE_ORIGIN}/dijital-pazarlama-ajansi/seo-geo-hizmetleri` } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performans Pazarlaması", url: `${SITE_ORIGIN}/dijital-pazarlama-ajansi/performans-pazarlamasi` } },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Sosyal Medya",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sosyal Medya Ajansı", url: `${SITE_ORIGIN}/sosyal-medya-ajansi` } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reel & Video İçerik Üretimi", url: `${SITE_ORIGIN}/sosyal-medya-ajansi/reel-video-icerik-uretimi` } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "İçerik Üretimi", url: `${SITE_ORIGIN}/sosyal-medya-ajansi/icerik-uretimi` } },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Kreatif & Web",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kreatif Tasarım Ajansı", url: `${SITE_ORIGIN}/kreatif-tasarim-ajansi` } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Yazılım Ajansı", url: `${SITE_ORIGIN}/web-yazilim-ajansi` } },
            ],
          },
        ],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": LOCAL_ID,
      name: "Kiwi Marketing Agency",
      parentOrganization: { "@id": ORG_ID },
      url: SITE_ORIGIN,
      image: `${SITE_ORIGIN}/og-image.png`,
      telephone: site.phoneTel,
      email: site.email,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "İstanbul",
        addressRegion: "İstanbul",
        addressCountry: "TR",
        streetAddress: "Anadolu Yakası",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.9819,
        longitude: 29.0574,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      areaServed: areaDistricts.map((name) => ({ "@type": "AdministrativeArea", name })),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_ORIGIN,
      name: "Kiwi Marketing Agency",
      description:
        "İstanbul Anadolu Yakası dijital pazarlama, sosyal medya, SEO ve kreatif ajans.",
      publisher: { "@id": ORG_ID },
      inLanguage: "tr-TR",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
