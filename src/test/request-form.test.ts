import { describe, expect, it } from "vitest";
import { requestSchema } from "@/components/site/RequestForm";

const valid = {
  service: "ac",
  property: "commercial",
  problem: "AC is blowing warm air",
  zip: "78219",
  day: "weekday",
  window: "morning",
  name: "Test User",
  phone: "555-555-0100",
  contact: "call",
};

describe("demo inquiry form rules", () => {
  it("accepts a complete inquiry", () => {
    expect(requestSchema.safeParse(valid).success).toBe(true);
  });
  it("requires a 5-digit ZIP", () => {
    expect(requestSchema.safeParse({ ...valid, zip: "7821" }).success).toBe(false);
  });
  it("requires a 10-digit phone", () => {
    expect(requestSchema.safeParse({ ...valid, phone: "555-0100" }).success).toBe(false);
  });
});
