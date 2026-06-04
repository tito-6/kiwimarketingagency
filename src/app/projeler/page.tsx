import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProjelerMotionShell } from "@/components/projeler/ProjelerMotionShell";
import { ProjelerHero } from "@/components/projeler/ProjelerHero";
import { ProjelerMarquee } from "@/components/projeler/ProjelerMarquee";
import { ProjectShowcase } from "@/components/projeler/ProjectShowcase";
import { ProjelerStats } from "@/components/projeler/ProjelerStats";
import { ProjectArchive } from "@/components/projeler/ProjectArchive";
import { ProjelerCTA } from "@/components/projeler/ProjelerCTA";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Kiwi Agency referans projeleri — e-ticaret, SaaS, otomotiv, güzellik ve kurumsal kimlik çalışmalarımız.",
};

export default function ProjelerPage() {
  return (
    <PageLayout>
      <ProjelerMotionShell>
        <main>
          <ProjelerHero />
          <ProjelerMarquee />
          <ProjectShowcase />
          <ProjelerStats />
          <ProjectArchive />
          <ProjelerCTA />
        </main>
      </ProjelerMotionShell>
    </PageLayout>
  );
}
