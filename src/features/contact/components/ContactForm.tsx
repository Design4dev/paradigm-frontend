"use client";

import { Button } from "@/components/ui/Button";
import { CheckCircleIcon, SpinnerIcon } from "@/components/ui/Icons";
import { Input, Textarea } from "@/components/ui/Input";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { contactSchema, type ContactInput } from "@/features/contact/schemas/contact.schema";
import { submitContact } from "@/features/contact/services/contact.service";
import type { ContactFormStatus } from "@/features/contact/types/contact.types";
import { useState } from "react";

const EMPTY_FORM: ContactInput = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<ContactInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const track = useTrackEvent();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactInput | undefined;
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    const response = await submitContact(result.data);

    if (response.ok) {
      setStatus("success");
      track({ name: "contact_submitted" });
    } else {
      setStatus("failure");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-black/5">
          <CheckCircleIcon className="h-8 w-8 text-primary-red" />
        </span>
        <p className="text-body-l">
          Thanks, {form.name.split(" ")[0] || "there"} — we received your message and will reply within one
          business day.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setForm(EMPTY_FORM);
            setStatus("idle");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Full name"
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
          autoComplete="email"
          required
          value={form.email}
          onChange={(event) => setForm((f) => ({ ...f, email: event.target.value }))}
          error={errors.email}
          disabled={status === "submitting"}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => setForm((f) => ({ ...f, phone: event.target.value }))}
          disabled={status === "submitting"}
        />
        <Input
          label="Subject"
          required
          value={form.subject}
          onChange={(event) => setForm((f) => ({ ...f, subject: event.target.value }))}
          error={errors.subject}
          disabled={status === "submitting"}
        />
      </div>
      <Textarea
        label="Message"
        rows={5}
        required
        value={form.message}
        onChange={(event) => setForm((f) => ({ ...f, message: event.target.value }))}
        error={errors.message}
        disabled={status === "submitting"}
      />

      {status === "failure" && (
        <p role="alert" className="text-body-m rounded-[var(--radius-control)] bg-primary-red/10 px-4 py-3 text-primary-red">
          We couldn&apos;t send your message. Your details are still filled in — please try again.
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? (
          <>
            <SpinnerIcon tone="white" className="h-4 w-4" /> Sending…
          </>
        ) : status === "failure" ? (
          "Try Again"
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
