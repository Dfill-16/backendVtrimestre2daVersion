class User {
  #id = null;
  #name = null;
  #email = null;
  #password = null;

  constructor(id = null, name = null, email = null, password = null) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#password = password;
  }

  getid() {
    return this.#id;
  }

  setid(value) {
    this.#id = value;
  }

  getname() {
    return this.#name;
  }

  setname(value) {
    this.#name = value;
  }

  getemail() {
    return this.#email;
  }

  setemail(value) {
    this.#email = value;
  }

  getpassword() {
    return this.#password;
  }

  setpassword(value) {
    this.#password = value;
  }

  getValues(includePassword = false) {
    const values = {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      password: includePassword ? this.#password : null,
    };
    return values;
  }
}

module.exports = User;
