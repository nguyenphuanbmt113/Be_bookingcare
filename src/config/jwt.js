import jwt from "jsonwebtoken";
require("dotenv").config();
//token
const setToken = (data) => {
  const token = jwt.sign(data, process.env.KEYPASSWORD, { expiresIn: "2d" });
  return token;
};
const verifiToken = (token) => {
  const decoded = jwt.verify(token, process.env.KEYPASSWORD);
  return decoded;
};
export { setToken, verifiToken };
