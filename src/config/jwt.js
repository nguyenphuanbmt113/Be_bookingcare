import jwt from "jsonwebtoken";
require("dotenv").config();
//token
const createToken = (data) => {
  const token = jwt.sign(data, process.env.KEYPASSWORD, { expiresIn: "2d" });
  return token;
};
const verifiToken = (token) => {
  const decoded = jwt.verify(token, process.env.KEYPASSWORD);
  return decoded;
};
const checkUserJwt = (req, res, next) => {
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifiToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authencicated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authencicated the USer",
    });
  }
};
const checkUserPermissionAdmin = (req, res, next) => {
  if (req.user) {
    let roleId = req.user.roleId;
    if (roleId === "R1") {
      next();
    }
  }
};
const checkUserPermissionDoctor = (req, res, next) => {
  if (req.user) {
    let roleId = req.user.roleId;
    if (roleId === "R2") {
      next();
    }
  }
};
export {
  createToken,
  verifiToken,
  checkUserPermissionAdmin,
  checkUserJwt,
  checkUserPermissionDoctor,
};
