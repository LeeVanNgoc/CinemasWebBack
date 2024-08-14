"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlanScreenMovie", {
      planScreenMovieId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      planScreenMovieCode: {
        type: Sequelize.STRING,
      },
      roomCode: {
        type: Sequelize.STRING,
      },
      movieCode: {
        type: Sequelize.STRING,
      },
      startTime: {
        type: Sequelize.TIME,
      },
      endTime: {
        type: Sequelize.TIME,
      },
      dateScreen: {
        type: Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PlanScreenMovie");
  },
};
