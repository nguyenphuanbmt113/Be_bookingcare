import { login } from "../service/auth";
import {
  createUser,
  deleteUser,
  getAll,
  updateUser,
} from "../service/userService";

//CRUD
const handleCreateUser = async (req, res) => {
  try {
    console.log(req.body);
    const response = await createUser(req.body);
    console.log("response", response);
    return res.status(200).json({
      EC: response.EC,
      EM: response.EM,
    });
  } catch (error) {
    console.log(">>>>>>>>check error:", error);
    return res.status(500).json({
      EC: -1,
      EM: "something wrong with server.",
    });
  }
};
const handleGetAllUser = async (req, res) => {
  try {
    const response = await getAll();
    return res.status(200).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT,
    });
  } catch (error) {
    console.log(">>>>>>>>check error:", error);
    return res.status(500).json({
      EC: -1,
      EM: "something wrong with server.",
    });
  }
};
const handleDeleteUser = async (req, res) => {
  try {
    let userdelete = await deleteUser(req.body.id);
    return res.status(200).json({
      EM: userdelete.EM,
      EC: userdelete.EC,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
    });
  }
};
const handleUpdateUser = async (req, res) => {
  try {
    console.log("req.body up:", req.body);
    const result = await updateUser(req.body.data);
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
//REGISTER and login
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(401).json({
        EM: "missing input!",
        EC: 2,
      });
    }
    const result = await login(req.body);
    //set cookie
    res.cookie("jwt", result.DT.access_token, { httpOnly: true});
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

export {
  handleCreateUser,
  handleGetAllUser,
  handleDeleteUser,
  handleUpdateUser,
  handleLogin,
};
