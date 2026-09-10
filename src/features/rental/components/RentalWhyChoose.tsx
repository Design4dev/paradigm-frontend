import { CalendarIcon, CheckCircleIcon, CustomerIcon, GaugeIcon, VehicleTypeIcon, WrenchIcon } from "@/components/ui/Icons";
import { RENTAL_WHY_CHOOSE } from "@/features/rental/config/rental.config";

const ICONS = [GaugeIcon, CheckCircleIcon, CalendarIcon, VehicleTypeIcon, WrenchIcon, CustomerIcon];

/** "Why Choose Paradigm Truck Rental" (spec §8) — six verified points, same card treatment as ServicesGrid/RentalWhyChoose's siblings elsewhere on the site. */
export function RentalWhyChoose() {
  return (
    <section aria-labelledby="rental-why-choose-heading" className="container-page py-10 sm:py-12">
      <div className="mb-8 text-center">
        <h2 id="rental-why-choose-heading" className="text-heading-l text-primary-black">
          Why Choose Paradigm Truck Rental
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RENTAL_WHY_CHOOSE.map((point, i) => {
          const Icon = ICONS[i];
          return (
            <div key={point.title} className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary-red/10 text-primary-red">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-heading-m mb-2">{point.title}</h3>
              <p className="text-body-m text-dark-neutral/65">{point.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
