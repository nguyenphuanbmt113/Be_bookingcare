"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Category, {
        foreignKey: "category_code",
        targetKey: "code",
        as: "book_category",
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.FLOAT,
      available: DataTypes.INTEGER,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      category_code: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
