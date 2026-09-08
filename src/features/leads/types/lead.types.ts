import { z } from "zod";

/** Loose North American phone check — accepts digits, spaces and the usual punctuation, 10+ digits. */
const PHONE_PATTERN = /^[0-9()+\-.\s]{7,}$/;

export const leadSchema = z.object({
  name: z.string().trim().min(1, "Enter your full name."),
  email: z.string().trim().min(1, "Enter your email address.").email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .refine((value) => PHONE_PATTERN.test(value) && value.replace(/\D/g, "").length >= 10, {
      message: "Please enter a valid phone number.",
    }),
  vehicleInterest: z.string().trim().min(1, "Select what you're looking for."),
  message: z.string().trim().optional().or(z.literal("")),
  vehicleSlug: z.string().trim().optional(),
  vehicleName: z.string().trim().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export interface LeadResult {
  id: string;
}

/** Shared "Vehicle Interest" options for the Quick Quote modal and the homepage Quick Start form. */
export const VEHICLE_INTEREST_OPTIONS = [
  "Cargo Van",
  "Cube / Box Truck",
  "Service Truck",
  "Pickup Truck",
  "Passenger Van",
  "Refrigerated / Other",
  "Not sure yet",
] as const;
