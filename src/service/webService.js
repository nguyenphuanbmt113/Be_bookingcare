import _ from "lodash";
import db from "../models";
import { sendSimpleEmail } from "./emailService";
require("dotenv").config();
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
    const infoUser = await db.Markdown.findOne({
      where: { doctorId: data.doctorId },
      raw: false,
    });
    const DoctorInfor = await db.Doctor_Infor.findOne({
      where: { doctorId: data.doctorId },
      raw: false,
    });
    if (infoUser) {
      await infoUser.update({
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        description: data.description,
      });
    } else {
      const response = await db.Markdown.create({
        doctorId: data.doctorId,
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        description: data.description,
      });
    }
    if (DoctorInfor) {
      await DoctorInfor.update({
        priceId: data.selectPrice,
        paymentId: data.selectPayment,
        proviceId: data.selectProvice,
        nameClinic: data.nameClinic,
        addressClinic: data.nameAddress,
        note: data.note,
      });
    } else {
      const response = await db.Doctor_Infor.create({
        doctorId: data.doctorId,
        priceId: data.selectPrice,
        paymentId: data.selectPayment,
        proviceId: data.selectProvice,
        nameClinic: data.nameClinic,
        addressClinic: data.nameAddress,
        note: data.note,
      });
    }
    return {
      EC: 0,
      EM: "Save doctor Info Success",
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
const getDetailDoctorById = async (doctorId) => {
  try {
    const response = await db.User.findOne({
      where: {
        id: doctorId,
      },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Markdown,
          attributes: ["description", "contentHTML", "contentMarkdown"],
        },
        {
          model: db.Doctor_Infor,
          attributes: {
            exclude: ["id", "doctorId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
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
    console.log("response", response);
    if (response && response.image) {
      response.image = new Buffer(response.image, "base64").toString("binary");
    }
    return {
      EM: "get doctor by id success",
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
const postBulkCreate = async (data) => {
  try {
    const schedule = data?.data?.result;
    const doctorId = data?.data?.doctorId;
    const date = data?.data?.date;
    if (schedule && schedule.length > 0) {
      schedule.forEach((item, index) => {
        item.maxNumber = process.env.MAX_NUMBER_SCHEDULE;
      });
    }
    //get all existing data
    let existing = await db.Schedule.findAll({
      where: { doctorId: doctorId, date: date },
      attributes: ["timeType", "date", "doctorId", "maxNumber"],
    });
    //compare different
    let toCreate = _.differenceWith(schedule, existing, (a, b) => {
      return a.timeType === b.timeType && a.date === b.date;
    });
    if (toCreate && toCreate.length > 0) {
      await db.Schedule.bulkCreate(toCreate);
    }

    return {
      EM: "bulk create success",
      EC: 0,
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
const getScheduleByDate = async (doctorId, date) => {
  try {
    const res = await db.Schedule.findAll({
      where: { doctorId: doctorId, date: date },
      attributes: {
        exclude: ["createdAt", "updatedAt", "currentNumber"],
      },
      nest: true,
      raw: true,
      include: [
        {
          model: db.Allcode,
          attributes: ["valueVi", "valueEn"],
          as: "timeTypeData",
        },
      ],
    });
    console.log(">>>>>>>>>res", res);
    return {
      EM: "get schedule by date success",
      EC: 0,
      DT: res || [],
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
const getExtraInforDoctorById = async (id) => {
  try {
    if (!id) {
      return {
        EM: "Missing required parameters!",
        EC: 1,
      };
    }
    const res = await db.Doctor_Infor.findOne({
      where: { doctorId: id },
      attributes: {
        exclude: ["id", "doctorId"],
      },
      include: [
        {
          model: db.Allcode,
          as: "priceData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "provinceData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "paymentData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      nest: true,
      raw: true,
    });
    return {
      EM: "get doctorInfor Extra by date success",
      EC: 0,
      DT: res || [],
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
const getProfileDoctorById = async (doctorId) => {
  try {
    if (!doctorId) {
      return {
        EM: "Missing required Parameter!",
        EC: -2,
        DT: [],
      };
    }
    const response = await db.User.findOne({
      where: {
        id: doctorId,
      },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Doctor_Infor,
          attributes: {
            exclude: ["id", "doctorId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
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
    console.log("response", response);
    if (response && response.image) {
      response.image = new Buffer(response.image, "base64").toString("binary");
    }
    return {
      EM: "get doctor by id success",
      EC: 0,
      DT: response,
    };
  } catch (error) {}
};
const postBookingforpatient = async (data) => {
  try {
    //validate
    if (!data.email) {
      return {
        EC: 1,
        EM: "Missing required parameter!",
      };
    } else {
      await sendSimpleEmail({
        reciverEmail: data.email,
        patientName: "Nguyễn Phú An",
        nameDoctor: "Em yêu anh",
        time: "9:00 - 10:00 Chủ nhật ngày 1/8/2022",
        linkto:
          "https://4kwallpapers.com/games/yoru-valorant-stealth-agent-pc-games-red-background-4121.html",
      });
      //send email config
      //ilnsert patient
      const user = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: { email: data.email, roleId: "R3" },
      });
      if (user && user[0]) {
        await db.Booking.findOrCreate({
          where: { patientId: user[0].id },
          defaults: {
            statusId: "S1",
            doctorId: data.doctorId,
            patientId: user[0].id,
            date: data.date,
            timeType: data.timeType,
          },
        });
      }
      return {
        EC: 0,
        EM: "insert patient success",
      };
    }
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return {
      EC: -1,
      EM: "something wrong with service",
    };
  }
};
export {
  getAllcodesByType,
  getDoctorHome,
  getAllDoctor,
  postInfoDoctor,
  getDetailDoctorById,
  postBulkCreate,
  getScheduleByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postBookingforpatient,
};
