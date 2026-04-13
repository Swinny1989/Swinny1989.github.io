import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const GALLERY_DIR = new URL("../public/images/gallery", import.meta.url).pathname;
const MAX_WIDTH = 1200;
const QUALITY = 80;
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"];

const files = await readdir(GALLERY_DIR);

let count = 0;
for (const file of files) {
  const ext = "." + file.split(".").pop();
  if (!EXTENSIONS.includes(ext)) continue;

  const filePath = join(GALLERY_DIR, file);
  const { size } = await stat(filePath);

  // Skip files already under 200KB
  if (size < 200 * 1024) continue;

  const image = sharp(filePath).rotate(); // auto-rotate based on EXIF orientation
  const meta = await image.metadata();

  // Skip if already small enough
  if (meta.width && meta.width <= MAX_WIDTH) {
    await image.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer().then(async (buf) => {
      if (buf.length < size) {
        const { writeFile } = await import("fs/promises");
        await writeFile(filePath, buf);
        console.log(`Compressed: ${file} (${(size / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB)`);
        count++;
      }
    });
  } else {
    const buf = await image
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();
    const { writeFile } = await import("fs/promises");
    await writeFile(filePath, buf);
    console.log(`Resized+compressed: ${file} (${(size / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB)`);
    count++;
  }
}

console.log(`\nDone. ${count} image(s) optimised.`);
