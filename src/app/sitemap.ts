import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { getAllCanonicalServicePaths, SITE_ORIGIN } from "@/data/service-pages";

const LOCAL_SEO_SLUGS = new Set([
  "istanbul-dijital-pazarlama-ajansi",
  "kadikoy-sosyal-medya-ajansi",
  "atasehir-dijital-pazarlama-ajansi",
  "maltepe-sosyal-medya-reklam-ajansi",
  "caddebostan-bagdat-caddesi-sosyal-medya",
  "izmir-dijital-pazarlama-ajansi",
  "alsancak-karsiyaka-bostanli-dijital-pazarlama",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/blog",
    "/iletisim",
    "/hizmetler",
    "/gizlilik-politikasi",
    "/hizmet-sartlari",
  ].map((path) => ({
    url: `${SITE_ORIGIN}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/blog" || path === "/iletisim" ? 0.8 : 0.5,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = getAllCanonicalServicePaths().map(
    (path) => ({
      url: `${SITE_ORIGIN}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path.split("/").length === 2 ? 0.9 : 0.8,
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_ORIGIN}/blog/${post.slug}`,
    lastModified: post.dateIso ? new Date(post.dateIso) : now,
    changeFrequency: "monthly" as const,
    priority: LOCAL_SEO_SLUGS.has(post.slug) || post.featured ? 0.75 : 0.55,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
