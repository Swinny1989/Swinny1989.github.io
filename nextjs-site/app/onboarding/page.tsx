import type { Metadata } from "next";
import OnboardingForm from "./OnboardingForm";

export const metadata: Metadata = {
  title: "Dog Registration Form | Katie's K9s",
  description:
    "Complete your dog's registration form for Katie's K9s dog boarding and day care in Congleton, Cheshire.",
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#3D5A3E] mb-4">
          Registration Form
        </h1>
        <p className="text-[#6B6560] text-lg max-w-xl mx-auto">
          Welcome to Katie&apos;s K9s. Please complete all sections — your progress
          is automatically saved so you can pick up where you left off.
        </p>
      </div>

      <OnboardingForm />
    </div>
  );
}
