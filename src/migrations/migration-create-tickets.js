"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
      ticketId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      planScreenMovieId: {
        type: Sequelize.INTEGER,
      },
      seats: {
        type: Sequelize.TEXT,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
      },
      bank: {
        type: Sequelize.STRING,
      },
      ticketsDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tickets");
  },
};
