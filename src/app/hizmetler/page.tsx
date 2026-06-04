import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { HizmetlerHero } from "@/components/hizmetler/HizmetlerHero";
import { ServicesBento } from "@/components/hizmetler/ServicesBento";
import { ServiceDetail } from "@/components/hizmetler/ServiceDetail";
import { ProcessTimeline } from "@/components/hizmetler/ProcessTimeline";
import { HizmetlerCTA } from "@/components/hizmetler/HizmetlerCTA";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Kreatif tasarım, sosyal medya yönetimi, dijital pazarlama, web yazılım ve SEO — Kiwi Agency hizmetleri.",
};

export default function HizmetlerPage() {
  return (
    <PageLayout>
      <main>
        <HizmetlerHero />
        <ServicesBento />
        <ServiceDetail />
        <ProcessTimeline />
        <HizmetlerCTA />
      </main>
    </PageLayout>
  );
}
