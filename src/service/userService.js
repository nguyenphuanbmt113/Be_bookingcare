import db from "../models";
const { Op } = require("sequelize");
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
const createUser = async (data) => {
  try {
    let result = await db.User.findOrCreate({
      where: {
        [Op.or]: [{ email: data.email }, { phonenumber: data.phonenumber }],
      },
      raw: true,
      defaults: {
        ...data,
        password: hashPassword(data.password),
        gender: data.gender === "1" ? true : false,
      },
    });
    return {
      EC: result[1] ? 0 : 1,
      EM: result[1] ? "create is successfull" : "Email/Phone is exists",
    };
  } catch (error) {
    console.log(">>>>>>>>check:", error);
    return {
      EC: -1,
      EM: "something wrong with userservice.",
    };
  }
};
const getAll = async () => {
  try {
    let result = await db.User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      raw: true,
    });
    return {
      EC: 0,
      EM: "get all user is successfull",
      data: result,
    };
  } catch (error) {
    console.log(">>>>>>>>check:", error);
    return {
      EC: -1,
      EM: "something wrong with userservice.",
    };
  }
};
const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id },
      raw: false,
    });
    if (user) {
      await user.destroy();
      return {
        EM: "delete success",
        EC: 0,
      };
    } else {
      return {
        EM: "User not exist",
        EC: 2,
      };
    }
  } catch (error) {
    console.log(">>>>>>>>error", error);
    return {
      EM: "something wrongs in service",
      EC: -2,
      DT: [],
    };
  }
};
const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data?.id },
      raw: false,
    });
    if (user) {
      user.set({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phone: data.phonenumber,
      });
      user.save({});
    } else {
      return {
        EM: "can't find user",
        EC: -1,
        DT: [],
      };
    }
    return {
      EM: "update done",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(">>>>>>>alo check err:", error);
    return {
      EM: "something wrongs in service",
      EC: -2,
      DT: [],
    };
  }
};
export { createUser, getAll, deleteUser, updateUser };
