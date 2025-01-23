import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.doQuery(
    "SELECT VERSION() AS server_version;",
  );
  const databaseVersionValue = databaseVersionResult[0].server_version;

  const databaseMaxConnectionsResult = await database.doQuery(
    'SHOW VARIABLES LIKE "max_connections"',
  );
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult[0].Value;

  const databaseOpenedConnectionsResult = await database.doQuery(
    "SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.PROCESSLIST WHERE DB = ?",
    { replacements: [process.env.MYSQL_DATABASE] },
  );
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
