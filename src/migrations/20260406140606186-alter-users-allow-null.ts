import { QueryInterface, DataTypes } from "sequelize";

export async function up({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.changeColumn("users", "number", {
    type: DataTypes.STRING(15),
    allowNull: true,
  });

  await queryInterface.changeColumn("users", "zipcode", {
    type: DataTypes.STRING(20),
    allowNull: true,
  });
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.changeColumn("users", "number", {
    type: DataTypes.STRING(15),
    allowNull: false,
  });

  await queryInterface.changeColumn("users", "zipcode", {
    type: DataTypes.STRING(20),
    allowNull: false,
  });
}
