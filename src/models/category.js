"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Book, {
        foreignKey: "category_code",
        targetKey: "code",
        as: "book_category",
      });
    }
  }
  Category.init(
    {
      code: DataTypes.STRING,
      value: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
