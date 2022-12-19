const express = require("express");
const { handleAllcodes } = require("../controller/webController");
let router = express.Router();
const webRoute = (app) => {
  //crud
  router.get("/allcodes", handleAllcodes);
  return app.use("/api/v1/", router);
};
module.exports = webRoute;
