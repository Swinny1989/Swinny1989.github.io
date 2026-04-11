"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-stone-200 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-bold text-[#3D5A3E] tracking-wide"
        >
          Katie&apos;s K9s
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors hover:text-[#3D5A3E] ${
                  pathname === href
                    ? "text-[#3D5A3E] border-b-2 border-[#3D5A3E] pb-0.5"
                    : "text-[#6B6560]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`block w-6 h-0.5 bg-[#3D5A3E] transition-transform duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#3D5A3E] transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#3D5A3E] transition-transform duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#FAF7F2] border-t border-stone-200 px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 px-2 text-base font-medium rounded-lg transition-colors ${
                    pathname === href
                      ? "text-[#3D5A3E] bg-green-50"
                      : "text-[#6B6560] hover:text-[#3D5A3E] hover:bg-green-50"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
