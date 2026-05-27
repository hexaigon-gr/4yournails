// Mobile-viewport screenshot (iPhone-ish: 390x844 @ DPR 3) for verifying the mobile hero.
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const url = process.argv[2];
const label = process.argv[3] || "mobile";

if (!url) {
  console.error("Usage: node scripts/screenshot-mobile.mjs <url> [label]");
  process.exit(1);
}

const dir = "screenshots";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const existing = fs.readdirSync(dir).filter((f) => f.startsWith("screenshot-"));
let maxNum = 0;
for (const f of existing) {
  const m = f.match(/^screenshot-(\d+)/);
  if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
}
const filepath = path.join(dir, `screenshot-${maxNum + 1}-${label}.png`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true });
await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: filepath, fullPage: false });
await browser.close();

console.log(filepath);
