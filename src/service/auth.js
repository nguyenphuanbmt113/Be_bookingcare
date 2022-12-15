import { setToken } from "../config/jwt";
import db from "../models";
let bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync("bacon", 8);
//hash paassword
const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};
//compase password
const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
const register = async ({ email, password }) => {
  try {
    const res = await db.User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password: hashPassword(password),
      },
    });
    const dataJWT = setToken({
      id: res[0].id,
      email: res[0].email,
      role_code: res[0].role_code,
    });
    return {
      EC: res[1] ? 0 : 1,
      EM: res[1] ? "Resgister is successfull" : "Email is exists",
      access_token: `Bearer ${dataJWT}`,
    };
  } catch (error) {
    console.log(">>>>>>>>check:", error);
  }
};
const login = async ({ email, password }) => {
  try {
    const res = await db.User.findOne({
      where: { email },
      attributes: ["id", "name", "email", "role_code", "password"],
      raw: true,
    });
    console.log("res", res);
    if (res) {
      const booleanPass = comparePassword(password, res.password);
      if (booleanPass) {
        const dataJWT = setToken({
          id: res.id,
          email: res.email,
          role_code: res.role_code,
        });
        return {
          EC: 0,
          EM: "login is successfull",
          access_token: `Bearer ${dataJWT}`,
        };
      } else {
        return {
          EC: -1,
          EM: "something wrong Password!!",
          data: [],
        };
      }
    } else {
       return {
         EC: -1,
         EM: "Email isn't Exist",
         data: [],
       };
    }
    // const dataJWT = setToken({
    //   id: res[0].id,
    //   email: res[0].email,
    //   role_code: res[0].role_code,
    // });
  } catch (error) {
    console.log(">>>>>>>>check:", error);
  }
};
// export { register };
module.exports = { login, register };
