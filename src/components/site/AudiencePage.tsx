import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, ClipboardList, Thermometer } from "lucide-react";
import { audiencePages, audiences, cta, services, SITE_URL, type AudienceId } from "@/content/site";
import { Reveal } from "@/components/site/Reveal";

const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function audiencePageMeta(audienceId: AudienceId) {
  const page = audiencePages[audienceId];
  return [
    { title: page.metaTitle },
    { name: "description", content: page.metaDescription },
    { property: "og:title", content: page.metaTitle },
    { property: "og:description", content: page.metaDescription },
    { property: "og:type", content: "website" },
    { property: "og:image", content: OG_IMAGE },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

export function AudiencePage({ audienceId }: { audienceId: AudienceId }) {
  const audience = audiences.find((a) => a.id === audienceId);
  if (!audience) return null;
  const page = audiencePages[audienceId];
  const others = audiences.filter((a) => a.id !== audienceId);

  return (
    <main id="main">
      {/* Hero */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-site py-10 md:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-navy-muted">
              <li>
                <Link
                  to="/"
                  className="inline-flex min-h-11 items-center hover:text-navy-foreground"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-navy-foreground">
                Who we serve
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-navy-foreground">
                {audience.title}
              </li>
            </ol>
          </nav>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow">Who we serve</p>
              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {audience.title} HVAC services
              </h1>
              <p className="mt-5 max-w-xl text-lg text-navy-muted">{page.intro}</p>
            </div>
            <div className="lg:col-span-5">
              {audience.image ? (
                <img
                  src={audience.image}
                  alt={audience.imageAlt ?? ""}
                  className="aspect-[16/10] w-full rounded-2xl border border-navy-border object-cover object-center"
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Typical needs */}
      <Reveal as="section" className="container-site py-16 md:py-20">
        <p className="eyebrow">Typical needs</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
          What this audience typically needs
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {page.needs.map((n) => (
            <li
              key={n}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <Thermometer className="mt-0.5 h-5 w-5 shrink-0 text-steel" aria-hidden />
              <span className="text-sm font-semibold">{n}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Services that fit */}
      <Reveal as="section" className="bg-secondary py-16 md:py-20">
        <div className="container-site">
          <p className="eyebrow">Services that fit</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Services that fit this audience
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.serviceFit.map((fit) => {
              const service = services.find((s) => s.id === fit.serviceId);
              if (!service) return null;
              return (
                <article
                  key={service.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-steel/50"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold">{service.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{fit.sentence}</p>
                    <Link
                      to={service.path}
                      className="mt-4 inline-flex min-h-11 items-center gap-1 self-start text-sm font-bold text-foreground underline decoration-steel decoration-2 underline-offset-4"
                    >
                      Learn More <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Planning considerations */}
      <Reveal as="section" className="container-site py-16 md:py-20">
        <p className="eyebrow">Planning considerations</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
          Factors worth discussing for this audience
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {page.considerations.map((c, i) => (
            <li
              key={c}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-steel" aria-hidden />
              <span className="text-sm font-semibold">
                <span className="font-display text-lg font-bold text-steel">0{i + 1}</span> {c}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Advertised facts */}
      <Reveal as="section" className="bg-navy py-16 text-navy-foreground md:py-20">
        <div className="container-site">
          <p className="eyebrow">What Air-Stream advertises</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">Company-published facts</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "NATE-certified technicians",
              "24/7/365 service availability",
              "Serving San Antonio since 1974",
              "Air conditioning, heating, maintenance agreement, and ductless HVAC services",
            ].map((a) => (
              <li key={a} className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span className="font-semibold">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="bg-secondary py-14 md:py-16">
        <div className="container-site flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">{cta.primary}</h2>
          <p className="max-w-xl text-muted-foreground">
            Tell us about your facility and what you need. This is a demo form: no data is sent or
            stored.
          </p>
          <Link
            to="/"
            search={{ audience: audienceId }}
            hash="consultation"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground transition hover:brightness-105"
          >
            {cta.primary} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Reveal>

      {/* Other audiences */}
      <Reveal as="section" className="container-site py-16 md:py-20">
        <p className="eyebrow">Other audiences</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Other audiences Air-Stream serves</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {others.map((a) => (
            <Link
              key={a.id}
              to={a.path}
              className="group flex items-center gap-5 overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:border-steel/50"
            >
              {a.image ? (
                <img
                  src={a.image}
                  alt={a.imageAlt ?? ""}
                  loading="lazy"
                  className="h-20 w-28 shrink-0 rounded-xl object-cover object-center"
                />
              ) : null}
              <span className="flex-1">
                <span className="block text-base font-semibold">{a.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{a.body}</span>
              </span>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-steel transition group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
