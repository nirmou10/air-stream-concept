import { createFileRoute } from "@tanstack/react-router";
import { AudiencePage, audiencePageMeta } from "@/components/site/AudiencePage";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: audiencePageMeta("commercial"),
    links: [{ rel: "canonical", href: `${SITE_URL}/commercial` }],
  }),
  component: () => <AudiencePage audienceId="commercial" />,
});
