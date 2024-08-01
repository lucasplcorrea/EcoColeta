const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Location = sequelize.define('Location', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  locality: { type: DataTypes.STRING, allowNull: false },
  coordinates: { type: DataTypes.GEOGRAPHY('POINT'), allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, {});

Location.associate = (models) => {
  Location.belongsTo(models.User, { foreignKey: 'userId' });
};

module.exports = Location;
