import { createFileRoute } from "@tanstack/react-router";
import { AudiencePage, audiencePageMeta } from "@/components/site/AudiencePage";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/industrial")({
  head: () => ({
    meta: audiencePageMeta("industrial"),
    links: [{ rel: "canonical", href: `${SITE_URL}/industrial` }],
  }),
  component: () => <AudiencePage audienceId="industrial" />,
});
