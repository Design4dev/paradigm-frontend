"use client";

import { Button } from "@/components/ui/Button";
import { CloseIcon, SpinnerIcon } from "@/components/ui/Icons";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dialog } from "@/components/ui/Modal";
import { siteConfig } from "@/config/site.config";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import { submitLead } from "@/features/leads/services/leads.service";
import { VEHICLE_INTEREST_OPTIONS, leadSchema } from "@/features/leads/types/lead.types";
import Link from "next/link";
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

export function QuickQuoteModal() {
  const { isOpen, vehicle, closeQuote, triggerRef } = useQuote();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const track = useTrackEvent();

  // Reset the form whenever the dialog transitions to open. Adjusting
  // state in response to a changed prop belongs in render, not an effect —
  // see https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [trackedIsOpen, setTrackedIsOpen] = useState(isOpen);
  if (isOpen !== trackedIsOpen) {
    setTrackedIsOpen(isOpen);
    if (isOpen) {
      setStatus("idle");
      setErrors({});
      setForm(EMPTY_FORM);
    }
  }

  const handleClose = () => {
    closeQuote();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = leadSchema.safeParse({ ...form, vehicleSlug: vehicle?.slug, vehicleName: vehicle?.name });
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
      track({ name: "quote_requested", vehicleSlug: vehicle?.slug });
    } else {
      setStatus("failure");
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} labelledBy="quick-quote-title" variant="center" returnFocusRef={triggerRef}>
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="quick-quote-title" className="text-heading-l">
              {status === "success"
                ? "Request Received!"
                : vehicle?.intent === "test-drive"
                  ? "Book a Test Drive"
                  : "Get a Quick Quote"}
            </h2>
            {status !== "success" && (
              <p className="text-body-m mt-1 text-dark-neutral/60">
                {vehicle ? (
                  <>
                    Tell us a bit more and we&apos;ll follow up about{" "}
                    <span className="font-semibold text-primary-black">{vehicle.name}</span>
                    {(vehicle.stockNumber || vehicle.priceLabel) && (
                      <span className="text-dark-neutral/50">
                        {" "}
                        ({[vehicle.stockNumber && `Stock #${vehicle.stockNumber}`, vehicle.priceLabel].filter(Boolean).join(" · ")})
                      </span>
                    )}
                    .
                  </>
                ) : (
                  "Tell us what you're looking for and we'll help you find the right vehicle."
                )}
              </p>
            )}
          </div>
          <IconButton aria-label="Close quote form" onClick={handleClose}>
            <CloseIcon className="h-6 w-6" />
          </IconButton>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-2xl leading-none text-primary-white" aria-hidden="true">
              ✓
            </span>
            <p className="text-body-l">
              Thanks for contacting {siteConfig.legalName}. A member of our team will be in touch shortly.
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Link href="/vehicles" className="flex-1" onClick={handleClose}>
                <Button variant="primary" size="lg" className="w-full">
                  Browse Inventory
                </Button>
              </Link>
              <a href={siteConfig.contact.salesPhoneHref} className="flex-1">
                <Button variant="secondary" size="lg" className="w-full">
                  Call {siteConfig.contact.salesPhone}
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
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

            {status === "failure" && (
              <p role="alert" className="text-body-m rounded-[var(--radius-control)] bg-primary-red/10 px-4 py-3 text-primary-red">
                We couldn&apos;t send your request. Your details are still filled in — please try again.
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" disabled={status === "submitting"} className="mt-2">
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
            <p className="text-caption-s text-center text-dark-neutral/50">
              🔒 We respect your privacy. Your information will only be used to provide vehicle options.
            </p>
          </form>
        )}
      </div>
    </Dialog>
  );
}
