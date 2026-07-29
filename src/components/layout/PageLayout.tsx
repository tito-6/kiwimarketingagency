"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SideNav } from "@/components/layout/SideNav";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { useLiteMotion } from "@/lib/motion";

export function PageLayout({ children }: { children: React.ReactNode }) {
  const lite = useLiteMotion();

  return (
    <>
      <div className="min-w-0 overflow-x-hidden">
        {!lite && <ScrollProgress />}
        <Header />
        {!lite && <SideNav />}
        <main className="min-w-0 overflow-x-hidden">{children}</main>
        <Footer />
      </div>
      <WhatsAppFloat />
    </>
  );
}
