import { PageLayout } from "@/components/layout/PageLayout";
import { HomeMotionShell } from "@/components/home/HomeMotionShell";
import { Hero } from "@/components/sections/Hero";
import { DualMarquee } from "@/components/ui/DualMarquee";
import { HomeShowreel } from "@/components/home/HomeShowreel";
import { About } from "@/components/sections/About";
import { HomeManifesto } from "@/components/home/HomeManifesto";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Stack } from "@/components/sections/Stack";
import { PinnedProjects } from "@/components/ui/PinnedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
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
          <ServicesPreview />
          <About />
          <HomeManifesto />
          <HomeShowreel />
          <WhyChoose />
          <Stack />
          <PinnedProjects />
          <Testimonials />
          <Blog />
          <FAQ />
          <HomeCTABand />
          <Contact />
        </div>
      </HomeMotionShell>
    </PageLayout>
  );
}
