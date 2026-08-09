import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { BlogMotionShell } from "@/components/blog/BlogMotionShell";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { blogPosts } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kiwimarketingagency.com";

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
    "Kiwi Agency",
  ].filter(Boolean) as string[];

  return {
    title: post.title,
    description: post.excerpt,
    keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      images: [{ url: post.image, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`],
    author: {
      "@type": "Organization",
      name: post.author || "Kiwi Agency",
    },
    publisher: {
      "@type": "Organization",
      name: "Kiwi Agency",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    keywords: [post.keyword, ...(post.keywords ?? [])].filter(Boolean).join(", "),
    about: (post.relatedServices ?? []).map((s) => ({
      "@type": "Service",
      name: s.label,
      url: `${siteUrl}${s.href}`,
    })),
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
