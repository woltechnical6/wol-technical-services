import type { FaqItem, ImageAsset } from "./types";

export type FaqCategory = {
  id: string;
  title: string;
  blurb: string;
  items: FaqItem[];
};

export const faqsPage = {
  hero: {
    eyebrow: "FAQs",
    title: ["Questions,", "answered plainly."],
    lede: "How WOL scopes, mobilises, controls and hands over technical work in oil & gas and industrial facilities across the UAE. If your question is not here, the team is one call away.",
    image: { src: "/images/pages/projects.jpg", alt: "Cranes and steel structures on an industrial project site", focal: "50% 50%" } satisfies ImageAsset,
  },
};

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    title: "About WOL",
    blurb: "Who we are, where we work and what we cover.",
    items: [
      {
        q: "What does WOL Technical Services do?",
        a: "WOL is a Dubai-based technical services company supporting oil & gas and industrial facilities. We deliver mechanical, piping, welding, electrical & instrumentation, installation, maintenance and site technical services — planned, executed and closed out by one team.",
      },
      {
        q: "Where do you operate?",
        a: "WOL is based in Dubai and supports clients across the United Arab Emirates. Availability for a specific site or emirate is confirmed at enquiry stage, together with any access, permit or accommodation requirements.",
      },
      {
        q: "Which sectors do you serve?",
        a: "Upstream and midstream oil & gas, refineries, petrochemical plants, power and utilities, industrial manufacturing and offshore assets. Each sector page describes the typical scopes we are mobilised for.",
      },
      {
        q: "Can WOL combine several disciplines in one package?",
        a: "Yes. Multi-discipline scopes — for example a shutdown package combining mechanical, piping, welding and E&I — are coordinated from a single point of contact so responsibility is never split between contractors.",
      },
    ],
  },
  {
    id: "scoping",
    title: "Scoping & quotation",
    blurb: "What we need from you, and what you get back.",
    items: [
      {
        q: "What information helps you respond quickly?",
        a: "The facility and location, the discipline(s) involved, drawings or photographs where available, the expected working window and any site access or permit requirements. Even a rough description is enough to start a conversation.",
      },
      {
        q: "Do you survey the site before quoting?",
        a: "Wherever possible, yes. A joint walk-down lets us confirm equipment condition, access, isolation boundaries and lay-down space so the proposal reflects the actual scope rather than an assumption.",
      },
      {
        q: "How is a proposal structured?",
        a: "A clear scope boundary, the method and sequence, the crew and supervision proposed, hold points for inspection, the documentation we will hand over, and the commercial basis — lump sum, unit rate or manpower supply.",
      },
      {
        q: "Can you provide manpower only?",
        a: "Yes. Supervised trade crews — fitters, welders, electricians, instrument technicians and riggers — can be supplied to work under the client's own supervision and permit system.",
      },
    ],
  },
  {
    id: "site",
    title: "Mobilisation & working on site",
    blurb: "Live plants, shutdowns and how crews are managed.",
    items: [
      {
        q: "Can you work in a live, operating plant?",
        a: "Yes, subject to the client's permit-to-work and isolation procedures. Scopes are sequenced so that work proceeds safely alongside operations, with hot work, confined space and lifting controlled through the site's own system.",
      },
      {
        q: "Do you support shutdowns and turnarounds?",
        a: "Shutdown support is a core part of our work. Crews, supervision and tooling are planned against the shutdown schedule, with pre-shutdown fabrication completed in the workshop so the critical window is used for site work only.",
      },
      {
        q: "How quickly can a crew be mobilised?",
        a: "Depends on scope and site induction requirements. Small corrective scopes can often be mobilised within days; larger packages are planned weeks ahead. Response times for a specific enquiry are confirmed in writing.",
      },
      {
        q: "Who supervises the work on site?",
        a: "Every crew is led by a WOL supervisor responsible for the method statement, permits, toolbox talks and daily reporting. The client has one named contact for the duration of the work.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety & quality",
    blurb: "The controls that travel with every crew.",
    items: [
      {
        q: "What safety controls apply to every job?",
        a: "Permit-to-work and isolation confirmation before any intervention, a task-specific risk assessment reviewed with the crew, competent supervision on site, and stop-work authority for every team member.",
      },
      {
        q: "Are welding procedures and welders qualified?",
        a: "Welding is carried out to written procedures with qualified welders. Procedure qualification, welder qualification and NDT arrangements are agreed for each scope in line with the applicable code and the client's specification.",
      },
      {
        q: "Do you use calibrated tools and instruments?",
        a: "Yes. Torque tools, alignment equipment, test instruments and calibrators are calibrated with traceable records that form part of the handover pack.",
      },
      {
        q: "Which certifications does WOL hold?",
        a: "Certifications, accreditations and client approvals are stated only where confirmed by WOL Technical Services. Details are provided on request as part of the pre-qualification process.",
      },
    ],
  },
  {
    id: "handover",
    title: "Documentation & handover",
    blurb: "How the work is proven afterwards.",
    items: [
      {
        q: "What documentation do you hand over?",
        a: "Inspection and test records, torque and alignment sheets, weld maps and NDT reports where applicable, red-lined or as-built drawings, and a completion report with observations for future maintenance.",
      },
      {
        q: "Do you provide as-built drawings?",
        a: "Red-lined markups are produced for every modification. Formal as-built drawings can be prepared where the scope includes it.",
      },
      {
        q: "Is there support after handover?",
        a: "Yes. Observations recorded during the work are carried into the completion report, and planned or corrective maintenance can be arranged as a follow-on scope.",
      },
    ],
  },
];

export const faqsFinalNote =
  "Answers describe WOL's standard approach. Specific arrangements — codes, certifications, response times and commercial terms — are confirmed in writing for each engagement.";
