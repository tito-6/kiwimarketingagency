/**
 * Lightweight route smoke test against a running Next.js server.
 * Usage: node scripts/smoke-routes.mjs [baseUrl]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../src/data/service-pages.json"), "utf8")
);

const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");

const servicePaths = [];
for (const category of data.categories) {
  servicePaths.push(category.url);
  for (const service of category.services) servicePaths.push(service.url);
}

const paths = [
  "/",
  "/iletisim",
  "/blog",
  "/hizmetler",
  "/sitemap.xml",
  "/robots.txt",
  ...servicePaths,
];

const redirectChecks = [
  { path: "/projeler", expectLocationIncludes: "/" },
  {
    path: "/kurumsal-kimlik-tasarimi",
    expectLocationIncludes: "/kreatif-tasarim-ajansi/kurumsal-kimlik-tasarimi",
  },
];

async function checkPath(routePath) {
  const res = await fetch(`${base}${routePath}`, { redirect: "manual" });
  const status = res.status;
  const location = res.headers.get("location") || "";
  let html = "";
  if (status >= 200 && status < 300) html = await res.text();
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [, ""])[1];
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ""])[1]
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return { path: routePath, status, title, h1, location };
}

const failures = [];
const titles = new Map();

console.log(`Smoke testing ${paths.length} routes against ${base}`);

for (const routePath of paths) {
  try {
    const result = await checkPath(routePath);
    const ok = result.status >= 200 && result.status < 300;
    if (!ok) {
      failures.push(`${routePath} -> HTTP ${result.status}`);
      console.log(`FAIL ${routePath} ${result.status}`);
      continue;
    }
    if (routePath !== "/sitemap.xml" && routePath !== "/robots.txt") {
      if (!result.title) failures.push(`${routePath} missing title`);
      if (!result.h1) failures.push(`${routePath} missing h1`);
      if (result.title) {
        const prev = titles.get(result.title);
        if (prev && prev !== routePath) {
          failures.push(`duplicate title: ${result.title} (${prev} & ${routePath})`);
        }
        titles.set(result.title, routePath);
      }
    }
    console.log(`OK   ${routePath} [${result.status}] ${result.title.slice(0, 70)}`);
  } catch (err) {
    failures.push(`${routePath} -> ${err.message}`);
    console.log(`ERR  ${routePath} ${err.message}`);
  }
}

for (const item of redirectChecks) {
  try {
    const result = await checkPath(item.path);
    const redirected = result.status >= 300 && result.status < 400;
    const locOk = result.location.includes(item.expectLocationIncludes);
    if (!redirected || !locOk) {
      failures.push(
        `${item.path} redirect failed (status=${result.status}, location=${result.location})`
      );
      console.log(`FAIL redirect ${item.path}`);
    } else {
      console.log(`OK   redirect ${item.path} -> ${result.location}`);
    }
  } catch (err) {
    failures.push(`${item.path} redirect -> ${err.message}`);
  }
}

if (failures.length) {
  console.error("\nFailures:");
  for (const f of failures) console.error("-", f);
  process.exit(1);
}

console.log(`\nAll checks passed (${paths.length} routes + redirects).`);
