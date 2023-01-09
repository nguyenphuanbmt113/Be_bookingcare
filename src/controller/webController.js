import {
  doctorParameter,
  geClinicById,
  getAllClinic,
  getAllcodesByType,
  getAllDoctor,
  getClinicById,
  getDetailDoctorById,
  getDoctorHome,
  getExtraInforDoctorById,
  getListPatientForDoctor,
  getProfileDoctorById,
  getScheduleByDate,
  getSpecialty,
  getSpecialtyById,
  postBookingforpatient,
  postBulkCreate,
  postCreateClinic,
  postCreateSpecialty,
  postInfoDoctor,
  postVerifyToken,
  sendRedemy,
  userParameter,
} from "../service/webService";

const handleAllcodes = async (req, res) => {
  try {
    const { type } = req.query;
    let typeInput = type.toUpperCase();
    // console.log("typeInput", typeInput);
    const result = await getAllcodesByType(typeInput);
    return res.status(200).json({
      EM: result.EM,
      EC: result.EC,
      DT: result.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetDoctorHome = async (req, res) => {
  try {
    let limit = req.query.limit;
    if (!limit) {
      limit = 10;
    }
    console.log("limit", limit);
    const result = await getDoctorHome(limit);
    console.log("result", result);
    return res.status(200).json({
      EM: result.EM,
      EC: result.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetAllDoctor = async (req, res) => {
  try {
    const result = await getAllDoctor();
    return res.status(200).json({
      EM: result.EM,
      EC: result.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleCreateInfoDoctor = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body);
    const result = await postInfoDoctor(req.body);
    return res.status(200).json({
      EM: result.EM,
      EC: result.EC,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetDetailDoctorById = async (req, res) => {
  try {
    if (!req.query.id) {
      return {
        EM: "Missing Parameter!",
        EC: 1,
        DT: response,
      };
    }
    const result = await getDetailDoctorById(req.query.id);
    return res.status(200).json({
      EM: result.EM,
      EC: result.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};

const handleBulkCreate = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body);
    if (!req.body) {
      return res.status(500).json({
        EM: "Missing data",
        EC: "-1",
      });
    }
    const result = await postBulkCreate(req.body);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      // DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetScheduleByDate = async (req, res) => {
  try {
    if (!req.query) {
      return res.status(500).json({
        EM: "Missing data",
        EC: "-1",
      });
    }
    console.log(">>>>>>>>>>>", req.query);
    // console.log(">>>>>>>>>>>", req.query.doctorId);
    const result = await getScheduleByDate(req.query.doctorId, req.query.date);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetExtraInforDoctor = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>", req.query);
    const result = await getExtraInforDoctorById(req.query.id);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetProfileDoctor = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>", req.query);
    const result = await getProfileDoctorById(req.query.id);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handlePatientBooking = async (req, res) => {
  try {
    const result = await postBookingforpatient(req.body);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleVerifyPatientBooking = async (req, res) => {
  try {
    console.log(">>>>>>res.body:", req.body);
    const result = await postVerifyToken(req.body);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleCreateNewSpecialty = async (req, res) => {
  try {
    console.log(">>>>>>res.body:", req.body);
    const result = await postCreateSpecialty(req.body);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleCreateNewClinic = async (req, res) => {
  try {
    console.log(">>>>>>res.body:", req.body);
    const result = await postCreateClinic(req.body);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetSpecialty = async (req, res) => {
  try {
    const result = await getSpecialty();
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetClinic = async (req, res) => {
  try {
    const result = await getAllClinic();
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetDetailSpecialty = async (req, res) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.query.id);
  try {
    const result = await getSpecialtyById(req.query.id, req.query.location);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetDetailClinic = async (req, res) => {
  try {
    const result = await getClinicById(req.query.id);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleGetListPatientForDoctor = async (req, res) => {
  try {
    const result = await getListPatientForDoctor(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleSendRemedy = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body);
    if (!req.body) {
      return res.status(500).json({
        EM: "Missing data",
        EC: "-1",
      });
    }
    const result = await sendRedemy(req.body);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      // DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleUserParamater = async (req, res) => {
  try {
    const result = await userParameter(req.query.limit, req.query.page);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleDoctorPara = async (req, res) => {
  try {
    const result = await doctorParameter(req.query.limit, req.query.page);
    return res.status(200).json({
      EM: result?.EM,
      EC: result?.EC,
      DT: result?.DT,
    });
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
export {
  handleDoctorPara,
  handleUserParamater,
  handleSendRemedy,
  handleGetListPatientForDoctor,
  handleGetDetailClinic,
  handleGetClinic,
  handleCreateNewClinic,
  handleGetDetailSpecialty,
  handleGetSpecialty,
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
};
