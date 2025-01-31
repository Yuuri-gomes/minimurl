import { SequelizeStorage, Umzug } from "umzug";
import database from "infra/database.js";

export default async function migrationsSetup() {
  const sequelize = await database.getNewClient();

  const umzugConfig = {
    migrations: { glob: "infra/migrations/*.cjs" },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  };
  const umzug = new Umzug(umzugConfig);
  return { umzug, sequelize };
}
