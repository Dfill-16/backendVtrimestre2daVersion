const Connection = require("../libs/mysql");
const User = require("../models/user");
const { models } = require("./../libs/sequelize");

class UserRepository {
  #connection = null;

  constructor() {
    this.getConnection();
  }

  async getConnection() {
    this.#connection = await Connection();
  }

  async get() {
    const users = await models.User.findAll();
    return users.map((user) => new User(user.id, user.name, user.email, user.password));
  }

  async create(user) {
    const newUser = await models.User.create({
      name: user.getname(),
      email: user.getemail(),
      password: user.getpassword(),
    });

    user.setid(newUser.id);
    return user;
  }

  async update(updatedUser) {
    await models.User.update(
      {
        name: updatedUser.getname(),
        email: updatedUser.getemail(),
        password: updatedUser.getpassword(),
      },
      {
        where: {
          id: updatedUser.getid(),
        },
      }
    );
    return updatedUser;
  }

  async getById(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      return null;
    }
    return new User(user.id, user.name, user.email, user.password);
  }

  async getByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }
    return new User(user.id, user.name, user.email, user.password);
  }

  async delete(id) {
    const user = await this.getById(id);
    if (!user) {
      return null;
    } else {
      await models.User.destroy({where: {id: id, },});
      return user;
    }
  }
}

module.exports = UserRepository;
