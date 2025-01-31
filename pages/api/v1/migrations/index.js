import {
  runMigrations,
  listMigrationsRunned,
} from "infra/config/umzug/umzug.js";
import { createRouter } from "next-connect";
import controller from "infra/controller";

const router = createRouter();

router.get(listMigrations);
router.post(executeMigrations);

export default router.handler(controller.errorHandlers);

async function executeMigrations(request, response) {
  try {
    const runnedMigrations = await runMigrations();
    const message = "Migrations executadas com sucesso";
    if (runnedMigrations.length > 0) {
      return response
        .status(201)
        .json({ message, migrations: runnedMigrations });
    }

    return response.status(200).json({
      message,
      migrations: runnedMigrations,
    });
  } catch (error) {
    response
      .status(500)
      .json({ error: "Erro ao aplicar migrations", details: error.message });
  }
}

async function listMigrations(request, response) {
  const runnedMigrations = await listMigrationsRunned();
  return response.status(200).json({
    message: "Migrations executadas com sucesso",
    migrations: runnedMigrations,
  });
}
