import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Dog's Stay – Dog Boarding Congleton | Katie's K9s",
  description:
    "Find out what to expect during your dog's home boarding or day care stay at Katie's K9s in Congleton, Cheshire.",
};

const stayInfo = [
  {
    title: "Drop Off & Collections",
    body: "Drop-off and collection times will be agreed with you in advance and we kindly ask that these times are strictly adhered to.\n\nTo make these times as calm and stress-free for all dogs, we prepare the environment by ensuring the other dogs are settled and secure. This allows us to welcome your dog properly and introduce them calmly into the group.\n\nWe also carefully schedule our day, including dog care, personal appointments and childcare, around these times so that we can give every dog the attention they deserve.",
  },
  {
    title: "What to Bring",
    intro: "To help your dog feel as settled and comfortable as possible, we ask owners to provide a few familiar items from home:",
    items: [
      "Your dog's usual food for the duration of their stay, ensuring it is sealed or stored in an airtight container",
      "Their bed or blanket that smells like home",
      "Any favourite toys or comfort items",
      "A lead, harness and collar",
    ],
  },
  {
    title: "Settling In",
    body: "Once your dog arrives, they will have time to settle into the home and get comfortable. For new dogs especially, we take things at their pace and allow them to explore the environment and relax.\n\nGentle supervision and gradual interaction with the other dogs helps everyone feel comfortable and confident.",
  },
  {
    title: "A Typical Day",
    intro: "Although every dog's routine is slightly different, their days with us usually include:",
    items: [
      "Walks and outdoor adventures",
      "Playtime with suitable furry friends",
      "Mental enrichment such as toys, games and scent activities",
      "Relaxation time in a calm environment with unlimited love and cuddles",
    ],
    closing: "Our aim is to provide a well balanced day where dogs can enjoy plenty of exercise and social interaction, alongside dedicated time to relax, unwind, and feel truly at home. Each household is given their own comfortable room downstairs, offering a calm and familiar space for a peaceful night's sleep.",
  },
  {
    title: "Communication & Updates",
    body: "We know how important it is to feel reassured while your dog is away from home. That's why we send daily updates via WhatsApp, including photos and videos so you can see your pup enjoying their time with us and having the best time.\n\nMany owners say this becomes the highlight of their day while they're away!",
  },
  {
    title: "Heading Home",
    body: "When you collect your dog, we'll let you know how they've been during their stay and share any little highlights from their time with us.\n\nThey will often leave happy, relaxed and pleasantly tired after all the fun, walks and companionship they've enjoyed during their stay.\n\nWe love getting to know every dog who stays with us and watching their confidence grow as they become familiar with our home, our routine and their doggy friends. Many of our guests return regularly and quickly settle back in as if they're coming back to visit family.",
  },
];

export default function YourDogStay() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="text-center mb-14">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#3D5A3E] mb-6">Your Dog&apos;s Stay</h1>
        <p className="text-[#6B6560] text-lg max-w-xl mx-auto">
          We want every dog staying with us to feel relaxed, happy and completely at home. Because
          we care for only a small number of dogs at a time, we are able to tailor each stay to
          suit their routine, personality and needs.
        </p>
      </div>

      <div className="space-y-6">
        {stayInfo.map((section) => (
          <div key={section.title} className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-8">
            <h2 className="font-serif text-xl text-[#3D5A3E] mb-3">{section.title}</h2>
            {"body" in section && section.body && (
              <div className="space-y-3">
                {section.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[#6B6560] leading-relaxed">{para}</p>
                ))}
              </div>
            )}
            {"intro" in section && section.intro && (
              <>
                <p className="text-[#6B6560] leading-relaxed mb-3">{section.intro}</p>
                <ul className="space-y-2 mb-3">
                  {section.items?.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#6B6560]">
                      <span className="text-[#3D5A3E] mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {"closing" in section && section.closing && (
                  <p className="text-[#6B6560] leading-relaxed">{section.closing}</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
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
