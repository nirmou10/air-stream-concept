import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { inquirySchema, RequestForm, stepSchemas } from "@/components/site/RequestForm";
import type { Prefill } from "@/components/site/RequestForm";

const complete = {
  audience: "commercial",
  service: "ac",
  facilityType: "Office or workplace",
  city: "San Antonio",
  zip: "78219",
  scope: "Replace two rooftop units before summer.",
  urgency: "soon",
  name: "Test User",
  organization: "Example Properties LLC",
  email: "test@example.com",
  phone: "555-555-0100",
  preferredDate: "2026-12-01",
  contactTime: "morning",
};

describe("inquiry step schemas", () => {
  it("accepts a complete inquiry", () => {
    expect(inquirySchema.safeParse(complete).success).toBe(true);
  });

  it("requires a customer type on step 1", () => {
    expect(stepSchemas[0].safeParse({ audience: "" }).success).toBe(false);
    expect(stepSchemas[0].safeParse({ audience: "commercial" }).success).toBe(true);
  });

  it("requires an HVAC service on step 2", () => {
    expect(stepSchemas[1].safeParse({ service: "" }).success).toBe(false);
    expect(stepSchemas[1].safeParse({ service: "ac" }).success).toBe(true);
  });

  it("validates facility fields on step 3", () => {
    const step3 = {
      facilityType: "Office or workplace",
      city: "San Antonio",
      zip: "7821",
      scope: "Too short",
      urgency: "",
    };
    expect(stepSchemas[2].safeParse(step3).success).toBe(false);
    expect(
      stepSchemas[2].safeParse({ ...step3, zip: "78219", scope: complete.scope, urgency: "soon" })
        .success,
    ).toBe(true);
  });

  it("requires a valid email and 10-digit phone on step 4", () => {
    const step4 = {
      name: "Test User",
      organization: "",
      email: "not-an-email",
      phone: "555-0100",
    };
    expect(stepSchemas[3].safeParse(step4).success).toBe(false);
    expect(
      stepSchemas[3].safeParse({ ...step4, email: "test@example.com", phone: "555-555-0100" })
        .success,
    ).toBe(true);
  });

  it("requires a preferred date on step 5", () => {
    expect(stepSchemas[4].safeParse({ preferredDate: "", contactTime: "" }).success).toBe(false);
    expect(stepSchemas[4].safeParse({ preferredDate: "2026-12-01", contactTime: "" }).success).toBe(
      true,
    );
  });
});

function renderForm(prefill: Prefill | null = null) {
  return render(<RequestForm prefill={prefill} />);
}

function chooseCard(name: RegExp) {
  fireEvent.click(screen.getByRole("button", { name }));
}

describe("RequestForm wizard", () => {
  it("shows step progress and blocks Next until the step is valid", () => {
    renderForm();
    expect(screen.getByText("Step 1 of 6")).toBeInTheDocument();
    expect(screen.getByText("Demo only, no data is sent.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Please complete the highlighted fields");
    expect(screen.getByText("Choose a customer type.")).toBeInTheDocument();
    expect(screen.getByText("Step 1 of 6")).toBeInTheDocument();

    chooseCard(/Commercial/);
    expect(screen.getByRole("button", { name: /Commercial/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Step 2 of 6")).toBeInTheDocument();
  });

  it("supports Back and keeps earlier answers", () => {
    renderForm();
    chooseCard(/Commercial/);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    chooseCard(/Air Conditioning Service/);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Step 3 of 6")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByText("Step 2 of 6")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Air Conditioning Service/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("button", { name: /Commercial/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("pre-selects customer type and service from the hero prefill", () => {
    renderForm({ service: "heating", property: "industrial", nonce: 1 });
    expect(screen.getByRole("button", { name: /Industrial/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("button", { name: /Heating System Service/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("reaches review and submits without any fetch call", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { container } = renderForm();

    chooseCard(/Commercial/);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    chooseCard(/Air Conditioning Service/);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    fireEvent.change(screen.getByLabelText("Facility type"), {
      target: { value: "Office or workplace" },
    });
    fireEvent.change(screen.getByLabelText("Facility city"), {
      target: { value: "San Antonio" },
    });
    fireEvent.change(screen.getByLabelText("ZIP code"), { target: { value: "78219" } });
    fireEvent.change(screen.getByLabelText("Urgency"), { target: { value: "soon" } });
    fireEvent.change(screen.getByLabelText("Project scope"), {
      target: { value: "Replace two rooftop units before summer." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Step 4 of 6")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText("Business email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "555-555-0100" } });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Step 5 of 6")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Choose a preferred date.")).toBeInTheDocument();
    expect(screen.getByText("Step 5 of 6")).toBeInTheDocument();

    const day = container.querySelector<HTMLButtonElement>("button[data-day]:not([disabled])");
    expect(day).not.toBeNull();
    fireEvent.click(day as HTMLButtonElement);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Step 6 of 6")).toBeInTheDocument();
    expect(screen.getByText("Review your inquiry")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Submit demo inquiry" }));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.getByText("Demo complete. No inquiry was sent.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Start over" }));
    expect(screen.getByText("Step 1 of 6")).toBeInTheDocument();

    fetchSpy.mockRestore();
  });
});
