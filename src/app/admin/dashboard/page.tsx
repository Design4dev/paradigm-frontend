import { getAllVehicles } from "@/features/vehicles/services/vehicles.service";

export default function AdminDashboardPage() {
  const vehicles = getAllVehicles();
  const byAvailability = vehicles.reduce<Record<string, number>>((acc, v) => {
    acc[v.availability] = (acc[v.availability] ?? 0) + 1;
    return acc;
  }, {});
  const byType = vehicles.reduce<Record<string, number>>((acc, v) => {
    acc[v.type] = (acc[v.type] ?? 0) + 1;
    return acc;
  }, {});
  const averagePrice = Math.round(vehicles.reduce((sum, v) => sum + v.price, 0) / vehicles.length);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-heading-l">Dashboard</h1>
        <p className="text-body-m mt-1 text-dark-neutral/60">
          Live figures computed from the same vehicle dataset the public site reads.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Vehicles" value={vehicles.length} />
        <StatCard label="Available Now" value={byAvailability.available ?? 0} />
        <StatCard label="Limited / Reserved" value={(byAvailability.limited ?? 0) + (byAvailability.reserved ?? 0)} />
        <StatCard label="Avg. Monthly Price" value={`$${averagePrice.toLocaleString()}`} />
      </div>

      <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
        <h2 className="text-heading-m mb-4">Inventory by Type</h2>
        <ul className="flex flex-col gap-2">
          {Object.entries(byType).map(([type, count]) => (
            <li key={type} className="flex items-center justify-between border-b border-border py-2 last:border-none">
              <span className="text-body-m text-primary-black">{type}</span>
              <span className="text-label-m text-dark-neutral/60">{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
      <p className="text-display-l text-primary-black">{value}</p>
      <p className="text-label-m mt-1 text-dark-neutral/60">{label}</p>
    </div>
  );
}
