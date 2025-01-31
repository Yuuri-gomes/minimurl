import migrationsSetup from "infra/config/umzug/umzug-config.js";
import database from "infra/database.js";

const setup = async () => {
  return await migrationsSetup();
};

export async function runMigrations() {
  const setupMigrationInstances = await setup();
  const umzug = setupMigrationInstances["umzug"];
  const sequelize = setupMigrationInstances["sequelize"];

  const pendingMigrations = await umzug.pending();
  await umzug.up();

  const filteredMigrations = filterResponseMigrations(pendingMigrations);

  await sequelize.close();
  console.log("✅ Migrations executadas com sucesso!");
  return filteredMigrations;
}

export async function listMigrationsRunned() {
  const setupMigrationInstances = await setup();
  const umzug = setupMigrationInstances["umzug"];
  const sequelize = setupMigrationInstances["sequelize"];

  const runnedMigrations = await umzug.executed();

  const filteredMigrations = filterResponseMigrations(runnedMigrations);
  await sequelize.close();

  return filteredMigrations;
}

function filterResponseMigrations(migrationsResponse) {
  return migrationsResponse.map(({ name }) => ({ name }));
}
