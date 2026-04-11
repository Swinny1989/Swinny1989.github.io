import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credits – Katie's K9s",
};

const credits = [
  {
    href: "https://www.flaticon.com/free-icons/dog-house",
    label: "Dog house icons created by kmg design – Flaticon",
  },
  {
    href: "https://www.flaticon.com/free-icons/animal-shelter",
    label: "Animal shelter icons created by Freepik – Flaticon",
  },
  {
    href: "https://www.flaticon.com/free-icons/dog",
    label: "Dog icons created by Smashicons – Flaticon",
  },
  {
    href: "https://www.flaticon.com/free-icons/footprint",
    label: "Footprint icons created by The Icon Tree – Flaticon",
  },
  {
    href: "https://www.flaticon.com/free-icons/playing",
    label: "Playing icons created by Freepik – Flaticon",
  },
];

export default function Credits() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <h1 className="font-serif text-4xl text-[#3D5A3E] mb-4">Acknowledgments</h1>
      <p className="text-[#6B6560] mb-8">
        We used some icons from{" "}
        <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer" className="text-[#3D5A3E] underline">
          flaticon.com
        </a>
        . To comply with the license we acknowledge their use below:
      </p>
      <ul className="space-y-3">
        {credits.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3D5A3E] hover:text-[#2C4230] underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
