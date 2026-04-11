import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3D5A3E] text-green-100 text-sm text-center py-4 px-4">
      <p>
        © Katie&apos;s K9s – Licence No: CE/HB232 – All rights reserved.{" "}
        <Link href="/credits" className="underline hover:text-white transition-colors">
          Acknowledgments
        </Link>
      </p>
    </footer>
  );
}
