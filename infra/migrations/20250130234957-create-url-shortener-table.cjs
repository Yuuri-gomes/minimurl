"use strict";

const { Sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("url_shortener", {
      short_code: {
        type: Sequelize.DataTypes.CHAR(6),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      custom_name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      original_url: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      visit_url_count: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      last_visit_url: {
        type: Sequelize.DataTypes.DATE,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });

    await queryInterface.addIndex(
      "url_shortener",
      ["short_code", "custom_name", "last_visit_url"],
      {
        name: "url_shortener_index",
      },
    );
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("url_shortener");
  },
};
