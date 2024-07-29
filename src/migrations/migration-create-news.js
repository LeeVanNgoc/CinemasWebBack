'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('News', {
      poseatTicketId: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER
      },
      title: {
        type : Sequelize.TEXT
      },
      content: {
        type : Sequelize.TEXT
      },
      postDate: {
        type : Sequelize.DATE
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('News');
  }
};
