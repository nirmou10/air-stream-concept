import { createFileRoute } from "@tanstack/react-router";
import { AudiencePage, audiencePageMeta } from "@/components/site/AudiencePage";

export const Route = createFileRoute("/government")({
  head: () => ({ meta: audiencePageMeta("government") }),
  component: () => <AudiencePage audienceId="government" />,
});
