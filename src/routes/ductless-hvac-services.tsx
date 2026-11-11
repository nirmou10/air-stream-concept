import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, servicePageMeta } from "@/components/site/ServicePage";

export const Route = createFileRoute("/ductless-hvac-services")({
  head: () => ({ meta: servicePageMeta("ductless") }),
  component: () => <ServicePage serviceId="ductless" />,
});
