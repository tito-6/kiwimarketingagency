import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { getAllCanonicalServicePaths, SITE_ORIGIN } from "@/data/service-pages";

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
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = getAllCanonicalServicePaths().map(
    (path) => ({
      url: `${SITE_ORIGIN}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path.split("/").length === 2 ? 0.9 : 0.8,
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_ORIGIN}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
