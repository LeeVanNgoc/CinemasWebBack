"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Trailers", {
      trailerId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      trailerCode: {
        type: Sequelize.STRING,
      },
      movieId: {
        type: Sequelize.INTEGER,
      },
      link: {
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Trailers");
  },
};
