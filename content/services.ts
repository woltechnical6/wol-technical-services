import type { Service } from "./types";

/**
 * Proposed service categories for WOL Technical Services.
 * Scope descriptions describe the nature of the work; they are not claims
 * of specific certifications, approvals or completed projects.
 */
export const services: Service[] = [
  {
    slug: "mechanical-services",
    index: "01",
    title: "Mechanical Services",
    shortTitle: "Mechanical",
    menuDescription: "Rotating and static equipment work across plant environments.",
    tagline: "Rotating, static and auxiliary equipment — handled with discipline.",
    summary:
      "Mechanical scopes for oil & gas and industrial plants: equipment overhaul, alignment, replacement of components and mechanical support during operations and shutdowns.",
    icon: "mechanical",
    layout: "editorial",
    image: {
      src: "/images/services/mechanical-services.jpg",
      alt: "Grey industrial mechanical equipment inside a plant",
      focal: "50% 50%",
    },
    intro: [
      "Mechanical work in a live facility demands more than tools and manpower. It demands method statements that reflect the actual equipment, isolation that is verified rather than assumed, and crews who understand why tolerances matter.",
      "WOL's mechanical services are structured around that discipline — from the first site walk-down to the final handover pack.",
    ],
    capabilities: [
      { title: "Rotating equipment", body: "Pumps, compressors, blowers and drivers — dismantling, inspection, component replacement and reassembly." },
      { title: "Static equipment", body: "Vessels, exchangers and skids — opening, cleaning support, gasket and bolting work, and boxing-up." },
      { title: "Alignment & balancing", body: "Shaft alignment and vibration-informed checks to return equipment to service condition." },
      { title: "Mechanical seals & bearings", body: "Removal, replacement and verification of seals, bearings and couplings." },
      { title: "Bolting & torque", body: "Controlled bolting practices with documented torque sequences for flanged joints." },
      { title: "Shutdown mechanical support", body: "Additional mechanical crews and supervision during planned turnarounds." },
    ],
    applications: [
      "Pump and compressor overhauls",
      "Heat exchanger bundle pulling support",
      "Skid-mounted package work",
      "Valve removal, servicing and reinstatement",
      "Mechanical support during plant outages",
    ],
    approach: [
      { title: "Scope definition", body: "Every mechanical scope begins with a joint walk-down and a written understanding of the equipment, access and isolation boundaries." },
      { title: "Method & sequence", body: "Work is broken into sequenced steps with hold points, so that inspection and client sign-off happen where they matter." },
      { title: "Verification", body: "Reinstated equipment is checked against the agreed acceptance criteria before it is handed back." },
    ],
    safetyQuality: [
      "Permit-to-work and isolation confirmation before any intervention",
      "Task-specific risk assessment reviewed with the crew",
      "Calibrated torque and measuring tools with traceable records",
      "Documented inspection and handover for each item of equipment",
    ],
    process: [
      { step: "01", title: "Survey", body: "Site walk-down, equipment review and access assessment." },
      { step: "02", title: "Plan", body: "Method statement, resources, tools and hold points agreed." },
      { step: "03", title: "Mobilise", body: "Crew, tooling and consumables mobilised to site." },
      { step: "04", title: "Execute", body: "Controlled dismantling, repair and reassembly." },
      { step: "05", title: "Verify", body: "Alignment, torque and acceptance checks completed." },
      { step: "06", title: "Hand over", body: "Records and recommendations issued to the client." },
    ],
    faq: [
      { q: "Can WOL support mechanical work during a live plant operation?", a: "Yes, subject to the client's permit-to-work system and isolation procedures. Scopes are planned so that work can proceed safely alongside operations." },
      { q: "Do you supply spare parts?", a: "Spares are typically supplied by the client or procured against client approval. WOL can advise on parts lists identified during inspection." },
      { q: "How is equipment handed back?", a: "With a completion report covering the work performed, measurements taken and any observations for future maintenance." },
    ],
    relatedIndustries: ["oil-gas", "refineries", "industrial-plants"],
    seo: {
      title: "Mechanical Services — WOL Technical Services, Dubai",
      description: "Mechanical equipment services for oil & gas and industrial plants in the UAE: rotating and static equipment, alignment, bolting and shutdown support.",
    },
  },
  {
    slug: "piping-fabrication",
    index: "02",
    title: "Piping & Fabrication",
    shortTitle: "Piping",
    menuDescription: "Process and utility piping, spools, supports and tie-ins.",
    tagline: "Piping that follows the isometric — and the site.",
    summary:
      "Fabrication and installation of process and utility piping: spool fabrication, erection, supports, modifications and tie-ins for plant and facility projects.",
    icon: "piping",
    layout: "technical",
    image: {
      src: "/images/services/piping-fabrication.jpg",
      alt: "Grayscale photograph of industrial metal pipes",
      focal: "50% 45%",
    },
    intro: [
      "Piping connects every system in a facility. Whether it is a new line, a re-route or a replacement of a corroded section, the work has to match the isometric, the specification and the physical reality of the site.",
      "WOL approaches piping as a controlled fabrication and installation process, with material traceability and dimensional checks built into the workflow.",
    ],
    capabilities: [
      { title: "Spool fabrication", body: "Cutting, fit-up and welding of carbon steel and stainless steel spools to isometric drawings." },
      { title: "Site erection", body: "Installation of fabricated spools, alignment to equipment nozzles and flange make-up." },
      { title: "Pipe supports", body: "Fabrication and installation of standard and special supports, including shoes, guides and anchors." },
      { title: "Modifications & re-routes", body: "Tie-ins, line re-routing and replacement of deteriorated sections." },
      { title: "Utility piping", body: "Air, water, nitrogen and drainage systems for plant and facility use." },
      { title: "Testing support", body: "Preparation and support for hydrostatic and pneumatic testing as directed by the client." },
    ],
    applications: [
      "Process piping modifications in operating plants",
      "New utility lines for plant expansions",
      "Replacement of corroded piping sections",
      "Skid and package interconnecting piping",
      "Pipe rack and support installation",
    ],
    approach: [
      { title: "Drawing review", body: "Isometrics, line lists and specifications are reviewed before material is cut, and clarifications raised early." },
      { title: "Traceability", body: "Material and welds are tracked against spool and joint numbers so that the installed line can be reconciled with records." },
      { title: "Dimensional control", body: "Fit-up and final dimensions are checked against drawings before spools leave the shop and again at site." },
    ],
    safetyQuality: [
      "Hot work controls and fire watch in line with client permit systems",
      "Welder and procedure records maintained for each joint",
      "Visual inspection and dimensional checks at defined stages",
      "NDT and testing carried out by client-approved parties as specified",
    ],
    process: [
      { step: "01", title: "Review", body: "Isometrics, specs and site conditions assessed." },
      { step: "02", title: "Prepare", body: "Material take-off, spool plan and fabrication sequence." },
      { step: "03", title: "Fabricate", body: "Cutting, fit-up and welding with stage inspection." },
      { step: "04", title: "Install", body: "Erection, alignment, supports and flange make-up." },
      { step: "05", title: "Test", body: "Support for testing and reinstatement." },
      { step: "06", title: "Document", body: "As-built markups and records handed over." },
    ],
    faq: [
      { q: "Which materials do you fabricate?", a: "Carbon steel and stainless steel piping are the most common. Other materials are considered on a project basis against the applicable specification." },
      { q: "Can spools be fabricated off-site?", a: "Yes. Where the project allows, spools are fabricated in a workshop environment and delivered to site for erection." },
      { q: "Who performs NDT on welds?", a: "NDT is performed by inspection parties approved by the client and specified in the project requirements." },
    ],
    relatedIndustries: ["oil-gas", "refineries", "petrochemical", "industrial-plants"],
    seo: {
      title: "Piping & Fabrication — WOL Technical Services, Dubai",
      description: "Process and utility piping fabrication and installation for oil & gas and industrial facilities in the UAE.",
    },
  },
  {
    slug: "welding-fabrication",
    index: "03",
    title: "Welding & Fabrication",
    shortTitle: "Welding",
    menuDescription: "Structural and pressure welding, structural steel and workshop fabrication.",
    tagline: "Controlled arcs, traceable joints, sound fabrication.",
    summary:
      "Welding and steel fabrication for plant, structural and equipment applications — carried out to the client's specification with documented welder and procedure records.",
    icon: "welding",
    layout: "immersive",
    image: {
      src: "/images/services/welding-fabrication.jpg",
      alt: "Welder working with a welding machine in a workshop",
      focal: "50% 40%",
    },
    intro: [
      "A weld is a permanent decision. The consumables, the preparation, the preheat and the technique all have to be right before the arc is struck — and they have to be recorded afterwards.",
      "WOL's welding and fabrication service treats every joint as a documented, inspectable piece of work.",
    ],
    capabilities: [
      { title: "Welding processes", body: "SMAW, GTAW and GMAW/FCAW as required by the applicable procedure and material." },
      { title: "Structural steel", body: "Fabrication and erection of platforms, access structures, frames and supports." },
      { title: "Pressure-retaining welds", body: "Piping and equipment welds performed to the procedures required by the project." },
      { title: "Repair welding", body: "Assessment and controlled repair of damaged or worn components." },
      { title: "Workshop fabrication", body: "Brackets, frames, skids and miscellaneous steel fabricated to drawing." },
      { title: "Site welding", body: "Mobile welding crews with hot-work controls for in-situ work." },
    ],
    applications: [
      "Pipe and spool welding",
      "Structural steel platforms and walkways",
      "Equipment supports and bases",
      "Repair of steel structures and components",
      "Custom fabrication to engineering drawings",
    ],
    approach: [
      { title: "Procedure first", body: "Welding is carried out to the procedure required by the specification; welder records are maintained for the work performed." },
      { title: "Preparation", body: "Joint preparation, cleanliness and fit-up are inspected before welding begins." },
      { title: "Inspection stages", body: "Visual inspection is performed at defined stages, and NDT is supported where specified by the client." },
    ],
    safetyQuality: [
      "Hot-work permits, fire watch and fume control for every welding activity",
      "Consumable storage and handling per manufacturer requirements",
      "Welder and procedure records maintained for each joint",
      "Visual and dimensional checks before release",
    ],
    process: [
      { step: "01", title: "Specify", body: "Materials, procedures and acceptance criteria confirmed." },
      { step: "02", title: "Prepare", body: "Cutting, bevelling and fit-up inspection." },
      { step: "03", title: "Weld", body: "Controlled welding with interpass monitoring." },
      { step: "04", title: "Inspect", body: "Visual inspection and NDT support." },
      { step: "05", title: "Finish", body: "Grinding, blasting and coating support as required." },
      { step: "06", title: "Release", body: "Records compiled and work released to the client." },
    ],
    faq: [
      { q: "Do you hold welding procedure qualifications?", a: "Procedure and welder qualification records are provided against project requirements. Specific qualifications held are confirmed at enquiry stage. [To be confirmed]" },
      { q: "Can you weld on site as well as in a workshop?", a: "Yes. Site welding is carried out under the client's hot-work permit system with appropriate fire watch and fume control." },
      { q: "What about painting and coating after welding?", a: "Surface preparation and coating can be coordinated as part of the fabrication scope where required." },
    ],
    relatedIndustries: ["oil-gas", "refineries", "industrial-plants", "marine-offshore"],
    seo: {
      title: "Welding & Fabrication — WOL Technical Services, Dubai",
      description: "Welding and steel fabrication services for oil & gas, industrial and marine applications in the UAE.",
    },
  },
  {
    slug: "electrical-instrumentation",
    index: "04",
    title: "Electrical & Instrumentation",
    shortTitle: "E&I",
    menuDescription: "Panels, cabling, terminations, instrumentation and loop checks.",
    tagline: "Power and signal, installed and verified.",
    summary:
      "Electrical and instrumentation installation and support: cable routing and termination, panel and junction box work, instrument installation, calibration support and loop checking.",
    icon: "electrical",
    layout: "split",
    image: {
      src: "/images/services/electrical-instrumentation.jpg",
      alt: "Wiring terminated inside an industrial switch box",
      focal: "50% 50%",
    },
    intro: [
      "Electrical and instrumentation work sits at the interface between the physical plant and the control system. Cable schedules, termination drawings and loop diagrams have to be followed precisely — and the installed result has to be verified.",
      "WOL provides E&I crews who work from the drawings, keep records as they go, and hand over a system that is ready for commissioning.",
    ],
    capabilities: [
      { title: "Cable installation", body: "Cable tray, conduit, pulling and glanding for power, control and instrument cables." },
      { title: "Terminations", body: "Panel, junction box, motor and instrument terminations against termination schedules." },
      { title: "Instrument installation", body: "Mounting of field instruments, impulse tubing and instrument supports." },
      { title: "Loop checking", body: "Point-to-point and loop checks from field device to control system, with records." },
      { title: "Panel work", body: "Installation and modification of distribution boards, control panels and marshalling cabinets." },
      { title: "Lighting & small power", body: "Industrial lighting, sockets and small power circuits for plant and facility areas." },
    ],
    applications: [
      "New instrument installation for process modifications",
      "Cable replacement and re-termination",
      "Panel and junction box modifications",
      "Loop checking ahead of commissioning",
      "Lighting upgrades in plant areas",
    ],
    approach: [
      { title: "Drawing-driven", body: "Cable schedules, termination drawings and loop diagrams are the reference for all work and are red-lined as work progresses." },
      { title: "Segregation & routing", body: "Power and signal cables are routed and segregated per the specification to protect signal integrity." },
      { title: "Verification", body: "Continuity, insulation and loop checks are recorded before energisation or commissioning." },
    ],
    safetyQuality: [
      "Electrical isolation and lock-out confirmed before work",
      "Hazardous-area requirements observed where applicable",
      "Test equipment calibration maintained and recorded",
      "Loop-check and termination records provided at handover",
    ],
    process: [
      { step: "01", title: "Review", body: "Drawings, schedules and area classification reviewed." },
      { step: "02", title: "Route", body: "Tray, conduit and cable routes installed." },
      { step: "03", title: "Install", body: "Cables pulled, glanded and instruments mounted." },
      { step: "04", title: "Terminate", body: "Terminations completed against schedules." },
      { step: "05", title: "Check", body: "Continuity, insulation and loop checks." },
      { step: "06", title: "Hand over", body: "Red-lined drawings and records issued." },
    ],
    faq: [
      { q: "Do you work in hazardous (Ex) areas?", a: "Work in classified areas follows the client's specification and applicable requirements. Specific competencies are confirmed at enquiry stage. [To be confirmed]" },
      { q: "Can you support commissioning?", a: "Yes — loop checking and pre-commissioning support can be included so that systems are ready for the commissioning team." },
      { q: "Do you supply instruments and cable?", a: "Materials are typically free-issued by the client or procured against approval as part of the scope." },
    ],
    relatedIndustries: ["oil-gas", "refineries", "petrochemical", "energy-infrastructure"],
    seo: {
      title: "Electrical & Instrumentation — WOL Technical Services, Dubai",
      description: "Electrical and instrumentation installation, termination and loop checking for oil & gas and industrial facilities in the UAE.",
    },
  },
  {
    slug: "equipment-installation-maintenance",
    index: "05",
    title: "Equipment Installation & Maintenance",
    shortTitle: "Installation",
    menuDescription: "Rigging, setting, levelling and commissioning support for plant equipment.",
    tagline: "From delivery to running — set, aligned and maintained.",
    summary:
      "Installation of new and replacement equipment — rigging support, setting and levelling, grouting, alignment and connection — followed by planned maintenance to keep it in service.",
    icon: "installation",
    layout: "technical",
    image: {
      src: "/images/services/equipment-installation-maintenance.jpg",
      alt: "Crane lifting a large load against the sky",
      focal: "50% 40%",
    },
    intro: [
      "New equipment only performs as well as its installation. Base preparation, levelling, alignment and the connections to piping and electrical systems all determine whether a machine runs as designed.",
      "WOL installs equipment methodically and then supports it through its service life with planned maintenance.",
    ],
    capabilities: [
      { title: "Rigging & setting", body: "Lift planning support, rigging and positioning of equipment onto prepared foundations." },
      { title: "Levelling & grouting", body: "Levelling, shimming and grouting of baseplates and skids." },
      { title: "Alignment", body: "Driver-to-driven alignment and final checks prior to coupling." },
      { title: "Connections", body: "Coordination of piping, electrical and instrument connections to the installed equipment." },
      { title: "Pre-commissioning", body: "Mechanical completion checks and support to the commissioning team." },
      { title: "Planned maintenance", body: "Scheduled inspections and servicing to maintain equipment condition." },
    ],
    applications: [
      "Pump and motor replacement",
      "Package unit installation",
      "Compressor and blower installation",
      "Tank and vessel setting",
      "Ongoing preventive maintenance programmes",
    ],
    approach: [
      { title: "Foundation & base review", body: "Foundations and baseplates are checked before equipment arrives so that installation is not delayed by surprises." },
      { title: "Controlled sequence", body: "Setting, levelling, grouting and alignment follow a defined sequence with checks at each stage." },
      { title: "Service planning", body: "Post-installation, a maintenance plan is agreed with the client based on manufacturer and operational requirements." },
    ],
    safetyQuality: [
      "Lift plans and rigging checks for all mechanical lifts",
      "Exclusion zones and communication during lifting operations",
      "Alignment and levelling records retained for each installation",
      "Maintenance activities logged and reported",
    ],
    process: [
      { step: "01", title: "Assess", body: "Foundations, access and lifting requirements reviewed." },
      { step: "02", title: "Plan", body: "Lift plan, sequence and resources agreed." },
      { step: "03", title: "Set", body: "Equipment rigged, positioned and levelled." },
      { step: "04", title: "Fix", body: "Grouting, anchoring and alignment." },
      { step: "05", title: "Connect", body: "Interfaces completed and checked." },
      { step: "06", title: "Maintain", body: "Planned maintenance programme in place." },
    ],
    faq: [
      { q: "Do you provide cranes and lifting equipment?", a: "Lifting equipment is arranged per project, either through the client or through approved lifting contractors, with lift plans prepared accordingly." },
      { q: "Can you take over maintenance of existing equipment?", a: "Yes. A condition survey is carried out first so that the maintenance plan reflects the actual state of the equipment." },
    ],
    relatedIndustries: ["industrial-plants", "energy-infrastructure", "oil-gas"],
    seo: {
      title: "Equipment Installation & Maintenance — WOL Technical Services, Dubai",
      description: "Installation, alignment and planned maintenance of industrial equipment for facilities in the UAE.",
    },
  },
  {
    slug: "industrial-maintenance",
    index: "06",
    title: "Industrial Maintenance",
    shortTitle: "Maintenance",
    menuDescription: "Preventive, corrective and shutdown maintenance across plant assets.",
    tagline: "Keeping plant available — preventively, correctively, reliably.",
    summary:
      "Planned and reactive maintenance for industrial facilities: preventive programmes, corrective repairs, shutdown support and multi-discipline crews.",
    icon: "maintenance",
    layout: "editorial",
    image: {
      src: "/images/services/industrial-maintenance.jpg",
      alt: "Technician operating industrial machinery inside a factory",
      focal: "50% 35%",
    },
    intro: [
      "Availability is the real measure of an industrial facility. Maintenance that is planned, executed and recorded well keeps equipment running and reduces the unplanned stops that cost the most.",
      "WOL supports facilities with maintenance crews that cover mechanical, piping, electrical and general plant scopes under one point of coordination.",
    ],
    capabilities: [
      { title: "Preventive maintenance", body: "Scheduled inspections, lubrication, adjustments and component replacement." },
      { title: "Corrective maintenance", body: "Diagnosis and repair of faults to return equipment to service." },
      { title: "Shutdown & turnaround support", body: "Multi-discipline crews and supervision for planned outages." },
      { title: "Plant housekeeping", body: "Cleaning, minor repairs and general upkeep of plant areas." },
      { title: "Condition reporting", body: "Observations and recommendations recorded during routine work." },
      { title: "Maintenance coordination", body: "A single point of contact for multi-discipline maintenance scopes." },
    ],
    applications: [
      "Annual maintenance contracts",
      "Shutdown and turnaround manpower",
      "Breakdown repair support",
      "Utility system maintenance",
      "Facility and plant upkeep",
    ],
    approach: [
      { title: "Asset understanding", body: "Maintenance starts with an understanding of the asset list, criticality and history." },
      { title: "Planned intervals", body: "Work is scheduled to manufacturer and operational requirements and adjusted based on findings." },
      { title: "Records", body: "Every intervention is recorded so that trends can be seen and decisions made on evidence." },
    ],
    safetyQuality: [
      "Permit-to-work compliance for every maintenance task",
      "Task risk assessments reviewed with crews",
      "Work orders closed with records and findings",
      "Escalation of significant findings to the client without delay",
    ],
    process: [
      { step: "01", title: "Survey", body: "Asset review and condition assessment." },
      { step: "02", title: "Schedule", body: "Maintenance plan and intervals agreed." },
      { step: "03", title: "Execute", body: "Planned tasks carried out and recorded." },
      { step: "04", title: "Respond", body: "Corrective work when faults arise." },
      { step: "05", title: "Report", body: "Findings and trends reported." },
      { step: "06", title: "Improve", body: "Plan adjusted based on evidence." },
    ],
    faq: [
      { q: "Do you offer maintenance contracts?", a: "Yes. Contracts are structured around the client's asset list and operational requirements, with scope and frequency agreed up front." },
      { q: "Can you respond to breakdowns?", a: "Response arrangements are agreed as part of the contract. Response times depend on location and scope. [To be confirmed]" },
    ],
    relatedIndustries: ["industrial-plants", "refineries", "petrochemical", "energy-infrastructure"],
    seo: {
      title: "Industrial Maintenance — WOL Technical Services, Dubai",
      description: "Preventive, corrective and shutdown maintenance services for industrial facilities in the UAE.",
    },
  },
  {
    slug: "oil-gas-technical-support",
    index: "07",
    title: "Oil & Gas Technical Support",
    shortTitle: "Technical Support",
    menuDescription: "Skilled technical manpower and supervision for oil & gas operations.",
    tagline: "The right people, on site, when the work needs them.",
    summary:
      "Technical manpower and supervision for oil & gas operators and contractors: supervisors, technicians and tradespeople supplied for short-term scopes and long-term support.",
    icon: "support",
    layout: "split",
    image: {
      src: "/images/services/oil-gas-technical-support.jpg",
      alt: "Engineer in a hard hat at an oil and gas site",
      focal: "50% 30%",
    },
    intro: [
      "Oil & gas operations depend on competent people being available at the right time — for a shutdown, a project peak or an ongoing operational need.",
      "WOL provides technical support personnel and supervision that integrate with the client's systems and work under the client's permit and safety arrangements.",
    ],
    capabilities: [
      { title: "Supervision", body: "Discipline supervisors and foremen for mechanical, piping, welding and E&I scopes." },
      { title: "Technicians", body: "Mechanical, electrical and instrument technicians for operational support." },
      { title: "Tradespeople", body: "Fitters, welders, riggers, electricians and helpers." },
      { title: "Short-term scopes", body: "Crews for defined tasks, outages and project peaks." },
      { title: "Long-term support", body: "Embedded personnel supporting client maintenance teams." },
      { title: "Coordination", body: "Mobilisation, site induction and administration handled by WOL." },
    ],
    applications: [
      "Shutdown and turnaround crews",
      "Project peak manpower",
      "Operational maintenance support",
      "Supervision for subcontracted scopes",
      "Technical support for offshore and onshore facilities",
    ],
    approach: [
      { title: "Competence matching", body: "Personnel are matched to the scope based on trade, experience and the client's requirements." },
      { title: "Integration", body: "Crews work under the client's permit, safety and reporting systems from day one." },
      { title: "Continuity", body: "Consistent teams are maintained for ongoing scopes so that site knowledge is retained." },
    ],
    safetyQuality: [
      "Personnel inducted to client site requirements before mobilisation",
      "Trade records and competencies available for client review",
      "Daily reporting and supervision on site",
      "Replacement arrangements to maintain continuity",
    ],
    process: [
      { step: "01", title: "Define", body: "Trades, numbers, duration and location agreed." },
      { step: "02", title: "Select", body: "Personnel matched to the requirement." },
      { step: "03", title: "Mobilise", body: "Inductions, documentation and travel arranged." },
      { step: "04", title: "Support", body: "Personnel deployed under client systems." },
      { step: "05", title: "Report", body: "Daily reporting and performance review." },
      { step: "06", title: "Demobilise", body: "Orderly demobilisation or extension." },
    ],
    faq: [
      { q: "Can WOL provide personnel for offshore work?", a: "Offshore assignments are considered on a project basis, subject to the applicable training and medical requirements. [To be confirmed]" },
      { q: "How quickly can crews mobilise?", a: "Mobilisation time depends on the trades and numbers required and any site-specific inductions. Timelines are agreed at enquiry stage." },
    ],
    relatedIndustries: ["oil-gas", "marine-offshore", "refineries"],
    seo: {
      title: "Oil & Gas Technical Support — WOL Technical Services, Dubai",
      description: "Technical manpower and supervision for oil & gas operators and contractors in the UAE.",
    },
  },
  {
    slug: "project-site-technical-services",
    index: "08",
    title: "Project & Site Technical Services",
    shortTitle: "Project & Site",
    menuDescription: "Multi-discipline site scopes delivered under one point of coordination.",
    tagline: "One team across mechanical, piping, welding and E&I.",
    summary:
      "Coordinated delivery of multi-discipline site scopes for projects and facility upgrades — planning, execution, inspection support and documentation under a single point of responsibility.",
    icon: "site",
    layout: "immersive",
    image: {
      src: "/images/services/project-site-technical-services.jpg",
      alt: "Two workers on an industrial project site",
      focal: "50% 40%",
    },
    intro: [
      "Facility projects rarely fit inside one discipline. A modification might need piping, structural steel, electrical work and mechanical reinstatement — and they all need to be coordinated.",
      "WOL takes on site scopes as a whole, planning the interfaces and delivering the work with a single team and a single point of contact.",
    ],
    capabilities: [
      { title: "Scope planning", body: "Breakdown of multi-discipline scopes into sequenced work packages." },
      { title: "Site execution", body: "Mechanical, piping, welding and E&I crews under WOL supervision." },
      { title: "Interface management", body: "Coordination between disciplines and with the client's other contractors." },
      { title: "Inspection support", body: "Hold points, inspection requests and support to client and third-party inspection." },
      { title: "Documentation", body: "Method statements, progress reports and handover documentation." },
      { title: "Close-out", body: "Punch-list clearance and orderly completion." },
    ],
    applications: [
      "Plant modifications and debottlenecking",
      "Facility upgrades and brownfield projects",
      "Package and skid installation with tie-ins",
      "Structural and access improvements",
      "Turnaround work packages",
    ],
    approach: [
      { title: "One plan", body: "All disciplines are planned together so that sequencing conflicts are resolved before work starts." },
      { title: "Visible progress", body: "Progress is reported against the plan with clear ownership of each work package." },
      { title: "Clean close-out", body: "Punch items are tracked to closure and documentation compiled as the work progresses, not after." },
    ],
    safetyQuality: [
      "Project-specific HSE plan aligned with client requirements",
      "Method statements and risk assessments per work package",
      "Inspection and test plans agreed with the client",
      "Progress and quality records maintained throughout",
    ],
    process: [
      { step: "01", title: "Understand", body: "Scope, constraints and interfaces defined." },
      { step: "02", title: "Plan", body: "Work packages, sequence and resources." },
      { step: "03", title: "Prepare", body: "Method statements, materials and mobilisation." },
      { step: "04", title: "Execute", body: "Multi-discipline execution with supervision." },
      { step: "05", title: "Inspect", body: "Hold points and inspection support." },
      { step: "06", title: "Close out", body: "Punch clearance and documentation." },
    ],
    faq: [
      { q: "Can WOL act as the single contractor for a multi-discipline scope?", a: "Yes. That is the purpose of this service — one team and one point of contact across the disciplines involved." },
      { q: "Do you provide engineering?", a: "WOL executes to client-provided engineering. Engineering support is arranged on a project basis where required. [To be confirmed]" },
    ],
    relatedIndustries: ["oil-gas", "refineries", "petrochemical", "industrial-plants", "energy-infrastructure"],
    seo: {
      title: "Project & Site Technical Services — WOL Technical Services, Dubai",
      description: "Multi-discipline site scopes for projects and facility upgrades in the UAE, delivered under one point of coordination.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceSlugs = services.map((s) => s.slug);

// Build-time guard: every service must have a unique primary image.
const imageSources = new Set(services.map((s) => s.image.src));
if (imageSources.size !== services.length) {
  throw new Error("Service images must be unique — duplicate image detected in content/services.ts");
}
