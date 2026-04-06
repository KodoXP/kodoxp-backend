import { TaskFrequency, TasksAttributes, TasksCreate, TaskStatus } from "@/dtos/tasks-dto";
import { DataTypes, Model } from "sequelize";
import sequelize from "@/config/sequelize";
import User from "./user";

class Tasks extends Model<TasksAttributes, TasksCreate> {
  public id!: string;
  public user_id!: string;
  public name!: string;
  public description?: string;
  public points!: number;
  public target_completions!: number;
  public frequency!: TaskFrequency;
  public status!: TaskStatus;
  public due_date?: Date;
  public completed_at?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tasks.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    frequency: {
      type: DataTypes.ENUM(...Object.values(TaskFrequency)),
      defaultValue: TaskFrequency.ONCE,
    },
    target_completions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TaskStatus)),
      defaultValue: TaskStatus.PENDING,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, tableName: "tasks", timestamps: true, underscored: true },
);

export default Tasks;
