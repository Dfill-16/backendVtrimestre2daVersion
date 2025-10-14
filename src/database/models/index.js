const { Post, PostSchema } = require("./post");
const { Comment, CommentSchema } = require("./comment");
const { User, UserSchema } = require("./user");

function setUpModels(sequelize) {
  Post.init(PostSchema, Post.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));
  User.init(UserSchema, User.config(sequelize));

  Post.associate(sequelize.models);
  Comment.associate(sequelize.models);
}

module.exports = setUpModels;
