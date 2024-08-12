"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MovieGenres", {
      movieGenreId: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
      },
      movieGenreCode: {
        type: Sequelize.STRING,
      },
      genreId: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MovieGenres");
  },
};
