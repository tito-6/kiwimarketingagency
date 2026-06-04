import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Kiwi Agency gizlilik politikası ve KVKK bilgilendirmesi.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title={privacyPolicy.title}
      updated={privacyPolicy.updated}
      sections={privacyPolicy.sections}
    />
  );
}
