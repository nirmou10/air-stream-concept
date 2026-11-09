// All copy and placeholder business data lives here (English). Keep keys stable so a
// Spanish dictionary can be added later. Never replace placeholders with invented facts.

export type ServiceId = "ac-repair" | "installation" | "maintenance" | "heating" | "not-sure";

export const business = {
  name: "[Business Name]",
  phoneDisplay: "[Phone — to be confirmed]",
  phoneHref: "", // empty until a real number is confirmed
  license: "[TACLA License # — to be confirmed]",
  insurance: "[Insurance details — to be confirmed]",
  experience: "[Years in business — to be confirmed]",
  serviceArea: "[Service area in Texas — to be confirmed]",
  hours: "[Business hours — to be confirmed]",
  emergency: "[Emergency / after-hours availability — to be confirmed]",
};

export const services: { id: Exclude<ServiceId, "not-sure">; title: string; body: string }[] = [
  {
    id: "ac-repair",
    title: "AC repair & troubleshooting",
    body: "Warm air, weak airflow, strange noises, or a system that won't turn on.",
  },
  {
    id: "installation",
    title: "Installation & replacement",
    body: "New or replacement heating and cooling systems sized for your property.",
  },
  {
    id: "maintenance",
    title: "Maintenance & inspections",
    body: "Routine check-ups that help keep equipment running efficiently.",
  },
  {
    id: "heating",
    title: "Heating repair & maintenance",
    body: "Furnace and heat pump service for the cooler months.",
  },
];

export const serviceOptions: { id: ServiceId; label: string }[] = [
  { id: "ac-repair", label: "AC repair" },
  { id: "installation", label: "Installation / replacement" },
  { id: "maintenance", label: "Maintenance / inspection" },
  { id: "heating", label: "Heating" },
  { id: "not-sure", label: "Not sure" },
];

export const audiences = [
  { title: "Homeowners", body: "Comfort and reliable systems for your household." },
  { title: "Property owners", body: "Rentals and multi-unit properties that need dependable service." },
  { title: "Small businesses", body: "Offices and shops that need a comfortable space for staff and customers." },
];

export const symptoms: { title: string; body: string; service: ServiceId }[] = [
  { title: "AC blowing warm air", body: "Often a repair visit.", service: "ac-repair" },
  { title: "Strange noises", body: "Rattling, grinding, or squealing.", service: "ac-repair" },
  { title: "High energy bills", body: "A check-up may help find the cause.", service: "maintenance" },
  { title: "System 10–15+ years old", body: "Worth discussing replacement options.", service: "installation" },
];

export const steps = [
  { title: "Request", body: "Tell us what's going on using the form or by phone." },
  { title: "We confirm a time", body: "The team contacts you to schedule a visit." },
  { title: "Technician visit", body: "A technician inspects the system and explains options." },
];

export const faqs = [
  {
    q: "What areas do you serve?",
    a: `${business.serviceArea}`,
  },
  {
    q: "Do you offer emergency service?",
    a: `${business.emergency}`,
  },
  {
    q: "How often should my system be maintained?",
    a: "Many manufacturers recommend a professional check-up about once a year for each system (cooling and heating). Check your equipment's manual for specifics.",
  },
  {
    q: "Can you give me a price online?",
    a: "No. Pricing depends on an on-site assessment. Request service and the team will follow up.",
  },
  {
    q: "What should I do if I smell gas?",
    a: "Leave the building right away, avoid using switches or flames, and call 911 or your gas utility from a safe place.",
  },
];

export const disclaimers = {
  prototype:
    "This website is a prototype for demonstration purposes. Business details shown in brackets are placeholders and have not been confirmed.",
  form: "Demo only — please do not enter real personal information. Nothing is sent or stored.",
  assistant: "Prototype assistant — general guidance only, not a diagnosis or quote.",
  image: "Illustrative image",
};
