'use strict';
const { PostTable, PostSchema } = require("../models/post");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PostTable, PostSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(PostTable);
  }
};
