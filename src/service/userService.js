import db from "../models";
const getOne = async (userId) => {
  try {
    const res = await db.User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Role,
          as: "role_user",
          attributes: ["id", "code", "value"],
        },
      ],
      // raw: true,
    });
    if (res) {
      return {
        EC: 0,
        EM: "find user success!",
        data: res,
      };
    } else {
      return {
        EC: 1,
        EM: "can't find user success!",
        data: "",
      };
    }
  } catch (error) {
    console.log(">>>>>>>>check:", error);
  }
};
module.exports = { getOne };
