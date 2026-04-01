import { Optional } from "sequelize";

export enum TaskFrequency {
  DAILY = "daily",
  WEEKLY = "weekly",
  ONCE = "once",
}

export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface TasksAttributes {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  points: number;
  frequency: TaskFrequency;
  target_completions: number;
  status: TaskStatus;
  due_date?: Date;
  completed_at?: Date;
}

export interface TasksCreate extends Optional<
  TasksAttributes,
  "id" | "description" | "status" | "due_date" | "completed_at" | "target_completions"
> {}
