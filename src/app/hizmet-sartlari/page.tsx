import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsOfService } from "@/data/legal";

export const metadata: Metadata = {
  title: "Hizmet Şartları",
  description: "Kiwi Agency hizmet şartları ve kullanım koşulları.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title={termsOfService.title}
      updated={termsOfService.updated}
      sections={termsOfService.sections}
    />
  );
}
