const express = require("express");
const {
  handleGetBooks,
  handleGetAllBooks,
  handleCreateBook,
  handleUpdateBook,
  handleDeleteBook,
} = require("../controller/book");
// const { default: upload_middware } = require("../middleware/upload_middware");
import uploadCloud from "../config/cloudinaryConfig";

let router = express.Router();
const bookApi = (app) => {
  router.get("/books", handleGetBooks);
  router.get("/book/all", handleGetAllBooks);
  router.post("/book/update/:id", uploadCloud.single("image"), handleUpdateBook);
  router.delete("/book/delete/:id", handleDeleteBook);
  router.post("/book/create", uploadCloud.single("image"), handleCreateBook);
  return app.use("/api/v1/", router);
};
module.exports = bookApi;
