import { exec } from "child_process";

async function migrations(request, response) {
  exec("bun run migrations:up", handleReturn);

  function handleReturn(error, stdout) {
    console.log("SAIDA DO COMANDO: ", stdout);
    return response.status(200).json({ message: stdout });
  }
}

export default migrations;
