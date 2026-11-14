import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, servicePageMeta } from "@/components/site/ServicePage";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/ductless-hvac-services")({
  head: () => ({
    meta: servicePageMeta("ductless"),
    links: [{ rel: "canonical", href: `${SITE_URL}/ductless-hvac-services` }],
  }),
  component: () => <ServicePage serviceId="ductless" />,
});
