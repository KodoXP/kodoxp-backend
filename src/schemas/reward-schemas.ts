import { z } from "zod";

export const findByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid UUID format"),
  }),
});

export const deleteSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid UUID format"),
  }),
});

export const createRewardSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),

    description: z.string().optional(),

    points_cost: z.number().int().nonnegative("Points cost cannot be negative"),

    category: z.enum([
      "GAMES",
      "SOCIAL_MEDIA",
      "FOOD",
      "ENTERTAINMENT",
      "SHOPPING",
      "HOBBIES",
      "TRAVEL",
      "OTHER",
      "UNDEFINED",
    ]),

    expiration_date: z.string().datetime(),
  }),
});

export type CreateRewardBody = z.infer<typeof createRewardSchema>["body"];
