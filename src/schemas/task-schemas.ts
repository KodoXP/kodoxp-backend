import { z } from "zod";
import { TaskFrequency, TaskStatus } from "@/dtos/tasks-dto";

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

export const createTaskSchema = z.object({
  body: z.object({
    user_id: z.string().uuid("Invalid User ID format"),

    name: z.string().min(3, "Name must be at least 3 characters long"),

    description: z.string().optional(),

    points: z.number().int().nonnegative("Points cannot be negative").optional(),

    target_completions: z
      .number()
      .int()
      .positive("Target completions must be at least 1")
      .optional(),

    frequency: z.nativeEnum(TaskFrequency).optional(),

    status: z.nativeEnum(TaskStatus).optional(),

    due_date: z.string().datetime("Invalid datetime format. Use ISO 8601.").optional(),
  }),
});

export type CreateTaskBody = z.infer<typeof createTaskSchema>["body"];
