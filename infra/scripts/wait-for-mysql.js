const { exec } = require("child_process");
const dotenv = require("dotenv");
dotenv.config();

const maxRetries = 10;
const retryInterval = 5000;
const mysqlContainerName = process.env.DOCKER_CONTAINER_NAME;
const rootPassword = process.env.MYSQL_ROOT_PASSWORD;

console.log("Senha do .env: ", rootPassword);

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr || error.message);
      }
      resolve(stdout);
    });
  });
}

async function checkMySQLReady(retries = 0) {
  const command = `docker exec ${mysqlContainerName} mysqladmin ping -u root -p${rootPassword} --silent`;

  try {
    const output = await executeCommand(command);
    if (output.includes("mysqld is alive")) {
      console.log("✅ MySQL está pronto para uso!");
      return true;
    }
  } catch (error) {
    console.log(`Erro ao verificar MySQL: ${error}`);
  }

  if (retries >= maxRetries - 1) {
    console.error(
      "❌ Erro: MySQL não ficou pronto dentro do limite de tentativas.",
    );
    return false;
  }

  console.log(
    `⏳ Tentativa ${retries + 1}/${maxRetries}: MySQL ainda não está pronto. Retentando em ${retryInterval / 1000}s...`,
  );
  setTimeout(() => checkMySQLReady(retries + 1), retryInterval);
}

checkMySQLReady();
