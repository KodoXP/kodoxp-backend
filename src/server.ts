import express from "express";
import "dotenv/config";
import sequelize from "./config/sequelize";
import routes from "./routes/routes";
import { runMigrations } from "./umzug/migrator";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { validateSchema } from "./middlewares/validate-schema";
const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.json());
app.use("/api/v1", routes);
app.use(globalErrorHandler);
app.use(validateSchema);

async function bootStrap() {
  try {
    await sequelize.authenticate();
    await runMigrations();
    app.listen(port, () => {
      console.log(`Api is running in port ${port}`);
    });
  } catch (error) {
    console.error(`Error uploading the server ${error}`);
    process.exit(1);
  }
}

bootStrap();
