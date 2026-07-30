import raw from "./service-pages.json";

export type ServiceChild = {
  title: string;
  slug: string;
  url: string;
  shortUrl: string;
  description: string[];
  scope: string;
  cardTags: string;
};

export type ServiceCategory = {
  id: string;
  slug: string;
  navLabel: string;
  url: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  servicesIntro: { title: string; paragraphs: string[] };
  services: ServiceChild[];
  process: {
    title: string;
    intro: string[];
    steps: { number: string; title: string; paragraphs: string[] }[];
  };
  why: { items: { title: string; paragraphs: string[] }[] };
  cta: {
    title: string;
    paragraphs: string[];
    primary: string;
    secondary: string;
  };
  seoContent: { title: string; paragraphs: string[] };
};

export type ServicePagesData = {
  heroServices: string[];
  homeSolutions: {
    id: string;
    title: string;
    href: string;
    description: string;
    tags: string[];
    cardTags: string[];
  }[];
  categories: ServiceCategory[];
  shortRedirects: { source: string; destination: string }[];
};

export const servicePagesData = raw as ServicePagesData;

export const heroServices = servicePagesData.heroServices;
export const homeSolutions = servicePagesData.homeSolutions;
export const serviceCategories = servicePagesData.categories;
export const shortRedirects = servicePagesData.shortRedirects;

export const SERVICE_CATEGORY_SLUGS = serviceCategories.map((c) => c.slug);

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

export function getServiceBySlugs(
  categorySlug: string,
  serviceSlug: string
): { category: ServiceCategory; service: ServiceChild } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const service = category.services.find((s) => s.slug === serviceSlug);
  if (!service) return undefined;
  return { category, service };
}

export function getAllCanonicalServicePaths(): string[] {
  const paths: string[] = [];
  for (const category of serviceCategories) {
    paths.push(category.url);
    for (const service of category.services) {
      paths.push(service.url);
    }
  }
  return paths;
}

export function childMetaTitle(service: ServiceChild, category: ServiceCategory): string {
  return `${service.title} | ${category.h1} | Kiwi Marketing Agency`;
}

export function childMetaDescription(service: ServiceChild): string {
  const first = service.description[0] ?? service.title;
  if (first.length <= 160) return first;
  return `${first.slice(0, 157).trimEnd()}...`;
}

export const primaryNav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kreatif Tasarım", href: "/kreatif-tasarim-ajansi" },
  { label: "Dijital Pazarlama", href: "/dijital-pazarlama-ajansi" },
  { label: "Sosyal Medya", href: "/sosyal-medya-ajansi" },
  { label: "Yazılım", href: "/web-yazilim-ajansi" },
] as const;

export const CONTACT_HREF = "/iletisim";
export const SITE_ORIGIN = "https://kiwimarketingagency.com";
