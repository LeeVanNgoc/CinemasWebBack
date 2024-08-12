"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movies", {
      movieid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      movieCode: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      genreCode: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      releaseDate: {
        type: Sequelize.DATEONLY,
      },
      image: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Movies");
  },
};
