"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { BookingStepFooter } from "@/features/rental/components/booking/BookingStepFooter";
import { DocumentUploadField } from "@/features/rental/components/booking/DocumentUploadField";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { hasBookingErrors, validateInformationStep } from "@/features/rental/lib/validateBooking";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import type { BookingStepErrors } from "@/features/rental/types/booking.types";
import { useState } from "react";

/**
 * Step 03 — Information (spec §22/§24). A full page, not a compressed
 * form: Contact Info → Driver's License Info → Additional Driver (optional)
 * → Personal Address → Driver License upload → Insurance Card upload
 * (optional). Errors surface inline, next to each field, not deferred to
 * Payment. Document uploads stay local — see `DocumentUploadField`/
 * `rentalDocument.service.ts` for why nothing here claims a real upload.
 */
export function StepInformation({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const state = useRentalBookingStore((s) => s);
  const updateContact = useRentalBookingStore((s) => s.updateContact);
  const updatePrimaryLicense = useRentalBookingStore((s) => s.updatePrimaryLicense);
  const setAdditionalDriverEnabled = useRentalBookingStore((s) => s.setAdditionalDriverEnabled);
  const updateAdditionalDriver = useRentalBookingStore((s) => s.updateAdditionalDriver);
  const updateAddress = useRentalBookingStore((s) => s.updateAddress);
  const setDocument = useRentalBookingStore((s) => s.setDocument);
  const track = useTrackEvent();

  const [errors, setErrors] = useState<BookingStepErrors>({});

  const handleNext = () => {
    const nextErrors = validateInformationStep(state);
    if (hasBookingErrors(nextErrors)) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    track({ name: "rental_info_completed" });
    onNext();
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-heading-m text-primary-black">Your Information</h2>
        <p className="text-body-m mt-1 text-dark-neutral/70">We need this to prepare your rental agreement.</p>
      </div>

      <section className="flex flex-col gap-4">
        <h3 className="text-label-m text-primary-black">Contact Info</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="First Name" value={state.contact.firstName} error={errors["contact.firstName"]} onChange={(e) => updateContact({ firstName: e.target.value })} />
          <Input label="Last Name" value={state.contact.lastName} error={errors["contact.lastName"]} onChange={(e) => updateContact({ lastName: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Phone Number" type="tel" value={state.contact.phone} error={errors["contact.phone"]} onChange={(e) => updateContact({ phone: e.target.value })} />
          <Input label="Email" type="email" value={state.contact.email} error={errors["contact.email"]} onChange={(e) => updateContact({ email: e.target.value })} />
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-border pt-6">
        <h3 className="text-label-m text-primary-black">Driver&apos;s License Info</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input label="Date of Birth" type="date" value={state.primaryLicense.dateOfBirth} error={errors["primaryLicense.dateOfBirth"]} onChange={(e) => updatePrimaryLicense({ dateOfBirth: e.target.value })} />
          <Input label="Driver's License Number" value={state.primaryLicense.licenseNumber} error={errors["primaryLicense.licenseNumber"]} onChange={(e) => updatePrimaryLicense({ licenseNumber: e.target.value })} />
          <Input label="License Expiry Date" type="date" value={state.primaryLicense.licenseExpiry} error={errors["primaryLicense.licenseExpiry"]} onChange={(e) => updatePrimaryLicense({ licenseExpiry: e.target.value })} />
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-border pt-6">
        <h3 className="text-label-m text-primary-black">Additional Driver (Optional)</h3>
        <Checkbox
          label="Add an additional driver to this rental."
          checked={state.additionalDriverEnabled}
          onChange={(e) => setAdditionalDriverEnabled(e.target.checked)}
        />
        {state.additionalDriverEnabled && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="First Name" value={state.additionalDriver.firstName} error={errors["additionalDriver.firstName"]} onChange={(e) => updateAdditionalDriver({ firstName: e.target.value })} />
              <Input label="Last Name" value={state.additionalDriver.lastName} error={errors["additionalDriver.lastName"]} onChange={(e) => updateAdditionalDriver({ lastName: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Phone Number" type="tel" value={state.additionalDriver.phone} error={errors["additionalDriver.phone"]} onChange={(e) => updateAdditionalDriver({ phone: e.target.value })} />
              <Input label="Email" type="email" value={state.additionalDriver.email} error={errors["additionalDriver.email"]} onChange={(e) => updateAdditionalDriver({ email: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input label="Date of Birth" type="date" value={state.additionalDriver.dateOfBirth} error={errors["additionalDriver.dateOfBirth"]} onChange={(e) => updateAdditionalDriver({ dateOfBirth: e.target.value })} />
              <Input label="Driver's License Number" value={state.additionalDriver.licenseNumber} error={errors["additionalDriver.licenseNumber"]} onChange={(e) => updateAdditionalDriver({ licenseNumber: e.target.value })} />
              <Input label="License Expiry Date" type="date" value={state.additionalDriver.licenseExpiry} error={errors["additionalDriver.licenseExpiry"]} onChange={(e) => updateAdditionalDriver({ licenseExpiry: e.target.value })} />
            </div>
            <Input label="License Issue Date" type="date" value={state.additionalDriver.licenseIssueDate} error={errors["additionalDriver.licenseIssueDate"]} onChange={(e) => updateAdditionalDriver({ licenseIssueDate: e.target.value })} containerClassName="sm:w-1/3" />
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4 border-t border-border pt-6">
        <h3 className="text-label-m text-primary-black">Personal Address</h3>
        <Input label="Address" value={state.address.address} error={errors["address.address"]} onChange={(e) => updateAddress({ address: e.target.value })} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="City" value={state.address.city} error={errors["address.city"]} onChange={(e) => updateAddress({ city: e.target.value })} />
          <Input label="Country" value={state.address.country} error={errors["address.country"]} onChange={(e) => updateAddress({ country: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Province/State" value={state.address.province} error={errors["address.province"]} onChange={(e) => updateAddress({ province: e.target.value })} />
          <Input label="ZIP / Postal Code" value={state.address.postalCode} error={errors["address.postalCode"]} onChange={(e) => updateAddress({ postalCode: e.target.value })} />
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-border pt-6">
        <h3 className="text-label-m text-primary-black">Driver License</h3>
        <p className="text-caption-s text-dark-neutral/60">Documents are collected for our rental team&apos;s review — not auto-verified online.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DocumentUploadField label="Front Image" required value={state.documents.licenseFront} error={errors["documents.licenseFront"]} onChange={(file) => setDocument("licenseFront", file)} />
          <DocumentUploadField label="Back Image" required value={state.documents.licenseBack} error={errors["documents.licenseBack"]} onChange={(file) => setDocument("licenseBack", file)} />
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-border pt-6">
        <h3 className="text-label-m text-primary-black">Insurance Card (Optional)</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DocumentUploadField label="Front Image" value={state.documents.insuranceCardFront} onChange={(file) => setDocument("insuranceCardFront", file)} />
          <DocumentUploadField label="Back Image" value={state.documents.insuranceCardBack} onChange={(file) => setDocument("insuranceCardBack", file)} />
        </div>
      </section>

      <BookingStepFooter onBack={onBack} onNext={handleNext} />
    </div>
  );
}
