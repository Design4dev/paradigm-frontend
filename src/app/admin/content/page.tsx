import { AvailabilityBadge } from "@/components/ui/Badge";
import { getAllVehicles } from "@/features/vehicles/services/vehicles.service";
import Link from "next/link";

export default function AdminContentPage() {
  const vehicles = getAllVehicles();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-heading-l">Inventory</h1>
        <p className="text-body-m mt-1 text-dark-neutral/60">
          Read-only in this prototype — the dataset lives in <code>features/vehicles/services/vehicles.service.ts</code>.
          Wiring up editing here means swapping that file for a real database-backed service.
        </p>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border bg-surface">
        <table className="w-full min-w-[640px] text-left">
          <thead className="bg-soft-gray">
            <tr>
              <Th>Vehicle</Th>
              <Th>Type</Th>
              <Th>Location</Th>
              <Th>Price</Th>
              <Th>Availability</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.slug} className="border-t border-border">
                <Td className="font-semibold text-primary-black">
                  {vehicle.brand} {vehicle.model}
                </Td>
                <Td>{vehicle.type}</Td>
                <Td>{vehicle.location}</Td>
                <Td>{vehicle.priceLabel}</Td>
                <Td>
                  <AvailabilityBadge status={vehicle.availability} />
                </Td>
                <Td>
                  <Link href={`/vehicles/${vehicle.slug}`} className="focus-ring text-label-m rounded text-primary-red hover:underline">
                    View on site →
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="text-label-m px-4 py-3 text-dark-neutral/60">{children}</th>;
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`text-body-m px-4 py-3 text-dark-neutral/70 ${className ?? ""}`}>{children}</td>;
}
