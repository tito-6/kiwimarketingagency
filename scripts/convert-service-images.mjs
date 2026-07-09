import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "C:/Users/sheha/Downloads/drive-download-20260709T122448Z-2-001";
const OUT = path.resolve("public/images/services");

// source file -> SEO-friendly output name
const map = {
  "dijitalpazarlama_800x1000.jpg": "dijital-pazarlama-ajansi-hizmeti.webp",
  "dijitalpazarlama_800x1200.jpg": "dijital-pazarlama-ajansi-hizmeti-dikey.webp",
  "kreatif_800x1000.jpg": "kreatif-tasarim-hizmeti.webp",
  "kreatif_800x1200.jpg": "kreatif-tasarim-hizmeti-dikey.webp",
  "seo_800x1000.jpg": "seo-optimizasyonu-hizmeti.webp",
  "se0_800x1200.jpg": "seo-optimizasyonu-hizmeti-dikey.webp",
  "sosyalmedya_800x1000.jpg": "sosyal-medya-yonetimi-hizmeti.webp",
  "sosyalmedya_800x1200.jpg": "sosyal-medya-yonetimi-hizmeti-dikey.webp",
  "webascii_800x1000.jpg": "web-yazilim-gelistirme-hizmeti.webp",
  "webascii_800x1200.jpg": "web-yazilim-gelistirme-hizmeti-dikey.webp",
};

await mkdir(OUT, { recursive: true });

for (const [src, out] of Object.entries(map)) {
  const input = path.join(SRC, src);
  const output = path.join(OUT, out);
  const info = await sharp(input)
    .rotate() // respect EXIF orientation
    .webp({ quality: 80, effort: 6 })
    .toFile(output);
  console.log(`${out}: ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}
