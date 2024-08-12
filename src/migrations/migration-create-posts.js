"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      postId: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
      },
      postCode: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.TEXT,
      },
      content: {
        type: Sequelize.TEXT,
      },
      postDate: {
        type: Sequelize.DATE,
      },
      image: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
