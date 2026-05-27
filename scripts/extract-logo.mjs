// Upscale the existing transparent logo PNG to a higher resolution so the
// rendered hero logo stays crisp on retina/high-DPI mobile screens.
// Uses sharp's lanczos3 kernel which preserves hard edges in flat illustrations.
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("public/images/logo-transparent.png");
const OUT = path.resolve("public/images/logo-hd.png");

const TARGET_WIDTH = 1200; // 4.6x the original 259px source

const meta = await sharp(SRC).metadata();
console.log("source:", meta.width, "x", meta.height);

await sharp(SRC)
  .resize({
    width: TARGET_WIDTH,
    kernel: sharp.kernel.lanczos3,
    withoutEnlargement: false,
  })
  .png({ compressionLevel: 9, palette: false })
  .toFile(OUT);

const outMeta = await sharp(OUT).metadata();
console.log("output:", outMeta.width, "x", outMeta.height, "→", OUT);
