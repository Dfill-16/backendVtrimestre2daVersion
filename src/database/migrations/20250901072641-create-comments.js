'use strict';
const { CommentTable, CommentSchema } = require("../models/comment");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CommentTable, CommentSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CommentTable);
  }
};
