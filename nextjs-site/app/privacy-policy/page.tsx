import type { Metadata } from "next";
import LegalDocument, { LegalDoc } from "@/components/LegalDocument";
import legal from "@/content/legal.json";

export const metadata: Metadata = {
  title: "Privacy Policy | Katie's K9s",
  description:
    "How Katie's K9s collects, uses, stores and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocument doc={legal.privacyPolicy as LegalDoc} />;
}
