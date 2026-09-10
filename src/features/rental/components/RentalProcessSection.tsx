import { RENTAL_PROCESS_STEPS } from "@/features/rental/config/rental.config";

/**
 * "Rent Your Vehicle in Four Simple Steps" (spec §11) — the real user-facing
 * flow, deliberately not the internal 4-position booking stepper
 * (Add-ons/Coverage/Information/Payment) — this reassures a visitor
 * booking is straightforward without exposing that architecture.
 */
export function RentalProcessSection() {
  return (
    <section aria-labelledby="rental-process-heading" className="container-page py-10 sm:py-12">
      <div className="mb-8 text-center">
        <h2 id="rental-process-heading" className="text-heading-l text-primary-black">
          Rent Your Vehicle in Four Simple Steps
        </h2>
      </div>
      <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {RENTAL_PROCESS_STEPS.map((item) => (
          <li key={item.step} className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
            <span className="text-display-l block text-primary-red/25">{item.step}</span>
            <h3 className="text-heading-m mt-1 mb-1.5 text-primary-black">{item.title}</h3>
            <p className="text-body-m text-dark-neutral/65">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
