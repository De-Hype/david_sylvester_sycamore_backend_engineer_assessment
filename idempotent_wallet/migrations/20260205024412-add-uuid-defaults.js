'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

  await queryInterface.changeColumn("wallets", "id", {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.literal("uuid_generate_v4()"),
    primaryKey: true,
  });

  await queryInterface.changeColumn("transaction_logs", "id", {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.literal("uuid_generate_v4()"),
    primaryKey: true,
  });

  },

  async down (queryInterface, Sequelize) {
  await queryInterface.changeColumn("wallets", "id", {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  });

  await queryInterface.changeColumn("transaction_logs", "id", {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  });

  }
};
