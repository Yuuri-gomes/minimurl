import retry from "async-retry";
import database from "infra/database";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage);

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      await response.json();
    }
  }
}

async function clearDatabase() {
  await database.doQuery("DROP SCHEMA minimurl_local; CREATE SCHEMA minimurl_local;");
}

export default {
  waitForAllServices,
  clearDatabase
};