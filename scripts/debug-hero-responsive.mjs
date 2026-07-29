import { chromium } from "playwright-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = process.env.URL ?? "http://localhost:3002/";

const viewports = [
  { name: "mobile-390", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "mobile-360", width: 360, height: 740, isMobile: true, hasTouch: true },
  { name: "tablet-768", width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "ultrawide-2560", width: 2560, height: 1080 },
];

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.hasTouch ?? false,
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(4000);

  const state = await page.evaluate(() => {
    const v = document.querySelector("#home video");
    if (!v) return null;
    const r = v.getBoundingClientRect();
    const hero = document.querySelector("#home").getBoundingClientRect();
    return {
      src: (v.currentSrc || v.src).split("/").pop(),
      paused: v.paused,
      readyState: v.readyState,
      videoRect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      heroRect: { w: Math.round(hero.width), h: Math.round(hero.height) },
      viewport: { w: innerWidth, h: innerHeight },
    };
  });
  console.log(vp.name, JSON.stringify(state));

  await page.screenshot({ path: `scripts/hero-${vp.name}.png` });
  await context.close();
}

await browser.close();
