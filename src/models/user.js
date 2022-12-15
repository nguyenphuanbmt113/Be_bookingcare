"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "role_code",
        targetKey: "code",
        as: "role_user",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
