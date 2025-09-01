const { Post, PostSchema } = require("./post");
const { Comment, CommentSchema } = require("./comment");

function setUpModels(sequelize) {
  Post.init(PostSchema, Post.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));
  
  Post.associate(sequelize.models);
  Comment.associate(sequelize.models);
}

module.exports = setUpModels;
