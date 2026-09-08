import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface CTAProps {
  heading: string;
  body?: string;
  action: React.ReactNode;
  tone?: "dark" | "light" | "red";
  id?: string;
  className?: string;
}

const toneClasses: Record<NonNullable<CTAProps["tone"]>, string> = {
  dark: "bg-primary-black text-primary-white",
  light: "bg-soft-gray text-primary-black",
  red: "bg-primary-red text-primary-white",
};

const toneBodyClasses: Record<NonNullable<CTAProps["tone"]>, string> = {
  dark: "text-primary-white/70",
  light: "text-dark-neutral/70",
  red: "text-primary-white/85",
};

/** Generic full-width call-to-action band. `FinalCTA` is a thin preset of this. */
export function CTA({ heading, body, action, tone = "dark", id, className }: CTAProps) {
  return (
    <section id={id} className={cn(toneClasses[tone], "py-16 sm:py-20", className)}>
      <Reveal className="container-page flex flex-col items-center gap-6 text-center" as="div">
        <h2 className="text-display-l max-w-2xl">{heading}</h2>
        {body && <p className={cn("text-body-l max-w-xl", toneBodyClasses[tone])}>{body}</p>}
        {action}
      </Reveal>
    </section>
  );
}
