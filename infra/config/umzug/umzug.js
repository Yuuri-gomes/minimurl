import migrationsSetup from "infra/config/umzug/umzug-config.js";

export async function runMigrations() {
  const { umzug, sequelize } = await migrationsSetup();

  const pendingMigrations = await umzug.pending();
  await umzug.up();

  const filteredMigrations = filterResponseMigrations(pendingMigrations);

  await sequelize.close();
  console.log("✅ Migrations executadas com sucesso!");
  return filteredMigrations;
}

export async function listMigrationsRunned() {
  const { umzug, sequelize } = await migrationsSetup();

  const runnedMigrations = await umzug.executed();

  const filteredMigrations = filterResponseMigrations(runnedMigrations);
  await sequelize.close();

  return filteredMigrations;
}

function filterResponseMigrations(migrationsResponse) {
  return migrationsResponse.map(({ name }) => ({ name }));
}
