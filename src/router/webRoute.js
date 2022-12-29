const express = require("express");
const {
  handleAllcodes,
  handleGetDoctorHome,
  handleGetAllDoctor,
  handleCreateInfoDoctor,
  handleGetDetailDoctorById,
  handleBulkCreate,
  handleGetScheduleByDate,
} = require("../controller/webController");
let router = express.Router();
const webRoute = (app) => {
  //crud
  router.get("/allcodes", handleAllcodes);
  router.get("/top-doctor-home", handleGetDoctorHome);
  router.get("/doctor-all", handleGetAllDoctor);
  router.post("/create-info-doctor", handleCreateInfoDoctor);
  router.get("/get-detail-doctor-by-id", handleGetDetailDoctorById);
  router.post("/bulk-create-schedule", handleBulkCreate);
  router.get("/schedule-doctor-by-date", handleGetScheduleByDate);
  return app.use("/api/v1/", router);
};
module.exports = webRoute;
