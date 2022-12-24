const express = require("express");
const { handleAllcodes, handleGetDoctorHome, handleGetAllDoctor, handleCreateInfoDoctor } = require("../controller/webController");
let router = express.Router();
const webRoute = (app) => {
  //crud
  router.get("/allcodes", handleAllcodes);
  router.get("/top-doctor-home", handleGetDoctorHome);
  router.get("/doctor-all", handleGetAllDoctor);
  router.post("/create-info-doctor", handleCreateInfoDoctor);
  return app.use("/api/v1/", router);
};
module.exports = webRoute;
