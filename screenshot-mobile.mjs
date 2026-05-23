import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const url = process.argv[2];
const label = process.argv[3] || "mobile";

if (!url) {
  console.error("Usage: node screenshot-mobile.mjs <url> [label]");
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
const num = maxNum + 1;
const filepath = path.join(dir, `screenshot-${num}-${label}.png`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
// iPhone 14 Pro-ish viewport
await page.setViewport({
  width: 393,
  height: 852,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
// Allow framer-motion intro animation to finish
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: filepath, fullPage: false });
await browser.close();

console.log(filepath);
