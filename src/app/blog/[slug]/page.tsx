import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { BlogMotionShell } from "@/components/blog/BlogMotionShell";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { blogPosts } from "@/data/blog";
import { getArticleContent } from "@/data/blog-content";
import { SITE_ORIGIN } from "@/data/service-pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Yazı bulunamadı" };

  const keywords = [
    post.keyword,
    ...(post.keywords ?? []),
    post.category,
    "İstanbul dijital pazarlama ajansı",
    "Anadolu Yakası",
    "Kiwi Marketing Agency",
  ].filter(Boolean) as string[];

  const absoluteImage = post.image.startsWith("http")
    ? post.image
    : `${SITE_ORIGIN}${post.image}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords,
    authors: [{ name: post.author || "Kiwi Marketing Agency" }],
    category: post.category,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "tr_TR",
      url: `${SITE_ORIGIN}/blog/${post.slug}`,
      siteName: "Kiwi Marketing Agency",
      publishedTime: post.dateIso,
      modifiedTime: post.dateIso,
      authors: [post.author || "Kiwi Marketing Agency"],
      tags: keywords,
      images: [{ url: absoluteImage, alt: post.title, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [absoluteImage],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

function buildFaqFromBlocks(blocks: ReturnType<typeof getArticleContent>) {
  const faqs: { q: string; a: string }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type !== "h2") continue;
    if (!/[?]/.test(b.text) && !/nedir|nasıl|ne kadar|nelere|hangisi/i.test(b.text)) {
      continue;
    }
    const answerParts: string[] = [];
    for (let j = i + 1; j < blocks.length; j++) {
      const n = blocks[j];
      if (n.type === "h2") break;
      if (n.type === "p" || n.type === "lead") answerParts.push(n.text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"));
      if (n.type === "list") answerParts.push(n.items.map((x) => x.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")).join("; "));
      if (answerParts.join(" ").length > 280) break;
    }
    const a = answerParts.join(" ").replace(/\s+/g, " ").trim();
    if (a.length > 40) faqs.push({ q: b.text.replace(/\?*$/, "?"), a: a.slice(0, 400) });
  }
  return faqs.slice(0, 8);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const blocks = getArticleContent(post);
  const image = post.image.startsWith("http") ? post.image : `${SITE_ORIGIN}${post.image}`;
  const pageUrl = `${SITE_ORIGIN}/blog/${post.slug}`;
  const faqs = buildFaqFromBlocks(blocks);

  const articleLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: post.title,
        name: post.title,
        description: post.excerpt,
        image: [image],
        datePublished: post.dateIso || undefined,
        dateModified: post.dateIso || undefined,
        inLanguage: "tr-TR",
        isAccessibleForFree: true,
        author: {
          "@type": "Organization",
          name: "Kiwi Marketing Agency",
          url: SITE_ORIGIN,
        },
        publisher: {
          "@type": "Organization",
          name: "Kiwi Marketing Agency",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_ORIGIN}/og-image.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
        keywords: [post.keyword, ...(post.keywords ?? [])].filter(Boolean).join(", "),
        articleSection: post.category,
        wordCount: blocks
          .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : ""))
          .join(" ")
          .split(/\s+/)
          .filter(Boolean).length,
        about: (post.relatedServices ?? []).map((s) => ({
          "@type": "Service",
          name: s.label,
          url: `${SITE_ORIGIN}${s.href}`,
        })),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "article p:first-of-type"],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_ORIGIN },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
        ],
      },
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <BlogMotionShell>
        <main>
          <BlogArticle post={post} />
        </main>
      </BlogMotionShell>
    </PageLayout>
  );
}
