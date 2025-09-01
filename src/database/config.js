const USER = encodeURIComponent("root"); //encodeURI ->medida de seguridad
const PASS = encodeURIComponent(""); //encodeURI ->medida de seguridad
const DIALECT = "mysql";

const URI = `${DIALECT}://${USER}:${PASS}@localhost:3306/blogs`;

module.exports = {
  development: {
    url: URI,
    dialect: DIALECT
  },
  production: {
    url: URI,
    dialect: DIALECT
  },
};
