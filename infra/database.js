import { ServiceError } from "infra/error";
const { Sequelize, QueryTypes } = require("sequelize");
const configDB = {
  schema: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  host: process.env.MYSQL_HOST,
};

async function doQuery(query, config) {
  let sequelize;
  try {
    sequelize = await getNewClient();
    const queryResult = await sequelize.query(query, config);
    return queryResult[0];
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Erro na conexão com Banco ou na Query.",
      cause: error,
    });
    throw serviceErrorObject;
  } finally {
    await sequelize?.close();
  }
}

async function getNewClient() {
  const sequelize = new Sequelize(
    configDB.schema,
    configDB.user,
    configDB.password,
    {
      host: configDB.host,
      port: "3307",
      dialect: "mysql",
    },
  );

  await sequelize.authenticate();
  return sequelize;
}

const database = {
  doQuery,
  getNewClient,
};

export default database;
