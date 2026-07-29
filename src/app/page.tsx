import { PageLayout } from "@/components/layout/PageLayout";
import { HomeMotionShell } from "@/components/home/HomeMotionShell";
import { Hero } from "@/components/sections/Hero";
import { DualMarquee } from "@/components/ui/DualMarquee";
import { About } from "@/components/sections/About";
import { HomeManifesto } from "@/components/home/HomeManifesto";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Stack } from "@/components/sections/Stack";
import { PinnedProjects } from "@/components/ui/PinnedProjects";
import { Blog } from "@/components/sections/Blog";
import { FAQ } from "@/components/sections/FAQ";
import { HomeCTABand } from "@/components/home/HomeCTABand";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <PageLayout>
      <HomeMotionShell>
        <div>
          <Hero />
          <DualMarquee />
          <div className="home-defer">
            <ServicesPreview />
          </div>
          <div className="home-defer">
            <About />
            <HomeManifesto />
          </div>
          <div className="home-defer">
            <WhyChoose />
            <Stack />
            <PinnedProjects />
          </div>
          <div className="home-defer">
            <Blog />
            <FAQ />
            <HomeCTABand />
            <Contact />
          </div>
        </div>
      </HomeMotionShell>
    </PageLayout>
  );
}
