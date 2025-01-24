import { createRouter } from "next-connect";
import { Umzug, SequelizeStorage } from "umzug";
import { resolve } from "node:path";
import database from "infra/database.js";
import controller from "infra/controller.js";
const Sequelize = require('sequelize');

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();
    
    const pendingMigrations = new Umzug({
      migrations: {glob: 'infra/migrations/*.js'},
      context: {
        queryInterface: dbClient.getQueryInterface(),
        Sequelize
      },
      storage: new SequelizeStorage({sequelize: dbClient}),
      logger: console
    });

    const migrations = await pendingMigrations.up();
    
    await pendingMigrations.up();

    return response.status(200).json(migrations);

  } finally {
    await dbClient.close();
  }
}

async function postHandler(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  } finally {
    await dbClient.end();
  }
}