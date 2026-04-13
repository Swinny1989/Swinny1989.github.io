import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import galleryData from "@/content/gallery.json";

export const metadata: Metadata = {
  title: "Gallery – Dog Boarding Congleton | Katie's K9s",
  description: "See photos of the happy dogs enjoying their stay at Katie's K9s home dog boarding and day care in Congleton, Cheshire.",
};

export default function Gallery() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#3D5A3E] mb-6">Gallery</h1>
        <p className="text-[#6B6560] text-lg max-w-xl mx-auto">
          A glimpse into the happy days your dog will enjoy at Katie&apos;s K9s
        </p>
      </div>
      <GalleryGrid images={galleryData.images} />
    </div>
  );
}
