import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardList,
  MapPin,
  Phone,
  Wrench,
} from "lucide-react";
import {
  about,
  audiences,
  business,
  cta,
  faqs,
  pricing,
  processSteps,
  services,
  SITE_URL,
  trustIndicators,
  type AudienceId,
  type ServiceId,
} from "@/content/site";
import { RequestForm, type Prefill } from "@/components/site/RequestForm";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Air-Stream HVAC Concept | Commercial, Government & Industrial San Antonio" },
      {
        name: "description",
        content:
          "Unofficial concept redesign for Air-Stream Air Conditioning and Heating Co. Inc. HVAC service, installation, and maintenance agreements for commercial, government, and industrial facilities in San Antonio, TX.",
      },
      { property: "og:title", content: "Air-Stream HVAC Concept Redesign" },
      {
        property: "og:description",
        content:
          "Commercial, government, and industrial HVAC services in San Antonio, Texas. Unofficial concept redesign.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    service?: ServiceId;
    property?: AudienceId;
    audience?: AudienceId;
  } => {
    const result: { service?: ServiceId; property?: AudienceId; audience?: AudienceId } = {};
    const service = services.find((s) => s.id === search["service"])?.id;
    const property = audiences.find((a) => a.id === search["property"])?.id;
    const audience = audiences.find((a) => a.id === search["audience"])?.id;
    if (service) result.service = service;
    if (property) result.property = property;
    if (audience) result.audience = audience;
    return result;
  },
  component: Index,
});

const heroField =
  "mt-1.5 block w-full rounded-lg border border-navy-border bg-navy px-3.5 py-3 text-sm text-navy-foreground";
const heroLabel = "text-xs font-semibold uppercase tracking-wider text-navy-muted";

function HeroInquiry({
  onContinue,
}: {
  onContinue: (service: ServiceId, property: AudienceId) => void;
}) {
  const [service, setService] = useState<ServiceId | "">("");
  const [property, setProperty] = useState<AudienceId | "">("");
  const ready = service !== "" && property !== "";

  return (
    <div className="rounded-2xl border border-navy-border bg-navy/80 p-6 shadow-xl backdrop-blur-sm">
      <p className="font-display text-lg font-semibold">Start your inquiry</p>
      <p className="mt-1 text-sm text-navy-muted">
        Pick your facility type and service, then continue to the full form.
      </p>
      <div className="mt-5 grid gap-4">
        <div>
          <label htmlFor="hero-property" className={heroLabel}>
            Customer type
          </label>
          <select
            id="hero-property"
            value={property}
            onChange={(e) => setProperty(e.target.value as AudienceId | "")}
            className={heroField}
          >
            <option value="">Select…</option>
            {audiences.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hero-service" className={heroLabel}>
            Service
          </label>
          <select
            id="hero-service"
            value={service}
            onChange={(e) => setService(e.target.value as ServiceId | "")}
            className={heroField}
          >
            <option value="">Select…</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="button"
        disabled={!ready}
        onClick={() => ready && onContinue(service, property)}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

function Index() {
  const search = Route.useSearch();
  const [prefill, setPrefill] = useState<Prefill | null>(null);

  useEffect(() => {
    const property = search.property ?? search.audience;
    if (!search.service && !property) return;
    setPrefill({ service: search.service, property, nonce: Date.now() });
  }, [search.service, search.property, search.audience]);

  function continueToForm(service: ServiceId, property: AudienceId) {
    setPrefill({ service, property, nonce: Date.now() });
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  }

  function requestQuote(service: ServiceId) {
    setPrefill({ service, nonce: Date.now() });
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img
          src="/images/hero.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/80" aria-hidden />
        <div className="relative">
          <div className="container-site grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow">Commercial · Government · Industrial HVAC</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-5xl">
                HVAC service and installation for San Antonio facilities.
              </h1>
              <p className="mt-5 max-w-lg text-lg text-navy-muted">
                Air-Stream Air Conditioning and Heating Co. Inc. has served San Antonio since 1974
                with NATE-certified technicians and 24/7/365 availability.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#consultation"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground transition hover:brightness-105"
                >
                  {cta.primary} <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={business.phoneLocal.href}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-navy-border px-6 font-semibold hover:bg-navy-border"
                >
                  <Phone className="h-4 w-4" aria-hidden /> Call {business.phoneLocal.display}
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <HeroInquiry onContinue={continueToForm} />
            </div>
          </div>
          <div className="border-t border-navy-border">
            <ul className="container-site flex flex-wrap justify-center gap-x-8 gap-y-2 py-5 text-sm font-medium text-navy-muted">
              {trustIndicators.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About */}
      <Reveal as="section" className="container-site py-16 md:py-20">
        <p className="eyebrow">{about.eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">{about.title}</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="space-y-4 text-muted-foreground lg:col-span-7">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-5">
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {business.address}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <a
                href={business.phoneLocal.href}
                className="inline-flex min-h-11 items-center font-semibold text-foreground"
              >
                {business.phoneLocal.display}
              </a>
              <span aria-hidden>·</span>
              <a
                href={business.phoneTollFree.href}
                className="inline-flex min-h-11 items-center font-semibold text-foreground"
              >
                {business.phoneTollFree.display}
              </a>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Serving {business.serviceArea} · 24/7/365 availability
            </p>
          </div>
        </div>
      </Reveal>

      {/* Services */}
      <Reveal as="section" className="container-site pb-16 md:pb-24">
        <p className="eyebrow">Services</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
          Four services for demanding facilities
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-flex w-fit rounded-full border border-steel/40 bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                  {s.pricingBadge}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.body}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <button
                    type="button"
                    onClick={() => requestQuote(s.id)}
                    className="inline-flex min-h-11 items-center justify-center gap-1 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:brightness-105"
                  >
                    {s.quoteLabel} <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                  <Link
                    to={s.path}
                    className="inline-flex min-h-11 items-center gap-1 self-start text-sm font-bold text-foreground underline decoration-steel decoration-2 underline-offset-4"
                  >
                    Learn More <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Who we serve */}
      <Reveal as="section" className="bg-secondary py-16 md:py-24">
        <div className="container-site">
          <p className="eyebrow">Who we serve</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Built for commercial, government, and industrial work
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {audiences.map((a) => (
              <article
                key={a.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.imageAlt ?? ""}
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <ImagePlaceholder className="h-full w-full rounded-none border-0" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.body}</p>
                  <Link
                    to={a.path}
                    className="mt-5 inline-flex min-h-11 items-center gap-1 self-start text-sm font-bold text-foreground underline decoration-steel decoration-2 underline-offset-4"
                  >
                    Learn More <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Process */}
      <Reveal as="section" className="container-site py-16 md:py-24">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">A clear five step process</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          A proposed customer journey for this concept demo
        </p>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <li
              key={s.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  loading="lazy"
                  style={{ objectPosition: s.objectPosition }}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-display text-2xl font-bold text-steel">0{i + 1}</span>
                <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Capabilities summary */}
      <Reveal as="section" className="bg-navy py-16 text-navy-foreground md:py-24">
        <div className="container-site">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            What Air-Stream can take on
          </h2>
          <p className="mt-4 max-w-2xl text-navy-muted">
            A summary of the services, facility types, and engagement model published by the
            company.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-navy-border bg-navy/60 p-6">
              <Wrench className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-4 font-semibold">HVAC services</h3>
              <ul className="mt-3 space-y-2 text-sm text-navy-muted">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={s.path}
                      className="inline-flex min-h-11 items-center hover:text-navy-foreground"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-navy-border bg-navy/60 p-6">
              <Building2 className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-4 font-semibold">Facility types</h3>
              <ul className="mt-3 space-y-2 text-sm text-navy-muted">
                {audiences.map((a) => (
                  <li key={a.id}>
                    <Link
                      to={a.path}
                      className="inline-flex min-h-11 items-center hover:text-navy-foreground"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-navy-border bg-navy/60 p-6">
              <ClipboardList className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-4 font-semibold">Engagement process</h3>
              <ol className="mt-3 space-y-2 text-sm text-navy-muted">
                {processSteps.map((s, i) => (
                  <li key={s.title}>
                    <span className="font-semibold text-navy-foreground">{i + 1}.</span> {s.title}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-navy-border bg-navy/60 p-6">
              <MapPin className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-4 font-semibold">Based in San Antonio</h3>
              <p className="mt-3 text-sm text-navy-muted">{business.address}</p>
              <p className="mt-2 text-sm text-navy-muted">
                <a
                  href={business.phoneLocal.href}
                  className="inline-flex min-h-11 items-center hover:text-navy-foreground"
                >
                  {business.phoneLocal.display}
                </a>{" "}
                ·{" "}
                <a
                  href={business.phoneTollFree.href}
                  className="inline-flex min-h-11 items-center hover:text-navy-foreground"
                >
                  {business.phoneTollFree.display}
                </a>
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Pricing */}
      <Reveal as="section" className="bg-secondary py-16 md:py-24">
        <div className="container-site">
          <p className="eyebrow">{pricing.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">{pricing.title}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{pricing.intro}</p>

          <h3 className="mt-10 text-lg font-semibold">{pricing.factorsHeading}</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pricing.factors.map((f, i) => (
              <li key={f} className="flex flex-col rounded-2xl border border-border bg-card p-5">
                <span className="font-display text-2xl font-bold text-steel">0{i + 1}</span>
                <span className="mt-2 text-sm font-semibold">{f}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 text-lg font-semibold">{pricing.prepareHeading}</h3>
          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {pricing.prepare.map((p, i) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <span className="font-display text-2xl font-bold text-steel">0{i + 1}</span>
                <span className="text-sm font-semibold">{p}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-start gap-4">
            <a
              href="#consultation"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground transition hover:brightness-105"
            >
              {pricing.ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <p className="text-sm text-muted-foreground">{pricing.note}</p>
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal as="section" className="container-site py-16 md:py-24">
        <p className="eyebrow">FAQ</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Common questions</h2>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="text-steel transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>

      {/* Consultation */}
      <Reveal as="section" id="consultation" className="scroll-mt-20 bg-secondary py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Get started</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{cta.primary}</h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your facility and what you need. This is a demo form: no data is sent or
              stored.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              Prefer to talk? Call{" "}
              <a
                href={business.phoneLocal.href}
                className="inline-flex min-h-11 items-center font-semibold text-foreground underline"
              >
                {business.phoneLocal.display}
              </a>{" "}
              or{" "}
              <a
                href={business.phoneTollFree.href}
                className="inline-flex min-h-11 items-center font-semibold text-foreground underline"
              >
                {business.phoneTollFree.display}
              </a>
              .
            </p>
          </div>
          <div className="text-foreground lg:col-span-8">
            <RequestForm prefill={prefill} />
          </div>
        </div>
      </Reveal>
    </main>
  );
}
