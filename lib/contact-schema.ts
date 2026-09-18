import { z } from "zod";

/** Shared between the contact form (client) and the API route (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || /^[+\d\s()-]{6,}$/.test(v), "Please enter a valid phone number."),
  enquiryType: z.string().min(1, "Please choose an enquiry type."),
  service: z.string().optional().or(z.literal("")),
  message: z.string().trim().min(20, "Please describe the scope in a few sentences (20+ characters).").max(4000),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
