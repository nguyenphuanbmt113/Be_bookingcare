const express = require("express");
const { checkUserJwt, checkUserPermissionAdmin } = require("../config/jwt");
const {
  handleAllcodes,
  handleGetDoctorHome,
  handleGetAllDoctor,
  handleCreateInfoDoctor,
  handleGetDetailDoctorById,
  handleBulkCreate,
  handleGetScheduleByDate,
  handleGetExtraInforDoctor,
  handleGetProfileDoctor,
  handlePatientBooking,
  handleVerifyPatientBooking,
  handleCreateNewSpecialty,
  handleGetSpecialty,
  handleGetDetailSpecialty,
  handleCreateNewClinic,
  handleGetClinic,
  handleGetDetailClinic,
  handleGetListPatientForDoctor,
  handleSendRemedy,
  handleUserParamater,
  handleDoctorPara,
} = require("../controller/webController");
let router = express.Router();
const webRoute = (app) => {
  //===================GET==========================>
  router.get("/allcodes", handleAllcodes);
  router.get("/top-doctor-home", handleGetDoctorHome);
  router.get("/doctor-all", handleGetAllDoctor);
  router.get(
    "/user-parameter",
    checkUserJwt,
    checkUserPermissionAdmin,
    handleUserParamater
  );
  router.get("/get-detail-doctor-by-id", handleGetDetailDoctorById);
  router.get("/schedule-doctor-by-date", handleGetScheduleByDate);
  router.get("/get-extra-infor-doctor-id", handleGetExtraInforDoctor);
  router.get("/get-profile-doctor-id", handleGetProfileDoctor);
  router.get("/specialty", handleGetSpecialty);
  router.get("/get-detail-specialty-by-id", handleGetDetailSpecialty);
  router.get("/all-clinic", handleGetClinic);
  router.get("/get-detail-clinic-by-id", handleGetDetailClinic);
  router.get("/get-list-patient-for-doctor", handleGetListPatientForDoctor);
  //<==================POST==========================>
  router.post("/bulk-create-schedule", handleBulkCreate);
  router.post("/create-info-doctor", handleCreateInfoDoctor);
  router.post("/patient-book-appointment", handlePatientBooking);
  router.post("/verify-book-appointment", handleVerifyPatientBooking);
  router.post("/create-new-specialty", handleCreateNewSpecialty);
  router.post("/create-new-clinic", handleCreateNewClinic);
  router.post("/send-remedy", handleSendRemedy);

  //Doctor
  router.get("/doctor-parameter", handleDoctorPara);

  return app.use("/api/v1/", router);
};
module.exports = webRoute;
