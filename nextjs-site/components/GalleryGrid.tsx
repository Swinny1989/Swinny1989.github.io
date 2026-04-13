"use client";

import { useState } from "react";

const INITIAL_COUNT = 20;

type GalleryImage = { src: string; alt: string };

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [count, setCount] = useState(INITIAL_COUNT);
  const visible = images.slice(0, count);
  const hasMore = count < images.length;

  const col1 = visible.filter((_, i) => i % 2 === 0);
  const col2 = visible.filter((_, i) => i % 2 === 1);

  return (
    <>
      <div className="flex gap-3 sm:gap-4">
        {[col1, col2].map((col, ci) => (
          <div key={ci} className="flex flex-col gap-3 sm:gap-4 flex-1">
            {col.map((img, i) => (
              <div key={img.src} className="relative w-full overflow-hidden rounded-xl shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={ci === 0 && i < 3 ? "eager" : "lazy"}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={() => setCount((c) => c + 20)}
            className="inline-block border-2 border-[#3D5A3E] text-[#3D5A3E] hover:bg-[#3D5A3E] hover:text-white font-medium px-8 py-3 rounded-full transition-colors"
          >
            Load more photos
          </button>
        </div>
      )}
    </>
  );
}
