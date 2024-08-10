"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      roomId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roomCode: {
        type: Sequelize.STRING,
      },
      theaterId: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      numberSeats: {
        type: Sequelize.INTEGER,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rooms");
  },
};
