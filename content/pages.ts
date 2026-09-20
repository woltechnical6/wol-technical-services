import { PLACEHOLDER } from "./site";
import type { FaqItem, ImageAsset } from "./types";

/**
 * Content for the non-service inner pages. Verifiable facts about the
 * company remain placeholders until WOL confirms them.
 */

export const aboutPage = {
  hero: {
    eyebrow: "About WOL",
    title: ["Built for the", "way plants work."],
    lede: "WOL Technical Services is a Dubai-based technical services company supporting oil & gas and industrial facilities across mechanical, piping, welding, electrical, automation and maintenance disciplines.",
    image: { src: "/images/pages/about.jpg", alt: "Dubai skyline at night with illuminated towers", focal: "50% 60%" } satisfies ImageAsset,
  },
  statement: {
    lead: "Technical work in energy facilities is judged on three things: was it planned properly, was it done safely, and can it be proven afterwards.",
    body: [
      "WOL is structured around those three questions. Every scope — from a single pump overhaul to a multi-discipline shutdown package — is surveyed, planned with method statements and hold points, executed by supervised crews and closed out with records.",
      "The company is based in Dubai and serves clients across the United Arab Emirates. Workshop fabrication and site crews are coordinated from a single point of contact so that responsibility is never split.",
    ],
  },
  facts: [
    { label: "Established", value: PLACEHOLDER },
    { label: "Registered entity", value: PLACEHOLDER },
    { label: "Trade licence", value: PLACEHOLDER },
    { label: "Team size", value: PLACEHOLDER },
    { label: "Base", value: "Dubai, UAE" },
    { label: "Coverage", value: "United Arab Emirates" },
  ],
  values: [
    { title: "Understand first", body: "No scope is priced or planned without a walk-down, drawings or a conversation about what the asset actually needs." },
    { title: "Plan visibly", body: "Method statements, sequences, resources and hold points are written down and shared before mobilisation." },
    { title: "Execute under control", body: "Permits, isolations and supervision are the frame in which every task takes place." },
    { title: "Prove the work", body: "Inspection records, as-built markups and handover packs are part of the job, not an afterthought." },
  ],
  disciplines: [
    { code: "MECH", title: "Mechanical", body: "Rotating and static equipment, alignment, bolting and shutdown support." },
    { code: "PIPE", title: "Piping", body: "Spool fabrication, erection, supports and modifications." },
    { code: "WELD", title: "Welding", body: "Procedure-based welding, structural and pressure-retaining work." },
    { code: "E&I", title: "Electrical & Instrumentation", body: "Installation, termination, loop checks and calibration support." },
    { code: "MAINT", title: "Maintenance", body: "Planned, corrective and shutdown maintenance for industrial plants." },
    { code: "AUTO", title: "Automation & Control", body: "PLC, DCS and SCADA engineering, system integration and remote monitoring." },
  ],
  certifications: {
    note: "Certifications, accreditations and client approvals will be listed here once confirmed by WOL Technical Services.",
    items: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
  },
};

export const servicesPage = {
  hero: {
    eyebrow: "Services",
    title: ["Twelve disciplines,", "one method."],
    lede: "Proposed service categories covering the mechanical, piping, welding, electrical, automation and maintenance needs of oil & gas and industrial facilities. Each is delivered with the same survey–plan–execute–verify discipline.",
    image: { src: "/images/pages/services-index.jpg", alt: "Industrial valves and pipework inside a process plant", focal: "50% 50%" } satisfies ImageAsset,
  },
};

export const industriesPage = {
  hero: {
    eyebrow: "Industries",
    title: ["Where the", "work happens."],
    lede: "WOL supports facilities where uptime, safety and controlled work are non-negotiable — from production sites and refineries to industrial plants and offshore assets.",
    image: { src: "/images/pages/industries-index.jpg", alt: "Petrochemical plant with towers and piping at dusk", focal: "50% 50%" } satisfies ImageAsset,
  },
};

export const contactPage = {
  hero: {
    eyebrow: "Contact",
    title: ["Start with", "the scope."],
    lede: "Tell us about the equipment, drawings or site conditions involved. We will respond with a considered approach rather than a generic quote.",
    image: { src: "/images/pages/contact.jpg", alt: "Burj Khalifa and the Dubai skyline at night", focal: "50% 40%" } satisfies ImageAsset,
  },
  enquiryTypes: ["Request a consultation", "Request a quotation", "Shutdown / turnaround support", "Manpower supply", "General enquiry"],
  faq: [
    { q: "What information helps us respond quickly?", a: "The facility and location, the discipline(s) involved, drawings or photographs where available, the expected window for the work and any site access or permit requirements." },
    { q: "Do you work outside Dubai?", a: "WOL is based in Dubai and supports clients across the UAE. Availability for specific locations is confirmed at enquiry stage." },
    { q: "How soon will we hear back?", a: "Enquiries are reviewed during business hours and answered as quickly as the scope allows. Response time commitments are [To be confirmed]." },
  ] satisfies FaqItem[],
};

export const legalPages = {
  privacy: {
    title: "Privacy Policy",
    updated: PLACEHOLDER,
    sections: [
      { h: "Who we are", p: ["This website is operated by WOL Technical Services, Dubai, United Arab Emirates. Registered entity details: [To be confirmed]."] },
      { h: "Information we collect", p: ["When you submit the contact form we collect the details you provide — typically your name, company, email address, telephone number and the content of your message.", "Standard technical information such as IP address, browser type and pages visited may be collected by hosting and analytics providers. Analytics tooling: [To be confirmed]."] },
      { h: "How we use it", p: ["Information you submit is used to respond to your enquiry, prepare proposals and, where you agree, to keep in touch about relevant services.", "We do not sell personal information."] },
      { h: "Retention and security", p: ["Enquiry data is retained for as long as needed to handle your request and meet legal obligations. Reasonable technical and organisational measures are used to protect it."] },
      { h: "Your rights", p: ["You may request access to, correction of, or deletion of your personal information by contacting us using the details on the Contact page."] },
      { h: "Changes", p: ["This policy may be updated from time to time. The date of the latest revision is shown at the top of this page."] },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: PLACEHOLDER,
    sections: [
      { h: "Use of this website", p: ["This website provides general information about WOL Technical Services. Content is provided for information only and does not constitute an offer, a technical specification or professional advice."] },
      { h: "No warranty", p: ["Descriptions of services and capabilities are indicative. Specific scopes, procedures, certifications and approvals are confirmed in writing as part of any engagement."] },
      { h: "Intellectual property", p: ["Text, graphics and layouts on this website belong to WOL Technical Services or their respective owners and may not be reproduced without permission. Photography credits: see the image credits file included with the site."] },
      { h: "Third-party links", p: ["Links to third-party websites are provided for convenience; WOL is not responsible for their content."] },
      { h: "Governing law", p: ["These terms are governed by the laws of the United Arab Emirates. Jurisdiction and dispute-resolution details: [To be confirmed]."] },
    ],
  },
};
