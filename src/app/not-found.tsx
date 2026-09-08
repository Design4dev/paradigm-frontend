import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-label-m text-primary-red">404</p>
      <h1 className="text-display-l">We couldn&apos;t find that page</h1>
      <p className="text-body-l max-w-md text-dark-neutral/60">
        The vehicle or page you&apos;re looking for may have moved. Head back to the fleet to keep browsing.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}
