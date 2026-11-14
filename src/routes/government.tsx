import { createFileRoute } from "@tanstack/react-router";
import { AudiencePage, audiencePageMeta } from "@/components/site/AudiencePage";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/government")({
  head: () => ({
    meta: audiencePageMeta("government"),
    links: [{ rel: "canonical", href: `${SITE_URL}/government` }],
  }),
  component: () => <AudiencePage audienceId="government" />,
});
