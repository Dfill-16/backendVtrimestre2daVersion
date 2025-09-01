const {Sequelize} = require("sequelize");
const setUpModels = require("../database/models/index");

const User = encodeURIComponent('');
const Pass = encodeURIComponent('');
const Dialect = 'mysql';

const Uri = `${Dialect}://${User}:${Pass}@localhost:3306/blog`;

const sequelize = new Sequelize(Uri, {
  dialect: Dialect
});

setUpModels(sequelize);
module.exports = sequelize;