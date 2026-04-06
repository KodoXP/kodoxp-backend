import { QueryInterface, DataTypes } from "sequelize";

export async function up({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.addColumn("users", "points", {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  });
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.removeColumn("users", "points");
}
