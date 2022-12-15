import db from "../models";
import { Op, UUID } from "sequelize";
import { v4 as uuidv4 } from "uuid";
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const bookServicePagi = async ({
  limit,
  page,
  order,
  name,
  available,
  ...query
}) => {
  console.log("order", order);
  try {
    const queries = { raw: true, nest: true };
    queries.offset = (+page - 1) * +limit + 1 || 0;
    queries.limit = +limit || +process.env.LIMIT_ELE;
    if (order) {
      queries.order = [order];
    }
    if (name) {
      query.title = {
        [Op.substring]: name,
      };
    }
    if (available) {
      query.available = {
        [Op.eq]: available,
        // [Op.or]: [5, 6],
        // [Op.between]: available,
        // [Op]
      };
    }
    const { count, rows } = await db.Book.findAndCountAll({
      where: query,
      ...queries,
    });
    console.log("count", count);
    return {
      EC: 0,
      EM: "hello",
      data: {
        totalCount: count,
        books: rows,
      },
    };
  } catch (error) {
    console.log(">>>>>>>>check:", error);
  }
};
const getAllBookService = async (body) => {
  try {
    const res = await db.Book.findAll({
      include: { model: db.Category, as: "book_category" },
    });
    return {
      EC: 0,
      EM: "get all books",
      data: res,
    };
  } catch (error) {
    console.log(">>>>>>>check error:", error);
  }
};
const createBookservice = async (body, image) => {
  try {
    const [res, created] = await db.Book.findOrCreate({
      where: {
        title: {
          [Op.substring]: body.title,
        },
      },
      defaults: {
        id: uuidv4(),
        image: image.path,
        ...body,
      },
    });
    if (created === false) {
      cloudinary.uploader.destroy(image.filename);
    }
    return {
      EC: created ? 0 : 1,
      EM: created ? "create sucess" : "the book is exixst",
    };
  } catch (error) {
    console.log(">>>>>>>check error:", error);
  }
};
const updateBookById = async (body, id, image) => {
  try {
    const res = await db.Book.findOne({
      where: {
        id,
      },
    });
    console.log("res", res)
    if (res) {
      const result = await db.Book.update(
        {
          title: body.title,
          available: body.available,
          price: body.price,
          image: image?.path,
        },
        {
          where: {
            id,
          },
        }
      );

      return {
        EC: 0,
        EM: "Update done",
      };
    }
  } catch (error) {
    console.log(">>>>>>>check error:", error);
  }
};
const deleteBookById = async (id) => {
  try {
    const result = await db.Book.destroy({
      where: {
        id,
      },
    });

    return {
      EC: 0,
      EM: "delete done",
    };
  } catch (error) {
    console.log(">>>>>>>check error:", error);
  }
};
export {
  bookServicePagi,
  getAllBookService,
  createBookservice,
  updateBookById,
  deleteBookById,
};
