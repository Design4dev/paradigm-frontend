import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your full name."),
  email: z.string().trim().min(1, "Enter your email address.").email("Enter a valid email address."),
  phone: z.string().trim().optional().or(z.literal("")),
  subject: z.string().trim().min(1, "Enter a subject."),
  message: z.string().trim().min(10, "Message should be at least 10 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
