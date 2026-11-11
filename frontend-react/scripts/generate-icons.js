/**
 * LogiCycle — Generate PWA PNG icons from logo.svg
 * Run: node scripts/generate-icons.js
 * Requires: npm install -D sharp
 */

import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SVG_PATH = path.join(ROOT, "public", "logo.svg");
const ICONS_DIR = path.join(ROOT, "public", "icons");

async function main() {
  await fs.mkdir(ICONS_DIR, { recursive: true });
  const svgBuffer = await fs.readFile(SVG_PATH);

  const targets = [
    { name: "icon-192.png", size: 192, padding: 0 },
    { name: "icon-512.png", size: 512, padding: 0 },
    // Maskable: 80% safe zone — content padded inside
    { name: "icon-maskable.png", size: 512, padding: 0.1 },
  ];

  for (const { name, size, padding } of targets) {
    const outPath = path.join(ICONS_DIR, name);

    if (padding > 0) {
      // Add padding by compositing on a background
      const innerSize = Math.round(size * (1 - padding * 2));
      const offset = Math.round((size - innerSize) / 2);
      const inner = await sharp(svgBuffer).resize(innerSize, innerSize).png().toBuffer();

      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 5, g: 31, b: 21, alpha: 1 },
        },
      })
        .composite([{ input: inner, top: offset, left: offset }])
        .png()
        .toFile(outPath);
    } else {
      await sharp(svgBuffer).resize(size, size).png().toFile(outPath);
    }

    const stat = await fs.stat(outPath);
    console.log(`✅ ${name} (${size}×${size}, ${stat.size} bytes)`);
  }

  console.log("\n🎉 All icons generated in public/icons/");
}

main().catch((err) => {
  console.error("❌ Icon generation failed:", err);
  process.exit(1);
});