const UseMongo = true;

const crypto = require("crypto");
const UserRepository = UseMongo ? require("./../repositories/user.mongo.repositorie.js")
    : require("./../repositories/user.repositorie.js");

const User = require("../models/user");

class UserService {
  #repository;

  constructor() {
    this.#repository = new UserRepository();
  }

  async get() {
    const users = await this.#repository.get();
    return users.map((user) => user.getValues());
  }

  async create(name, email, password) {
    // Verificar si el usuario ya existe
    const existingUser = await this.#repository.getByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash de la contraseña
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    
    const user = new User(null, name, email, hashedPassword);
    const userCreated = await this.#repository.create(user);
    return userCreated.getValues();
  }

  async update(id, name, email, password) {
    const existente = await this.#repository.getById(id);
    if (!existente) {
      return null;
    }

    // Verificar si el email ya existe en otro usuario
    if (email && email !== existente.getemail()) {
      const emailExists = await this.#repository.getByEmail(email);
      if (emailExists) {
        throw new Error("Email already exists");
      }
    }

    // Hash de la contraseña si se proporciona
    let hashedPassword = existente.getpassword();
    if (password) {
      hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    }

    const updatedUser = new User(id, name || existente.getname(), email || existente.getemail(), hashedPassword);
    const actualizado = await this.#repository.update(updatedUser);
    return actualizado.getValues();
  }

  async delete(id) {
    const user = await this.#repository.getById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await this.#repository.delete(id);
    return user.getValues();
  }

  async getById(id) {
    const user = await this.#repository.getById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user.getValues();
  }

  async getByEmail(email) {
    const user = await this.#repository.getByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user.getValues();
  }

  async login(email, password) {
    const user = await this.#repository.getByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (user.getpassword() !== hashedPassword) {
      throw new Error("Invalid credentials");
    }

    return user.getValues();
  }
}

module.exports = UserService;
