import { createFileRoute, Link } from "@tanstack/react-router";
import { business, disclaimers } from "@/content/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Note — Texas HVAC Prototype" },
      { name: "description", content: "How this prototype HVAC website handles information: the form is a demo and nothing is stored." },
      { property: "og:title", content: "Privacy Note — Texas HVAC Prototype" },
      { property: "og:description", content: "The demo form stores nothing and assistant conversations are not saved." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="container-site max-w-3xl py-16">
      <Link to="/" className="text-sm font-semibold underline underline-offset-4">← Back to home</Link>
      <h1 className="mt-6 text-4xl font-bold">Privacy note</h1>
      <p className="mt-4 text-muted-foreground">{disclaimers.prototype}</p>
      <div className="mt-8 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold">Service request form</h2>
          <p className="mt-2 text-muted-foreground">
            The form is a demonstration. Entries are checked in your browser only, then cleared. Nothing is sent, emailed, or
            stored. Please do not enter real personal information.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Service Assistant</h2>
          <p className="mt-2 text-muted-foreground">
            Messages you type into the prototype assistant are sent to an AI service to generate a reply. Conversations are not
            saved by this website. Do not share names, phone numbers, addresses, or other personal details.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-2"><span className="ph">{business.name}</span> · <span className="ph">{business.phoneDisplay}</span></p>
        </section>
        <p className="ph">Full privacy policy to be provided by the business before launch.</p>
      </div>
    </main>
  );
}
