import { QueryClient } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRouter,
  rootRouteId,
  RouterContextProvider,
} from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { services, type ServiceId } from "@/content/site";
import { Route as AcRoute } from "@/routes/air-conditioning-service-installation";
import { Route as HeatingRoute } from "@/routes/heating-service-installation";
import { Route as MaintenanceRoute } from "@/routes/hvac-maintenance-agreements";
import { Route as DuctlessRoute } from "@/routes/ductless-hvac-services";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

const pageComponents: Record<ServiceId, ComponentType> = {
  ac: AcRoute.options.component as ComponentType,
  heating: HeatingRoute.options.component as ComponentType,
  maintenance: MaintenanceRoute.options.component as ComponentType,
  ductless: DuctlessRoute.options.component as ComponentType,
};

describe("Service pages", () => {
  for (const service of services) {
    it(`renders ${service.path} with its H1 and quote CTA`, async () => {
      const router = createRouter({
        routeTree,
        context: { queryClient: new QueryClient() },
        history: createMemoryHistory({ initialEntries: [service.path] }),
      });
      const Page = pageComponents[service.id];

      render(
        <RouterContextProvider router={router}>
          <Page />
        </RouterContextProvider>,
      );

      expect(
        await screen.findByRole("heading", { level: 1, name: service.title }),
      ).toBeInTheDocument();

      const cta = await screen.findByRole("link", { name: service.quoteLabel });
      expect(cta).toHaveAttribute("href", expect.stringContaining("#consultation"));
      expect(cta).toHaveAttribute("href", expect.stringContaining(`service=${service.id}`));
    });
  }
});
