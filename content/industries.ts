import type { Industry } from "./types";

export const industries: Industry[] = [
  {
    slug: "oil-gas",
    index: "01",
    title: "Oil & Gas",
    summary: "Upstream and midstream facilities where uptime, safety and controlled work are non-negotiable.",
    menuDescription: "Upstream and midstream facilities, live-plant work.",
    description: [
      "Production facilities, gathering systems and processing plants operate continuously and under strict permit regimes. Technical work in these environments has to be planned around operations and executed with discipline.",
      "WOL supports oil & gas operators and contractors with mechanical, piping, welding, E&I and manpower scopes that fit within their existing safety and work-control systems.",
    ],
    image: { src: "/images/industries/oil-gas.jpg", alt: "Oil pump jack silhouetted against a red sunset", focal: "50% 50%" },
    typicalScope: ["Equipment overhaul and reinstatement", "Piping modifications and tie-ins", "Shutdown and turnaround crews", "E&I installation and loop checks"],
    relatedServices: ["mechanical-services", "piping-fabrication", "oil-gas-technical-support", "project-site-technical-services"],
    seo: { title: "Oil & Gas — Industries — WOL Technical Services", description: "Technical services for oil & gas production and processing facilities in the UAE." },
  },
  {
    slug: "refineries",
    index: "02",
    title: "Refineries",
    summary: "Complex process units with dense piping, high equipment counts and demanding turnaround schedules.",
    menuDescription: "Process units, turnarounds and dense piping scopes.",
    description: [
      "Refineries combine large rotating equipment, extensive piping networks and tightly scheduled turnarounds. Work windows are short and the cost of delay is high.",
      "WOL's services are structured to support refinery maintenance and project scopes with planned crews, controlled fabrication and clear documentation.",
    ],
    image: { src: "/images/industries/refineries.jpg", alt: "Refinery with dense red and white piping", focal: "50% 50%" },
    typicalScope: ["Turnaround mechanical and piping support", "Exchanger and vessel work", "Spool fabrication and replacement", "Multi-discipline work packages"],
    relatedServices: ["mechanical-services", "piping-fabrication", "welding-fabrication", "industrial-maintenance"],
    seo: { title: "Refineries — Industries — WOL Technical Services", description: "Maintenance and project support for refinery units in the UAE." },
  },
  {
    slug: "petrochemical",
    index: "03",
    title: "Petrochemical Facilities",
    summary: "Process plants where material selection, welding control and instrumentation accuracy matter.",
    menuDescription: "Material-critical fabrication and instrumentation.",
    description: [
      "Petrochemical plants handle a wide range of process fluids, often requiring specific materials, welding procedures and careful instrumentation.",
      "WOL supports these facilities with piping, welding, E&I and maintenance scopes executed to the client's specifications.",
    ],
    image: { src: "/images/industries/petrochemical.jpg", alt: "Large industrial plant beside a body of water", focal: "50% 55%" },
    typicalScope: ["Process piping in specified materials", "Instrument installation and loop checks", "Plant maintenance programmes", "Structural and access improvements"],
    relatedServices: ["piping-fabrication", "electrical-instrumentation", "industrial-maintenance", "welding-fabrication"],
    seo: { title: "Petrochemical — Industries — WOL Technical Services", description: "Technical services for petrochemical facilities in the UAE." },
  },
  {
    slug: "industrial-plants",
    index: "04",
    title: "Industrial Plants",
    summary: "Manufacturing and process facilities that depend on well-maintained mechanical and electrical systems.",
    menuDescription: "Mechanical and electrical support for process facilities.",
    description: [
      "Industrial plants of all kinds share the same needs: equipment that runs, utilities that are reliable and modifications that are done properly.",
      "WOL provides installation, maintenance and fabrication support for manufacturing and processing facilities.",
    ],
    image: { src: "/images/industries/industrial-plants.jpg", alt: "Large industrial hall with overhead cranes", focal: "50% 50%" },
    typicalScope: ["Equipment installation and alignment", "Utility piping and services", "Preventive maintenance contracts", "Steel fabrication and repairs"],
    relatedServices: ["equipment-installation-maintenance", "industrial-maintenance", "welding-fabrication", "electrical-instrumentation"],
    seo: { title: "Industrial Plants — Industries — WOL Technical Services", description: "Installation, maintenance and fabrication for industrial plants in the UAE." },
  },
  {
    slug: "energy-infrastructure",
    index: "05",
    title: "Energy Infrastructure",
    summary: "Power and utility assets that require reliable mechanical and electrical support.",
    menuDescription: "Power and utility assets, planned and reactive support.",
    description: [
      "Power generation and utility infrastructure operate on tight reliability targets. Mechanical and electrical work must be planned to outage windows and executed without surprises.",
      "WOL supports energy infrastructure with equipment, piping and E&I scopes aligned to the asset owner's procedures.",
    ],
    image: { src: "/images/industries/energy-infrastructure.jpg", alt: "Grey and red power facility under a blue sky", focal: "50% 50%" },
    typicalScope: ["Outage mechanical support", "Auxiliary piping and supports", "Electrical installation and terminations", "Equipment maintenance"],
    relatedServices: ["equipment-installation-maintenance", "electrical-instrumentation", "mechanical-services", "project-site-technical-services"],
    seo: { title: "Energy Infrastructure — Industries — WOL Technical Services", description: "Mechanical and electrical support for energy and utility infrastructure in the UAE." },
  },
  {
    slug: "marine-offshore",
    index: "06",
    title: "Marine & Offshore",
    summary: "Vessels, yards and offshore assets with demanding access, logistics and fabrication requirements.",
    menuDescription: "Yards, vessels and offshore fabrication scopes.",
    description: [
      "Marine and offshore work brings additional constraints: access, weather, logistics and the training and certification requirements of the environment.",
      "WOL supports marine and offshore scopes on a project basis, with fabrication, welding and technical personnel matched to the requirement.",
    ],
    image: { src: "/images/industries/marine-offshore.jpg", alt: "Offshore oil rig at sea", focal: "50% 50%" },
    typicalScope: ["Structural steel fabrication and repair", "Welding at yard and on board", "Technical manpower for offshore scopes", "Piping and mechanical support"],
    relatedServices: ["welding-fabrication", "oil-gas-technical-support", "piping-fabrication"],
    seo: { title: "Marine & Offshore — Industries — WOL Technical Services", description: "Fabrication, welding and technical support for marine and offshore assets from Dubai, UAE." },
  },
  {
    slug: "manufacturing-industrial",
    index: "07",
    title: "Manufacturing & Industrial",
    summary: "Production facilities where throughput, consistency and machine availability are decided by the control system as much as the machinery.",
    menuDescription: "Production lines, packaged machinery and plant utilities.",
    description: [
      "Manufacturing runs on repetition. A line that produces the same result every cycle depends on machinery that is mechanically sound, electrically reliable and controlled by automation that operators understand. When any of those three slips, output, quality and safety follow.",
      "WOL brings automation, control engineering and multi-discipline site services to manufacturers: automating manual or ageing lines, integrating new machinery into existing plant, giving management visibility through SCADA and keeping equipment available through planned maintenance. One team covers the control cabinet, the machine and the services around it.",
    ],
    image: { src: "/images/industries/manufacturing-industrial.jpg", alt: "Automated filling line conveyor in a bright production facility", focal: "60% 50%" },
    typicalScope: ["Production line automation and control upgrades", "SCADA, line monitoring and downtime visibility", "Integration of new OEM machinery into existing lines", "Electrical, mechanical and maintenance support for plant and utilities"],
    relatedServices: ["industrial-automation", "scada-remote-monitoring", "plc-dcs-engineering", "automation-system-integration", "industrial-maintenance"],
    faq: [
      { q: "Can automation work be done without stopping production?", a: "Much of it can. Design, panel building and testing happen off-line, and site work is planned around existing shutdown windows, weekends or shift gaps. Where a stop is unavoidable, its length is agreed in advance." },
      { q: "We have machines from several suppliers. Can they be brought under one system?", a: "Yes. Multi-vendor integration is common in manufacturing. Each machine keeps its own controls where sensible, and a supervisory layer ties them together for line control, monitoring and reporting." },
      { q: "Do you support the plant after the project?", a: "Support arrangements are agreed per site and can include remote monitoring, scheduled control system health checks and maintenance contracts covering electrical and mechanical equipment." },
      { q: "What information do you need for an initial proposal?", a: "A description of the line or equipment, any existing drawings or controller details, the outcome you want to achieve and the operating hours we would need to work around." },
    ],
    seo: { title: "Manufacturing & Industrial — Industries — WOL Technical Services", description: "Automation, control systems, integration and maintenance for manufacturing and industrial facilities in the UAE." },
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
export const industrySlugs = industries.map((i) => i.slug);

const imageSources = new Set(industries.map((i) => i.image.src));
if (imageSources.size !== industries.length) {
  throw new Error("Industry images must be unique — duplicate image detected in content/industries.ts");
}
