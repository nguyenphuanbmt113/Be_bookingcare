import handleError from "../middleware/handdleError";
import userService from "../service/userService";
const handleGetOneUser = async (req, res) => {
  try {
    console.log(req.user);
    const { id } = req.user;
    const response = await userService.getOne(id);
    return res.status(200).json({
      EC: response?.EC,
      EM: response?.EM,
      data: response?.data,
    });
  } catch (error) {
    return handleError.internalServerError(req, res);
  }
};
export { handleGetOneUser };
