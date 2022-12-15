import handleError from "../middleware/handdleError";
import dataInsert from "../service/insert";
const handleInsertData = async (req, res) => {
  try {
    const response = await dataInsert.insert();
    return res.status(200).json({
      EC: response?.EC,
      EM: response?.EM,
    });
  } catch (error) {
    return handleError.internalServerError(req, res);
  }
};
export { handleInsertData };
