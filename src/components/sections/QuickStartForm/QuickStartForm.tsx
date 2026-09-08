"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SpinnerIcon } from "@/components/ui/Icons";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { submitLead } from "@/features/leads/services/leads.service";
import { VEHICLE_INTEREST_OPTIONS, leadSchema } from "@/features/leads/types/lead.types";
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "failure";

interface FormState {
  name: string;
  email: string;
  phone: string;
  vehicleInterest: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", vehicleInterest: "" };

const INTEREST_OPTIONS = [
  { label: "Select an option", value: "" },
  ...VEHICLE_INTEREST_OPTIONS.map((option) => ({ label: option, value: option })),
];

/**
 * Quick Start Lead Form — page-01-homepage.md §10. A low-friction, always
 * visible lead capture embedded on the homepage (distinct from the Quick
 * Quote modal triggered elsewhere), sharing the same lead schema/service.
 */
export function QuickStartForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const track = useTrackEvent();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormState | undefined;
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    const response = await submitLead(result.data);

    if (response.ok) {
      setStatus("success");
      track({ name: "quote_requested" });
    } else {
      setStatus("failure");
    }
  };

  return (
    <section aria-labelledby="quick-start-heading" className="border-y border-border bg-soft-gray py-16 sm:py-20">
      <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div>
          <p className="text-label-m mb-3 text-primary-red">Get Started Today</p>
          <h2 id="quick-start-heading" className="text-heading-l mb-3">
            Tell us what you need.
          </h2>
          <p className="text-body-m max-w-md text-dark-neutral/65">
            Get a tailored commercial vehicle solution — fast and hassle-free. Our fleet team follows up within one
            business day with availability, pricing and next steps.
          </p>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-start justify-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8" role="status">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-lg leading-none text-primary-white" aria-hidden="true">
              ✓
            </span>
            <p className="text-body-l">
              Thanks, {form.name.split(" ")[0] || "there"} — we&apos;ve got your details. Our team will reach out
              shortly with options.
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setForm(EMPTY_FORM);
                setStatus("idle");
              }}
            >
              Submit another request
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Input
                label="Your Name"
                placeholder="Full name"
                autoComplete="name"
                required
                value={form.name}
                onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
                error={errors.name}
                disabled={status === "submitting"}
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
                value={form.email}
                onChange={(event) => setForm((f) => ({ ...f, email: event.target.value }))}
                error={errors.email}
                disabled={status === "submitting"}
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="(905) 123-4567"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={(event) => setForm((f) => ({ ...f, phone: event.target.value }))}
                error={errors.phone}
                disabled={status === "submitting"}
              />
              <Select
                label="Vehicle Interest"
                required
                options={INTEREST_OPTIONS}
                value={form.vehicleInterest}
                onChange={(event) => setForm((f) => ({ ...f, vehicleInterest: event.target.value }))}
                error={errors.vehicleInterest}
                disabled={status === "submitting"}
              />
            </div>

            {status === "failure" && (
              <p role="alert" className="text-body-m rounded-[var(--radius-control)] bg-primary-red/10 px-4 py-3 text-primary-red">
                We couldn&apos;t send your request. Your details are still filled in — please try again.
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <SpinnerIcon tone="white" className="h-4 w-4" /> Submitting…
                </>
              ) : status === "failure" ? (
                "Try Again"
              ) : (
                "Get My Options"
              )}
            </Button>
            <p className="text-caption-s text-dark-neutral/50">
              🔒 We respect your privacy. Your information will only be used to provide vehicle options.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
