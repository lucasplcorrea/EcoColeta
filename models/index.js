const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const LocationModel = require('./location');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const User = UserModel(sequelize, Sequelize);
const Location = LocationModel(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => console.log('Database & tables created!'));

module.exports = { User, Location };
