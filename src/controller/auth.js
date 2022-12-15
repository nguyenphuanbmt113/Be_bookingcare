import authService from "../service/auth";
import handleError from "../middleware/handdleError";
import schema from "../helper/joi_schema";
const registerHandle = async (req, res) => {
  try {
    const err = schema.validate({
      email: req.body.email,
      password: req.body.password,
    });
    if (err.error) {
      return res.status(400).json({
        EC: 1,
        EM: err.error.message,
      });
    }
    // console.log(req.body);
    // if (!email || !password) {
    //   return res.status(400).json({
    //     EC: 1,
    //     EM: "Missing payload",
    //   });
    // }
    const response = await authService.register(req.body);
    return res.status(200).json({
      EC: response?.EC,
      EM: response?.EM,
      access_token: response?.access_token,
    });
  } catch (error) {
    return handleError.internalServerError(req, res);
  }
};
const loginHandle = async (req, res) => {
  try {
     const err = schema.validate({
       email: req.body.email,
       password: req.body.password,
     });
     if (err.error) {
       return res.status(400).json({
         EC: 1,
         EM: err.error.message,
       });
     }
    const response = await authService.login(req.body);
    return res.status(200).json({
      EC: response?.EC,
      EM: response?.EM,
      // token: response?.token,
      access_token: response?.access_token,
    });
  } catch (error) {
    return handleError.internalServerError(res);
  }
};
// export { registerHandle };
module.exports = { registerHandle, loginHandle };
