import { spawn } from "child_process";

async function migrations(request, response) {
  const dbMigrate = await spawn("bun", ["run", "migrations:up"], {
    stdio: "inherit",
  });

  dbMigrate.on("close", (code) => {
    if (code > 0)
      return response
        .status(500)
        .json({ message: "Erro ao executar as migrations." });

    return response
      .status(200)
      .json({ message: "Migrations executadas com sucesso !" });
  });
}

export default migrations;
