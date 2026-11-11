import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, servicePageMeta } from "@/components/site/ServicePage";

export const Route = createFileRoute("/hvac-maintenance-agreements")({
  head: () => ({ meta: servicePageMeta("maintenance") }),
  component: () => <ServicePage serviceId="maintenance" />,
});
