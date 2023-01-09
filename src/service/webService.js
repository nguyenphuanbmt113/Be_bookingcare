import _ from "lodash";
import db from "../models";
import { v4 as uuidv4 } from "uuid";
import { sendSimpleEmail, buildUrlEmail, sendAttachment } from "./emailService";
require("dotenv").config();
//check required field
const chekRequireData = (data) => {
  let arr = "";
};
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
        {
          model: db.Doctor_Infor,
          attributes: ["specialtyId"],
          include: [
            {
              model: db.Specialty,
              as: "SpecialtyData",
              attributes: ["name"],
            },
          ],
          // as: "doctorId",
          // attributes: ["valueEn", "valueVi"],
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
        clinicId: data.clinicId,
        priceId: data.selectPrice,
        specialtyId: data.specialtyId,
        paymentId: data.selectPayment,
        proviceId: data.selectProvice,
        nameClinic: data.nameClinic,
        addressClinic: data.nameAddress,
        note: data.note,
      });
    } else {
      const response = await db.Doctor_Infor.create({
        doctorId: data.doctorId,
        specialtyId: data.specialtyId,
        clinicId: data.clinicId,
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
        {
          model: db.User,
          attributes: ["firstName", "lastName"],
          as: "doctorData",
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
      // attributes: {
      //   exclude: ["id", "doctorId"],
      // },
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
        {
          model: db.Markdown,
          as: "MarkdownData",
          // attributes: ["valueEn", "valueVi"],
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
  console.log("data booking patient ", data);
  try {
    //validate
    if (!data.email || !data.fullName || !data.doctorId || !data.date) {
      return {
        EC: 1,
        EM: "Missing required parameter!",
      };
    } else {
      let token = uuidv4();
      await sendSimpleEmail({
        reciverEmail: data.email,
        patientName: data.fullName,
        nameDoctor: "Em yêu anh",
        language: data.language,
        time: data.timeString,
        linkto: buildUrlEmail(token, data.doctorId),
      });
      //send email config
      //ilnsert patient
      const user = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          roleId: "R3",
          address: data.address,
          firstName: data.fullName,
          gender: data.selectedGender,
        },
      });
      console.log("user", user);
      //insert to booking
      if (user && user[0]) {
        await db.Booking.findOrCreate({
          where: { patientId: user[0].id },
          defaults: {
            statusId: "S1",
            doctorId: data.doctorId,
            patientId: user[0].id,
            date: data.date,
            timeType: data.timeType,
            token: token,
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
const postVerifyToken = async (data) => {
  try {
    if (!data.token || !data.doctorId) {
      return {
        EC: 2,
        EM: "Missng required parameter!",
      };
    } else {
      let appointment = await db.Booking.findOne({
        where: {
          token: data.token,
          doctorId: data.doctorId,
          statusId: "S1",
        },
        raw: false,
      });
      console.log("appointment", appointment);
      if (appointment) {
        // appointment.statusId = "S2";
        await appointment.update({
          statusId: "S2",
        });
        // await appointment.save();
        return {
          EC: 0,
          EM: "Update the appointment success",
        };
      } else {
        return {
          EC: 1,
          EM: "schedule has been activated or does not exist",
        };
      }
    }
  } catch (error) {
    console.log(">>>>>>>check error:", error);
    return {
      EC: -1,
      EM: "something wrong with service",
    };
  }
};
const postCreateSpecialty = async (data) => {
  try {
    if (
      !data.specialtyName ||
      !data.imageBase64 ||
      !data.contentHTML ||
      !data.contentMarkdown
    ) {
      return {
        EC: 1,
        EM: "Missing required parameter",
      };
    } else {
      await db.Specialty.create({
        name: data.specialtyName,
        image: data.imageBase64,
        descriptionHTML: data.contentHTML,
        descriptionMarkdown: data.contentMarkdown,
      });
      return {
        EC: 0,
        EM: "Create especialty success",
      };
    }
  } catch (error) {
    console.log(">>>>>check error:", error);
    return {
      EC: -1,
      EM: "Sonething wrong with service",
    };
  }
};
const postCreateClinic = async (data) => {
  try {
    if (
      !data.name ||
      !data.address ||
      !data.imageBase64 ||
      !data.descriptionHTML ||
      !data.descriptionMarkdown
    ) {
      return {
        EC: 1,
        EM: "Missing required parameter",
      };
    } else {
      await db.Clinic.create({
        name: data.name,
        address: data.address,
        image: data.imageBase64,
        descriptionHTML: data.descriptionHTML,
        descriptionMarkdown: data.descriptionMarkdown,
      });
      return {
        EC: 0,
        EM: "Create especialty success",
      };
    }
  } catch (error) {
    console.log(">>>>>check error:", error);
    return {
      EC: -1,
      EM: "Sonething wrong with service",
    };
  }
};
const getSpecialty = async () => {
  try {
    const res = await db.Specialty.findAll();
    if (res && res.length > 0) {
      res.forEach((item, index) => {
        item.image = new Buffer(item.image, "base64").toString("binary");
      });
    }
    return {
      EC: 0,
      EM: "Get specialty success",
      DT: res,
    };
  } catch (error) {
    console.log(">>>>>check error:", error);
    return {
      EC: -1,
      EM: "Sonething wrong with service",
    };
  }
};
const getSpecialtyById = async (id, location) => {
  try {
    if (!id || !location) {
      return {
        EC: 1,
        EM: "Missing required parameter!",
      };
    }
    if (location === "ALL") {
      const res = await db.Specialty.findOne({
        where: { id },
        attributes: ["descriptionHTML", "descriptionMarkdown"],
        raw: false,
        include: [
          {
            model: db.Doctor_Infor,
            as: "SpecialtyData",
            attributes: ["doctorId", "proviceId", "addressClinic"],
          },
        ],
      });
      return {
        EC: 0,
        EM: "Get all specialty by id success",
        DT: res || {},
      };
    } else {
      //finf doctor location
      const res = await db.Specialty.findOne({
        where: { id: id },
        attributes: ["descriptionHTML", "descriptionMarkdown"],
        raw: false,
        include: [
          {
            model: db.Doctor_Infor,
            as: "SpecialtyData",
            attributes: ["doctorId", "proviceId", "addressClinic"],
            where: {
              proviceId: location,
            },
          },
        ],
      });
      if (!res) {
        return {
          EC: 0,
          EM: "don't have any data",
          DT: res || {},
        };
      }
      return {
        EC: 0,
        EM: "Get specialty by id & location",
        DT: res || {},
      };
    }
  } catch (error) {
    console.log(">>>>>check error:", error);
    return {
      EC: -1,
      EM: "Sonething wrong with service",
    };
  }
};
const getAllClinic = async () => {
  try {
    const res = await db.Clinic.findAll();
    if (res && res.length > 0) {
      res.forEach((item, index) => {
        item.image = new Buffer(item.image, "base64").toString("binary");
      });
    }
    return {
      EC: 0,
      EM: "Get clinic success",
      DT: res,
    };
  } catch (error) {
    console.log(">>>>>check error:", error);
    return {
      EC: -1,
      EM: "Sonething wrong with service",
    };
  }
};
const getClinicById = async (id) => {
  try {
    if (!id) {
      return {
        EC: 1,
        EM: "Missing required parameter!",
      };
    }
    const res = await db.Clinic.findOne({
      where: { id },
      attributes: [
        "descriptionHTML",
        "descriptionMarkdown",
        "name",
        "address",
        "image",
      ],
      raw: false,
      include: [
        {
          model: db.Doctor_Infor,
          as: "ClinicData",
          attributes: ["doctorId", "proviceId"],
        },
      ],
    });
    if (res && res.image) {
      res.image = new Buffer(res.image, "base64").toString("binary");
    }
    if (!res) {
      return {
        EC: 0,
        EM: "Don't Get clinic by id",
        DT: res,
      };
    }
    return {
      EC: 0,
      EM: "Get clinic by id success",
      DT: res,
    };
  } catch (error) {
    console.log(">>>>>check error:", error);
    return {
      EC: -1,
      EM: "Sonething wrong with service",
    };
  }
};
const getListPatientForDoctor = async (doctorId, date) => {
  try {
    if (!doctorId || !date) {
      return {
        EC: 1,
        EM: "Missing required parameter!",
      };
    }
    const res = await db.Booking.findAll({
      where: {
        statusId: "S2",
        date: date,
        doctorId: doctorId,
      },
      raw: false,
      nest: true,
      include: [
        {
          model: db.User,
          as: "patientData",
          attributes: ["email", "firstName", "address", "gender"],
          include: [
            {
              model: db.Allcode,
              as: "genderData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
        },
        {
          model: db.Allcode,
          as: "timetypeDataPatient",
          attributes: ["valueEn", "valueVi"],
        },
      ],
    });
    if (!res) {
      return {
        EC: 0,
        EM: "Get list patient for doctor by date success",
        DT: [],
      };
    }
    return {
      EC: 0,
      EM: "Get list patient for doctor by date success",
      DT: res,
    };
  } catch (error) {
    console.log(">>>>>check error:", error);
    return {
      EC: -1,
      EM: "Sonething wrong with service",
    };
  }
};
const sendRedemy = async (data) => {
  console.log("data truyen len serevc", data);
  try {
    if (!data.email || !data.doctorId || !data.patientId || !data.timeType) {
      return {
        EC: 1,
        EM: "Missing required parameter!",
      };
    }
    //update patient status
    let appointment = await db.Booking.findOne({
      where: {
        doctorId: data.doctorId,
        patientId: data.patientId,
        timeType: data.timeType,
        statusId: "S2",
      },
      raw: false,
    });
    if (appointment) {
      appointment.update({
        statusId: "S3",
      });
    }
    //send email remedy
    console.log("");
    await sendAttachment(data);
    return {
      EC: 0,
      EM: "Update suceess confirm status",
    };
  } catch (error) {
    console.log(">>>>>check error:", error);
    return {
      EC: -1,
      EM: "Sonething wrong with service",
    };
  }
};
const userParameter = async (limit, page) => {
  try {
    let offset = (page - 1) * limit + 1 || 1;
    limit = limit || 3
    let { count, rows } = await db.User.findAndCountAll({
      offset: +offset,
      limit: +limit || 3,
      attributes: {
        exclude: ["image", "password", "createdAt", "updatedAt"],
      },
    });
    let totalPage = count / limit;
    return {
      EC: 0,
      EM: "user parameter",
      DT: {
        count: totalPage,
        rows,
      },
    };
  } catch (error) {
    console.log(">>>>>check error:", error);
    return {
      EC: -1,
      EM: "Sonething wrong with service",
    };
  }
};
const doctorParameter = async (limit, page) => {
  try {
    let offset = (page - 1) * limit + 1;
    let { count, rows } = await db.User.findAndCountAll({
      where: {
        roleId: "R2",
      },
      offset: +offset,
      limit: +limit,
      attributes: {
        exclude: ["image", "password", "createdAt", "updatedAt"],
      },
    });
    let totalPage = count / limit;
    return {
      EC: 0,
      EM: "user parameter",
      DT: {
        count: totalPage,
        rows,
      },
    };
  } catch (error) {
    console.log(">>>>>check error:", error);
    return {
      EC: -1,
      EM: "Sonething wrong with service",
    };
  }
};
export {
  doctorParameter,
  userParameter,
  sendRedemy,
  getListPatientForDoctor,
  getClinicById,
  getAllClinic,
  postCreateClinic,
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
  postVerifyToken,
  postCreateSpecialty,
  getSpecialty,
  getSpecialtyById,
};
