import { Button } from "@/components/ui/Button";
import Link from "next/link";

/**
 * A not-found boundary scoped to the (website) route group so 404s
 * triggered inside it (an unknown vehicle slug, an unknown blog slug) keep
 * the Header/Footer chrome — the root `not-found.tsx` is the bare fallback
 * for paths that don't match any route at all.
 */
export default function WebsiteNotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-label-m text-primary-red">404</p>
      <h1 className="text-display-l">We couldn&apos;t find that page</h1>
      <p className="text-body-l max-w-md text-dark-neutral/60">
        The vehicle, article or page you&apos;re looking for may have moved. Head back to the fleet to keep
        browsing.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}
