import { DataTypes } from "sequelize";
import database from "infra/database";

const sequelize = database.getNewClient();

const ShortenerPayload = sequelize.define("ShortenerPayload", {
  short_code: {
    type: DataTypes.CHAR(6),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  custom_name: {
    type: DataTypes.STRING,
    unique: true,
  },
  original_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  visit_url_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  last_visit_url: {
    type: DataTypes.DATE,
  },
  tableName: "url_shortener",
  timestamps: true,
});

export default ShortenerPayload();
