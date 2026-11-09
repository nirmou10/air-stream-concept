import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import {
  ArrowRight,
  Building2,
  Clock,
  Fan,
  Flame,
  Home,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Snowflake,
  Store,
  Wrench,
  BadgeCheck,
  CalendarCheck,
  Star,
} from "lucide-react";
import heroImg from "@/assets/hero-technician.jpg";
import thermostatImg from "@/assets/thermostat.jpg";
import installImg from "@/assets/installation.jpg";
import {
  audiences,
  business,
  disclaimers,
  faqs,
  serviceOptions,
  services,
  steps,
  symptoms,
  type ServiceId,
} from "@/content/site";
import { RequestForm, type Prefill } from "@/components/site/RequestForm";
import { Assistant } from "@/components/site/Assistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Texas HVAC Service Requests — AC, Heating & Maintenance (Prototype)" },
      {
        name: "description",
        content:
          "Prototype HVAC website for Texas homeowners and businesses: AC repair, installation, maintenance, and heating. Request service in a few steps.",
      },
      { property: "og:title", content: "Texas HVAC Service — Prototype Website" },
      {
        property: "og:description",
        content: "AC repair, installation, maintenance, and heating service requests for Texas properties. Prototype site.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const serviceIcons: Record<string, typeof Wrench> = {
  "ac-repair": Snowflake,
  installation: Wrench,
  maintenance: ShieldCheck,
  heating: Flame,
};
const audienceIcons = [Home, Building2, Store];

function CallButton({ className = "" }: { className?: string }) {
  // No real number yet: the button scrolls to the contact info instead of dialing.
  const href = business.phoneHref ? `tel:${business.phoneHref}` : "#contact-info";
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold ${className}`}
      aria-label={business.phoneHref ? "Call the business" : "Phone number to be confirmed — view contact info"}
    >
      <Phone className="h-4 w-4" aria-hidden /> Call
    </a>
  );
}

function Index() {
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const goToForm = useCallback((service?: ServiceId, problem?: string) => {
    setPrefill({ service, problem: problem || undefined, nonce: Date.now() });
    document.getElementById("request")?.scrollIntoView({ block: "start" });
    setTimeout(() => document.getElementById("problem")?.focus({ preventScroll: true }), 400);
  }, []);

  return (
    <div className="pb-20 md:pb-0">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-card focus:p-3">
        Skip to content
      </a>

      <div className="bg-placeholder px-4 py-2 text-center text-xs font-semibold text-placeholder-foreground">
        Prototype website — bracketed details are placeholders and not confirmed.
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-navy-border bg-navy text-navy-foreground">
        <div className="container-site flex h-16 items-center justify-between gap-4">
          <a href="#main" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground" aria-hidden>
              <Fan className="h-5 w-5" />
            </span>
            {business.name}
          </a>
          <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium text-navy-muted lg:flex">
            <a href="#services" className="hover:text-navy-foreground">Services</a>
            <a href="#how" className="hover:text-navy-foreground">How it works</a>
            <a href="#area" className="hover:text-navy-foreground">Service area</a>
            <a href="#faq" className="hover:text-navy-foreground">FAQ</a>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <CallButton className="border-navy-border hover:bg-navy-border" />
            <button
              onClick={() => goToForm()}
              className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground"
            >
              Request Service
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="bg-navy text-navy-foreground">
          <div className="container-site grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="eyebrow">Heating & cooling · Texas</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
                HVAC service that's easy to request.
              </h1>
              <p className="mt-5 max-w-lg text-lg text-navy-muted">
                AC repair, installation, maintenance, and heating for homes, rentals, and small businesses. Tell us what's
                going on and we'll follow up to schedule.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => goToForm()}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground"
                >
                  Request Service <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
                <button
                  onClick={() => setAssistantOpen(true)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-navy-border px-6 font-semibold hover:bg-navy-border"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden /> Ask the Assistant
                </button>
              </div>
              <div className="mt-10">
                <p id="picker-label" className="text-sm font-semibold">What do you need?</p>
                <div role="group" aria-labelledby="picker-label" className="mt-3 flex flex-wrap gap-2">
                  {serviceOptions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => goToForm(s.id)}
                      className="min-h-11 rounded-full border border-navy-border px-4 text-sm font-medium hover:border-primary hover:text-primary"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <figure className="lg:col-span-6">
              <img
                src={heroImg}
                alt="Technician servicing an outdoor air conditioning unit"
                width={1600}
                height={1104}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
              <figcaption className="mt-2 text-xs text-navy-muted">{disclaimers.image} — not actual customer work.</figcaption>
            </figure>
          </div>
        </section>

        {/* Trust strip */}
        <section aria-label="Credentials" className="border-b border-border bg-card">
          <div className="container-site grid gap-4 py-6 sm:grid-cols-3">
            {[
              { icon: BadgeCheck, label: "License", value: business.license },
              { icon: ShieldCheck, label: "Insurance", value: business.insurance },
              { icon: CalendarCheck, label: "Experience", value: business.experience },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-6 w-6 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="ph mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="container-site scroll-mt-20 py-16 md:py-24">
          <p className="eyebrow">Services</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">Find the service you need</h2>
          <p className="mt-3 text-sm text-muted-foreground">Service list subject to confirmation by the business.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const Icon = serviceIcons[s.id] ?? Wrench;
              return (
                <article key={s.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-primary" aria-hidden>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-muted-foreground">{s.body}</p>
                  <button
                    onClick={() => goToForm(s.id)}
                    className="mt-5 inline-flex min-h-11 items-center gap-1 self-start text-sm font-bold text-foreground underline decoration-primary decoration-2 underline-offset-4"
                  >
                    Request this service <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Who we serve / symptoms */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Who we serve</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Built for Texas homes and businesses</h2>
              <ul className="mt-8 space-y-5">
                {audiences.map((a, i) => {
                  const Icon = audienceIcons[i] ?? Home;
                  return (
                    <li key={a.title} className="flex gap-4">
                      <Icon className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden />
                      <div>
                        <h3 className="font-semibold">{a.title}</h3>
                        <p className="text-muted-foreground">{a.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <figure className="mt-8 hidden lg:block">
                <img src={thermostatImg} alt="Smart thermostat on a living room wall" width={1200} height={912} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                <figcaption className="mt-2 text-xs text-muted-foreground">{disclaimers.image}</figcaption>
              </figure>
            </div>
            <div className="lg:col-span-7">
              <h3 className="text-xl font-semibold">Common problems</h3>
              <p className="mt-1 text-muted-foreground">Pick what sounds familiar to start a request.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {symptoms.map((s) => (
                  <button
                    key={s.title}
                    onClick={() => goToForm(s.service, s.title + ".")}
                    className="group rounded-2xl border border-border bg-card p-5 text-left hover:border-primary"
                  >
                    <span className="block font-semibold">{s.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{s.body}</span>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
                      Start request <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-navy p-6 text-navy-foreground">
                <p className="font-semibold">Not sure what you need?</p>
                <p className="mt-1 text-sm text-navy-muted">The prototype assistant can help narrow it down.</p>
                <button onClick={() => setAssistantOpen(true)} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground">
                  <MessageSquare className="h-4 w-4" aria-hidden /> Ask the Assistant
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="container-site scroll-mt-20 py-16 md:py-24">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Three simple steps</h2>
          <p className="mt-3 text-sm text-muted-foreground">Intended process once the business is live.</p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-4xl font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Reviews */}
        <section aria-labelledby="reviews-title" className="bg-secondary py-16 md:py-24">
          <div className="container-site">
            <p className="eyebrow">Reviews</p>
            <h2 id="reviews-title" className="mt-3 text-3xl font-bold md:text-4xl">What customers say</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-2xl border-2 border-dashed border-input bg-card p-6">
                  <div className="flex gap-1 text-input" aria-hidden>
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" />)}
                  </div>
                  <p className="ph mt-4">Placeholder</p>
                  <p className="mt-3 text-muted-foreground">Verified customer reviews will appear here.</p>
                </div>
              ))}
            </div>
            <figure className="mt-10 grid items-center gap-6 md:grid-cols-2">
              <img src={installImg} alt="Indoor furnace and air handler with ductwork" width={1200} height={912} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <figcaption className="text-muted-foreground">
                <span className="ph">Project examples</span>
                <span className="mt-3 block">Verified project photos will replace this {disclaimers.image.toLowerCase()}. It does not show actual customer work.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Area & hours */}
        <section id="area" className="container-site scroll-mt-20 py-16 md:py-24">
          <div id="contact-info" className="grid scroll-mt-24 gap-5 md:grid-cols-3">
            {[
              { icon: MapPin, title: "Service area", value: business.serviceArea },
              { icon: Clock, title: "Business hours", value: business.hours },
              { icon: Phone, title: "Phone", value: business.phoneDisplay },
            ].map(({ icon: Icon, title, value }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <Icon className="h-6 w-6 text-primary" aria-hidden />
                <h2 className="mt-4 text-lg font-semibold">{title}</h2>
                <p className="ph mt-2">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Request form */}
        <section id="request" className="scroll-mt-16 bg-navy py-16 text-navy-foreground md:py-24">
          <div className="container-site grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Request service</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Tell us what's going on</h2>
              <p className="mt-4 text-navy-muted">
                It takes about a minute. In a live version, the team would contact you to confirm a time. No booking is made
                online.
              </p>
            </div>
            <div className="text-foreground lg:col-span-8">
              <RequestForm prefill={prefill} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="container-site scroll-mt-20 py-16 md:py-24">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Common questions</h2>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className={`mt-3 ${f.a.startsWith("[") ? "ph" : "text-muted-foreground"}`}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="container-site pb-16 md:pb-24">
          <div className="rounded-3xl bg-navy p-8 text-navy-foreground md:p-14">
            <h2 className="max-w-xl text-3xl font-bold md:text-4xl">Need heating or cooling help?</h2>
            <p className="mt-3 text-navy-muted">Request service now and we'll follow up to schedule.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => goToForm()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground">
                Request Service <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <CallButton className="min-h-12 border-navy-border px-6 hover:bg-navy-border" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="container-site flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl">{disclaimers.prototype}</p>
          <Link to="/privacy" className="font-semibold text-foreground underline underline-offset-4">Privacy note</Link>
        </div>
      </footer>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-navy-border bg-navy p-3 md:hidden">
        <CallButton className="min-h-12 border-navy-border text-navy-foreground" />
        <button onClick={() => goToForm()} className="min-h-12 rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          Request Service
        </button>
      </div>

      {/* Floating assistant button */}
      {!assistantOpen && (
        <button
          onClick={() => setAssistantOpen(true)}
          aria-label="Open the prototype service assistant"
          className="fixed bottom-20 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-primary px-5 font-bold text-primary-foreground shadow-lg md:bottom-6 md:right-6"
        >
          <MessageSquare className="h-5 w-5" aria-hidden />
          <span className="hidden sm:inline">Assistant</span>
        </button>
      )}
      <Assistant
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onContinue={(service, summary) => {
          setAssistantOpen(false);
          goToForm(service, summary);
        }}
      />
    </div>
  );
}
