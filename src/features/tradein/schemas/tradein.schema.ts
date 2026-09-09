import { z } from "zod";

/** Server-side source of truth for a submitted appraisal request (page-05-trade-in-appraisal.md §16/§20/§28). */
export const tradeInSchema = z.object({
  vehicle: z.object({
    vin: z.string().trim().optional(),
    type: z.string().trim().optional(),
    condition: z.string().trim().optional(),
    year: z.string().trim().optional(),
    make: z.string().trim().optional(),
    model: z.string().trim().optional(),
    horsepower: z.string().trim().optional(),
    hours: z.string().trim().optional(),
    price: z.string().trim().optional(),
  }),
  condition: z.object({
    exterior: z.string().trim().optional(),
    interior: z.string().trim().optional(),
    mechanical: z.string().trim().optional(),
    tires: z.string().trim().optional(),
    mileage: z.string().trim().optional(),
    notes: z.string().trim().optional(),
  }),
  contact: z
    .object({
      firstName: z.string().trim().min(1, "Enter your first name."),
      lastName: z.string().trim().min(1, "Enter your last name."),
      contactMethod: z.string().trim().min(1, "Select how we should reach you."),
      phone: z.string().trim().optional().or(z.literal("")),
      email: z.string().trim().optional().or(z.literal("")),
      message: z.string().trim().optional().or(z.literal("")),
    })
    .refine((contact) => Boolean(contact.phone) || Boolean(contact.email), {
      message: "Provide a phone number or email address.",
      path: ["email"],
    }),
  photos: z.array(z.object({ category: z.string(), fileName: z.string() })).optional(),
  replacementVehicle: z
    .object({
      slug: z.string(),
      name: z.string(),
      priceLabel: z.string(),
      imageUrl: z.string().optional(),
    })
    .nullable()
    .optional(),
});

export type TradeInSubmission = z.infer<typeof tradeInSchema>;
