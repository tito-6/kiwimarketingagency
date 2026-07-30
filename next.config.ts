import type { NextConfig } from "next";
import { shortRedirects } from "./src/data/service-pages";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: "/projeler",
        destination: "/",
        permanent: true,
      },
      {
        source: "/projeler/:path*",
        destination: "/",
        permanent: true,
      },
      ...shortRedirects.map((item) => ({
        source: item.source,
        destination: item.destination,
        permanent: true,
      })),
    ];
  },
  headers: async () => [
    {
      source: "/videos/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/images/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],
};

export default nextConfig;
