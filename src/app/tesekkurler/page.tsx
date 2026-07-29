import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { ThankYouContent } from "@/components/tesekkurler/ThankYouContent";

export const metadata: Metadata = {
  title: "Teşekkür Ederiz",
  description:
    "Talebiniz başarıyla bize ulaştı. Kiwi Marketing Agency ekibi en kısa sürede sizinle iletişime geçecektir.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TesekkurlerPage() {
  return (
    <PageLayout>
      <main>
        <ThankYouContent />
      </main>
    </PageLayout>
  );
}
