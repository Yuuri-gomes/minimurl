"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("url_shortner", {
      uuid: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      original_url: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      views: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("url_shortner");
  },
};
