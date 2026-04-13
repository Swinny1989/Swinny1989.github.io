import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import servicesData from "@/content/services.json";

export const metadata: Metadata = {
  title: "Dog Boarding & Day Care Services Congleton | Katie's K9s",
  description:
    "Home dog boarding from £40/night and day care from £30 in Congleton, Cheshire. Licensed (CE/HB232), fully insured and DBS checked.",
};

export default function Services() {
  const { services, otherServices, criteria } = servicesData;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#3D5A3E] mb-6">
          Our Services
        </h1>
        <p className="text-[#6B6560] text-lg max-w-xl mx-auto">
          Tailored care for every dog, in a warm and loving home environment in Congleton, Cheshire
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

      {/* Criteria */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 mt-6">
        <h2 className="font-serif text-2xl text-[#3D5A3E] mb-4">Our Criteria</h2>
        <p className="text-[#6B6560] leading-relaxed mb-4">{criteria.intro}</p>
        <ul className="space-y-2 mb-6">
          {criteria.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[#6B6560]">
              <span className="text-[#3D5A3E] mt-1">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {criteria.closing.split("\n\n").map((para, i) => (
          <p key={i} className="text-[#6B6560] leading-relaxed mb-3">{para}</p>
        ))}
      </div>

      {/* Other services */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 flex flex-col sm:flex-row items-center gap-6 mt-6">
        <Image src="/images/dog.png" alt="Other services icon" width={64} height={64} className="shrink-0" />
        <div className="text-center sm:text-left">
          <h2 className="font-serif text-2xl text-[#3D5A3E] mb-2">Other Services</h2>
          <p className="text-[#6B6560] leading-relaxed mb-4">{otherServices.description}</p>
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
