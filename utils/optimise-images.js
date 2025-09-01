// optimizeImages.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Config
const galleryDir = path.join(__dirname, "new-website-images");
const outputDir = path.join(galleryDir, "optimized");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Allowed inputs (add HEIC/HEIF if your libvips supports it)
const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"]);

(async () => {
  const files = fs
    .readdirSync(galleryDir)
    .filter(f => allowed.has(path.extname(f).toLowerCase()));

  // Process in parallel and wait for all to finish
  await Promise.all(
    files.map(async (file) => {
      const ext = path.extname(file).toLowerCase();
      const basename = path.basename(file, ext);
      const inputPath = path.join(galleryDir, file);
      const outputPath = path.join(outputDir, `${basename}.jpg`); // normalize to .jpg

      try {
        await sharp(inputPath)
          .rotate() // <-- FIX: autorotate based on EXIF
          .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 75, mozjpeg: true })
          .toFile(outputPath);

        console.log(`✅ Optimized (oriented): ${file} → ${basename}.jpg`);
      } catch (err) {
        console.error(`❌ Error optimizing ${file}:`, err);
      }
    })
  );
})();
