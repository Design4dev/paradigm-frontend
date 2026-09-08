import { StarIcon } from "@/components/ui/Icons";

export interface Testimonial {
  quote: string;
  role: string;
  location: string;
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-border bg-surface p-6">
      <div>
        <div className="mb-4 flex gap-1 text-primary-red" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="h-4 w-4" />
          ))}
        </div>
        <blockquote className="text-body-l text-primary-black">&ldquo;{testimonial.quote}&rdquo;</blockquote>
      </div>
      <figcaption className="text-body-m mt-6 text-dark-neutral/60">
        <span className="text-label-m block text-primary-black">{testimonial.role}</span>
        {testimonial.location}
      </figcaption>
    </figure>
  );
}
