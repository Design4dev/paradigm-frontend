import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { servicesImage } from "@/features/vehicles/config/images.config";
import Image from "next/image";
import Link from "next/link";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-soft-gray py-16 sm:py-20">
      <div className="container-page flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <Reveal>
            <p className="text-label-m mb-3 text-primary-red">Our Services</p>
            <h2 id="services-heading" className="text-heading-l mb-4">
              One Fleet Partner. More Ways to Keep Business Moving.
            </h2>
            <p className="text-body-m mb-6 max-w-md text-dark-neutral/65">
              From sales and rentals to financing and custom upfitting, we provide complete commercial vehicle
              solutions to help your business grow.
            </p>
            <Link href="/services">
              <Button variant="primary" size="lg">
                Explore Our Services →
              </Button>
            </Link>
          </Reveal>

          <Reveal className="relative aspect-[3/2] w-full overflow-hidden rounded-[var(--radius-card)]">
            <Image
              src={servicesImage.url}
              alt={servicesImage.alt}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <Reveal>
          <ServicesGrid />
        </Reveal>
      </div>
    </section>
  );
}
