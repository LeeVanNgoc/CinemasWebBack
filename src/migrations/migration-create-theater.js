"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Theaters", {
      theaterId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      theaterCode: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      city: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Theaters");
  },
};
