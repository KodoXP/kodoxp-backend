import { Options, Sequelize } from "sequelize";
import "dotenv/config";

const requiredEnvs = ["POSTGRES_DB", "POSTGRES_USER", "POSTGRES_PASSWORD", "DB_HOST"];

requiredEnvs.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`[Database Config] Required environment variable missing: ${envVar}`);
  }
});

const dbOptions: Options = {
  host: process.env.DB_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,

  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },

  timezone: "-03:00",
};

const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  dbOptions,
);

export default sequelize;
