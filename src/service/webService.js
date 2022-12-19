import db from "../models";
const getAllcodesByType = async (type) => {
  try {
    if (!type) {
      return {
        EM: "missing required parameters",
        EC: 1,
        DT: [],
      };
    } else {
      const res = await db.Allcode.findAll({
        where: {
          type,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });
      return {
        EM: "get allcodes with type success",
        EC: 0,
        DT: res,
      };
    }
    console.log("res", res);
  } catch (error) {
    console.log(">>>>>>>alo check err:", error);
    return {
      EM: "something wrongs in service",
      EC: -2,
      DT: [],
    };
  }
};
export { getAllcodesByType };
