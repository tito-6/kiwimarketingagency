import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { BlogMotionShell } from "@/components/blog/BlogMotionShell";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogTicker } from "@/components/blog/BlogTicker";
import { BlogScrollTheater } from "@/components/blog/BlogScrollTheater";
import { BlogJournal } from "@/components/blog/BlogJournal";
import { BlogScrollStrip } from "@/components/blog/BlogScrollStrip";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";
import { BlogCTA } from "@/components/blog/BlogCTA";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Kiwi Agency blog — dijital pazarlama, tasarım, SEO ve web stratejisi üzerine içgörüler ve trendler.",
};

export default function BlogPage() {
  return (
    <PageLayout>
      <BlogMotionShell>
        <main>
          <BlogHero />
          <BlogTicker />
          <BlogJournal />
          <div id="theater">
            <BlogScrollTheater />
          </div>
          <BlogScrollStrip />
          <BlogNewsletter />
          <BlogCTA />
        </main>
      </BlogMotionShell>
    </PageLayout>
  );
}
