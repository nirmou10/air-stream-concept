import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, servicePageMeta } from "@/components/site/ServicePage";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/air-conditioning-service-installation")({
  head: () => ({
    meta: servicePageMeta("ac"),
    links: [{ rel: "canonical", href: `${SITE_URL}/air-conditioning-service-installation` }],
  }),
  component: () => <ServicePage serviceId="ac" />,
});
