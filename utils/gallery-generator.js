// generateGallery.js
const fs = require("fs");
const path = require("path");

// Configuration
const galleryDir = path.join(__dirname, "new-website-images");

// List of images already in your original HTML
const existingImages = [
  "IMG_1.jpg",
  "2.jpeg",
  "IMG_2.jpg",
  "IMG_3.jpg",
  "IMG_4.jpg",
  "IMG_7.jpg",
  "8.jpeg",
  "21.jpeg",
  "11.jpeg",
  "IMG_9.jpg",
  "22.jpeg",
  "IMG_10.jpg",
  "IMG_11.jpg",
];

// Read all files in gallery dir
const allFiles = fs.readdirSync(galleryDir).filter(file =>
  /\.(jpg|jpeg|png|gif)$/i.test(file)
);

// Combine: everything from disk, ensuring originals are included
const uniqueImages = Array.from(new Set([...existingImages, ...allFiles]));

// Sort for consistency
uniqueImages.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

// Number of columns = same as original (4)
const numColumns = 4;

// Redistribute ALL images evenly across columns
const columns = Array.from({ length: numColumns }, () => []);
uniqueImages.forEach((img, index) => {
  const colIndex = index % numColumns;
  columns[colIndex].push(img);
});

// Generate HTML
let html = `<div class="row">\n`;
columns.forEach(col => {
  html += `    <div class="column">\n`;
  col.forEach(img => {
    html += `        <img src="./resources/images/gallery/${img}" alt="Katie and lily">\n`;
  });
  html += `    </div>\n`;
});
html += `</div>`;

console.log(html);
