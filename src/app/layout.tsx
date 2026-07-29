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
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kiwi Agency — Dijital Pazarlama Ajansı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiwi Agency",
    description: "Dijital pazarlama, tasarım ve yazılım ajansı.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
            __html: `(function(){try{var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduce)document.documentElement.classList.add("lite-motion");}catch(e){}})();`,
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
