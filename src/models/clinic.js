"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    static associate(models) {
        Clinic.hasMany(models.Doctor_Infor, {
          foreignKey: "clinicId",
          as: "ClinicData",
        });
    }
  }
  Clinic.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Clinic",
    }
  );
  return Clinic;
};
