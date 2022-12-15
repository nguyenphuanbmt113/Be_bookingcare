const express = require("express");
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetAllUser,
  handleUpdateUser,
} from "../controller/userController";
let router = express.Router();
const userApiRoute = (app) => {
  router.post("/user/create", handleCreateUser);
  router.put("/user/update", handleUpdateUser);
  router.delete("/user/delete", handleDeleteUser);
  router.get("/user/all", handleGetAllUser);
  return app.use("/api/v1/", router);
};
module.exports = userApiRoute;
