import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { IletisimMotionShell } from "@/components/iletisim/IletisimMotionShell";
import { IletisimHero } from "@/components/iletisim/IletisimHero";
import { IletisimChannels } from "@/components/iletisim/IletisimChannels";
import { IletisimForm } from "@/components/iletisim/IletisimForm";
import { IletisimProcess } from "@/components/iletisim/IletisimProcess";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Kiwi Agency ile iletişime geçin. +90 532 630 57 13 — dijital pazarlama, tasarım ve web projeleriniz için.",
};

export default function IletisimPage() {
  return (
    <PageLayout>
      <IletisimMotionShell>
        <main>
          <IletisimHero />
          <IletisimChannels />
          <IletisimForm />
          <IletisimProcess />
        </main>
      </IletisimMotionShell>
    </PageLayout>
  );
}
