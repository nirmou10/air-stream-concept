import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { CheckCircle2, Info } from "lucide-react";
import { disclaimers, serviceOptions, type ServiceId } from "@/content/site";

export const requestSchema = z.object({
  service: z.string().min(1, "Choose a service."),
  property: z.string().min(1, "Choose a property type."),
  problem: z
    .string()
    .trim()
    .min(10, "Describe the issue in at least 10 characters.")
    .max(800, "Keep it under 800 characters."),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Enter a 5-digit ZIP code."),
  day: z.string().min(1, "Choose a preferred day."),
  window: z.string().min(1, "Choose a time window."),
  name: z.string().trim().min(2, "Enter a name."),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length === 10, "Enter a 10-digit phone number."),
  contact: z.string().min(1, "Choose a contact method."),
});

type Values = Record<keyof z.infer<typeof requestSchema>, string>;
const empty: Values = {
  service: "",
  property: "",
  problem: "",
  zip: "",
  day: "",
  window: "",
  name: "",
  phone: "",
  contact: "",
};

export type Prefill = {
  service?: ServiceId | undefined;
  problem?: string | undefined;
  nonce: number;
};

const field =
  "mt-1.5 block w-full rounded-lg border border-input bg-card px-3.5 py-3 text-base text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-destructive";
const label = "text-sm font-semibold text-foreground";

export function RequestForm({ prefill }: { prefill: Prefill | null }) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [done, setDone] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!prefill) return;
    setDone(false);
    setValues((v) => ({
      ...v,
      service: prefill.service ?? v.service,
      problem: prefill.problem ?? v.problem,
    }));
  }, [prefill]);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const set =
    (k: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = requestSchema.safeParse(values);
    if (!res.success) {
      const errs: Partial<Record<keyof Values, string>> = {};
      for (const issue of res.error.issues) {
        const k = issue.path[0] as keyof Values;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Simulated submission: nothing leaves the browser. Clear data immediately.
    setErrors({});
    setValues(empty);
    setDone(true);
  }

  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1 text-sm font-medium text-destructive">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Values) => ({
    id: k,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  if (done) {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
        <h3 className="mt-4 text-2xl font-semibold">Demo complete. No inquiry was sent.</h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          This is a concept demo. Your entries were not stored or transmitted and have been cleared
          from the page.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-6 inline-flex min-h-12 items-center rounded-lg border border-input px-5 font-semibold hover:bg-muted"
        >
          Try the demo again
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8"
    >
      <div
        role="note"
        className="mb-6 flex gap-3 rounded-lg bg-placeholder p-4 text-sm font-medium text-placeholder-foreground"
      >
        <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
        <span>{disclaimers.form}</span>
      </div>
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="mb-4 text-sm font-semibold text-destructive">
          Please fix the highlighted fields.
        </p>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="service" className={label}>
            Service needed
          </label>
          <select
            {...a11y("service")}
            value={values.service}
            onChange={set("service")}
            className={field}
          >
            <option value="">Select…</option>
            {serviceOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          {err("service")}
        </div>
        <div>
          <label htmlFor="property" className={label}>
            Facility type
          </label>
          <select
            {...a11y("property")}
            value={values.property}
            onChange={set("property")}
            className={field}
          >
            <option value="">Select…</option>
            <option value="commercial">Commercial</option>
            <option value="government">Government</option>
            <option value="industrial">Industrial</option>
          </select>
          {err("property")}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="problem" className={label}>
            What's going on?
          </label>
          <textarea
            {...a11y("problem")}
            rows={4}
            value={values.problem}
            onChange={set("problem")}
            className={field}
            placeholder="e.g. The AC runs but the air feels warm."
          />
          {err("problem")}
        </div>
        <div>
          <label htmlFor="zip" className={label}>
            ZIP code
          </label>
          <input
            {...a11y("zip")}
            inputMode="numeric"
            autoComplete="off"
            value={values.zip}
            onChange={set("zip")}
            className={field}
            placeholder="5 digits"
          />
          {err("zip")}
        </div>
        <div>
          <label htmlFor="day" className={label}>
            Preferred day
          </label>
          <select {...a11y("day")} value={values.day} onChange={set("day")} className={field}>
            <option value="">Select…</option>
            <option value="asap">As soon as possible</option>
            <option value="weekday">A weekday</option>
            <option value="weekend">A weekend day</option>
          </select>
          {err("day")}
        </div>
        <div>
          <label htmlFor="window" className={label}>
            Time window
          </label>
          <select
            {...a11y("window")}
            value={values.window}
            onChange={set("window")}
            className={field}
          >
            <option value="">Select…</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="any">Any time</option>
          </select>
          {err("window")}
        </div>
        <div>
          <label htmlFor="contact" className={label}>
            Preferred contact
          </label>
          <select
            {...a11y("contact")}
            value={values.contact}
            onChange={set("contact")}
            className={field}
          >
            <option value="">Select…</option>
            <option value="call">Phone call</option>
            <option value="text">Text message</option>
          </select>
          {err("contact")}
        </div>
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input
            {...a11y("name")}
            autoComplete="off"
            value={values.name}
            onChange={set("name")}
            className={field}
            placeholder="e.g. Test User"
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input
            {...a11y("phone")}
            type="tel"
            autoComplete="off"
            value={values.phone}
            onChange={set("phone")}
            className={field}
            placeholder="e.g. 555-555-0100"
          />
          {err("phone")}
        </div>
      </div>
      <button
        type="submit"
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-primary-foreground hover:brightness-105 md:w-auto"
      >
        Submit demo request
      </button>
    </form>
  );
}
