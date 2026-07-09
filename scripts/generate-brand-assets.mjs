import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

// --- favicon.ico + apple-icon.png from src/app/icon.svg ---

const iconSvg = await readFile("src/app/icon.svg");

async function renderPng(size) {
  return sharp(iconSvg, { density: 300 }).resize(size, size).png().toBuffer();
}

// ICO container with embedded PNGs (supported by all modern browsers)
function buildIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + 16 * count;
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size === 256 ? 0 : size, 0); // width
    e.writeUInt8(size === 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += buf.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
}

const sizes = [16, 32, 48];
const pngs = [];
for (const size of sizes) {
  pngs.push({ size, buf: await renderPng(size) });
}
await writeFile("src/app/favicon.ico", buildIco(pngs));
console.log("favicon.ico written (16/32/48)");

await writeFile("src/app/apple-icon.png", await renderPng(180));
console.log("apple-icon.png written (180x180)");

// --- OG image 1200x630 ---

// Kiwi logotype paths from Logo.svg (viewBox 0 0 754.6 149.89)
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1a1a1a"/>
  <rect x="0" y="0" width="1200" height="8" fill="#a9cb18"/>
  <g transform="translate(260, 210) scale(0.9)" fill="#ffffff">
    <polygon points="676.38 2.19 601.68 149.8 563.43 149.89 511.36 46.3 456.2 149.81 418.19 149.82 343.47 1.66 381.63 1.7 437.58 113.94 496.54 2.06 527.21 2.05 582.33 114.37 638.87 2.04 676.38 2.19"/>
    <polygon points="119.18 61.91 200.54 149.76 152.01 149.82 91.48 83.15 34.45 129.5 34.3 149.8 0 149.71 .06 0 34.3 .16 34.42 87.93 85.84 46.89 142.38 .94 195.37 1.02 119.18 61.91"/>
    <rect x="190.08" y="58.05" width="148.64" height="34.98" transform="translate(188.76 339.91) rotate(-89.98)"/>
    <rect x="719.65" y="1.87" width="34.95" height="147.98"/>
  </g>
  <rect x="260" y="400" width="60" height="6" fill="#a9cb18"/>
  <text x="260" y="452" font-family="Arial, Helvetica, sans-serif" font-size="34" letter-spacing="6" fill="#a9cb18">DİJİTAL PAZARLAMA AJANSI</text>
  <text x="260" y="505" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="2" fill="#8a8a8a">kiwimarketingagency.com</text>
</svg>`;

const og = await sharp(Buffer.from(ogSvg)).resize(1200, 630).png().toBuffer();
await writeFile("public/og-image.png", og);
const meta = await sharp(og).metadata();
console.log(`og-image.png written (${meta.width}x${meta.height}, ${(og.length / 1024).toFixed(0)} KB)`);
