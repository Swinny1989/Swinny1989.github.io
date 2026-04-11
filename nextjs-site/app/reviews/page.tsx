import type { Metadata } from "next";
import Link from "next/link";
import reviewsData from "@/content/reviews.json";

export const metadata: Metadata = {
  title: "Reviews – Katie's K9s",
  description: "Read what our customers say about Katie's K9s dog boarding and day care in Congleton.",
};

export default function Reviews() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#3D5A3E] mb-4">Reviews</h1>
        <p className="text-[#6B6560] text-lg">
          Don&apos;t just take our word for it — here&apos;s what our customers say.
        </p>
      </div>

      <div className="space-y-6">
        {reviewsData.reviews.map(({ title, body, author }) => (
          <div
            key={author}
            className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-8"
          >
            {title && (
              <h3 className="font-serif text-lg text-[#3D5A3E] mb-3">{title}</h3>
            )}
            <div className="space-y-3">
              {body.split("\n\n").map((para, i) => (
                <p key={i} className="text-[#6B6560] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold text-[#8B7355]">— {author}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/contact"
          className="inline-block bg-[#3D5A3E] hover:bg-[#2C4230] text-white font-medium px-8 py-3 rounded-full transition-colors"
        >
          Book a stay
        </Link>
      </div>
    </div>
  );
}
