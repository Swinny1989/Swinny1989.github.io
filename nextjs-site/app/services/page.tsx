import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services – Katie's K9s",
  description:
    "Home dog boarding and day care services in Congleton, Cheshire. Licensed, insured and DBS checked.",
};

const services = [
  {
    icon: "/images/pet-shelter.png",
    iconAlt: "Home boarding icon",
    title: "Home Dog Boarding",
    description:
      "A home from home for your beloved dog on the outskirts of Congleton, bordering the Cheshire countryside. They'll be welcomed and cared for in our family home with an enclosed garden and beautiful walks personalised to their needs.",
    pricing: [
      { label: "Per night (up to 24 hours)", price: "£45" },
      { label: "Per night (stays of 7+ days)", price: "£40" },
    ],
    additionalPricing: {
      heading: "Additional dogs from the same household",
      items: [
        { label: "Per night (up to 24 hours)", price: "£35" },
        { label: "Per night (stays of 7+ days)", price: "£30" },
      ],
    },
    note: "Additional charges apply for puppies under 12 months.",
  },
  {
    icon: "/images/dog-house.png",
    iconAlt: "Day care icon",
    title: "Day Care",
    description:
      "Whether you have a long day in the office or some exciting social plans, rest assured your furry family member will be welcomed into our home for a day filled with enrichment, stimulation and countryside walks.",
    pricing: [{ label: "Up to 10 hours (8am – 6pm)", price: "£30" }],
    note: "Additional charges apply for puppies under 12 months.",
  },
];

export default function Services() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#3D5A3E] mb-4">
          Our Services
        </h1>
        <p className="text-[#6B6560] text-lg max-w-xl mx-auto">
          Tailored care for every dog, in a warm and loving home environment.
        </p>
      </div>

      {/* Main services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 flex flex-col gap-4"
          >
            <Image src={s.icon} alt={s.iconAlt} width={64} height={64} className="mx-auto" />
            <h2 className="font-serif text-2xl text-[#3D5A3E] text-center">{s.title}</h2>
            <p className="text-[#6B6560] leading-relaxed text-center">{s.description}</p>

            <div className="mt-2 space-y-1">
              {s.pricing.map((p) => (
                <div key={p.label} className="flex justify-between items-center py-2 border-b border-stone-100">
                  <span className="text-[#6B6560] text-sm">{p.label}</span>
                  <span className="text-[#3D5A3E] font-bold text-lg">{p.price}</span>
                </div>
              ))}
            </div>

            {s.additionalPricing && (
              <div className="mt-2">
                <p className="text-sm font-semibold text-[#8B7355] mb-1 underline">
                  {s.additionalPricing.heading}
                </p>
                <div className="space-y-1">
                  {s.additionalPricing.items.map((p) => (
                    <div key={p.label} className="flex justify-between items-center py-2 border-b border-stone-100">
                      <span className="text-[#6B6560] text-sm">{p.label}</span>
                      <span className="text-[#3D5A3E] font-bold text-lg">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {s.note && (
              <p className="text-xs text-[#8B7355] italic mt-auto">{s.note}</p>
            )}
          </div>
        ))}
      </div>

      {/* Other services */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 flex flex-col sm:flex-row items-center gap-6">
        <Image src="/images/dog.png" alt="Other services icon" width={64} height={64} className="shrink-0" />
        <div className="text-center sm:text-left">
          <h2 className="font-serif text-2xl text-[#3D5A3E] mb-2">Other Services</h2>
          <p className="text-[#6B6560] leading-relaxed mb-4">
            Katie&apos;s K9s also offers an array of other services including wedding
            chaperone, pet taxi and vet transportation. Whatever your requirements,
            please don&apos;t hesitate to get in touch for more details and a quote.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#3D5A3E] hover:bg-[#2C4230] text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
