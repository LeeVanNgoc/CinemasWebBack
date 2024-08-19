module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Otps", {
      otpId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      otpCode: {
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Otps");
  },
};
