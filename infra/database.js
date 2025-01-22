const Sequelize = require("sequelize");

const configDB = {
  schema: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
};

const sequelize = new Sequelize(
  configDB.schema,
  configDB.user,
  configDB.password,
  {
    host: configDB.host,
    dialect: "mysql",
  },
);

export default sequelize;
