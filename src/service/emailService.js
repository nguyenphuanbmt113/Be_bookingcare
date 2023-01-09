require("dotenv").config();
const nodemailer = require("nodemailer");
import { v4 as uuidv4 } from "uuid";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_PASSWORD_APP,
    },
  });

  let info = await transporter.sendMail({
    from: '"Nguyễn Phú An 👻" <foo@example.com>',
    to: dataSend.reciverEmail,
    subject: "Thông Tin Đặt Lịch Khám Bệnh",
    text: "Hello world?",
    html: getBodyEmail(dataSend),
  });
};

let getBodyEmail = (dataSend) => {
  let result = "";
  if (dataSend.language == "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <h4>You received this email because you booked an online medical appointment on homecare</h4>
    <h4>Information to book a medical appointment</h4>
    <div>Time: ${dataSend.time}</div>
    <div>Main Doctor: ${dataSend.nameDoctor}</div>
    <p>If the above information is true and complete the procedure to make an appointment for medical examination</p>
    <p><a href=${dataSend.linkto}>Click Here!</a></p>
    <p>Thanks a lot</p>
    `;
  }
  if (dataSend.language === "vi" || dataSend.language === "") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <h4>Bạn nhận đc email này vì đặt lich khám bênh online trên homecare</h4>
    <h4>Thông tin đặt lịch khám bệnh</h4>
    <div>Thời gian: ${dataSend.time}</div>
    <div>Bác Sĩ: ${dataSend.nameDoctor}</div>
    <p>Nếu các thông tin trên là sự thật và hoàn tất thủ túc đặt lịch khám bệnh</p>
    <p><a href=${dataSend.linkto}>Click Here!</a></p>
    <p>Xin chân thành cảm ớn</p>
    `;
  }
  return result;
};
let buildUrlEmail = (token, doctorId) => {
  let result = "";
  result = `${process.env.CLIENT_URL}/verify-booking?token=${token}&doctorId=${doctorId}}`;
  return result;
};
let sendAttachment = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_PASSWORD_APP,
    },
  });

  let info = await transporter.sendMail({
    from: '"Nguyễn Phú An 👻" <foo@example.com>',
    to: dataSend.email,
    subject: "Thông Tin Đặt Lịch Khám Bệnh",
    text: "Hello world?",
    html: getBodyEmailRemedy(dataSend),
    attachments: [
      {
        filename: "image",
        content: dataSend?.image?.split("base64,")[1],
        encoding: "base64"
      }
    ],
  });
};
const getBodyEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language == "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <h4>You received this email because you booked an online medical appointment on homecare</h4>
    <h4>Information to book a medical appointment</h4>
    <p>If the above information is true and complete the procedure to make an appointment for medical examination</p>
    <p>Thanks a lot</p>
    `;
  }
  if (dataSend.language === "vi" || dataSend.language === "") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <h4>Bạn nhận đc email này vì đặt lich khám bênh online trên homecare thanh cong</h4>
    <h4>Thông tin đặt lịch khám bệnh</h4>
    <p>Nếu các thông tin trên là sự thật và hoàn tất thủ túc đặt lịch khám bệnh</p>
    <p>Xin chân thành cảm ớn</p>
    `;
  }
  return result;
};
module.exports = {
  sendSimpleEmail,
  buildUrlEmail,
  sendAttachment,
};
