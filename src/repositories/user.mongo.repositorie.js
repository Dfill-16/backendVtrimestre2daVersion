const Connection = require("../libs/mongoose");
const UserModel = require("../database/mongo/user.model"); // Mongoose
const User = require("../models/user"); // Clase de dominio

class UserRepository {
  #connection = null;

  constructor() {
    this.getConnection();
  }

  async getConnection() {
    this.#connection = await Connection();
  }

  async get() {
    const users = await UserModel.find({});
    return users.map(
      (u) => new User(u._id.toString(), u.name, u.email, u.password)
    );
  }

  async create(user) {
    const newUser = await UserModel.create({
      name: user.getname(),
      email: user.getemail(),
      password: user.getpassword(),
    });
    user.setid(newUser._id.toString());
    return user;
  }

  async update(updatedUser) {
    await UserModel.updateOne(
      { _id: updatedUser.getid() }, // filtro
      {
        name: updatedUser.getname(),
        email: updatedUser.getemail(),
        password: updatedUser.getpassword(),
      }
    );
    return updatedUser;
  }

  async getById(id) {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return new User(user._id.toString(), user.name, user.email, user.password);
  }

  async getByEmail(email) {
    const user = await UserModel.findOne({ email: email });
    if (!user) return null;
    return new User(user._id.toString(), user.name, user.email, user.password);
  }

  async delete(id) {
    const user = await this.getById(id);
    if (!user) return null;
    await UserModel.deleteOne({ _id: id });
    return user;
  }
}

module.exports = UserRepository;
