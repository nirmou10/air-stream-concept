import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, TriangleAlert } from "lucide-react";
import { servicePages, services, SITE_URL, type ServiceId } from "@/content/site";
import { Reveal } from "@/components/site/Reveal";

const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function servicePageMeta(serviceId: ServiceId) {
  const page = servicePages[serviceId];
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

export function ServicePage({ serviceId }: { serviceId: ServiceId }) {
  const service = services.find((s) => s.id === serviceId);
  if (!service) return null;
  const page = servicePages[serviceId];
  const related = services.filter((s) => s.id !== serviceId);

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
                {service.title}
              </li>
            </ol>
          </nav>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow">Services</p>
              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-navy-muted">{page.intro}</p>
              <span className="mt-6 inline-flex w-fit rounded-full border border-navy-border bg-navy/60 px-3 py-1 text-xs font-semibold text-navy-foreground">
                {service.pricingBadge}
              </span>
            </div>
            <div className="lg:col-span-5">
              <img
                src={service.image}
                alt={service.imageAlt}
                className="aspect-[16/10] w-full rounded-2xl border border-navy-border object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Common facility problems */}
      <Reveal as="section" className="container-site py-16 md:py-20">
        <p className="eyebrow">Common facility problems</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
          Signs your facility may need this service
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {page.problems.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-steel" aria-hidden />
              <span className="text-sm font-semibold">{p}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* What Air-Stream advertises */}
      <Reveal as="section" className="bg-secondary py-16 md:py-20">
        <div className="container-site">
          <p className="eyebrow">What Air-Stream advertises</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Company-published facts for this service
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.advertised.map((a) => (
              <li key={a} className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span className="font-semibold">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Typical scope of work */}
      <Reveal as="section" className="container-site py-16 md:py-20">
        <p className="eyebrow">Typical scope of work</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
          What an engagement can include
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.scope.map((step, i) => (
            <li key={step} className="flex flex-col rounded-2xl border border-border bg-card p-5">
              <span className="font-display text-2xl font-bold text-steel">0{i + 1}</span>
              <span className="mt-2 text-sm font-semibold">{step}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Why it matters */}
      <Reveal as="section" className="bg-navy py-16 text-navy-foreground md:py-20">
        <div className="container-site">
          <p className="eyebrow">Why it matters</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Why it matters for your facility
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {page.benefits.map((b) => (
              <li
                key={b}
                className="rounded-2xl border border-navy-border bg-navy/60 p-5 text-sm font-semibold text-navy-foreground"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Pricing */}
      <Reveal as="section" className="container-site py-16 md:py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            How pricing works for this service
          </h2>
          <span className="mt-5 inline-flex rounded-full border border-steel/40 bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
            {service.pricingBadge}
          </span>
          <p className="mt-4 text-muted-foreground">{page.pricingNote}</p>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="bg-secondary py-14 md:py-16">
        <div className="container-site flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to discuss your facility?</h2>
          <p className="max-w-xl text-muted-foreground">
            Tell us about your building and what you need. This is a demo form: no data is sent or
            stored.
          </p>
          <Link
            to="/"
            search={{ service: serviceId }}
            hash="consultation"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground transition hover:brightness-105"
          >
            {service.quoteLabel} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Reveal>

      {/* Related services */}
      <Reveal as="section" className="container-site py-16 md:py-20">
        <p className="eyebrow">Related services</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Other services Air-Stream provides</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.id}
              to={s.path}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-steel/50"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold">{s.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1 self-start text-sm font-bold text-foreground underline decoration-steel decoration-2 underline-offset-4">
                  Learn More <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
