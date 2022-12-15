"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schelude extends Model {
    static associate(models) {}
  }
  Schelude.init(
    {
      currentNumbe: DataTypes.INTEGER,
      maxNumber: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schelude",
    }
  );
  return Schelude;
};
