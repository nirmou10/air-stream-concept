import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, servicePageMeta } from "@/components/site/ServicePage";

export const Route = createFileRoute("/air-conditioning-service-installation")({
  head: () => ({ meta: servicePageMeta("ac") }),
  component: () => <ServicePage serviceId="ac" />,
});
