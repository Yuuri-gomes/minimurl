const Sequelize = require("sequelize");

const configDB = {
  schema: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  host: process.env.MYSQL_HOST,
};

const sequelize = new Sequelize(
  configDB.schema,
  configDB.user,
  configDB.password,
  {
    host: configDB.host,
    port: '3307',
    dialect: "mysql",
  },
);

export default sequelize;
