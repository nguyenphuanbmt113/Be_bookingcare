"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Infor extends Model {
    static associate(models) {
      Doctor_Infor.belongsTo(models.User, {
        foreignKey: "doctorId",
      });
      Doctor_Infor.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceData",
      });
      Doctor_Infor.belongsTo(models.Allcode, {
        foreignKey: "proviceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
      Doctor_Infor.belongsTo(models.Allcode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentData",
      });
      Doctor_Infor.belongsTo(models.Markdown, {
        foreignKey: "doctorId",
        targetKey: "doctorId",
        as: "MarkdownData",
      });
      Doctor_Infor.belongsTo(models.Specialty, {
        foreignKey: "specialtyId",
        targetKey: "id",
        as: "SpecialtyData",
      });
      Doctor_Infor.belongsTo(models.Clinic, {
        foreignKey: "clinicId",
        targetKey: "id",
        as: "ClinicData",
      });
    }
  }
  Doctor_Infor.init(
    {
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      proviceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_Infor",
    }
  );
  return Doctor_Infor;
};
