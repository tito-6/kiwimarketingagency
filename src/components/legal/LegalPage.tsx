import { PageLayout } from "@/components/layout/PageLayout";
import Link from "next/link";

type Section = { title: string; content: string };

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <PageLayout>
      <main className="mx-auto max-w-3xl px-4 py-28 sm:px-6 sm:py-32 md:px-10 md:py-40">
        <Link
          href="/"
          className="text-xs uppercase tracking-wider text-kiwi-400 hover:text-white"
        >
          ← Anasayfa
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:mt-8 sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-white/40">Son güncelleme: {updated}</p>

        <div className="mt-16 space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-medium text-kiwi-400">{section.title}</h2>
              <p className="mt-4 leading-relaxed text-white/60">{section.content}</p>
            </section>
          ))}
        </div>
      </main>
    </PageLayout>
  );
}
