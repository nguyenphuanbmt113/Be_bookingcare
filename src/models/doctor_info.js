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
    }
  }
  Doctor_Infor.init(
    {
      doctorId: DataTypes.INTEGER,
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
