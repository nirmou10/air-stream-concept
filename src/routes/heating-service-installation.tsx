import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, servicePageMeta } from "@/components/site/ServicePage";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/heating-service-installation")({
  head: () => ({
    meta: servicePageMeta("heating"),
    links: [{ rel: "canonical", href: `${SITE_URL}/heating-service-installation` }],
  }),
  component: () => <ServicePage serviceId="heating" />,
});
