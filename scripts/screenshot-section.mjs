// Screenshot a specific section by scrolling to its index (in viewport heights).
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const [url, sectionSelector, label = "section"] = process.argv.slice(2);
if (!url || !sectionSelector) {
  console.error("Usage: node scripts/screenshot-section.mjs <url> <selector> [label] [mobile|desktop]");
  process.exit(1);
}
const isMobile = process.argv[5] === "mobile";

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
if (isMobile) {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true });
} else {
  await page.setViewport({ width: 1280, height: 800 });
}
await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));
await page.evaluate((sel) => {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
}, sectionSelector);
await new Promise((r) => setTimeout(r, 1000));
await page.screenshot({ path: filepath, fullPage: false });
await browser.close();
console.log(filepath);
