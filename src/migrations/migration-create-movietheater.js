"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MovieTheaters", {
      movieTheaterId: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
      },
      movieTheaterCode: {
        type: Sequelize.STRING,
      },
      movieCode: {
        type: Sequelize.STRING,
      },
      theaterCode: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MovieTheaters");
  },
};
