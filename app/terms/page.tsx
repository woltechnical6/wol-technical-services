import type { Metadata } from "next";
import { legalPages } from "@/content/pages";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <LegalPage doc={legalPages.terms} path="/terms" />;
}
