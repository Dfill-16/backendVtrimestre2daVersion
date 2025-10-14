'use strict';
const { UserTable, UserSchema } = require("../models/user");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(UserTable, UserSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(UserTable);
  }
};
