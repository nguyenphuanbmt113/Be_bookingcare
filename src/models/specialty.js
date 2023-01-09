"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    static associate(models) {
      Specialty.hasMany(models.Doctor_Infor, {
        foreignKey: "specialtyId",
        as: "SpecialtyData",
      });
    }
  }
  Specialty.init(
    {
      name: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Specialty",
    }
  );
  return Specialty;
};
