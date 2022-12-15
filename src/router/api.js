const express = require("express");
const apiController = require("../controller/apiController");
let router = express.Router();
const apiWeb = (app) => {
  router.get("/hello", apiController.handleInit);
  return app.use("/api/v1/", router);
};
module.exports = apiWeb;
