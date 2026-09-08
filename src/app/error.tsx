"use client";

import { Button } from "@/components/ui/Button";
import { AlertIcon } from "@/components/ui/Icons";
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-red/10">
        <AlertIcon className="h-6 w-6 text-primary-red" />
      </span>
      <h1 className="text-display-l">Something went wrong</h1>
      <p className="text-body-l max-w-md text-dark-neutral/60">
        An unexpected error occurred while loading this page. You can try again, or head back to the homepage.
      </p>
      <div className="flex gap-3">
        <Button variant="primary" size="lg" onClick={reset}>
          Try Again
        </Button>
        <Link href="/">
          <Button variant="secondary" size="lg">
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
