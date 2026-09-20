import type { FaqItem, ProcessStep } from "./types";

/**
 * Hero slideshow — ten slides, shown one at a time. Each slide
 * pairs a photograph with wording written for that photograph and a link
 * to the discipline it illustrates.
 */
export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
  /** Short caption shown on the image and in the thumbnail rail. */
  label: string;
  /** Pill above the headline. */
  tag: string;
  /** Two-line headline; the second line is set in gold. */
  headline: [string, string];
  sub: string;
  cta: { label: string; href: string };
  /** CSS object-position for the image. */
  focal?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "facilities",
    src: "/images/home/hero-plant-engineer.avif",
    alt: "Engineer in a hard hat and high-visibility vest inspecting a process plant",
    label: "Oil & gas facilities",
    tag: "Oil & Gas Technical Services · Dubai, UAE",
    headline: ["Engineering discipline", "for energy assets."],
    sub: "Mechanical, piping, welding, electrical and maintenance services for oil & gas and industrial facilities — planned carefully and executed with control.",
    cta: { label: "Explore services", href: "/services" },
    focal: "50% 45%",
  },
  {
    id: "refinery",
    src: "/images/home/hero1.png",
    alt: "Refinery distillation columns and pipe racks at sunset",
    label: "Refineries & petrochemical",
    tag: "Refineries · Petrochemical · Process plants",
    headline: ["Plants that run", "around the clock."],
    sub: "Shutdown, turnaround and routine maintenance scopes planned to fit the outage window and executed under the plant's permit system.",
    cta: { label: "Industrial maintenance", href: "/services/industrial-maintenance" },
    focal: "50% 55%",
  },
  {
    id: "automation",
    src: "/images/home/hero-industrial-automation.jpg",
    alt: "Blue industrial robot arm on an automated production line in a bright factory",
    label: "Industrial automation",
    tag: "Automation · Robotics · Line control",
    headline: ["Lines that run", "themselves, safely."],
    sub: "Control system design, robotic cell integration and line automation engineered off-line, tested in the workshop and commissioned around production hours.",
    cta: { label: "Industrial automation", href: "/services/industrial-automation" },
    focal: "40% 50%",
  },
  {
    id: "piping",
    src: "/images/home/hero5.png",
    alt: "Process unit with insulated piping, columns and access platforms under a clear sky",
    label: "Piping & fabrication",
    tag: "Piping · Fabrication · Tie-ins",
    headline: ["Piping fabricated", "and fitted to drawing."],
    sub: "Spools, supports and tie-ins fabricated in the workshop and installed on site with controlled fit-up, NDT support and pressure testing.",
    cta: { label: "Piping & fabrication", href: "/services/piping-fabrication" },
    focal: "50% 50%",
  },
  {
    id: "offshore",
    src: "/images/home/hero2.png",
    alt: "Offshore oil and gas production platform at sea",
    label: "Offshore & marine",
    tag: "Offshore · Marine · Oil & gas support",
    headline: ["Technical support", "for offshore assets."],
    sub: "Mechanical, piping and E&I crews for platforms, FPSOs and marine terminals — mobilised with the certifications, tools and supervision the asset requires.",
    cta: { label: "Oil & gas technical support", href: "/services/oil-gas-technical-support" },
    focal: "50% 50%",
  },
  {
    id: "scada",
    src: "/images/home/hero-scada-monitoring.jpg",
    alt: "HMI touchscreen panel on an automated press line in a bright factory",
    label: "SCADA & remote monitoring",
    tag: "SCADA · HMI · Remote monitoring",
    headline: ["Every machine", "on one screen."],
    sub: "SCADA and HMI systems that give operators one supervisory view of the plant — alarms, trends and reports available on site or remotely.",
    cta: { label: "SCADA & remote monitoring", href: "/services/scada-remote-monitoring" },
    focal: "35% 55%",
  },
  {
    id: "welding",
    src: "/images/home/hero7.png",
    alt: "Welder in a protective mask TIG welding a steel frame",
    label: "Welding & fabrication",
    tag: "Coded welding · Structural · Pressure",
    headline: ["Every weld qualified,", "every joint inspected."],
    sub: "Qualified welders, approved procedures and inspection hold points — so every joint is traceable from procedure to final record.",
    cta: { label: "Welding & fabrication", href: "/services/welding-fabrication" },
    focal: "50% 40%",
  },
  {
    id: "instrumentation",
    src: "/images/home/service-electrical.jpg",
    alt: "High-voltage substation and transformers at sunrise",
    label: "Electrical & instrumentation",
    tag: "Electrical · Instrumentation · Loop testing",
    headline: ["Terminated, calibrated", "and loop-tested."],
    sub: "Cabling, terminations, instrument installation and loop checks completed to drawing and handed over with the test records to prove it.",
    cta: { label: "Electrical & instrumentation", href: "/services/electrical-instrumentation" },
    focal: "50% 50%",
  },
  {
    id: "plc",
    src: "/images/home/hero-plc-integration.jpg",
    alt: "Engineer commissioning an automated test rig from a laptop in a bright lab",
    label: "PLC, DCS & integration",
    tag: "PLC · DCS · System integration",
    headline: ["Programmed, tested", "and commissioned."],
    sub: "PLC and DCS logic written to the functional design, tested against the I/O list and commissioned on site with the documentation handed over.",
    cta: { label: "PLC & DCS engineering", href: "/services/plc-dcs-engineering" },
    focal: "55% 50%",
  },
  {
    id: "site",
    src: "/images/home/hero-4.webp",
    alt: "Site engineer reviewing drawings in front of a construction site",
    label: "Site & technical support",
    tag: "Site crews · Supervision · Manpower",
    headline: ["Crews and supervision,", "ready to mobilise."],
    sub: "Supervised multi-discipline teams, technical manpower and site coordination for projects, shutdowns and day-to-day support across the UAE.",
    cta: { label: "Project & site services", href: "/services/project-site-technical-services" },
    focal: "60% 30%",
  },
];

export const hero = {
  /** Seconds each slide is held before the next one turns in. */
  interval: 4,
  secondaryCta: { label: "Request a Consultation", href: "/contact" },
};

export const capabilityStrip = [
  "Mechanical",
  "Piping & Fabrication",
  "Welding",
  "Electrical & Instrumentation",
  "Equipment Installation",
  "Industrial Maintenance",
  "Technical Support",
  "Project & Site Services",
  "Industrial Automation",
  "SCADA & Monitoring",
  "PLC & DCS",
  "System Integration",
  "Dubai · UAE",
];

export const about = {
  eyebrow: "About WOL",
  title: "A technical services company built around the way plants actually work.",
  body: [
    "WOL Technical Services is based in Dubai and works with oil & gas and industrial facilities across mechanical, piping, welding, electrical and maintenance disciplines.",
    "Our approach is simple: understand the asset, plan the work properly, execute it under control and hand it back with the records to prove it.",
  ],
  indicators: [
    { label: "Disciplines", value: "06", note: "Mechanical · Piping · Welding · E&I · Automation · Maintenance" },
    { label: "Base", value: "DXB", note: "Dubai, United Arab Emirates" },
    { label: "Delivery", value: "Site + Shop", note: "On-site crews and workshop fabrication" },
  ],
  commitments: [
    { title: "Surveyed before priced", body: "Walk-downs and drawing reviews come before any quotation." },
    { title: "Executed under permit", body: "Method statements, isolations and hold points agreed up front." },
    { title: "Supervised on site", body: "Every crew works under a named supervisor and daily reporting." },
    { title: "Handed over with records", body: "Inspection records and a close-out pack are part of the job." },
  ],
  image: {
    src: "/images/home/about-team-drawings.jpg",
    alt: "Four WOL engineers in hard hats reviewing drawings on a refinery site",
    focal: "50% 45%",
  },
  cta: { label: "About WOL", href: "/about" },
  secondaryCta: { label: "Request a Consultation", href: "/contact" },
};

export const process: ProcessStep[] = [
  { step: "01", title: "Understand", body: "Site walk-down, drawing review and a shared understanding of scope, constraints and interfaces." },
  { step: "02", title: "Plan", body: "Method statements, resources, sequence and hold points agreed with the client before mobilisation." },
  { step: "03", title: "Prepare", body: "Materials, tooling, permits and inductions in place. Workshop fabrication started where applicable." },
  { step: "04", title: "Execute", body: "Controlled site execution under supervision, with daily reporting and progress against plan." },
  { step: "05", title: "Inspect", body: "Stage inspections, testing support and client witness points — recorded as the work progresses." },
  { step: "06", title: "Support", body: "Handover documentation, close-out and continued support through maintenance and follow-on scopes." },
];

export const faq: FaqItem[] = [
  {
    q: "What services does WOL Technical Services provide?",
    a: "WOL provides mechanical, piping and fabrication, welding, electrical and instrumentation, equipment installation, industrial maintenance, technical manpower and multi-discipline site services for oil & gas and industrial facilities.",
  },
  {
    q: "Where does WOL operate?",
    a: "WOL is based in Dubai, United Arab Emirates. Work across the UAE and the wider region is considered on a project basis.",
  },
  {
    q: "How do I request a quotation?",
    a: "Send us the scope — drawings, specifications, site location and timeline — through the contact page. We will review it and respond with any clarifications and a proposal.",
  },
  {
    q: "Can WOL support planned shutdowns and turnarounds?",
    a: "Yes. Multi-discipline crews and supervision can be provided for planned outages, with scopes agreed in advance to fit the shutdown window.",
  },
  {
    q: "Do you work inside operating facilities?",
    a: "Yes. Work in live facilities is carried out under the client's permit-to-work, isolation and safety systems, with method statements prepared for each task.",
  },
  {
    q: "Do you offer ongoing maintenance contracts?",
    a: "Yes. Maintenance contracts are structured around the client's asset list and operational requirements, with scope and frequency agreed up front.",
  },
  {
    q: "Which certifications and approvals does WOL hold?",
    a: "Details of registrations, qualifications and approvals are provided on request and confirmed at enquiry stage. [To be confirmed]",
  },
];

export const finalCta = {
  eyebrow: "Start a conversation",
  title: ["Let's plan", "the work properly."],
  body: "Share your scope and we will come back with clarifications, an approach and a proposal.",
  primary: { label: "Request a Consultation", href: "/contact" },
  secondary: { label: "Contact WOL", href: "/contact" },
  image: { src: "/images/home/cta-refinery-dusk.jpg", alt: "Industrial complex silhouetted against a sunset" },
};
