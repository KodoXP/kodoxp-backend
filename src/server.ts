import express from "express";
import "dotenv/config";
import sequelize from "./config/sequelize";

const app = express();
const port = Number(process.env.PORT) || 8080;

async function bootStrap() {
  try {
    await sequelize.authenticate();
    app.listen(port, () => {
      console.log(`Api is running in port ${port}`);
    });
  } catch (error) {
    console.error(`Error uploading the server ${error}`);
    process.exit(1);
  }
}

bootStrap();
