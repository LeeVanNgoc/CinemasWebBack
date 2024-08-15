"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Prices", {
      priceId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      priceCode: {
        type: Sequelize.STRING,
      },
      cost: {
        type: Sequelize.INTEGER,
      },
      roomType: {
        type: Sequelize.STRING,
      },
      seatType: {
        type: Sequelize.STRING,
      },
      isWeekend: {
        type: Sequelize.BOOLEAN,
      },
      timeFrame: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Prices");
  },
};
