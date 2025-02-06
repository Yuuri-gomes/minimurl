"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.sequelize.query(`
      CREATE EVENT IF NOT EXISTS delete_unused_urls_last_month
      ON SCHEDULE EVERY 1 HOUR
      DO
        DELETE FROM url_shortener WHERE last_visit_url < NOW() - INTERVAL 1 MONTH || createdAt < NOW() - INTERVAL 1 MONTH;
    `);
  },

  async down({ context: queryInterface }) {
    await queryInterface.sequelize.query(`
      DROP EVENT IF EXISTS delete_unused_urls_last_month;`);
  },
};
