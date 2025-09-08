const UseMongo = true; // 👈 cambia esto según lo que quieras usar

const USER = encodeURIComponent("root");
const PASS = encodeURIComponent("");
const DIALECT = "mysql";

const MYSQL_URI = `${DIALECT}://${USER}:${PASS}@localhost:3306/blogs`;
const MONGO_URI = "mongodb://localhost:27017/blogs";

const URI = UseMongo ? MONGO_URI : MYSQL_URI;

module.exports = {
  development: {
    url: URI,
    dialect: UseMongo ? undefined : DIALECT
  },
  production: {
    url: URI,
    dialect: UseMongo ? undefined : DIALECT
  }
};
