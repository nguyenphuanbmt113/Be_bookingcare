import { getAllcodesByType } from "../service/webService";

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
export { handleAllcodes };
