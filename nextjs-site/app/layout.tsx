import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Katie's K9s",
  description:
    "High quality care for your dog — Dog Daycare & Home Boarding in Congleton, Cheshire.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Katie's K9s",
    description:
      "High quality care for your dog — Dog Daycare & Home Boarding in Congleton, Cheshire.",
    url: "https://katiesk9s.co.uk",
    siteName: "Katie's K9s",
    images: [{ url: "https://katiesk9s.co.uk/images/Round.png" }],
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Katie's K9s",
    description:
      "High quality care for your dog — Dog Daycare & Home Boarding in Congleton, Cheshire.",
    images: ["https://katiesk9s.co.uk/images/Round.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen bg-[#FAF7F2]">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
