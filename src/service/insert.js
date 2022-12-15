import db from "../models";
import data from "../../data/booksData.json";
import { generateCode } from "../helper/fn";
const insert = async () => {
  try {
    const categories = Object.keys(data);
    categories.forEach(async (item) => {
      await db.Category.create({
        code: generateCode(item),
        value: item,
      });
    });
    const dataArr = Object.entries(data);
    dataArr.forEach((item) => {
      item[1]?.map(async (book) => {
        await db.Book.create({
          id: book.upc,
          title: book.bookTitle,
          price: +book.bookPrice,
          available: +book.available,
          image: book.imageUrl,
          description: book.bookDescription,
          category_code: generateCode(item[0]),
        });
      });
    });
    return {
      EC: 0,
      EM: "insert success!",
    };
  } catch (error) {
    console.log("?>>>>>>>error", error);
    return {
      EC: 1,
      EM: "some thing error",
    };
  }
};
module.exports = { insert };
