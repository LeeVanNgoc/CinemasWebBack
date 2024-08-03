'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlanScreenMovie', {
      planScreenMovieId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomId: {
        type: Sequelize.INTEGER
      },
      movieId: {
        type: Sequelize.INTEGER
      },
      startTime: {
        type: Sequelize.TIME
      },
      endTime: {
        type: Sequelize.TIME
      },
      dateScreen: {
        type: Sequelize.DATE
      },
      space: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlanScreenMovie');
  }
};