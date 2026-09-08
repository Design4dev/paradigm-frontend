import { Button } from "@/components/ui/Button";
import { SearchIcon } from "@/components/ui/Icons";

export function SearchEmpty({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-soft-gray">
        <SearchIcon className="h-6 w-6 opacity-50" />
      </span>
      <div>
        <p className="text-heading-m">No vehicles match &ldquo;{query}&rdquo;</p>
        <p className="text-body-m mt-1 text-dark-neutral/60">
          Try a different vehicle name, brand, type or location — or browse the full fleet below.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="secondary" onClick={onClear}>
          Clear Search
        </Button>
        <Button variant="ghost" onClick={onClear}>
          Browse Fleet
        </Button>
      </div>
    </div>
  );
}
