import { z } from "zod";

const PHONE_PATTERN = /^[0-9()+\-.\s]{7,}$/;

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name."),
  lastName: z.string().trim().min(1, "Enter your last name."),
  email: z.string().trim().min(1, "Enter your email address.").email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .refine((value) => PHONE_PATTERN.test(value) && value.replace(/\D/g, "").length >= 10, {
      message: "Please enter a valid phone number.",
    }),
  companyName: z.string().trim().optional().or(z.literal("")),
});

const durationInfoSchema = z.object({
  startDate: z.string().trim().optional().or(z.literal("")),
  duration: z.string().trim().optional().or(z.literal("")),
});

/** Structured rental-finder submission — used both by the guided finder's final step and the standalone quote form. */
export const rentalQuoteSchema = z.object({
  contact: contactSchema,
  vehicleType: z.string().trim().min(1, "Select a vehicle type."),
  durationInfo: durationInfoSchema,
  useCase: z.string().trim().optional().or(z.literal("")).nullable(),
  vehicleSlug: z.string().trim().optional().or(z.literal("")).nullable(),
  vehicleName: z.string().trim().optional().or(z.literal("")).nullable(),
  message: z.string().trim().optional().or(z.literal("")),
});

export type RentalQuoteSchemaInput = z.infer<typeof rentalQuoteSchema>;
