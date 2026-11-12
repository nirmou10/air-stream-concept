import { createFileRoute } from "@tanstack/react-router";
import { AudiencePage, audiencePageMeta } from "@/components/site/AudiencePage";

export const Route = createFileRoute("/industrial")({
  head: () => ({ meta: audiencePageMeta("industrial") }),
  component: () => <AudiencePage audienceId="industrial" />,
});
