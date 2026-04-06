import { z } from "zod";

export const findByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid UUID format"),
  }),
});

export const findByEmailSchema = z.object({
  params: z.object({
    email: z.string().email("Invalid email format"),
  }),
});

export const deactivateSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid UUID format"),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ error: "Name is required" })
      .min(3, "Name must be at least 3 characters long")
      .max(255)
      .transform((val) => val.trim()),

    email: z
      .string({ error: "Email is required" })
      .email("Invalid email format")
      .toLowerCase()
      .transform((val) => val.trim()),

    cpf: z
      .string()
      .min(11, "CPF must have at least 11 digits")
      .max(14)
      .optional()
      .transform((val) => val?.replace(/\D/g, "")),

    number: z
      .string({ error: "Phone number is required" })
      .min(10, "Invalid phone number")
      .max(15)
      .optional()
      .transform((val) => val?.replace(/\D/g, "")),

    password: z
      .string({ error: "Password is required" })
      .min(8, "Password must be at least 8 characters long"),

    zipcode: z
      .string({ error: "Zipcode is required" })
      .transform((val) => val.replace(/\D/g, ""))
      .optional()
      .refine((val) => val?.length === 8, "Zipcode must be exactly 8 digits"),

    isActive: z.boolean().optional().default(true),
  }),
});

export type CreateUserBody = z.infer<typeof createUserSchema>["body"];
