import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, servicePageMeta } from "@/components/site/ServicePage";

export const Route = createFileRoute("/heating-service-installation")({
  head: () => ({ meta: servicePageMeta("heating") }),
  component: () => <ServicePage serviceId="heating" />,
});
