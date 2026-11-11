import { Link } from "@tanstack/react-router";
import { Fan, MapPin, Phone } from "lucide-react";
import { audiences, business, disclaimers, services } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-navy-border bg-navy text-navy-foreground">
      <div className="container-site grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="flex items-center gap-2.5 font-display text-lg font-bold">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              aria-hidden
            >
              <Fan className="h-5 w-5" />
            </span>
            {business.brand}
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-navy-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {business.address}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-navy-muted">
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            <a href={business.phoneLocal.href} className="hover:text-navy-foreground">
              {business.phoneLocal.display}
            </a>
            <span aria-hidden>·</span>
            <a href={business.phoneTollFree.href} className="hover:text-navy-foreground">
              {business.phoneTollFree.display}
            </a>
          </p>
        </div>

        <nav aria-label="Services" className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-muted">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={s.path} className="text-navy-muted hover:text-navy-foreground">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Who we serve" className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-muted">
            Who we serve
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {audiences.map((a) => (
              <li key={a.id}>
                <a href={a.path} className="text-navy-muted hover:text-navy-foreground">
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-navy-border">
        <div className="container-site space-y-1.5 py-6 text-xs text-navy-muted">
          <p>{disclaimers.footerUnofficial}</p>
          <p>{disclaimers.footerImages}</p>
        </div>
      </div>
    </footer>
  );
}
