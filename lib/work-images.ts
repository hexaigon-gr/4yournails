import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import sharp from "sharp";
import type { PinterestImage } from "@/components/pinterest-grid";

const WORK_DIR = path.join(process.cwd(), "public/images/work");
const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

export const getWorkImages = cache(async (): Promise<PinterestImage[]> => {
  const files = fs
    .readdirSync(WORK_DIR)
    .filter((f) => IMAGE_RE.test(f))
    .sort();

  return Promise.all(
    files.map(async (file) => {
      const meta = await sharp(path.join(WORK_DIR, file)).metadata();
      return {
        src: `/images/work/${file}`,
        alt: "4 Your Nails — nail design",
        width: meta.width ?? 1080,
        height: meta.height ?? 1350,
      };
    })
  );
});
