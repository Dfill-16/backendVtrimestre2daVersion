const { Model, DataTypes } = require("sequelize");

const PostTable = "posts";

const PostSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
};

class Post extends Model {
  static associate(models) {
    //Relaciones
    this.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  }

  static config(sequelize) {
    return { sequelize, tableName: PostTable ,modelName: "Post", timestamps: false };
  }
}

module.exports = { PostTable, PostSchema, Post };
