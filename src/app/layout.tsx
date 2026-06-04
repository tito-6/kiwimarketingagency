import type { Metadata } from "next";
import { Geist_Mono, Syne } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kiwi Agency | Dijital Pazarlama Ajansı",
    template: "%s | Kiwi Agency",
  },
  description:
    "Markaların dijital dünyada güçlenmesi için yaratıcı çözümler üreten Kiwi Agency. Kreatif tasarım, dijital pazarlama, sosyal medya, web yazılım ve SEO.",
  keywords: [
    "dijital pazarlama",
    "kreatif tasarım",
    "sosyal medya",
    "SEO",
    "web yazılım",
    "İstanbul",
    "marketing agency",
  ],
  authors: [{ name: "Kiwi Agency" }],
  openGraph: {
    title: "Kiwi Agency | Dijital Pazarlama Ajansı",
    description:
      "Markalarınıza değer katmak için yaratıcı dijital çözümler sunuyoruz.",
    type: "website",
    locale: "tr_TR",
    siteName: "Kiwi Agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiwi Agency",
    description: "Dijital pazarlama, tasarım ve yazılım ajansı.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${syne.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#1a1a1a] text-white antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
