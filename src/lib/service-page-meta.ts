import type { Metadata } from "next";
import {
  SITE_ORIGIN,
  childMetaDescription,
  childMetaTitle,
  type ServiceCategory,
  type ServiceChild,
} from "@/data/service-pages";

export function categoryMetadata(category: ServiceCategory): Metadata {
  const url = `${SITE_ORIGIN}${category.url}`;
  return {
    title: { absolute: category.seoTitle },
    description: category.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: category.seoTitle,
      description: category.metaDescription,
      url,
      type: "website",
      locale: "tr_TR",
      siteName: "Kiwi Marketing Agency",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: category.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category.seoTitle,
      description: category.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export function childMetadata(
  category: ServiceCategory,
  service: ServiceChild
): Metadata {
  const title = childMetaTitle(service, category);
  const description = childMetaDescription(service);
  const url = `${SITE_ORIGIN}${service.url}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "tr_TR",
      siteName: "Kiwi Marketing Agency",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}
