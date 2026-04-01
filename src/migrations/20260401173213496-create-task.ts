import { TaskFrequency, TaskStatus } from "@/dtos/tasks-dto";
import { QueryInterface, DataTypes } from "sequelize";

export async function up({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.createTable("tasks", {
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
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await queryInterface.addIndex("tasks", ["user_id"]);
  await queryInterface.addIndex("tasks", ["status"]);
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.dropTable("tasks");
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_frequency"');
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_status"');
}
