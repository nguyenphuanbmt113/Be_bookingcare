const express = require("express");
import { handleInsertData } from "../controller/insert";
let router = express.Router();
const insertDataApi = (app) => {
  router.get("/insert", handleInsertData);

  return app.use("/api/v1/", router);
};
module.exports = insertDataApi;
