"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BookedSeats", {
      bookedSeatId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookedSeatCode: {
        type: Sequelize.STRING,
      },
      planScreenMovieCode: {
        type: Sequelize.STRING,
      },
      roomCode: {
        type: Sequelize.STRING,
      },
      row: {
        type: Sequelize.STRING,
      },
      col: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BookedSeats");
  },
};
