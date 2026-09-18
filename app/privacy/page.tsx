import type { Metadata } from "next";
import { legalPages } from "@/content/pages";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <LegalPage doc={legalPages.privacy} path="/privacy" />;
}
