const {Sequelize} = require("sequelize");
const setUpModels = require("../database/models/index");

const User = encodeURIComponent('root');
const Pass = encodeURIComponent('');
const Dialect = 'mysql';

const Uri = `${Dialect}://${User}:${Pass}@localhost:3306/blogs`;

const sequelize = new Sequelize(Uri, {
  dialect: Dialect
});

setUpModels(sequelize);
module.exports = sequelize;