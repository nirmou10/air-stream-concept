import { createFileRoute } from "@tanstack/react-router";
import { AudiencePage, audiencePageMeta } from "@/components/site/AudiencePage";

export const Route = createFileRoute("/commercial")({
  head: () => ({ meta: audiencePageMeta("commercial") }),
  component: () => <AudiencePage audienceId="commercial" />,
});
