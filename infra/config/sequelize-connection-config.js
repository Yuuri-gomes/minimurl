import dotenv from "dotenv";

dotenv.config();

const sequelizeConfig = {
  username: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: "3307",
  dialect: "mysql",
};

export default sequelizeConfig;
