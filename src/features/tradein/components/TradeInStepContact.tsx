"use client";

import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CONTACT_METHOD_OPTIONS } from "@/features/tradein/config/tradein.config";
import type { StepErrors, TradeInContact } from "@/features/tradein/types/tradein.types";

const CONTACT_METHOD_SELECT_OPTIONS = [
  { label: "Select an option", value: "" },
  ...CONTACT_METHOD_OPTIONS.map((value) => ({ label: value, value })),
];

interface TradeInStepContactProps {
  contact: TradeInContact;
  errors: StepErrors;
  onFieldChange: (patch: Partial<TradeInContact>) => void;
  onBack: () => void;
  onNext: () => void;
}

/** Step 4 — Contact Information (§15). */
export function TradeInStepContact({ contact, errors, onFieldChange, onBack, onNext }: TradeInStepContactProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m">Tell Us How to Reach You</h2>
        <p className="text-body-m mt-1 text-dark-neutral/60">Our team will review your details and follow up about your appraisal.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="First Name"
          autoComplete="given-name"
          value={contact.firstName}
          onChange={(event) => onFieldChange({ firstName: event.target.value })}
          error={errors.firstName}
        />
        <Input
          label="Last Name"
          autoComplete="family-name"
          value={contact.lastName}
          onChange={(event) => onFieldChange({ lastName: event.target.value })}
          error={errors.lastName}
        />
      </div>

      <Select
        label="Contact Me By"
        options={CONTACT_METHOD_SELECT_OPTIONS}
        value={contact.contactMethod}
        onChange={(event) => onFieldChange({ contactMethod: event.target.value })}
        error={errors.contactMethod}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Phone"
          type="tel"
          autoComplete="tel"
          placeholder="(905) 123-4567"
          value={contact.phone}
          onChange={(event) => onFieldChange({ phone: event.target.value })}
          error={errors.phone}
          disabled={contact.contactMethod === "Email"}
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={contact.email}
          onChange={(event) => onFieldChange({ email: event.target.value })}
          error={errors.email}
          disabled={contact.contactMethod === "Phone"}
        />
      </div>

      <Textarea
        label="Dealer Message (optional)"
        placeholder="Anything else you'd like our team to know?"
        rows={3}
        value={contact.message}
        onChange={(event) => onFieldChange({ message: event.target.value })}
        error={errors.message}
      />

      <div className="mt-2 flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onNext}>
          Next Step →
        </Button>
      </div>
    </div>
  );
}
