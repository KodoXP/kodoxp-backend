import fs from "fs";
import path from "path";

const migrationsDir = path.join(__dirname, "../migrations");

function generateMigration(name: string) {
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
  const filename = `${timestamp}-${name}.ts`;
  const filepath = path.join(migrationsDir, filename);

  const template = `import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // TODO: implement migration
}

export async function down(queryInterface: QueryInterface) {
  // TODO: revert migration
}
`;

  fs.writeFileSync(filepath, template);
  console.log(`Migration created: ${filename}`);
}

const migrationName = process.argv[2];
if (!migrationName) {
  console.error("Please provide a migration name.");
  process.exit(1);
}

generateMigration(migrationName);
