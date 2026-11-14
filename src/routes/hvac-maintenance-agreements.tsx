import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, servicePageMeta } from "@/components/site/ServicePage";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/hvac-maintenance-agreements")({
  head: () => ({
    meta: servicePageMeta("maintenance"),
    links: [{ rel: "canonical", href: `${SITE_URL}/hvac-maintenance-agreements` }],
  }),
  component: () => <ServicePage serviceId="maintenance" />,
});
