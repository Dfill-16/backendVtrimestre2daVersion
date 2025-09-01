const { Model, DataTypes } = require("sequelize");

const CommentTable = "comments";

const CommentSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "posts",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
};

class Comment extends Model {
  static associate(models) {
    //Relaciones
    this.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  }

  static config(sequelize) {
    return { sequelize, tableName: CommentTable ,modelName: "Comment", timestamps: false };
  }
}

module.exports = { CommentTable, CommentSchema, Comment };