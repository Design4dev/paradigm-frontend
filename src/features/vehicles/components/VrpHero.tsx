import { ChevronRightIcon } from "@/components/ui/Icons";
import { heroImage } from "@/features/vehicles/config/images.config";
import Image from "next/image";
import Link from "next/link";

/** Compact VRP hero/banner (page-02-vrp.md §5) — shorter than the Homepage hero so inventory appears quickly. */
export function VrpHero() {
  return (
    <section className="relative overflow-hidden bg-primary-black">
      <Image src={heroImage.url} alt={heroImage.alt} fill priority sizes="100vw" className="object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/70 to-primary-black/40" aria-hidden="true" />

      <div className="container-page relative flex flex-col gap-3 py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-label-m flex items-center gap-1.5 text-primary-white/70">
          <Link href="/" className="focus-ring rounded hover:text-primary-white">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5 opacity-60" />
          <span className="text-primary-white" aria-current="page">
            Inventory
          </span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h1 className="text-display-l text-primary-white">Commercial Vehicles Built for Your Business</h1>
            <p className="text-body-l mt-2 text-primary-white/75">500+ new and used vans, trucks, and specialty vehicles.</p>
          </div>
          <p className="text-label-m hidden text-right text-primary-white/60 sm:block">
            Reliable.
            <br />
            Versatile.
            <br />
            Business Ready.
          </p>
        </div>
      </div>
    </section>
  );
}
