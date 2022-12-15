const express = require("express");
import authController from "../controller/auth";
import handleError from "../middleware/handdleError";
let router = express.Router();
const authApi = (app) => {
  router.post("/register", authController.registerHandle);
  router.post("/login", authController.loginHandle);

  return app.use("/api/v1/", router);
};
module.exports = authApi;
