const express = require("express");
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetAllUser,
  handleLogin,
  handleUpdateUser,
} from "../controller/userController";
let router = express.Router();
const userApiRoute = (app) => {
  //crud
  router.post("/user/create", handleCreateUser);
  router.put("/user/update", handleUpdateUser);
  router.delete("/user/delete", handleDeleteUser);
  router.get("/user/all", handleGetAllUser);

  //login and register
  router.post("/login", handleLogin);
  // router.post("/register", handleGetAllUser);
  return app.use("/api/v1/", router);
};
module.exports = userApiRoute;
