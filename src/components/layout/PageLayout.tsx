import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SideNav } from "@/components/layout/SideNav";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-0 overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <SideNav />
      <main className="min-w-0">{children}</main>
      <Footer />
    </div>
  );
}
