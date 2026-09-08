/**
 * VDP loading skeleton (page-03-vdp.md §24) — preserves the final layout's
 * proportions so nothing shifts once real content arrives.
 *
 * Not wired up as a route-level `loading.tsx` here: this route's data is
 * synchronous mock data (`generateStaticParams` pre-builds every known
 * slug), so there is no real async gap for a loading boundary to fill
 * today, and the README documents a real, reproduced bug in this Next.js
 * version where a `loading.tsx` ancestor combined with `notFound()` inside
 * a statically-generated dynamic route returns HTTP 200 instead of 404 —
 * the exact shape this route is. When the vehicle repository becomes a
 * real async backend call, drop `<VdpSkeleton />` into a
 * `vehicles/[slug]/loading.tsx` and re-verify the 404 status code first.
 */
export function VdpSkeleton() {
  return (
    <div className="animate-pulse pb-16">
      <div className="container-page pt-6">
        <div className="h-4 w-64 rounded bg-soft-gray" />
      </div>

      <div className="container-page grid grid-cols-1 gap-10 py-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:py-12">
        <div className="aspect-[4/3] w-full rounded-[var(--radius-card)] bg-soft-gray sm:aspect-[16/10]" />
        <div className="flex flex-col gap-5">
          <div className="h-6 w-40 rounded-full bg-soft-gray" />
          <div className="h-9 w-3/4 rounded bg-soft-gray" />
          <div className="h-5 w-2/3 rounded bg-soft-gray" />
          <div className="h-10 w-40 rounded bg-soft-gray" />
          <div className="flex gap-3">
            <div className="h-[52px] w-40 rounded-[var(--radius-control)] bg-soft-gray" />
            <div className="h-[52px] w-40 rounded-[var(--radius-control)] bg-soft-gray" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-20 rounded-[var(--radius-card)] bg-soft-gray" />
            <div className="h-20 rounded-[var(--radius-card)] bg-soft-gray" />
            <div className="h-20 rounded-[var(--radius-card)] bg-soft-gray" />
          </div>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-[var(--radius-card)] bg-soft-gray" />
          ))}
        </div>
      </div>

      <div className="container-page pt-10">
        <div className="mb-8 h-10 w-full rounded bg-soft-gray" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-[var(--radius-card)] bg-soft-gray" />
          ))}
        </div>
      </div>
    </div>
  );
}
