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
const getDoctorHome = async (limit) => {
  try {
    const response = await db.User.findAll({
      where: {
        roleId: "R2",
      },
      limit: +limit,
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      nest: true,
      raw: true,
      include: [
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "genderData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
    });
    console.log("response", response);
    return {
      EM: "get doctors success",
      EC: 0,
      DT: response,
    };
  } catch (error) {
    console.log(">>>>check error service:", error);
    return {
      EM: "something wrongs in service",
      EC: -2,
      DT: [],
    };
  }
};
const getAllDoctor = async () => {
  try {
    const response = await db.User.findAll({
      where: {
        roleId: "R2",
      },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password", "image"],
      },
      nest: true,
      raw: true,
    });
    return {
      EM: "get all doctors success",
      EC: 0,
      DT: response,
    };
  } catch (error) {
    console.log(">>>>check error service:", error);
    return {
      EM: "something wrongs in service",
      EC: -2,
      DT: [],
    };
  }
};
const postInfoDoctor = async (data) => {
  try {
    if (data.doctorId) {
      const response = await db.Markdown.create({
        doctorId: data.doctorId,
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        description: data.description,
      });
      // await db.Markdown.save({});
      return {
        EM: "post data infidoctor success",
        EC: 0,
        DT: response,
      };
    } else {
      return {
        EM: "Missing Parameter!",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(">>>>check error service:", error);
    return {
      EM: "something wrongs in service",
      EC: -2,
      DT: [],
    };
  }
};
const getDetailDoctorById = async (doctorId) => {
  try {
    const response = await db.User.findOne({
      where: {
        id: doctorId,
      },
      attributes: {
        exclude: ["password", "image"],
      },
      include: [
        {
          model: db.Markdown,
          attributes: ["description", "contentHTML", "contentMarkdown"],
        },
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },  
      ],
      nest: true,
      raw: true,
    });
    return {
      EM: "get doctor by id success",
      EC: 1,
      DT: response,
    };
  } catch (error) {
    console.log(">>>>check error service:", error);
    return {
      EM: "something wrongs in service",
      EC: -2,
      DT: [],
    };
  }
};
export {
  getAllcodesByType,
  getDoctorHome,
  getAllDoctor,
  postInfoDoctor,
  getDetailDoctorById,
};
