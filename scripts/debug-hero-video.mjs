import { chromium } from "playwright-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = process.env.URL ?? "http://localhost:3002/";

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: [],
});

const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: process.env.REDUCED === "1" ? "reduce" : "no-preference",
});

const consoleMessages = [];
page.on("console", (msg) => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
page.on("pageerror", (err) => consoleMessages.push(`[pageerror] ${err.message}`));
page.on("requestfailed", (req) =>
  consoleMessages.push(`[requestfailed] ${req.url()} ${req.failure()?.errorText}`)
);

await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(5000);

const state = await page.evaluate(() => {
  const videos = [...document.querySelectorAll("video")];
  return videos.map((v) => {
    const rect = v.getBoundingClientRect();
    const style = getComputedStyle(v);
    return {
      src: v.currentSrc || v.src,
      paused: v.paused,
      readyState: v.readyState,
      networkState: v.networkState,
      currentTime: v.currentTime,
      error: v.error ? { code: v.error.code, message: v.error.message } : null,
      muted: v.muted,
      autoplay: v.autoplay,
      rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
      display: style.display,
      visibility: style.visibility,
      opacity: style.opacity,
      parentOpacity: v.parentElement ? getComputedStyle(v.parentElement).opacity : null,
      grandParentOpacity: v.parentElement?.parentElement
        ? getComputedStyle(v.parentElement.parentElement).opacity
        : null,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  });
});

console.log("VIDEO STATE:", JSON.stringify(state, null, 2));
console.log("CONSOLE:", consoleMessages.slice(0, 50).join("\n") || "(none)");

await page.screenshot({ path: "scripts/hero-debug.png" });
await page.waitForTimeout(3000);
await page.screenshot({ path: "scripts/hero-debug-2.png" });

await browser.close();
