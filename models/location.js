"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Location.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      complement: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      latitude: DataTypes.DECIMAL(9,6),
      longitude: DataTypes.DECIMAL(9,6),
      linkMaps: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
