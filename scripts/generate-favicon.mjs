import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

const SOURCE = "public/images/logo-transparent.png";
const OUT = "app/favicon.ico";

const sizes = [16, 32, 48];

const buildIcoEntry = (png, size, offset) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  return entry;
};

const main = async () => {
  const pngs = await Promise.all(
    sizes.map((size) =>
      sharp(SOURCE)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer(),
    ),
  );

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);

  const entriesStart = 6;
  const dataStart = entriesStart + 16 * sizes.length;

  let offset = dataStart;
  const entries = pngs.map((png, idx) => {
    const entry = buildIcoEntry(png, sizes[idx], offset);
    offset += png.length;
    return entry;
  });

  const ico = Buffer.concat([header, ...entries, ...pngs]);

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, ico);

  console.log(
    `Wrote ${OUT} (${ico.length} bytes, sizes: ${sizes.join("x, ")}x)`,
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
