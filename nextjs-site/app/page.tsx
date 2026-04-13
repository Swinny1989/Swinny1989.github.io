import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Boarding & Day Care Congleton | Katie's K9s",
  description:
    "Licensed home dog boarding and day care in Congleton, Cheshire. A safe, loving home-from-home for your dog. Fully insured, DBS checked & canine first aid trained.",
};

const homeReviews = [
  {
    quote:
      "Katie is incredibly professional, clearly loves what she does, and treats the dogs like her own. I wouldn't hesitate to recommend her to anyone looking for a reliable, caring, and trustworthy dog boarder. 10/10 from me!",
    author: "Gemma Simpkins",
  },
  {
    quote:
      "Highly recommend Katie if you're looking for a warm, caring, and reliable family environment for your dog. I wouldn't hesitate to book again!",
    author: "Helen Nicholls",
  },
  {
    quote:
      "She looks after the dogs as if they were her own. Very happy to 100% recommend Katie's service. Thank you Katie! Great job xxx",
    author: "Kay Gilmore",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://katiesk9s.co.uk",
  name: "Katie's K9s",
  description:
    "Licensed home dog boarding and day care in Congleton, Cheshire. A safe, loving home-from-home for your dog.",
  url: "https://katiesk9s.co.uk",
  telephone: "+447540316692",
  email: "katies-k9s@hotmail.com",
  image: "https://katiesk9s.co.uk/images/Round.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Congleton",
    addressRegion: "Cheshire",
    addressCountry: "GB",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  priceRange: "££",
  sameAs: [
    "https://www.instagram.com/katiesk9s/",
    "https://www.facebook.com/p/Katies-K9s-Dog-Day-Care-Home-Boarding-61567067352572/",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dog Care Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Home Dog Boarding",
          description: "Overnight home dog boarding in Congleton, Cheshire from £40 per night.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dog Day Care",
          description: "Dog day care in Congleton, Cheshire. Up to 10 hours for £30.",
        },
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative h-[90svh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/lily.jpg"
          alt="A happy dog at Katie's K9s dog boarding in Congleton"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight mb-4">
            Dog Boarding &amp; Day Care in Congleton
          </h1>
          <p className="text-white/90 text-lg sm:text-xl mb-8 drop-shadow">
            A warm, loving home from home for your dog in Congleton, Cheshire
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/services"
              className="bg-[#3D5A3E] hover:bg-[#2C4230] text-white font-medium px-8 py-3 rounded-full transition-colors shadow-lg"
            >
              Our Services
            </Link>
            <Link
              href="/contact"
              className="bg-white/90 hover:bg-white text-[#3D5A3E] font-medium px-8 py-3 rounded-full transition-colors shadow-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/Round.png"
            alt="Katie's K9s dog boarding logo"
            width={320}
            height={320}
            className="rounded-full"
          />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#3D5A3E] mb-6">
          Licensed Home Dog Boarding in Congleton, Cheshire
        </h2>
        <h3 className="font-serif text-3xl sm:text-3xl text-[#3D5A3E] mb-8"> 
          Where your dog is truly part of the family
        </h3>
        <div className="space-y-4 text-[#6B6560] text-base sm:text-lg leading-relaxed text-left sm:text-center">
          <p>
            We offer a calm, loving home environment designed to help your dog feel safe, settled, and completely at ease.
            Whether they&apos;re with us for the day or a longer stay, every dog has their own dedicated space for rest and
            downtime, balanced with plenty of play, enrichment, and affection throughout the day.
          </p>
          <p>
            We keep our groups small so we can give each dog the individual attention they deserve,
            taking time to understand their routines, personalities, and needs. Our days are thoughtfully
            structured to create a relaxed, happy atmosphere where dogs can socialise, explore, and unwind at their own pace.
          </p>
          <p>
            Your dog&apos;s wellbeing is at the heart of everything we do, and we pride ourselves on providing
            a safe, secure, and genuinely caring experience, giving you complete peace of mind while you&apos;re apart.
          </p>
          <p>
            We&apos;re proud to be a high-standard licensed home boarder
            <span className="text-[#3D5A3E] font-medium"> (Licence No: CE/HB232)</span>.
            Fully insured, DBS checked and trained in canine first aid, giving you complete
            peace of mind.
          </p>
        </div>
      </section>

      {/* Divider image */}
      <section className="relative h-[32rem] sm:h-[40rem] overflow-hidden">
        <Image
          src="/images/bgimg-2.jpg"
          alt="Dogs enjoying countryside walks near Congleton"
          fill
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#3D5A3E]/50" />
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <p className="font-serif text-white text-xl sm:text-2xl md:text-3xl text-center italic max-w-2xl drop-shadow">
            Every dog is different, we tailor our care to each dog&apos;s needs and routine
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3D5A3E] text-center mb-12">
            What dog owners in Cheshire say about us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeReviews.map(({ quote, author }) => (
              <div
                key={author}
                className="bg-[#FAF7F2] rounded-2xl p-6 shadow-sm border border-stone-100 flex flex-col gap-4"
              >
                <div className="text-[#C8956C] text-2xl">★★★★★</div>
                <p className="text-[#6B6560] leading-relaxed italic flex-1">&ldquo;{quote}&rdquo;</p>
                <p className="text-[#3D5A3E] font-semibold text-sm">— {author}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/reviews"
              className="inline-block border-2 border-[#3D5A3E] text-[#3D5A3E] hover:bg-[#3D5A3E] hover:text-white font-medium px-8 py-3 rounded-full transition-colors"
            >
              Read all reviews
            </Link>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative h-[28rem] sm:h-[36rem] overflow-hidden">
        <Image
          src="/images/puppy-with-toy.png"
          alt="Puppy playing with toy at Katie's K9s Congleton"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#2C4230]/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-end gap-4 px-4 text-center pb-16">
          <h2 className="font-serif text-white text-2xl sm:text-3xl font-bold drop-shadow">
            Ready to book a stay?
          </h2>
          <Link
            href="/contact"
            className="bg-[#C8956C] hover:bg-[#b07d58] text-white font-medium px-8 py-3 rounded-full transition-colors shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
