/**
 * Placeholder generator — only for projects without a real thumbnail yet.
 * All current portfolio projects ship custom assets under public/projects/.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public", "projects");

const placeholders = [
  { folder: "duty-hour", color: "#FF006E", skip: true },
  { folder: "yoga-with-jen", color: "#7C3AED", skip: true },
  { folder: "doctor-appointment", color: "#22C55E", skip: true },
  { folder: "autoworld", color: "#7C3AED", skip: true },
  { folder: "cabwire", color: "#C9A227", skip: true },
  { folder: "mapc", color: "#84CC16", skip: true },
];

for (const { folder, color, skip } of placeholders) {
  if (skip) {
    console.log(`Skipped ${folder} (custom thumbnail)`);
    continue;
  }

  const dir = path.join(publicDir, folder);
  fs.mkdirSync(dir, { recursive: true });

  const output = path.join(dir, "thumbnail.webp");
  const width = 1920;
  const height = 1080;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.45"/>
          <stop offset="45%" stop-color="#0a0a0a" stop-opacity="1"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.25"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .webp({ quality: 90 })
    .toFile(output);

  console.log(`Created ${path.relative(root, output)}`);
}
