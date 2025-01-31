import migrationsSetup from "infra/config/umzug/umzug-config.js";

async function runMigrations() {
  try {
    const { umzug } = await migrationsSetup();
    umzug.runAsCLI();
  } catch (error) {
    console.error("❌ Erro ao configurar as migrations: ", error);
    process.exit(1);
  }
}

runMigrations();
