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
      planScreenMovieId: {
        type: Sequelize.INTEGER,
      },
      roomId: {
        type: Sequelize.INTEGER,
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
