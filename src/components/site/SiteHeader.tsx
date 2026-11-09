import { useState } from "react";
import { Fan, Menu, Phone } from "lucide-react";
import { audiences, business, cta, services } from "@/content/site";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

function CtaLink({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <a
      href="/#consultation"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:brightness-105 ${className}`}
    >
      {cta.primary}
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-border bg-navy text-navy-foreground">
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
        <a
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            aria-hidden
          >
            <Fan className="h-5 w-5" />
          </span>
          <span>
            {business.brand}
            <span className="hidden text-xs font-medium text-navy-muted sm:block">
              Air Conditioning &amp; Heating
            </span>
          </span>
        </a>

        <nav
          aria-label="Main"
          className="hidden items-center gap-5 text-sm font-medium text-navy-muted xl:flex"
        >
          {services.map((s) => (
            <a key={s.id} href={s.path} className="whitespace-nowrap hover:text-navy-foreground">
              {s.title
                .replace(" Service & Installation", "")
                .replace(" Installation & Service", "")}
            </a>
          ))}
          <span className="h-4 w-px bg-navy-border" aria-hidden />
          {audiences.map((a) => (
            <a key={a.id} href={a.path} className="whitespace-nowrap hover:text-navy-foreground">
              {a.title}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={business.phoneLocal.href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-primary"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {business.phoneLocal.display}
          </a>
          <CtaLink className="px-5" />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-navy-border lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full overflow-y-auto bg-navy text-navy-foreground sm:max-w-md"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="flex items-center gap-2.5 font-display text-navy-foreground">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                  aria-hidden
                >
                  <Fan className="h-5 w-5" />
                </span>
                {business.brand}
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1 text-base font-medium">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-navy-muted">
                Services
              </p>
              {services.map((s) => (
                <a
                  key={s.id}
                  href={s.path}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 hover:bg-navy-border hover:text-navy-foreground"
                >
                  {s.title}
                </a>
              ))}
              <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-navy-muted">
                Who we serve
              </p>
              {audiences.map((a) => (
                <a
                  key={a.id}
                  href={a.path}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 hover:bg-navy-border hover:text-navy-foreground"
                >
                  {a.title}
                </a>
              ))}
            </nav>
            <div className="mt-8 space-y-3 px-3">
              <a
                href={business.phoneLocal.href}
                className="flex items-center gap-2 text-lg font-bold"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-5 w-5 text-primary" aria-hidden />
                {business.phoneLocal.display}
              </a>
              <p className="text-sm text-navy-muted">{business.phoneTollFree.display} toll free</p>
              <CtaLink className="w-full" onClick={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
