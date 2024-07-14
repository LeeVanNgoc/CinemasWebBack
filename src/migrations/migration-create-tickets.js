'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      ticketId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING
      },
      movieId: {
        type: Sequelize.STRING
      },
      seatId: {
        type: Sequelize.STRING
      },
      roomId: {
        type: Sequelize.STRING
      },
      theaterId: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      paymentId: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};