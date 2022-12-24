import {
  getAllcodesByType,
  getAllDoctor,
  getDoctorHome,
  postInfoDoctor,
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
    console.log(req.body);
    const result = await postInfoDoctor(req.body);
    return res.status(200).json({
      EM: result.EM,
      EC: result.EC,
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
export {
  handleAllcodes,
  handleGetDoctorHome,
  handleGetAllDoctor,
  handleCreateInfoDoctor,
};
