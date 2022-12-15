const express = require("express");
import { handleGetOneUser } from "../controller/user";
import { isDevOrAdmin } from "../middleware/verify_role";
import verifi_token from "../middleware/verify_token";
let router = express.Router();
const userApi = (app) => {
  router.use(verifi_token);
  // router.use(isDevOrAdmin);
  router.get("/userOne", handleGetOneUser);

  return app.use("/api/v1/", router);
};
module.exports = userApi;
