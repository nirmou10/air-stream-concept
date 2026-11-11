import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { format, parseISO, startOfToday } from "date-fns";
import { Check, CheckCircle2, Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { audiences, disclaimers, services, type AudienceId, type ServiceId } from "@/content/site";

export const inquirySchema = z.object({
  audience: z.string().min(1, "Choose a customer type."),
  service: z.string().min(1, "Choose an HVAC service."),
  facilityType: z.string().min(1, "Choose a facility type."),
  city: z.string().trim().min(1, "Enter the facility city."),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Enter a 5-digit ZIP code."),
  scope: z
    .string()
    .trim()
    .min(10, "Describe the project in at least 10 characters.")
    .max(800, "Keep it under 800 characters."),
  urgency: z.string().min(1, "Choose an urgency."),
  name: z.string().trim().min(2, "Enter your full name."),
  organization: z.string().trim().max(160, "Keep it under 160 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your business email.")
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length === 10, "Enter a 10-digit phone number."),
  preferredDate: z.string().min(1, "Choose a preferred date."),
  contactTime: z.string(),
});

export const stepSchemas = [
  inquirySchema.pick({ audience: true }),
  inquirySchema.pick({ service: true }),
  inquirySchema.pick({ facilityType: true, city: true, zip: true, scope: true, urgency: true }),
  inquirySchema.pick({ name: true, organization: true, email: true, phone: true }),
  inquirySchema.pick({ preferredDate: true, contactTime: true }),
  inquirySchema,
] as const;

const TOTAL_STEPS = stepSchemas.length;

const stepTitles = [
  "Customer type",
  "HVAC service",
  "Facility and project",
  "Contact details",
  "Preferred consultation date",
  "Review your inquiry",
];

const stepDescriptions = [
  "Tell us who the facility belongs to.",
  "Pick the service you are interested in.",
  "Give us the details of the facility and the work you have in mind.",
  "How can the Air-Stream team reach you?",
  "Pick a date you would prefer for a consultation. This is a request only, not a confirmed appointment.",
  "Check everything over before you finish the demo.",
];

const facilityTypes = [
  "Office or workplace",
  "Retail or restaurant",
  "Medical or clinic",
  "School or campus",
  "Warehouse or plant",
  "Other",
];

const urgencyOptions = [
  { id: "routine", label: "Routine" },
  { id: "soon", label: "Soon" },
  { id: "urgent", label: "Urgent" },
];

const contactTimeOptions = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "any", label: "Any" },
];

type InquiryValues = {
  audience: AudienceId | "";
  service: ServiceId | "";
  facilityType: string;
  city: string;
  zip: string;
  scope: string;
  urgency: "" | "routine" | "soon" | "urgent";
  name: string;
  organization: string;
  email: string;
  phone: string;
  preferredDate: string;
  contactTime: "" | "morning" | "afternoon" | "any";
};

const empty: InquiryValues = {
  audience: "",
  service: "",
  facilityType: "",
  city: "",
  zip: "",
  scope: "",
  urgency: "",
  name: "",
  organization: "",
  email: "",
  phone: "",
  preferredDate: "",
  contactTime: "",
};

export type Prefill = {
  service?: ServiceId | undefined;
  property?: AudienceId | undefined;
  nonce: number;
};

const field =
  "mt-1.5 block w-full rounded-lg border border-input bg-card px-3.5 py-3 text-base text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-destructive";
const label = "text-sm font-semibold text-foreground";

const audienceTitle = (id: string) => audiences.find((a) => a.id === id)?.title ?? id;
const serviceTitle = (id: string) => services.find((s) => s.id === id)?.title ?? id;

function SelectField({
  id,
  labelText,
  value,
  onChange,
  error,
  children,
}: {
  id: keyof InquiryValues;
  labelText: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {labelText}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={field}
      >
        {children}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ChoiceCard({
  pressed,
  onSelect,
  title,
  body,
}: {
  pressed: boolean;
  onSelect: () => void;
  title: string;
  body?: string | undefined;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onSelect}
      className={cn(
        "relative flex min-h-14 flex-col rounded-xl border p-4 text-left transition",
        pressed
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:border-primary/50 hover:bg-muted/40",
      )}
    >
      {pressed ? (
        <Check className="absolute right-3 top-3 h-5 w-5 text-primary" aria-hidden />
      ) : null}
      <span className="pr-6 font-semibold">{title}</span>
      {body ? <span className="mt-1 text-sm text-muted-foreground">{body}</span> : null}
    </button>
  );
}

export function RequestForm({ prefill }: { prefill: Prefill | null }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<InquiryValues>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryValues, string>>>({});
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!prefill) return;
    setDone(false);
    setValues((v) => ({
      ...v,
      audience: prefill.property ?? v.audience,
      service: prefill.service ?? v.service,
    }));
  }, [prefill]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const set =
    (k: keyof InquiryValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  const setValue = (k: keyof InquiryValues) => (value: string) =>
    setValues((v) => ({ ...v, [k]: value }));

  function validateStep(i: number): boolean {
    const res = stepSchemas[i]!.safeParse(values);
    const errs: Partial<Record<keyof InquiryValues, string>> = {};
    if (!res.success) {
      for (const issue of res.error.issues) {
        const k = issue.path[0] as keyof InquiryValues;
        if (k && !errs[k]) errs[k] = issue.message;
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function goNext() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < TOTAL_STEPS - 1) {
      goNext();
      return;
    }
    const res = inquirySchema.safeParse(values);
    if (!res.success) {
      const errs: Partial<Record<keyof InquiryValues, string>> = {};
      for (const issue of res.error.issues) {
        const k = issue.path[0] as keyof InquiryValues;
        if (k && !errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    // Simulated submission: nothing leaves the browser and nothing is stored.
    setErrors({});
    setValues(empty);
    setStep(0);
    setDone(true);
  }

  function startOver() {
    setValues(empty);
    setErrors({});
    setStep(0);
    setDone(false);
  }

  const err = (k: keyof InquiryValues) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1 text-sm font-medium text-destructive">
        {errors[k]}
      </p>
    ) : null;

  const a11y = (k: keyof InquiryValues) => ({
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
          onClick={startOver}
          className="mt-6 inline-flex min-h-12 items-center rounded-lg border border-input px-5 font-semibold hover:bg-muted"
        >
          Start over
        </button>
      </div>
    );
  }

  const reviewRows: { title: string; step: number; lines: [string, string][] }[] = [
    {
      title: "Customer type",
      step: 0,
      lines: [["Customer type", audienceTitle(values.audience)]],
    },
    {
      title: "HVAC service",
      step: 1,
      lines: [["Service", serviceTitle(values.service)]],
    },
    {
      title: "Facility and project",
      step: 2,
      lines: [
        ["Facility type", values.facilityType],
        ["Location", `${values.city}, ${values.zip}`],
        ["Project scope", values.scope],
        ["Urgency", urgencyOptions.find((u) => u.id === values.urgency)?.label ?? values.urgency],
      ],
    },
    {
      title: "Contact",
      step: 3,
      lines: [
        ["Name", values.name],
        ["Company or organization", values.organization || "Not provided"],
        ["Business email", values.email],
        ["Phone", values.phone],
      ],
    },
    {
      title: "Preferred date",
      step: 4,
      lines: [
        [
          "Preferred date (a request only, not a confirmed appointment)",
          values.preferredDate ? format(parseISO(values.preferredDate), "EEEE, MMMM d, yyyy") : "",
        ],
        [
          "Preferred contact time",
          values.contactTime
            ? (contactTimeOptions.find((c) => c.id === values.contactTime)?.label ?? "")
            : "No preference",
        ],
      ],
    },
  ];

  return (
    <form
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

      <div className="mb-8">
        <p className="text-sm font-semibold text-foreground">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <Progress
          value={((step + 1) / TOTAL_STEPS) * 100}
          aria-label="Inquiry progress"
          className="mt-2"
        />
      </div>

      <div aria-live="polite">
        {Object.keys(errors).length > 0 ? (
          <p role="alert" className="mb-4 text-sm font-semibold text-destructive">
            Please complete the highlighted fields to continue.
          </p>
        ) : null}
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-2xl font-semibold outline-none"
      >
        {stepTitles[step]}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{stepDescriptions[step]}</p>

      <div className="mt-6">
        {step === 0 && (
          <div>
            <div
              role="group"
              aria-labelledby="audience-label"
              aria-describedby={errors.audience ? "audience-error" : undefined}
              className="grid gap-3 md:grid-cols-3"
            >
              {audiences.map((a) => (
                <ChoiceCard
                  key={a.id}
                  pressed={values.audience === a.id}
                  onSelect={() => setValue("audience")(a.id)}
                  title={a.title}
                  body={a.body}
                />
              ))}
            </div>
            <p id="audience-label" className={cn(label, "sr-only")}>
              Customer type
            </p>
            {err("audience")}
          </div>
        )}

        {step === 1 && (
          <div>
            <div
              role="group"
              aria-labelledby="service-label"
              aria-describedby={errors.service ? "service-error" : undefined}
              className="grid gap-3 md:grid-cols-2"
            >
              {services.map((s) => (
                <ChoiceCard
                  key={s.id}
                  pressed={values.service === s.id}
                  onSelect={() => setValue("service")(s.id)}
                  title={s.title}
                  body={s.body}
                />
              ))}
            </div>
            <p id="service-label" className={cn(label, "sr-only")}>
              HVAC service
            </p>
            {err("service")}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              id="facilityType"
              labelText="Facility type"
              value={values.facilityType}
              onChange={setValue("facilityType")}
              error={errors.facilityType}
            >
              <option value="">Select…</option>
              {facilityTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </SelectField>
            <div>
              <label htmlFor="city" className={label}>
                Facility city
              </label>
              <input
                {...a11y("city")}
                type="text"
                autoComplete="address-level2"
                value={values.city}
                onChange={set("city")}
                className={field}
                placeholder="e.g. San Antonio"
              />
              {err("city")}
            </div>
            <div>
              <label htmlFor="zip" className={label}>
                ZIP code
              </label>
              <input
                {...a11y("zip")}
                inputMode="numeric"
                autoComplete="postal-code"
                value={values.zip}
                onChange={set("zip")}
                className={field}
                placeholder="5 digits"
              />
              {err("zip")}
            </div>
            <SelectField
              id="urgency"
              labelText="Urgency"
              value={values.urgency}
              onChange={setValue("urgency")}
              error={errors.urgency}
            >
              <option value="">Select…</option>
              {urgencyOptions.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </SelectField>
            <div className="md:col-span-2">
              <label htmlFor="scope" className={label}>
                Project scope
              </label>
              <textarea
                {...a11y("scope")}
                rows={4}
                value={values.scope}
                onChange={set("scope")}
                className={field}
                placeholder="e.g. We need a quote to service two rooftop units before summer."
              />
              {err("scope")}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className={label}>
                Full name
              </label>
              <input
                {...a11y("name")}
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={set("name")}
                className={field}
                placeholder="e.g. Test User"
              />
              {err("name")}
            </div>
            <div>
              <label htmlFor="organization" className={label}>
                Company or organization{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                {...a11y("organization")}
                type="text"
                autoComplete="organization"
                value={values.organization}
                onChange={set("organization")}
                className={field}
                placeholder="e.g. Example Properties LLC"
              />
              {err("organization")}
            </div>
            <div>
              <label htmlFor="email" className={label}>
                Business email
              </label>
              <input
                {...a11y("email")}
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={set("email")}
                className={field}
                placeholder="e.g. name@company.com"
              />
              {err("email")}
            </div>
            <div>
              <label htmlFor="phone" className={label}>
                Phone
              </label>
              <input
                {...a11y("phone")}
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={set("phone")}
                className={field}
                placeholder="e.g. 555-555-0100"
              />
              {err("phone")}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-5 md:grid-cols-2">
            <fieldset className="md:col-span-2">
              <legend className={label}>
                Preferred date (a request only, not a confirmed appointment)
              </legend>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick a date for a consultation request. Past dates cannot be selected.
              </p>
              <div
                role="group"
                aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
                className="mt-3 w-fit max-w-full rounded-xl border border-border p-2"
              >
                <Calendar
                  mode="single"
                  selected={values.preferredDate ? parseISO(values.preferredDate) : undefined}
                  onSelect={(d) =>
                    setValues((v) => ({ ...v, preferredDate: d ? d.toISOString() : "" }))
                  }
                  disabled={{ before: startOfToday() }}
                />
              </div>
              {err("preferredDate")}
            </fieldset>
            <SelectField
              id="contactTime"
              labelText="Preferred contact time (optional)"
              value={values.contactTime}
              onChange={setValue("contactTime")}
            >
              <option value="">No preference</option>
              {contactTimeOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </SelectField>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            {reviewRows.map((section) => (
              <section
                key={section.title}
                className="rounded-xl border border-border p-4"
                aria-labelledby={`review-${section.step}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 id={`review-${section.step}`} className="font-semibold">
                    {section.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setErrors({});
                      setStep(section.step);
                    }}
                    className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-primary underline decoration-steel decoration-2 underline-offset-4 hover:bg-muted"
                  >
                    Edit
                  </button>
                </div>
                <dl className="mt-3 grid gap-2 text-sm">
                  {section.lines.map(([k, v]) => (
                    <div key={k} className="grid gap-0.5 sm:grid-cols-[12rem_1fr]">
                      <dt className="font-medium text-muted-foreground">{k}</dt>
                      <dd className="whitespace-pre-wrap break-words">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex min-h-12 items-center rounded-lg border border-input px-5 font-semibold hover:bg-muted"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {step < TOTAL_STEPS - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 font-bold text-primary-foreground hover:brightness-105"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 font-bold text-primary-foreground hover:brightness-105"
          >
            Submit demo inquiry
          </button>
        )}
      </div>
    </form>
  );
}
