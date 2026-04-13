import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Book Dog Boarding in Congleton | Katie's K9s",
  description:
    "Find out how to book home dog boarding or day care at Katie's K9s in Congleton, Cheshire. Simple 5-step process from enquiry to booking confirmation.",
};

const bookingSteps = [
  {
    number: "01",
    title: "Initial Enquiry",
    body: "Your journey starts by getting in touch, via WhatsApp, email or text message, to tell us a little about your dog and the type of care you are looking for. This helps us understand their personality, routine and needs, and allows us to check availability for your requested dates.",
  },
  {
    number: "02",
    title: "Meet & Greet",
    body: "Before any bookings are made, we arrange a meet and greet in our home. This gives you and your dog the opportunity to visit, explore the environment and get to know us. It also allows us to see how your dog settles in the space and helps them to feel comfortable and happy here.",
  },
  {
    number: "03",
    title: "Registration",
    body: "If we feel that we may be a good fit, you will be asked to complete our registration form. This acts as an A–Z guide to your dog and includes important information about their routine, personality, feeding schedule, exercise needs, behaviour and anything else that helps us care for them effectively.",
    extra: [
      "At this stage we will also ask for:",
      "A copy of your dog's vaccination certificate",
      "Evidence that they are up to date with flea and worming treatments",
      "This information ensures we can maintain a safe and healthy environment for all dogs in our care.",
    ],
  },
  {
    number: "04",
    title: "Trial Session",
    body: "All dogs will attend a trial visit before their first stay with us, and any dogs joining us for home boarding will complete an overnight trial beforehand. These trials are an important part of helping your dog feel comfortable and confident in our home.",
    paragraphs: [
      "During the trial, your dog has the opportunity to become familiar with our home and the rest of the family. We also carry out gentle introductions with the other dogs in our care so we can ensure everyone gets along well.",
      "The trial allows us to make sure your dog feels happy and settled away from home, is comfortable eating and sleeping here, and enjoys the company of the other dogs. It also helps us understand their personality and how they fit within our small group.",
      "These trials are incredibly important to us, as we take great care to match dogs who will get along and thrive together. By doing this, we are able to maintain the calm, safe and content environment that makes Katie's K9s such a special place for every dog in our care.",
    ],
  },
  {
    number: "05",
    title: "Booking Confirmation",
    body: "Once the trial has gone well and everyone is happy, we can confirm your booking by taking a small non-refundable deposit to reserve your dog's stay with us. Then there's nothing left to do except pack their bags, bring their favourite toy, and get ready for their little holiday in their home-from-home.",
  },
];

export default function HowToBook() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#3D5A3E] mb-6">How to Book</h1>
        <p className="text-[#6B6560] text-lg max-w-xl mx-auto">
          We want every dog that stays with us to feel safe, relaxed and right at home, which is
          why we follow a simple process to make sure Katie&apos;s K9s is the right fit for both
          you and your dog.
        </p>
      </div>

      {/* Booking steps */}
      <div className="space-y-6 mb-16">
        {bookingSteps.map((step) => (
          <div key={step.number} className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-8 flex gap-5">
            <div className="font-serif text-3xl font-bold text-[#C8956C] shrink-0 w-10">{step.number}</div>
            <div>
              <h2 className="font-serif text-xl text-[#3D5A3E] mb-2">{step.title}</h2>
              <p className="text-[#6B6560] leading-relaxed">{step.body}</p>
              {step.paragraphs && (
                <div className="mt-3 space-y-3">
                  {step.paragraphs.map((p, i) => (
                    <p key={i} className="text-[#6B6560] leading-relaxed">{p}</p>
                  ))}
                </div>
              )}
              {step.extra && (
                <div className="mt-3 space-y-2">
                  <p className="text-[#6B6560]">{step.extra[0]}</p>
                  <ul className="space-y-1 ml-4">
                    {step.extra.slice(1, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[#6B6560]">
                        <span className="text-[#3D5A3E] mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#6B6560]">{step.extra[3]}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-[#6B6560] text-lg mb-6">
          Secure your dog&apos;s stay today!
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#3D5A3E] hover:bg-[#2C4230] text-white font-medium px-8 py-3 rounded-full transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
