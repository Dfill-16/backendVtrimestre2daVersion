const { Model, DataTypes } = require("sequelize");

const UserTable = "users";

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class User extends Model {
  static associate(models) {
    //Relaciones aqui
  }
  
  static config(sequelize) {
      return { sequelize, tableName: UserTable ,modelName: "User", timestamps: false };
  }
}


module.exports = { User, UserSchema, UserTable };

