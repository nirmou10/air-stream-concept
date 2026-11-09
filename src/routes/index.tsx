import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  Factory,
  Fan,
  Landmark,
  Phone,
  ShieldCheck,
  Snowflake,
  Store,
  ThermometerSun,
  Wrench,
} from "lucide-react";
import {
  audiences,
  business,
  cta,
  credentials,
  faqs,
  processSteps,
  services,
  trustIndicators,
} from "@/content/site";
import { RequestForm } from "@/components/site/RequestForm";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";

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
      { property: "og:image", content: "https://pixel-perfect-one-sable.vercel.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://pixel-perfect-one-sable.vercel.app/og-image.png" },
    ],
  }),
  component: Index,
});

const serviceIcons: Record<string, typeof Wrench> = {
  ac: Snowflake,
  heating: ThermometerSun,
  maintenance: CalendarClock,
  ductless: Fan,
};

const audienceIcons = [Store, Landmark, Factory];

function Index() {
  return (
    <main id="main">
      {/* Hero */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-site grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
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
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-navy-muted">
              {trustIndicators.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <ImagePlaceholder className="aspect-[4/3] w-full bg-navy-border/40" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-site py-16 md:py-24">
        <p className="eyebrow">Services</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
          Four services for demanding facilities
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.id] ?? Wrench;
            return (
              <article
                key={s.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
                <ImagePlaceholder className="aspect-[16/10] w-full rounded-none border-0 border-b" />
                <div className="flex flex-1 flex-col p-6">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-steel"
                    aria-hidden
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.body}</p>
                  <a
                    href={s.path}
                    className="mt-5 inline-flex min-h-11 items-center gap-1 self-start text-sm font-bold text-foreground underline decoration-steel decoration-2 underline-offset-4"
                  >
                    Learn More <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container-site">
          <p className="eyebrow">Who we serve</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Built for commercial, government, and industrial work
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {audiences.map((a, i) => {
              const Icon = audienceIcons[i] ?? Building2;
              return (
                <article
                  key={a.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <ImagePlaceholder className="aspect-[16/10] w-full rounded-none border-0 border-b" />
                  <div className="flex flex-1 flex-col p-6">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-steel"
                      aria-hidden
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{a.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.body}</p>
                    <a
                      href={a.path}
                      className="mt-5 inline-flex min-h-11 items-center gap-1 self-start text-sm font-bold text-foreground underline decoration-steel decoration-2 underline-offset-4"
                    >
                      Learn More <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-site py-16 md:py-24">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">A clear five step process</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <li
              key={s.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <span className="font-display text-4xl font-bold text-steel">0{i + 1}</span>
              <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Credentials */}
      <section className="bg-navy py-16 text-navy-foreground md:py-24">
        <div className="container-site">
          <p className="eyebrow">Credentials &amp; capabilities</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Company credentials and capabilities
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((c) => (
              <div key={c.title} className="rounded-2xl border border-navy-border bg-navy/60 p-6">
                <ShieldCheck className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-4 font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-navy-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-site py-16 md:py-24">
        <p className="eyebrow">FAQ</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Common questions</h2>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="text-steel transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Consultation */}
      <section id="consultation" className="scroll-mt-20 bg-secondary py-16 md:py-24">
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
                className="font-semibold text-foreground underline"
              >
                {business.phoneLocal.display}
              </a>{" "}
              or{" "}
              <a
                href={business.phoneTollFree.href}
                className="font-semibold text-foreground underline"
              >
                {business.phoneTollFree.display}
              </a>
              .
            </p>
          </div>
          <div className="text-foreground lg:col-span-8">
            <RequestForm prefill={null} />
          </div>
        </div>
      </section>
    </main>
  );
}
