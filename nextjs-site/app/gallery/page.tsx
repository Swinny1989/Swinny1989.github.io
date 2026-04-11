import type { Metadata } from "next";
import galleryData from "@/content/gallery.json";

export const metadata: Metadata = {
  title: "Gallery – Katie's K9s",
  description: "Photos of the happy dogs staying at Katie's K9s in Congleton, Cheshire.",
};

export default function Gallery() {
  const images = galleryData.images;

  // Split into 2 columns for masonry effect
  const col1 = images.filter((_, i) => i % 2 === 0);
  const col2 = images.filter((_, i) => i % 2 === 1);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#3D5A3E] mb-6">Gallery</h1>
        <p className="text-[#6B6560] text-lg max-w-xl mx-auto">
          A glimpse into the happy days your dog will enjoy at Katie&apos;s K9s.
        </p>
      </div>

      <div className="flex gap-3 sm:gap-4">
        {[col1, col2].map((col, ci) => (
          <div key={ci} className="flex flex-col gap-3 sm:gap-4 flex-1">
            {col.map((img, i) => (
              <div key={i} className="relative w-full overflow-hidden rounded-xl shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i < 4 ? "eager" : "lazy"}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
