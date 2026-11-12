import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Fan, Menu, Phone } from "lucide-react";
import {
  audiences,
  business,
  cta,
  services,
  type AudiencePath,
  type ServicePath,
} from "@/content/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

function CtaLink({
  className = "",
  onClick,
  wrap = false,
}: {
  className?: string;
  onClick?: () => void;
  wrap?: boolean;
}) {
  return (
    <a
      href="/#consultation"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:brightness-105 ${wrap ? "w-full whitespace-normal text-center" : "whitespace-nowrap"} ${className}`}
    >
      {cta.primary}
    </a>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        aria-hidden
      >
        <Fan className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-lg font-bold tracking-tight">{business.brand}</span>
        <span className="text-[11px] font-medium text-navy-muted">
          Air Conditioning &amp; Heating
        </span>
      </span>
    </span>
  );
}

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { href?: string; to?: ServicePath | AudiencePath; label: string }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-lg px-3 py-2 whitespace-nowrap text-navy-muted transition hover:bg-navy-border hover:text-navy-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary data-[state=open]:text-navy-foreground data-[state=open]:bg-navy-border">
        {label}
        <ChevronDown className="h-4 w-4" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        {items.map((item) => (
          <DropdownMenuItem key={item.to ?? item.href} asChild>
            {item.to ? (
              <Link to={item.to} className="block">
                {item.label}
              </Link>
            ) : (
              <a href={item.href} className="block">
                {item.label}
              </a>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const serviceItems = services.map((s) => ({
    to: s.path,
    label: s.title
      .replace(" Service & Installation", "")
      .replace(" Installation & Service", "")
      .replace(" Agreements", " agreements"),
  }));
  const audienceItems = audiences.map((a) => ({ to: a.path, label: a.title }));

  return (
    <header className="sticky top-0 z-40 border-b border-navy-border bg-navy text-navy-foreground">
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="/" aria-label={`${business.brand} home`}>
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <NavDropdown label="Services" items={serviceItems} />
          <NavDropdown label="Who we serve" items={audienceItems} />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={business.phoneLocal.href}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold hover:text-primary"
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
                <Link
                  key={s.id}
                  to={s.path}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 hover:bg-navy-border hover:text-navy-foreground"
                >
                  {s.title}
                </Link>
              ))}
              <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-navy-muted">
                Who we serve
              </p>
              {audiences.map((a) => (
                <Link
                  key={a.id}
                  to={a.path}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 hover:bg-navy-border hover:text-navy-foreground"
                >
                  {a.title}
                </Link>
              ))}
            </nav>
            <div className="mt-8 space-y-3 px-3">
              <a
                href={business.phoneLocal.href}
                className="flex items-center gap-2 whitespace-nowrap text-lg font-bold"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-5 w-5 text-primary" aria-hidden />
                {business.phoneLocal.display}
              </a>
              <p className="text-sm text-navy-muted">{business.phoneTollFree.display} toll free</p>
              <CtaLink wrap onClick={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
