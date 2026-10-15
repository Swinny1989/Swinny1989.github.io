import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3D5A3E] text-green-100 text-sm text-center py-4 px-4">
      <p>
        © Katie&apos;s K9s – Licence No: CE/HB232 – All rights reserved.
      </p>
      <p className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1">
        <Link href="/privacy-policy" className="underline hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/credits" className="underline hover:text-white transition-colors">
          Acknowledgments
        </Link>
      </p>
    </footer>
  );
}
