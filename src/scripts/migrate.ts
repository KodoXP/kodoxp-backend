import { runMigrations } from "@/umzug/migrator";

async function main() {
  try {
    console.log("Running migrations...");
    await runMigrations();
    console.log("Migrations completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

main();
