
const { Post, PostSchema } = require("./post");

function setUpModels(sequelize) {
  Post.init(PostSchema, Post.config(sequelize));

  Post.associate(sequelize.models);
}

module.exports = setUpModels;
