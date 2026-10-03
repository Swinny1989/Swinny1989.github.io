import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registration Received | Katie's K9s",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="text-6xl mb-6">🐾</div>
      <h1 className="font-serif text-4xl text-[#3D5A3E] mb-4">
        Registration Received
      </h1>
      <p className="text-[#6B6560] text-lg mb-8">
        Thank you for registering with Katie&apos;s K9s. We&apos;ll review your
        information and be in touch soon to discuss next steps.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#3D5A3E] hover:bg-[#2C4230] text-white font-medium px-8 py-3 rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
