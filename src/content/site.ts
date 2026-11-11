// All copy and business data lives here (English). Keep keys stable so a
// Spanish dictionary can be added later. Only company-published facts appear;
// do not add licenses, prices, reviews, or other unverified details.

export type ServiceId = "ac" | "heating" | "maintenance" | "ductless";
export type AudienceId = "commercial" | "government" | "industrial";
export type ServicePath =
  | "/air-conditioning-service-installation"
  | "/heating-service-installation"
  | "/hvac-maintenance-agreements"
  | "/ductless-hvac-services";

export const business = {
  brand: "Air-Stream",
  fullName: "Air-Stream Air Conditioning and Heating Co. Inc.",
  address: "4343 Dividend, San Antonio, TX 78219",
  phoneLocal: { display: "210-533-3264", href: "tel:+12105333264" },
  phoneTollFree: { display: "800-223-8017", href: "tel:+18002238017" },
  serviceArea: "San Antonio, Texas",
};

export const trustIndicators = [
  "Serving San Antonio Since 1974",
  "24/7/365 Service Availability",
  "NATE-Certified Technicians",
];

export const cta = {
  primary: "Request a Commercial HVAC Consultation",
};

export const services: {
  id: ServiceId;
  title: string;
  body: string;
  path: ServicePath;
  image: string;
  imageAlt: string;
  pricingBadge: string;
  quoteLabel: string;
}[] = [
  {
    id: "ac",
    title: "Air Conditioning Service & Installation",
    body: "Service, repair, and installation of air conditioning systems for commercial buildings, performed by NATE-certified technicians.",
    path: "/air-conditioning-service-installation",
    image: "/images/ac-service.jpg",
    imageAlt: "Licensed stock photo of air conditioning equipment and refrigerant lines",
    pricingBadge: "Project-based pricing",
    quoteLabel: "Request a Quote",
  },
  {
    id: "heating",
    title: "Heating System Service & Installation",
    body: "Heating system service and installation for offices, facilities, and industrial properties across San Antonio.",
    path: "/heating-service-installation",
    image: "/images/heating.jpg",
    imageAlt: "Licensed stock photo of a residential-style heating system and ductwork",
    pricingBadge: "Custom system quote",
    quoteLabel: "Request a Quote",
  },
  {
    id: "maintenance",
    title: "HVAC Maintenance Agreements",
    body: "Planned maintenance agreements that help keep commercial HVAC systems efficient, compliant, and ready for peak demand.",
    path: "/hvac-maintenance-agreements",
    image: "/images/maintenance.jpg",
    imageAlt: "Licensed stock photo of a technician servicing an HVAC unit",
    pricingBadge: "Annual contract",
    quoteLabel: "Request a Maintenance Proposal",
  },
  {
    id: "ductless",
    title: "Ductless HVAC Installation & Service",
    body: "Ductless HVAC installation and service for spaces where traditional ductwork is not practical or efficient.",
    path: "/ductless-hvac-services",
    image: "/images/ductless.jpg",
    imageAlt: "Licensed stock photo of a ductless mini-split indoor unit",
    pricingBadge: "Per-zone or project quote",
    quoteLabel: "Request a Quote",
  },
];

export const serviceOptions: { id: ServiceId; label: string }[] = services.map((s) => ({
  id: s.id,
  label: s.title,
}));

export const servicePages: Record<
  ServiceId,
  {
    metaTitle: string;
    metaDescription: string;
    intro: string;
    problems: string[];
    advertised: string[];
    scope: string[];
    benefits: string[];
    pricingNote: string;
  }
> = {
  ac: {
    metaTitle: "Air Conditioning Service & Installation in San Antonio | Air-Stream",
    metaDescription:
      "Air-Stream provides air conditioning service, repair, and installation for commercial, government, and industrial facilities in San Antonio, Texas.",
    intro:
      "Air-Stream provides air conditioning service, repair, and installation for commercial, government, and industrial facilities across San Antonio.",
    problems: [
      "Uneven cooling or hot spots across occupied areas",
      "Rising energy use without a matching change in comfort",
      "Aging equipment that needs repair or planned replacement",
      "Tenant and occupant complaints about comfort and reliability",
    ],
    advertised: [
      "NATE-certified technicians",
      "24/7/365 service availability",
      "Serving San Antonio since 1974",
      "Air conditioning service and installation",
    ],
    scope: [
      "Inspection and diagnosis of the existing system",
      "Repair of system components and controls",
      "Assessment of repair versus replacement options",
      "Installation of new air conditioning equipment",
      "Startup and performance check after the work is complete",
    ],
    benefits: [
      "Comfortable, consistent temperatures support productivity and daily operations",
      "Efficient systems can help control utility costs over time",
      "Proactive service helps reduce the chance of disruptive breakdowns during business hours",
    ],
    pricingNote:
      "Air conditioning service and installation is quoted on a project basis once the company has assessed the facility and the scope of work.",
  },
  heating: {
    metaTitle: "Heating System Service & Installation in San Antonio | Air-Stream",
    metaDescription:
      "Air-Stream provides heating system service and installation for offices, facilities, and industrial properties in San Antonio, Texas.",
    intro:
      "Air-Stream provides heating system service and installation for offices, facilities, and industrial properties across San Antonio.",
    problems: [
      "Cold zones or uneven heat during colder months",
      "Equipment that struggles to reach setpoint on cold days",
      "Noisy or inefficient heating equipment",
      "Aging systems that are due for repair or replacement",
    ],
    advertised: [
      "NATE-certified technicians",
      "24/7/365 service availability",
      "Serving San Antonio since 1974",
      "Heating system service and installation",
    ],
    scope: [
      "Inspection and diagnosis of the heating system",
      "Repair of heating system components and controls",
      "Assessment of repair versus replacement options",
      "Installation of new heating equipment",
      "Startup and system check after the work is complete",
    ],
    benefits: [
      "Reliable heat keeps facilities comfortable and operations running",
      "Efficient heating systems support lower operating costs",
      "Planned service helps avoid cold-weather downtime",
    ],
    pricingNote:
      "Heating work is quoted per system after an assessment of the facility and the equipment involved.",
  },
  maintenance: {
    metaTitle: "HVAC Maintenance Agreements in San Antonio | Air-Stream",
    metaDescription:
      "Air-Stream offers HVAC maintenance agreements for commercial, government, and industrial facilities in San Antonio, Texas.",
    intro:
      "Air-Stream offers HVAC maintenance agreements for commercial, government, and industrial facilities that want planned, recurring attention for their systems.",
    problems: [
      "Skipped seasonal tune-ups and filter changes",
      "Small issues that grow into larger repairs",
      "No record of who serviced the equipment or when",
      "Systems that drift out of adjustment between service visits",
    ],
    advertised: [
      "NATE-certified technicians",
      "24/7/365 service availability",
      "Serving San Antonio since 1974",
      "Maintenance agreement service",
    ],
    scope: [
      "Scheduled recurring maintenance visits",
      "Inspection of system components and controls",
      "Filter and belt checks with replacements as needed",
      "Performance review and recommended follow-up",
      "Documentation of each visit for your records",
    ],
    benefits: [
      "Consistent upkeep supports efficient, reliable system operation",
      "Early detection of wear helps prevent unexpected downtime",
      "A consistent maintenance record supports planning and budgeting",
    ],
    pricingNote:
      "Maintenance agreements are structured as an annual arrangement and are shaped by the systems and coverage your facility needs.",
  },
  ductless: {
    metaTitle: "Ductless HVAC Installation & Service in San Antonio | Air-Stream",
    metaDescription:
      "Air-Stream provides ductless HVAC installation and service for facilities in San Antonio, Texas where traditional ductwork is not practical.",
    intro:
      "Air-Stream provides ductless HVAC installation and service for facilities where traditional ductwork is not practical or efficient.",
    problems: [
      "Spaces that cannot accommodate conventional ductwork",
      "Rooms with uneven temperatures or hot and cold spots",
      "Additions or retrofits where extending ducts is disruptive",
      "Zoned comfort needs in offices, retail, or mixed use areas",
    ],
    advertised: [
      "NATE-certified technicians",
      "24/7/365 service availability",
      "Serving San Antonio since 1974",
      "Ductless HVAC installation and service",
    ],
    scope: [
      "Assessment of the space and its zoning needs",
      "Installation of ductless indoor and outdoor units",
      "Line set and electrical connections",
      "System commissioning and airflow adjustment",
      "Ongoing service and maintenance of ductless systems",
    ],
    benefits: [
      "Zone-by-zone control matches comfort to how each area is used",
      "Ductless systems can reduce the losses associated with ductwork",
      "Flexible installation fits renovations, additions, and unique floor plans",
    ],
    pricingNote:
      "Ductless work is quoted per zone or as a project after an assessment of the space and systems involved.",
  },
};

export const audiences: {
  id: AudienceId;
  title: string;
  body: string;
  path: string;
  image?: string | undefined;
  imageAlt?: string | undefined;
}[] = [
  {
    id: "commercial",
    title: "Commercial",
    body: "Offices, retail, medical, and mixed use properties that need dependable climate control during business hours.",
    path: "/commercial",
    image: "/images/commercial.jpg",
    imageAlt: "Licensed stock photo of a modern commercial office building exterior",
  },
  {
    id: "government",
    title: "Government",
    body: "Public buildings and facilities that require professional, dependable HVAC service and support.",
    path: "/government",
    image: "/images/government.jpg",
    imageAlt: "Licensed stock photo of a modern institutional building",
  },
  {
    id: "industrial",
    title: "Industrial",
    body: "Warehouses, plants, and industrial facilities with demanding heating and cooling requirements.",
    path: "/industrial",
    image: "/images/industrial.jpg",
    imageAlt: "Licensed stock photo of an industrial warehouse facility",
  },
];

export const processSteps = [
  {
    title: "Tell us about your facility",
    body: "Share your building type, equipment details, and goals through the inquiry form or by phone. The more context you provide, the better we can prepare for the first conversation.",
  },
  {
    title: "We review your needs",
    body: "The Air-Stream team follows up to understand the scope of work, your timeline, and any site conditions that matter for planning.",
  },
  {
    title: "Site assessment",
    body: "A technician evaluates your existing systems and building requirements, then recommends the options that fit your facility.",
  },
  {
    title: "Scope and planning",
    body: "You receive a clear scope of work and schedule before any commitment is made, so there are no surprises down the line.",
  },
  {
    title: "Service or installation",
    body: "NATE-certified technicians complete the work with careful attention to your operations, keeping disruption to your facility to a minimum.",
  },
];

export const about = {
  eyebrow: "About Air-Stream",
  title: "About Air-Stream Air Conditioning and Heating Co. Inc.",
  paragraphs: [
    "Air-Stream Air Conditioning and Heating Co. Inc. is a San Antonio, Texas company that has served the area since 1974. The company is located at 4343 Dividend, San Antonio, TX 78219.",
    "Air-Stream provides air conditioning, heating, maintenance agreement, and ductless HVAC services for commercial, government, and industrial facilities. Its technicians are NATE-certified, and the company advertises 24/7/365 service availability.",
  ],
};

export const pricing = {
  eyebrow: "Pricing",
  title: "Clear estimates for commercial HVAC work",
  intro:
    "Pricing depends on the facility and the scope of work, so estimates follow an assessment instead of a fixed price list.",
  factorsHeading: "What shapes your estimate",
  factors: [
    "Facility size and use",
    "Equipment type and capacity",
    "Scope of work",
    "Access and installation conditions",
    "Service coverage and response needs",
  ],
  prepareHeading: "What to prepare",
  prepare: [
    "Facility type and location",
    "The system issue or project scope",
    "Your preferred contact details",
  ],
  ctaLabel: "Request a Commercial HVAC Consultation",
  note: "Estimates depend on an assessment of your facility. This concept demo does not publish prices.",
};

export const faqs = [
  {
    q: "What areas do you serve?",
    a: "Air-Stream serves San Antonio, Texas. The company is located at 4343 Dividend, San Antonio, TX 78219.",
  },
  {
    q: "Do you offer 24/7 service?",
    a: "Air-Stream advertises 24/7/365 service availability. Call 210-533-3264 or 800-223-8017 to discuss response for your facility.",
  },
  {
    q: "Are your technicians certified?",
    a: "Yes. Air-Stream states that its technicians are NATE-certified.",
  },
  {
    q: "Do you work with government and industrial facilities?",
    a: "Air-Stream publishes services for commercial and government facilities. For industrial needs, please contact the company directly.",
  },
  {
    q: "How is commercial HVAC work priced?",
    a: "Pricing follows an assessment of your facility and systems first. The written estimate depends on the scope of work. Request a consultation to start the process.",
  },
  {
    q: "Can I get pricing online?",
    a: "No. Pricing depends on an assessment of your facility and systems. Request a consultation to discuss your project.",
  },
  {
    q: "What should I do if I smell gas or suspect a leak?",
    a: "Leave the building right away, avoid using switches or flames, and call 911 or your gas utility from a safe place.",
  },
];

export const disclaimers = {
  footerUnofficial:
    "Unofficial concept redesign. Not affiliated with Air-Stream Air Conditioning and Heating Co. Inc.",
  footerImages: "Images are licensed stock, for concept purposes.",
  form: "Demo only, no data is sent.",
};
