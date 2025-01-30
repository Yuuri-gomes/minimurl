import { exec } from "child_process";

async function migrations(request, response) {
  await exec("bun run migrations:up").on("close", (data) => {
    console.log(data);

    return response.status(200).json({ code: data });
  });
}

export default migrations;
