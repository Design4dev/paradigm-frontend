const STATS = [
  { value: "12,400+", label: "Vehicles Delivered" },
  { value: "38", label: "States Served" },
  { value: "97%", label: "On-Time Delivery" },
  { value: "24/7", label: "Fleet Support" },
];

export function TrustStats() {
  return (
    <dl className="grid grid-cols-2 gap-6 rounded-[var(--radius-card)] bg-primary-black px-6 py-10 text-primary-white sm:grid-cols-4 sm:px-10">
      {STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="text-display-l text-primary-white">{stat.value}</dd>
          <p className="text-label-m mt-1 text-primary-white/60">{stat.label}</p>
        </div>
      ))}
    </dl>
  );
}
