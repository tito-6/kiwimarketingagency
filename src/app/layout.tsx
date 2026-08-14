import type { Metadata } from "next";
import { Geist_Mono, Syne } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/components/seo/JsonLd";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-B5K344HP8G";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-M473PR6W";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kiwimarketingagency.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kiwi Agency | İstanbul Anadolu Yakası Dijital Pazarlama Ajansı",
    template: "%s | Kiwi Agency",
  },
  description:
    "İstanbul Anadolu Yakası dijital pazarlama ajansı. Kadıköy, Ataşehir, Maltepe ve çevresinde sosyal medya, Google Ads, Meta Ads, SEO–GEO, kreatif ve web yazılım.",
  keywords: [
    "İstanbul dijital pazarlama ajansı",
    "Anadolu Yakası dijital pazarlama",
    "Kadıköy sosyal medya ajansı",
    "Ataşehir dijital pazarlama ajansı",
    "Maltepe reklam ajansı",
    "sosyal medya yönetimi",
    "Google Ads",
    "Meta Ads",
    "SEO GEO",
    "kreatif tasarım",
    "web yazılım",
    "Kiwi Marketing Agency",
  ],
  authors: [{ name: "Kiwi Marketing Agency" }],
  creator: "Kiwi Marketing Agency",
  publisher: "Kiwi Marketing Agency",
  category: "marketing",
  openGraph: {
    title: "Kiwi Agency | İstanbul Anadolu Yakası Dijital Pazarlama Ajansı",
    description:
      "Kadıköy’den Ataşehir’e Anadolu Yakası markaları için sosyal medya, performans reklamı, SEO ve kreatif büyüme.",
    type: "website",
    locale: "tr_TR",
    siteName: "Kiwi Marketing Agency",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kiwi Agency — İstanbul Anadolu Yakası Dijital Pazarlama Ajansı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiwi Agency | İstanbul Dijital Pazarlama Ajansı",
    description:
      "Anadolu Yakası odaklı dijital pazarlama, sosyal medya, SEO ve kreatif ajans.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
    },
  },
  verification: {
    google: "onS2Dx5D4PhB0GCESXKUotBv-DTpEcVxt54Vcm79dhE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${syne.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var ua=navigator.userAgent;var ios=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);var safari=/Safari/i.test(ua)&&!/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/i.test(ua);var save=navigator.connection&&navigator.connection.saveData;if(reduce||ios||safari||save)document.documentElement.classList.add("lite-motion");}catch(e){}})();`,
          }}
        />
        {/* Google Tag Manager — as high in <head> as possible */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* Google tag (gtag.js) — G-B5K344HP8G */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </head>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {/* Google Tag Manager (noscript) — immediately after <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
